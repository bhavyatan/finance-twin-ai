
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Sparkles, Trophy, Heart, ChevronRight, Users } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = (currentScroll / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <PageTransition>
      <div className="relative">
        {/* Progress bar */}
        <div 
          className="fixed top-0 left-0 h-1 bg-primary z-[60] transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Hero section */}
        <section className="relative overflow-hidden pt-28 pb-20">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />
          <div 
            className="absolute inset-0 -z-10 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(var(--primary-rgb), 0.05) 0, rgba(var(--primary-rgb), 0) 70%)',
              backgroundSize: '60px 60px'
            }}
          />
          
          <div className="container-fluid text-center">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6 animate-fade-in">
              Introducing your financial digital twin
            </div>
            
            <h1 className="mx-auto max-w-4xl animate-slide-in-up [animation-delay:200ms]">
              Your Financial Future, <br />
              <span className="text-primary">Visualized and Optimized</span>
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground animate-slide-in-up [animation-delay:400ms]">
              Create your financial digital twin and experience the power of AI-driven financial planning that adapts to your life's journey.
            </p>
            
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-slide-in-up [animation-delay:600ms]">
              <Link to="/dashboard">
                <Button size="lg" className="h-12 px-6">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <Link to="/simulator">
                <Button size="lg" variant="outline" className="h-12 px-6">
                  Explore Simulator
                </Button>
              </Link>
            </div>
            
            <div className="mt-20 overflow-hidden rounded-xl border bg-card/50 shadow-sm backdrop-blur-sm animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                  <div className="text-center p-8">
                    <Sparkles className="mx-auto h-10 w-10 text-primary animate-pulse-subtle" />
                    <h3 className="mt-4 text-2xl font-semibold">Interactive Dashboard Preview</h3>
                    <p className="mt-2 text-muted-foreground">
                      Visualize your entire financial life in one place
                    </p>
                    <Link to="/dashboard">
                      <Button className="mt-6" variant="default">
                        View Dashboard <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="aspect-[16/9] w-full bg-card">
                  <img 
                    src="https://placehold.co/1200x675/e9f5ff/939393?text=Financial+Dashboard+Preview" 
                    alt="Dashboard Preview" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section className="py-20 bg-background">
          <div className="container-fluid">
            <div className="text-center mb-16">
              <h2 className="mb-4">Powerful Features for Your Financial Journey</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Our AI-powered financial digital twin adapts to your life events and helps you make smarter financial decisions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="group rounded-xl border bg-card p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Analysis</h3>
                <p className="text-muted-foreground">
                  AI-powered analysis of your spending patterns, income, and investments to provide personalized insights.
                </p>
                <div className="mt-4 flex items-center text-primary">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              
              <div className="group rounded-xl border bg-card p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Scenario Simulation</h3>
                <p className="text-muted-foreground">
                  Test different financial scenarios and see their impact on your future wealth, retirement age, and financial security.
                </p>
                <div className="mt-4 flex items-center text-primary">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              
              <div className="group rounded-xl border bg-card p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Goal Tracking</h3>
                <p className="text-muted-foreground">
                  Set financial goals and track your progress with personalized recommendations to stay on target.
                </p>
                <div className="mt-4 flex items-center text-primary">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              
              <div className="group rounded-xl border bg-card p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Life Event Planning</h3>
                <p className="text-muted-foreground">
                  Plan for major life events like marriage, children, home purchase, or career changes with financial impact analysis.
                </p>
                <div className="mt-4 flex items-center text-primary">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              
              <div className="group rounded-xl border bg-card p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized Recommendations</h3>
                <p className="text-muted-foreground">
                  Receive tailored financial advice based on your unique situation, goals, and risk tolerance.
                </p>
                <div className="mt-4 flex items-center text-primary">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              
              <div className="group rounded-xl border bg-card p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Continuous Adaptation</h3>
                <p className="text-muted-foreground">
                  Your financial twin evolves as your life changes, constantly updating projections and recommendations.
                </p>
                <div className="mt-4 flex items-center text-primary">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-20 bg-primary/5">
          <div className="container-fluid">
            <div className="rounded-2xl bg-card p-8 sm:p-12 shadow-sm border">
              <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
                <div>
                  <h2 className="mb-4">Ready to Transform Your Financial Future?</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Create your financial digital twin today and unlock the power of AI-driven financial planning.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/dashboard">
                      <Button size="lg">
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to="/simulator">
                      <Button size="lg" variant="outline">
                        Try the Simulator
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl border">
                    <img 
                      src="https://placehold.co/800x600/e9f5ff/939393?text=Financial+Simulation+Preview" 
                      alt="Financial Simulator Preview" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute -right-4 -bottom-4 rounded-xl bg-card p-4 shadow-lg border animate-float">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-green-100 p-2">
                        <Trophy className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Retirement Age</div>
                        <div className="text-xl font-bold">57</div>
                        <div className="text-xs text-green-600">8 years earlier!</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="border-t py-12">
          <div className="container-fluid">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex items-center gap-2 text-primary font-semibold tracking-tight text-xl">
                <div className="relative h-8 w-8">
                  <div className="absolute inset-0 bg-primary/10 rounded-full"></div>
                  <div className="absolute inset-[3px] bg-primary/20 rounded-full"></div>
                  <div className="absolute inset-[6px] bg-primary rounded-full"></div>
                </div>
                <span>FinTwin</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-8">
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
                  Dashboard
                </Link>
                <Link to="/simulator" className="text-sm text-muted-foreground hover:text-foreground">
                  Simulator
                </Link>
                <Link to="/goals" className="text-sm text-muted-foreground hover:text-foreground">
                  Goals
                </Link>
                <Link to="/profile" className="text-sm text-muted-foreground hover:text-foreground">
                  Profile
                </Link>
              </div>
              
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} FinTwin. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Index;
