
export const mockTransactions = [
  {
    id: 'tr-1',
    date: '2023-05-15',
    description: 'Salary Deposit',
    amount: 4200,
    category: 'Income',
    type: 'income' as const,
  },
  {
    id: 'tr-2',
    date: '2023-05-18',
    description: 'Grocery Store',
    amount: 125.50,
    category: 'Groceries',
    type: 'expense' as const,
  },
  {
    id: 'tr-3',
    date: '2023-05-20',
    description: 'Internet Bill',
    amount: 80,
    category: 'Utilities',
    type: 'expense' as const,
  },
  {
    id: 'tr-4',
    date: '2023-05-22',
    description: 'Restaurant',
    amount: 68.35,
    category: 'Dining',
    type: 'expense' as const,
  },
  {
    id: 'tr-5',
    date: '2023-05-24',
    description: 'Gas Station',
    amount: 45.20,
    category: 'Transportation',
    type: 'expense' as const,
  },
  {
    id: 'tr-6',
    date: '2023-05-26',
    description: 'Online Shopping',
    amount: 135.99,
    category: 'Shopping',
    type: 'expense' as const,
  },
  {
    id: 'tr-7',
    date: '2023-05-28',
    description: 'Gym Membership',
    amount: 50,
    category: 'Health',
    type: 'expense' as const,
  },
  {
    id: 'tr-8',
    date: '2023-05-30',
    description: 'Uber Ride',
    amount: 22.50,
    category: 'Transportation',
    type: 'expense' as const,
  },
  {
    id: 'tr-9',
    date: '2023-06-01',
    description: 'Mortgage Payment',
    amount: 1200,
    category: 'Housing',
    type: 'expense' as const,
  },
  {
    id: 'tr-10',
    date: '2023-06-05',
    description: 'Investment Dividend',
    amount: 180,
    category: 'Investment',
    type: 'income' as const,
  },
];

export const mockAccounts = [
  {
    id: 'acc-1',
    name: 'Checking Account',
    type: 'checking',
    balance: 4500,
    currency: 'USD',
    lastUpdated: '2023-06-01',
  },
  {
    id: 'acc-2',
    name: 'Savings Account',
    type: 'savings',
    balance: 12000,
    currency: 'USD',
    lastUpdated: '2023-06-01',
  },
  {
    id: 'acc-3',
    name: 'Investment Portfolio',
    type: 'investment',
    balance: 85000,
    currency: 'USD',
    lastUpdated: '2023-06-01',
  },
  {
    id: 'acc-4',
    name: 'Retirement 401(k)',
    type: 'retirement',
    balance: 125000,
    currency: 'USD',
    lastUpdated: '2023-06-01',
  },
];

export const mockGoals = [
  {
    id: 'goal-1',
    name: 'Emergency Fund',
    targetAmount: 20000,
    currentAmount: 12000,
    deadline: '2023-12-31',
    category: 'Savings',
  },
  {
    id: 'goal-2',
    name: 'Vacation',
    targetAmount: 5000,
    currentAmount: 2800,
    deadline: '2023-08-31',
    category: 'Travel',
  },
  {
    id: 'goal-3',
    name: 'Down Payment',
    targetAmount: 50000,
    currentAmount: 35000,
    deadline: '2024-06-30',
    category: 'Housing',
  },
];

export const mockBudget = [
  {
    id: 'budget-1',
    category: 'Housing',
    allocated: 1500,
    spent: 1200,
    period: '2023-06',
  },
  {
    id: 'budget-2',
    category: 'Groceries',
    allocated: 600,
    spent: 450,
    period: '2023-06',
  },
  {
    id: 'budget-3',
    category: 'Transportation',
    allocated: 400,
    spent: 250,
    period: '2023-06',
  },
  {
    id: 'budget-4',
    category: 'Entertainment',
    allocated: 300,
    spent: 180,
    period: '2023-06',
  },
  {
    id: 'budget-5',
    category: 'Dining',
    allocated: 350,
    spent: 280,
    period: '2023-06',
  },
];

export const mockCategories = [
  'Housing',
  'Transportation',
  'Food',
  'Utilities',
  'Insurance',
  'Healthcare',
  'Saving',
  'Debt',
  'Personal',
  'Recreation',
  'Miscellaneous',
];

export const mockMonthlyData = [
  { month: 'Jan', income: 4500, expenses: 3800 },
  { month: 'Feb', income: 4500, expenses: 3600 },
  { month: 'Mar', income: 4800, expenses: 4000 },
  { month: 'Apr', income: 4800, expenses: 3900 },
  { month: 'May', income: 5200, expenses: 4100 },
  { month: 'Jun', income: 5200, expenses: 4300 },
];

export const mockCategorySpending = [
  { category: 'Housing', amount: 1500 },
  { category: 'Food', amount: 800 },
  { category: 'Transportation', amount: 400 },
  { category: 'Utilities', amount: 350 },
  { category: 'Entertainment', amount: 250 },
  { category: 'Healthcare', amount: 200 },
  { category: 'Shopping', amount: 300 },
  { category: 'Other', amount: 150 },
];
