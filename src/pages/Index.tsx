
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import PageTransition from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Header />
      <PageTransition>
        <div className="min-h-screen pt-16">
          {/* Hero Section */}
          <section className="container-fluid py-16 md:py-24">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold md:text-5xl">
                  Your Financial Digital Twin
                </h1>
                <p className="text-xl text-muted-foreground">
                  Simulate your financial future with AI-powered predictions tailored to your personal situation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {isAuthenticated ? (
                    <Button asChild size="lg" className="w-full sm:w-auto">
                      <Link to="/dashboard">Go to Dashboard</Link>
                    </Button>
                  ) : (
                    <>
                      <Button asChild size="lg" className="w-full sm:w-auto">
                        <Link to="/sign-up">Get Started</Link>
                      </Button>
                      <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                        <Link to="/sign-in">Sign In</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl blur-xl opacity-70"></div>
                <div className="relative aspect-video rounded-xl overflow-hidden border shadow-xl">
                  {/* Placeholder for app screenshot */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/5"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-primary"></div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold">Financial Forecasting</h3>
                    <p className="mt-2 text-muted-foreground">Visualize your financial future with personalized predictions</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-muted/50 py-16">
            <div className="container-fluid">
              <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
              <div className="grid gap-8 md:grid-cols-3">
                {[
                  {
                    title: "Personalized Financial Twin",
                    description: "Create a digital twin that simulates your unique financial situation and behavior."
                  },
                  {
                    title: "Smart Scenario Planning",
                    description: "Test different financial decisions and see their long-term impact on your wealth."
                  },
                  {
                    title: "Goal-based Planning",
                    description: "Set financial goals and get a clear roadmap to achieve them on your timeline."
                  }
                ].map((feature, index) => (
                  <div key={index} className="bg-background rounded-xl p-6 shadow-sm border">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <div className="w-6 h-6 rounded-full bg-primary"></div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="container-fluid py-16 md:py-24 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold">Ready to See Your Financial Future?</h2>
              <p className="text-xl text-muted-foreground">
                Start planning today with your personalized financial digital twin.
              </p>
              {isAuthenticated ? (
                <Button asChild size="lg">
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <Button asChild size="lg">
                  <Link to="/sign-up">Create Your Digital Twin Now</Link>
                </Button>
              )}
            </div>
          </section>
        </div>
      </PageTransition>
    </>
  );
};

export default Index;
