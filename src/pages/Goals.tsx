
import Header from '@/components/layout/Header';
import PageTransition from '@/components/layout/PageTransition';
import GoalTracker from '@/components/goals/GoalTracker';

const Goals = () => {
  return (
    <>
      <Header />
      <PageTransition>
        <main className="container-fluid py-8 mt-2">
          <div className="mb-8">
            <h1 className="font-bold">Financial Goals</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your financial goals and progress
            </p>
          </div>

          <GoalTracker />
        </main>
      </PageTransition>
    </>
  );
};

export default Goals;
