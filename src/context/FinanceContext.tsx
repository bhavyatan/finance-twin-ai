import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
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
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  updateGoal: (id: string, amount: number) => Promise<void>;
  createGoal: (goal: Omit<Goal, 'id'>) => Promise<void>;
  getSpendingByCategory: () => { category: string; amount: number }[];
  runScenario: (adjustments: SimulationScenario['adjustments']) => Promise<SimulationScenario>;
  isLoading: boolean;
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
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [scenarios, setScenarios] = useState<SimulationScenario[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    } else {
      setTransactions(mockTransactions);
      setAccounts(mockAccounts);
      setGoals(mockGoals);
      setBudgets(mockBudget);
      setScenarios([
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
      setIsLoading(false);
    }
  }, [user]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const { data: accountsData, error: accountsError } = await supabase
        .from('accounts')
        .select('*')
        .order('created_at', { ascending: false });

      if (accountsError) throw accountsError;

      const formattedAccounts: Account[] = accountsData.map(account => ({
        id: account.id,
        name: account.name,
        type: account.type,
        balance: account.balance,
        currency: account.currency,
        lastUpdated: account.last_updated,
      }));

      setAccounts(formattedAccounts.length > 0 ? formattedAccounts : mockAccounts);

      const { data: transactionsData, error: transactionsError } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });

      if (transactionsError) throw transactionsError;

      const formattedTransactions: Transaction[] = transactionsData.map(transaction => ({
        id: transaction.id,
        date: transaction.date,
        description: transaction.description,
        amount: transaction.amount,
        category: transaction.category,
        type: transaction.type as 'income' | 'expense',
      }));

      setTransactions(formattedTransactions.length > 0 ? formattedTransactions : mockTransactions);

      const { data: goalsData, error: goalsError } = await supabase
        .from('goals')
        .select('*')
        .order('created_at', { ascending: false });

      if (goalsError) throw goalsError;

      const formattedGoals: Goal[] = goalsData.map(goal => ({
        id: goal.id,
        name: goal.name,
        targetAmount: goal.target_amount,
        currentAmount: goal.current_amount,
        deadline: goal.deadline,
        category: goal.category,
      }));

      setGoals(formattedGoals.length > 0 ? formattedGoals : mockGoals);

      const { data: budgetsData, error: budgetsError } = await supabase
        .from('budgets')
        .select('*')
        .order('created_at', { ascending: false });

      if (budgetsError) throw budgetsError;

      const formattedBudgets: Budget[] = budgetsData.map(budget => ({
        id: budget.id,
        category: budget.category,
        allocated: budget.allocated,
        spent: budget.spent,
        period: budget.period,
      }));

      setBudgets(formattedBudgets.length > 0 ? formattedBudgets : mockBudget);

      const { data: scenariosData, error: scenariosError } = await supabase
        .from('scenarios')
        .select('*')
        .order('created_at', { ascending: false });

      if (scenariosError) throw scenariosError;

      const formattedScenarios: SimulationScenario[] = scenariosData.map(scenario => ({
        id: scenario.id,
        name: scenario.name,
        description: scenario.description || '',
        adjustments: typeof scenario.adjustments === 'string' 
          ? JSON.parse(scenario.adjustments) 
          : scenario.adjustments as SimulationScenario['adjustments'],
        impact: typeof scenario.impact === 'string'
          ? JSON.parse(scenario.impact)
          : scenario.impact as SimulationScenario['impact'],
      }));

      setScenarios(formattedScenarios.length > 0 ? formattedScenarios : [
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

    } catch (error: any) {
      console.error('Error fetching user data:', error.message);
      toast.error('Failed to load financial data');
      
      setTransactions(mockTransactions);
      setAccounts(mockAccounts);
      setGoals(mockGoals);
      setBudgets(mockBudget);
    } finally {
      setIsLoading(false);
    }
  };

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

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

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    if (!user) {
      toast.error('You must be logged in to add transactions');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([
          {
            user_id: user.id,
            date: transaction.date,
            description: transaction.description,
            amount: transaction.amount,
            category: transaction.category,
            type: transaction.type,
            account_id: accounts[0].id,
          }
        ])
        .select();

      if (error) throw error;
      
      if (data && data[0]) {
        const newTransaction: Transaction = {
          id: data[0].id,
          date: data[0].date,
          description: data[0].description,
          amount: data[0].amount,
          category: data[0].category,
          type: data[0].type as 'income' | 'expense',
        };
        
        setTransactions(prev => [newTransaction, ...prev]);
        
        if (transaction.type === 'income') {
          await supabase
            .from('accounts')
            .update({ balance: accounts[0].balance + transaction.amount })
            .eq('id', accounts[0].id);
            
          setAccounts(prev => 
            prev.map((account, index) => 
              index === 0 
                ? { ...account, balance: account.balance + transaction.amount } 
                : account
            )
          );
        } else {
          await supabase
            .from('accounts')
            .update({ balance: accounts[0].balance - transaction.amount })
            .eq('id', accounts[0].id);
            
          setAccounts(prev => 
            prev.map((account, index) => 
              index === 0 
                ? { ...account, balance: account.balance - transaction.amount } 
                : account
            )
          );
        }
        
        toast.success('Transaction added successfully');
      }
    } catch (error: any) {
      console.error('Error adding transaction:', error.message);
      toast.error('Failed to add transaction');
    }
  };

  const updateGoal = async (id: string, amount: number) => {
    if (!user) {
      toast.error('You must be logged in to update goals');
      return;
    }

    try {
      const goalToUpdate = goals.find(goal => goal.id === id);
      if (!goalToUpdate) throw new Error('Goal not found');
      
      const newAmount = goalToUpdate.currentAmount + amount;
      
      const { error } = await supabase
        .from('goals')
        .update({ current_amount: newAmount, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      setGoals(prev => 
        prev.map(goal => 
          goal.id === id 
            ? { ...goal, currentAmount: newAmount } 
            : goal
        )
      );
      
      toast.success('Goal updated successfully');
    } catch (error: any) {
      console.error('Error updating goal:', error.message);
      toast.error('Failed to update goal');
    }
  };

  const createGoal = async (goal: Omit<Goal, 'id'>) => {
    if (!user) {
      toast.error('You must be logged in to create goals');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('goals')
        .insert([
          {
            user_id: user.id,
            name: goal.name,
            target_amount: goal.targetAmount,
            current_amount: goal.currentAmount,
            deadline: goal.deadline,
            category: goal.category,
          }
        ])
        .select();

      if (error) throw error;
      
      if (data && data[0]) {
        const newGoal: Goal = {
          id: data[0].id,
          name: data[0].name,
          targetAmount: data[0].target_amount,
          currentAmount: data[0].current_amount,
          deadline: data[0].deadline,
          category: data[0].category,
        };
        
        setGoals(prev => [...prev, newGoal]);
        toast.success('Goal created successfully');
      }
    } catch (error: any) {
      console.error('Error creating goal:', error.message);
      toast.error('Failed to create goal');
    }
  };

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

  const runScenario = async (adjustments: SimulationScenario['adjustments']) => {
    if (!user) {
      toast.error('You must be logged in to run scenarios');
      
      const mockScenario: SimulationScenario = {
        id: `scenario-${Date.now()}`,
        name: 'Custom Scenario',
        description: 'Your custom financial plan',
        adjustments,
        impact: {
          netWorth: 300000,
          savingsAfter5Years: 85000,
          retirementAge: 60,
        },
      };
      
      setScenarios(prev => [...prev, mockScenario]);
      return mockScenario;
    }
    
    try {
      const baseNetWorth = 250000;
      const baseSavings = 60000;
      const baseRetirementAge = 65;
      
      let netWorthImpact = 1;
      let savingsImpact = 1;
      let retirementAgeImpact = 0;
      
      if (adjustments.income) {
        netWorthImpact += adjustments.income / 100;
        savingsImpact += adjustments.income / 100;
        retirementAgeImpact -= adjustments.income / 100;
      }
      
      if (adjustments.expenses) {
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
      
      const newNetWorth = Math.round(baseNetWorth * netWorthImpact);
      const newSavings = Math.round(baseSavings * savingsImpact);
      const newRetirementAge = Math.max(45, Math.round(baseRetirementAge + retirementAgeImpact * 10));
      
      const impact = {
        netWorth: newNetWorth,
        savingsAfter5Years: newSavings,
        retirementAge: newRetirementAge,
      };
      
      const { data, error } = await supabase
        .from('scenarios')
        .insert([
          {
            user_id: user.id,
            name: 'Custom Scenario',
            description: 'Your custom financial plan',
            adjustments,
            impact,
          }
        ])
        .select();

      if (error) throw error;
      
      if (data && data[0]) {
        const newScenario: SimulationScenario = {
          id: data[0].id,
          name: data[0].name,
          description: data[0].description || '',
          adjustments: typeof data[0].adjustments === 'string'
            ? JSON.parse(data[0].adjustments)
            : data[0].adjustments as SimulationScenario['adjustments'],
          impact: typeof data[0].impact === 'string'
            ? JSON.parse(data[0].impact)
            : data[0].impact as SimulationScenario['impact'],
        };
        
        setScenarios(prev => [...prev, newScenario]);
        
        toast.success('Scenario created successfully');
        return newScenario;
      } else {
        throw new Error('Failed to create scenario');
      }
    } catch (error: any) {
      console.error('Error creating scenario:', error.message);
      toast.error('Failed to create scenario');
      
      const mockScenario: SimulationScenario = {
        id: `scenario-${Date.now()}`,
        name: 'Custom Scenario',
        description: 'Your custom financial plan',
        adjustments,
        impact: {
          netWorth: 300000,
          savingsAfter5Years: 85000,
          retirementAge: 60,
        },
      };
      
      setScenarios(prev => [...prev, mockScenario]);
      return mockScenario;
    }
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
    isLoading,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
