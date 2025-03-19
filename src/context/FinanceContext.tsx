
import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockTransactions, mockAccounts, mockGoals, mockBudget } from '@/data/mockData';

type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
};

type Account = {
  id: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
  lastUpdated: string;
};

type Goal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
};

type Budget = {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  period: string;
};

type SimulationScenario = {
  id: string;
  name: string;
  description: string;
  adjustments: {
    income?: number; // Percentage change
    expenses?: number; // Percentage change
    savings?: number; // Percentage change
    investments?: { return: number }; // Percentage return
  };
  impact: {
    netWorth: number;
    savingsAfter5Years: number;
    retirementAge: number;
  };
};

type FinanceContextType = {
  transactions: Transaction[];
  accounts: Account[];
  goals: Goal[];
  budgets: Budget[];
  scenarios: SimulationScenario[];
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateGoal: (id: string, amount: number) => void;
  createGoal: (goal: Omit<Goal, 'id'>) => void;
  getSpendingByCategory: () => { category: string; amount: number }[];
  runScenario: (adjustments: SimulationScenario['adjustments']) => SimulationScenario;
};

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [budgets, setBudgets] = useState<Budget[]>(mockBudget);
  const [scenarios, setScenarios] = useState<SimulationScenario[]>([
    {
      id: '1',
      name: 'Base Scenario',
      description: 'Your current financial trajectory',
      adjustments: {},
      impact: {
        netWorth: 250000,
        savingsAfter5Years: 60000,
        retirementAge: 65,
      },
    },
    {
      id: '2',
      name: 'Increased Savings',
      description: 'Save 15% more of your income',
      adjustments: {
        savings: 15,
      },
      impact: {
        netWorth: 320000,
        savingsAfter5Years: 98000,
        retirementAge: 62,
      },
    },
    {
      id: '3',
      name: 'Early Retirement',
      description: 'Aggressive investment strategy',
      adjustments: {
        savings: 25,
        expenses: -10,
        investments: { return: 8 },
      },
      impact: {
        netWorth: 450000,
        savingsAfter5Years: 142000,
        retirementAge: 55,
      },
    },
  ]);

  // Calculate total balance across all accounts
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  // Calculate monthly income and expenses
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });
  
  const monthlyIncome = monthlyTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const monthlyExpenses = monthlyTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  // Add a new transaction
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: `tr-${Date.now()}`,
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Update account balance
    if (transaction.type === 'income') {
      // Add to first account for demo purposes
      setAccounts(prev => 
        prev.map((account, index) => 
          index === 0 
            ? { ...account, balance: account.balance + transaction.amount } 
            : account
        )
      );
    } else {
      // Deduct from first account for demo purposes
      setAccounts(prev => 
        prev.map((account, index) => 
          index === 0 
            ? { ...account, balance: account.balance - transaction.amount } 
            : account
        )
      );
    }
  };

  // Update goal progress
  const updateGoal = (id: string, amount: number) => {
    setGoals(prev => 
      prev.map(goal => 
        goal.id === id 
          ? { ...goal, currentAmount: goal.currentAmount + amount } 
          : goal
      )
    );
  };

  // Create a new goal
  const createGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal = {
      ...goal,
      id: `goal-${Date.now()}`,
    };
    
    setGoals(prev => [...prev, newGoal]);
  };

  // Get spending by category
  const getSpendingByCategory = () => {
    const categories: Record<string, number> = {};
    
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        if (!categories[t.category]) {
          categories[t.category] = 0;
        }
        categories[t.category] += t.amount;
      });
    
    return Object.entries(categories).map(([category, amount]) => ({
      category,
      amount,
    }));
  };

  // Run a financial scenario simulation
  const runScenario = (adjustments: SimulationScenario['adjustments']) => {
    // This is a simplified simulation for the prototype
    const baseNetWorth = 250000;
    const baseSavings = 60000;
    const baseRetirementAge = 65;
    
    // Apply adjustments to calculate impact
    let netWorthImpact = 1;
    let savingsImpact = 1;
    let retirementAgeImpact = 0;
    
    if (adjustments.income) {
      netWorthImpact += adjustments.income / 100;
      savingsImpact += adjustments.income / 100;
      retirementAgeImpact -= adjustments.income / 100;
    }
    
    if (adjustments.expenses) {
      // Negative expenses (reduction) improves financial situation
      netWorthImpact -= adjustments.expenses / 100;
      savingsImpact -= adjustments.expenses / 100;
      retirementAgeImpact += adjustments.expenses / 100;
    }
    
    if (adjustments.savings) {
      savingsImpact += adjustments.savings / 100;
      retirementAgeImpact -= adjustments.savings / 200;
    }
    
    if (adjustments.investments?.return) {
      const returnEffect = adjustments.investments.return / 100;
      netWorthImpact += returnEffect * 2;
      savingsImpact += returnEffect * 2;
      retirementAgeImpact -= returnEffect;
    }
    
    // Calculate new financial metrics
    const newNetWorth = Math.round(baseNetWorth * netWorthImpact);
    const newSavings = Math.round(baseSavings * savingsImpact);
    const newRetirementAge = Math.max(45, Math.round(baseRetirementAge + retirementAgeImpact * 10));
    
    // Create a new scenario with the results
    const newScenario: SimulationScenario = {
      id: `scenario-${Date.now()}`,
      name: 'Custom Scenario',
      description: 'Your custom financial plan',
      adjustments,
      impact: {
        netWorth: newNetWorth,
        savingsAfter5Years: newSavings,
        retirementAge: newRetirementAge,
      },
    };
    
    // Add the new scenario to the list
    setScenarios(prev => [...prev, newScenario]);
    
    return newScenario;
  };

  const value = {
    transactions,
    accounts,
    goals,
    budgets,
    scenarios,
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
    addTransaction,
    updateGoal,
    createGoal,
    getSpendingByCategory,
    runScenario,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
