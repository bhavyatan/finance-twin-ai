
import Header from '@/components/layout/Header';
import PageTransition from '@/components/layout/PageTransition';
import ScenarioSimulator from '@/components/simulator/ScenarioSimulator';

const Simulator = () => {
  return (
    <>
      <Header />
      <PageTransition>
        <main className="container-fluid py-8 mt-2">
          <div className="mb-8">
            <h1 className="font-bold">Financial Simulator</h1>
            <p className="text-muted-foreground mt-1">
              Explore different financial scenarios and their long-term impact
            </p>
          </div>

          <ScenarioSimulator />
        </main>
      </PageTransition>
    </>
  );
};

export default Simulator;
