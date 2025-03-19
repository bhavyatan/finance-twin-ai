
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/layout/PageTransition';

const Index = () => {
  const { user } = useAuth();

  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col">
        <header className="px-4 lg:px-6 h-14 flex items-center">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="text-primary">FinTwin</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            {user ? (
              <Button asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </nav>
        </header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/10 to-background">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                      Your Financial Digital Twin
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      Visualize your financial future with our intelligent prediction engine.
                      Make smarter decisions with AI-powered insights tailored to your financial profile.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    {user ? (
                      <Button size="lg" asChild>
                        <Link to="/dashboard">Go to Dashboard</Link>
                      </Button>
                    ) : (
                      <>
                        <Button size="lg" asChild>
                          <Link to="/auth">Get Started</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                          <Link to="/auth">Sign In</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <div className="mx-auto aspect-video overflow-hidden rounded-xl border bg-primary/10 object-cover sm:w-full lg:order-last">
                  <img
                    alt="Financial Dashboard Preview"
                    src="https://placehold.co/600x400/primary/white?text=Financial+Digital+Twin"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
                  Predict Your Financial Future
                </h2>
                <p className="max-w-[85%] text-muted-foreground md:text-xl">
                  Our AI-powered financial digital twin creates a virtual representation of your financial life,
                  allowing you to simulate decisions and see their long-term impact.
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
                <div className="grid gap-2">
                  <h3 className="text-xl font-bold">Personalized Insights</h3>
                  <p className="text-muted-foreground">
                    Receive tailored financial recommendations based on your spending patterns and goals.
                  </p>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-xl font-bold">Future Scenarios</h3>
                  <p className="text-muted-foreground">
                    Simulate different financial decisions and see how they impact your future wealth.
                  </p>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-xl font-bold">Goal Tracking</h3>
                  <p className="text-muted-foreground">
                    Set financial goals and track your progress with intelligent projections.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
          <p className="text-xs text-muted-foreground">© 2023 FinTwin. All rights reserved.</p>
          <nav className="flex gap-4 sm:ml-auto sm:gap-6">
            <Link to="#" className="text-xs underline-offset-4 hover:underline">
              Terms of Service
            </Link>
            <Link to="#" className="text-xs underline-offset-4 hover:underline">
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Index;
