
import { useFinance } from '@/context/FinanceContext';
import Header from '@/components/layout/Header';
import PageTransition from '@/components/layout/PageTransition';
import BalanceCard from '@/components/dashboard/BalanceCard';
import FinancialOverview from '@/components/dashboard/FinancialOverview';
import SpendingChart from '@/components/dashboard/SpendingChart';
import RecentTransactions from '@/components/dashboard/RecentTransactions';

const Dashboard = () => {
  const { totalBalance, monthlyIncome, monthlyExpenses } = useFinance();
  
  // For demo purposes, previous amounts
  const previousTotalBalance = totalBalance * 0.94;
  const previousMonthlyIncome = monthlyIncome * 0.96;
  const previousMonthlyExpenses = monthlyExpenses * 0.92;

  return (
    <>
      <Header />
      <PageTransition>
        <main className="container-fluid py-8 mt-2">
          <div className="mb-8">
            <h1 className="font-bold">Financial Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Overview of your financial health and activity
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <BalanceCard 
              title="Total Balance" 
              amount={totalBalance} 
              previousAmount={previousTotalBalance}
              type="primary"
            />
            <BalanceCard 
              title="Monthly Income" 
              amount={monthlyIncome} 
              previousAmount={previousMonthlyIncome}
              type="secondary"
            />
            <BalanceCard 
              title="Monthly Expenses" 
              amount={monthlyExpenses} 
              previousAmount={previousMonthlyExpenses}
            />
          </div>

          <div className="mt-8">
            <FinancialOverview />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <SpendingChart />
            <RecentTransactions />
          </div>
        </main>
      </PageTransition>
    </>
  );
};

export default Dashboard;
