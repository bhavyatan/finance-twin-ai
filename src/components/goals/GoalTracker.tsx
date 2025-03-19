
import { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { PlusCircle, Target, CalendarDays, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

const GoalTracker = () => {
  const { goals, createGoal, updateGoal } = useFinance();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [contributionDialogOpen, setContributionDialogOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState('');
  const [contributionAmount, setContributionAmount] = useState('');
  
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    deadline: '',
    category: 'Savings',
  });
  
  const handleCreateGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.deadline) {
      return;
    }
    
    createGoal({
      name: newGoal.name,
      targetAmount: Number(newGoal.targetAmount),
      currentAmount: 0,
      deadline: newGoal.deadline,
      category: newGoal.category,
    });
    
    // Reset form and close dialog
    setNewGoal({
      name: '',
      targetAmount: '',
      deadline: '',
      category: 'Savings',
    });
    setIsDialogOpen(false);
  };
  
  const handleContribution = () => {
    if (!contributionAmount || !selectedGoalId) {
      return;
    }
    
    updateGoal(selectedGoalId, Number(contributionAmount));
    setContributionAmount('');
    setContributionDialogOpen(false);
  };
  
  const openContributionDialog = (goalId: string) => {
    setSelectedGoalId(goalId);
    setContributionDialogOpen(true);
  };
  
  // Calculate days remaining for a goal
  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const daysRemaining = getDaysRemaining(goal.deadline);
          
          return (
            <Card key={goal.id} className="card-hover">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base font-medium">{goal.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 text-xs">
                      <Target className="h-3 w-3" />
                      {goal.category}
                    </CardDescription>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Target className="h-4 w-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{progress.toFixed(0)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Current</div>
                      <div className="font-medium">${goal.currentAmount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Target</div>
                      <div className="font-medium">${goal.targetAmount.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <CalendarDays className="h-3 w-3" />
                      <span>{formatDate(goal.deadline)}</span>
                    </div>
                    <div className={cn(
                      "font-medium",
                      daysRemaining < 30 ? "text-red-500" : daysRemaining < 90 ? "text-amber-500" : "text-green-500"
                    )}>
                      {daysRemaining} days left
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => openContributionDialog(goal.id)}
                  >
                    Add Contribution
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
        
        <Card 
          className="flex flex-col items-center justify-center min-h-[280px] border-dashed cursor-pointer hover:bg-primary/5 transition-colors"
          onClick={() => setIsDialogOpen(true)}
        >
          <div className="flex flex-col items-center text-center p-6">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <PlusCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium">Add New Goal</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Create a new financial goal to track your progress
            </p>
          </div>
        </Card>
      </div>
      
      {/* New Goal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Financial Goal</DialogTitle>
            <DialogDescription>
              Set a new goal to help you stay focused on your financial journey.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Goal Name
              </label>
              <Input
                id="name"
                placeholder="e.g., New Car, Vacation, Emergency Fund"
                value={newGoal.name}
                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="targetAmount" className="text-sm font-medium">
                Target Amount
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                  $
                </span>
                <Input
                  id="targetAmount"
                  type="number"
                  className="pl-7"
                  placeholder="10000"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="deadline" className="text-sm font-medium">
                Target Date
              </label>
              <Input
                id="deadline"
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <select
                id="category"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                value={newGoal.category}
                onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
              >
                <option>Savings</option>
                <option>Investment</option>
                <option>Retirement</option>
                <option>Education</option>
                <option>Travel</option>
                <option>Home</option>
                <option>Vehicle</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateGoal}>Create Goal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Contribution Dialog */}
      <Dialog open={contributionDialogOpen} onOpenChange={setContributionDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Contribution</DialogTitle>
            <DialogDescription>
              Add a contribution to your goal to track your progress.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Contribution Amount
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  className="pl-7"
                  placeholder="500"
                  value={contributionAmount}
                  onChange={(e) => setContributionAmount(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setContributionDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleContribution}>Add Contribution</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GoalTracker;
