
import { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ArrowRight, PlayCircle, CheckCircle, TrendingUp, Landmark, CalendarClock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from "sonner";

type SimulationAdjustments = {
  income: number;
  expenses: number;
  savings: number;
  investmentReturn: number;
};

const ScenarioSimulator = () => {
  const { scenarios, runScenario } = useFinance();
  const [activeScenario, setActiveScenario] = useState(scenarios[0]);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [adjustments, setAdjustments] = useState<SimulationAdjustments>({
    income: 0,
    expenses: 0,
    savings: 0,
    investmentReturn: 5,
  });

  const handleAdjustmentChange = (key: keyof SimulationAdjustments, value: number) => {
    setAdjustments((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRunSimulation = () => {
    try {
      const result = runScenario({
        income: adjustments.income,
        expenses: adjustments.expenses,
        savings: adjustments.savings,
        investments: { return: adjustments.investmentReturn },
      });
      
      setActiveScenario(result);
      toast.success("Custom scenario created successfully!");
      setIsCustomizing(false);
    } catch (error) {
      console.error("Failed to run simulation:", error);
      toast.error("Failed to create custom scenario. Please try again.");
    }
  };

  const handleResetForm = () => {
    setAdjustments({
      income: 0,
      expenses: 0,
      savings: 0,
      investmentReturn: 5,
    });
    setIsCustomizing(false);
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card className="md:col-span-2 card-hover">
        <CardHeader>
          <CardTitle className="text-lg">Financial Scenario Simulator</CardTitle>
          <CardDescription>
            Simulate how different financial decisions will impact your future
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isCustomizing ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {scenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className={cn(
                    "relative cursor-pointer rounded-xl border p-4 transition-all duration-300",
                    activeScenario.id === scenario.id
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "hover:border-primary/30 hover:bg-primary/5"
                  )}
                  onClick={() => setActiveScenario(scenario)}
                >
                  {activeScenario.id === scenario.id && (
                    <div className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  )}
                  <h3 className="font-medium">{scenario.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {scenario.description}
                  </p>
                </div>
              ))}
            
              <Button
                variant="outline"
                className="h-full min-h-[120px] border-dashed hover:border-primary hover:bg-primary/5"
                onClick={() => setIsCustomizing(true)}
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <PlayCircle className="h-6 w-6 text-primary" />
                  <span>Create Custom Scenario</span>
                </div>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="font-medium">Customize Your Scenario</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Income Change</label>
                    <span className="text-sm text-muted-foreground">
                      {adjustments.income > 0 ? '+' : ''}{adjustments.income}%
                    </span>
                  </div>
                  <Slider
                    value={[adjustments.income]}
                    min={-20}
                    max={30}
                    step={1}
                    onValueChange={(value) => handleAdjustmentChange('income', value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Expense Change</label>
                    <span className="text-sm text-muted-foreground">
                      {adjustments.expenses > 0 ? '+' : ''}{adjustments.expenses}%
                    </span>
                  </div>
                  <Slider
                    value={[adjustments.expenses]}
                    min={-30}
                    max={20}
                    step={1}
                    onValueChange={(value) => handleAdjustmentChange('expenses', value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Savings Rate Change</label>
                    <span className="text-sm text-muted-foreground">
                      {adjustments.savings > 0 ? '+' : ''}{adjustments.savings}%
                    </span>
                  </div>
                  <Slider
                    value={[adjustments.savings]}
                    min={0}
                    max={40}
                    step={1}
                    onValueChange={(value) => handleAdjustmentChange('savings', value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Investment Return</label>
                    <span className="text-sm text-muted-foreground">
                      {adjustments.investmentReturn}%
                    </span>
                  </div>
                  <Slider
                    value={[adjustments.investmentReturn]}
                    min={1}
                    max={12}
                    step={0.5}
                    onValueChange={(value) => handleAdjustmentChange('investmentReturn', value[0])}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" onClick={handleResetForm}>
                  Cancel
                </Button>
                <Button onClick={handleRunSimulation}>
                  Run Simulation
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Projected Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Landmark className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Projected Net Worth</div>
                <div className="text-2xl font-bold">${activeScenario.impact.netWorth.toLocaleString()}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">5-Year Savings Projection</div>
                <div className="text-2xl font-bold">${activeScenario.impact.savingsAfter5Years.toLocaleString()}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <CalendarClock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Estimated Retirement Age</div>
                <div className="text-2xl font-bold">{activeScenario.impact.retirementAge}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeScenario.id === scenarios[0].id ? (
              <>
                <div className="rounded-lg border bg-primary/5 p-3">
                  <p className="text-sm">
                    Based on your current trajectory, you're on track for retirement at age 65. Consider increasing your savings rate to retire earlier.
                  </p>
                </div>
                <div className="rounded-lg border bg-primary/5 p-3">
                  <p className="text-sm">
                    Your emergency fund is 60% funded. Prioritize completing this before increasing other investments.
                  </p>
                </div>
              </>
            ) : activeScenario.id === scenarios[1].id ? (
              <>
                <div className="rounded-lg border bg-primary/5 p-3">
                  <p className="text-sm">
                    Increasing your savings by 15% could accelerate your retirement by 3 years. Consider automating these additional savings.
                  </p>
                </div>
                <div className="rounded-lg border bg-primary/5 p-3">
                  <p className="text-sm">
                    With this plan, your emergency fund will be fully funded in 8 months, providing greater financial security.
                  </p>
                </div>
              </>
            ) : activeScenario.id === scenarios[2].id ? (
              <>
                <div className="rounded-lg border bg-primary/5 p-3">
                  <p className="text-sm">
                    This aggressive strategy could help you retire up to 10 years earlier, but carries higher investment risk.
                  </p>
                </div>
                <div className="rounded-lg border bg-primary/5 p-3">
                  <p className="text-sm">
                    Consider meeting with a financial advisor to establish an investment strategy aligned with these goals.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-lg border bg-primary/5 p-3">
                  <p className="text-sm">
                    Your custom scenario shows promising results. Consider implementing these changes gradually for sustainability.
                  </p>
                </div>
                <div className="rounded-lg border bg-primary/5 p-3">
                  <p className="text-sm">
                    Review your investment allocations to ensure they align with your target return rate of {activeScenario.adjustments.investments?.return || 0}%.
                  </p>
                </div>
              </>
            )}
            
            <div className="flex items-center justify-end">
              <Button variant="link" className="text-primary flex items-center gap-1 p-0 text-sm">
                <span>View detailed analysis</span>
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScenarioSimulator;
