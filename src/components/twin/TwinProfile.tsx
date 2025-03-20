import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserCircle, Briefcase, Wallet, Users, Heart, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

type ProfileSectionProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

const ProfileSection = ({ title, description, icon, children }: ProfileSectionProps) => (
  <Card className="card-hover">
    <CardHeader>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="text-xs">{description}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

interface ProfileData {
  personal: {
    name: string;
    age: number;
    occupation: string;
    annualIncome: number;
  };
  financial: {
    riskTolerance: number;
    savingsRate: number;
    retirementAge: number;
    investmentStyle: string;
  };
  lifeEvents: Array<{
    id: number;
    event: string;
    year: string;
    completed: boolean;
  }>;
  household: {
    maritalStatus: string;
    householdSize: string;
    dependents: string;
    educationPlanning: string;
  };
}

const TwinProfile = () => {
  const { user } = useAuth();
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Alex Johnson',
    age: 32,
    occupation: 'Software Engineer',
    annualIncome: 95000,
  });

  const [financialProfile, setFinancialProfile] = useState({
    riskTolerance: 65,
    savingsRate: 20,
    retirementAge: 60,
    investmentStyle: 'balanced',
  });

  const [lifeEvents, setLifeEvents] = useState([
    { id: 1, event: 'Buy a House', year: '2024', completed: false },
    { id: 2, event: 'Change Career', year: '2025', completed: false },
    { id: 3, event: 'Start a Family', year: '2026', completed: false },
  ]);

  const [householdInfo, setHouseholdInfo] = useState({
    maritalStatus: 'single',
    householdSize: '1',
    dependents: '0',
    educationPlanning: 'none',
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ event: '', year: '' });

  useEffect(() => {
    if (!user) return;

    const storageKey = `profile_${user.id}`;
    const savedProfile = localStorage.getItem(storageKey);

    if (savedProfile) {
      try {
        const profileData: ProfileData = JSON.parse(savedProfile);
        setPersonalInfo(profileData.personal);
        setFinancialProfile(profileData.financial);
        setLifeEvents(profileData.lifeEvents);
        setHouseholdInfo(profileData.household);
      } catch (error) {
        console.error('Error parsing saved profile:', error);
      }
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    try {
      setIsUpdating(true);

      await new Promise(resolve => setTimeout(resolve, 800));

      const profileData: ProfileData = {
        personal: personalInfo,
        financial: financialProfile,
        lifeEvents: lifeEvents,
        household: householdInfo,
      };

      if (user) {
        const storageKey = `profile_${user.id}`;
        localStorage.setItem(storageKey, JSON.stringify(profileData));
      }

      console.log('Profile data updated:', profileData);

      toast.success('Profile successfully updated', {
        description: 'Your digital twin profile has been saved.',
      });

    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile', {
        description: 'Please try again later.',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddLifeEvent = () => {
    if (!newEvent.event.trim() || !newEvent.year.trim()) {
      toast.error('Please fill out all fields');
      return;
    }

    const currentYear = new Date().getFullYear();
    const eventYear = parseInt(newEvent.year);
    
    if (isNaN(eventYear) || eventYear < currentYear || eventYear > currentYear + 50) {
      toast.error('Please enter a valid year');
      return;
    }

    const newId = Math.max(0, ...lifeEvents.map(event => event.id)) + 1;
    
    setLifeEvents([
      ...lifeEvents,
      { 
        id: newId, 
        event: newEvent.event, 
        year: newEvent.year, 
        completed: false 
      }
    ]);
    
    setNewEvent({ event: '', year: '' });
    setIsAddEventOpen(false);
    
    toast.success('New life event added');
  };

  const handleEventStatusChange = (id: number, status: string) => {
    setLifeEvents(lifeEvents.map(event => {
      if (event.id === id) {
        return { 
          ...event, 
          completed: status === 'completed' 
        };
      }
      return event;
    }));
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <ProfileSection
        title="Personal Information"
        description="Basic details about you"
        icon={<UserCircle className="h-4 w-4 text-primary" />}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                value={personalInfo.name}
                onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Age</label>
              <Input
                type="number"
                value={personalInfo.age}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, age: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Occupation</label>
            <Input
              value={personalInfo.occupation}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, occupation: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Annual Income</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                $
              </span>
              <Input
                type="number"
                className="pl-7"
                value={personalInfo.annualIncome}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    annualIncome: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>
        </div>
      </ProfileSection>

      <ProfileSection
        title="Career & Income"
        description="Your work and earnings"
        icon={<Briefcase className="h-4 w-4 text-primary" />}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Industry</label>
            <Select defaultValue="technology">
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Experience Level</label>
            <Select defaultValue="senior">
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="mid">Mid Level</SelectItem>
                <SelectItem value="senior">Senior Level</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Income Growth Expectation</label>
            <Select defaultValue="moderate">
              <SelectTrigger>
                <SelectValue placeholder="Select growth" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (1-2% yearly)</SelectItem>
                <SelectItem value="moderate">Moderate (3-5% yearly)</SelectItem>
                <SelectItem value="high">High (6-10% yearly)</SelectItem>
                <SelectItem value="very-high">Very High (10%+ yearly)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Job Stability</label>
            <Select defaultValue="stable">
              <SelectTrigger>
                <SelectValue placeholder="Select stability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unstable">Unstable</SelectItem>
                <SelectItem value="somewhat">Somewhat Stable</SelectItem>
                <SelectItem value="stable">Stable</SelectItem>
                <SelectItem value="very-stable">Very Stable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </ProfileSection>

      <ProfileSection
        title="Financial Profile"
        description="Your money management style"
        icon={<Wallet className="h-4 w-4 text-primary" />}
      >
        <div className="space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Risk Tolerance</label>
              <span className="text-sm text-muted-foreground">{financialProfile.riskTolerance}%</span>
            </div>
            <Slider
              value={[financialProfile.riskTolerance]}
              min={0}
              max={100}
              step={5}
              onValueChange={(value) =>
                setFinancialProfile({ ...financialProfile, riskTolerance: value[0] })
              }
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Conservative</span>
              <span>Aggressive</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Savings Rate</label>
              <span className="text-sm text-muted-foreground">{financialProfile.savingsRate}%</span>
            </div>
            <Slider
              value={[financialProfile.savingsRate]}
              min={0}
              max={50}
              step={1}
              onValueChange={(value) =>
                setFinancialProfile({ ...financialProfile, savingsRate: value[0] })
              }
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Target Retirement Age</label>
              <span className="text-sm text-muted-foreground">{financialProfile.retirementAge}</span>
            </div>
            <Slider
              value={[financialProfile.retirementAge]}
              min={45}
              max={75}
              step={1}
              onValueChange={(value) =>
                setFinancialProfile({ ...financialProfile, retirementAge: value[0] })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Investment Style</label>
            <Select
              value={financialProfile.investmentStyle}
              onValueChange={(value) =>
                setFinancialProfile({ ...financialProfile, investmentStyle: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conservative">Conservative</SelectItem>
                <SelectItem value="balanced">Balanced</SelectItem>
                <SelectItem value="growth">Growth</SelectItem>
                <SelectItem value="aggressive">Aggressive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </ProfileSection>

      <ProfileSection
        title="Life Events"
        description="Major life changes that affect your finances"
        icon={<Heart className="h-4 w-4 text-primary" />}
      >
        <div className="space-y-4">
          {lifeEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-md border p-3"
            >
              <div>
                <div className="font-medium">{event.event}</div>
                <div className="text-sm text-muted-foreground">Expected: {event.year}</div>
              </div>
              <div>
                {event.completed ? (
                  <Button size="sm" variant="outline" disabled>
                    Completed
                  </Button>
                ) : (
                  <Select 
                    defaultValue="planning"
                    onValueChange={(value) => handleEventStatusChange(event.id, value)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="postponed">Postponed</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          ))}

          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => setIsAddEventOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Life Event
          </Button>
        </div>
      </ProfileSection>

      <div className="md:col-span-2">
        <ProfileSection
          title="Household & Dependents"
          description="Family members that affect your financial planning"
          icon={<Users className="h-4 w-4 text-primary" />}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Marital Status</label>
              <Select 
                value={householdInfo.maritalStatus}
                onValueChange={(value) => setHouseholdInfo({ ...householdInfo, maritalStatus: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                  <SelectItem value="domestic-partnership">Domestic Partnership</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Household Size</label>
              <Select 
                value={householdInfo.householdSize}
                onValueChange={(value) => setHouseholdInfo({ ...householdInfo, householdSize: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Person</SelectItem>
                  <SelectItem value="2">2 People</SelectItem>
                  <SelectItem value="3">3 People</SelectItem>
                  <SelectItem value="4">4 People</SelectItem>
                  <SelectItem value="5">5+ People</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Dependents</label>
              <Select 
                value={householdInfo.dependents}
                onValueChange={(value) => setHouseholdInfo({ ...householdInfo, dependents: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No Dependents</SelectItem>
                  <SelectItem value="1">1 Dependent</SelectItem>
                  <SelectItem value="2">2 Dependents</SelectItem>
                  <SelectItem value="3">3 Dependents</SelectItem>
                  <SelectItem value="4">4+ Dependents</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Education Planning</label>
              <Select 
                value={householdInfo.educationPlanning}
                onValueChange={(value) => setHouseholdInfo({ ...householdInfo, educationPlanning: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select planning" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Not Planning</SelectItem>
                  <SelectItem value="saving">Saving for Education</SelectItem>
                  <SelectItem value="current">Currently in Education</SelectItem>
                  <SelectItem value="completed">Education Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 border-t pt-4">
            <Button 
              className="w-full" 
              onClick={handleUpdateProfile}
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Update Profile'}
            </Button>
          </div>
        </ProfileSection>
      </div>

      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Life Event</DialogTitle>
            <DialogDescription>
              Add a significant life event that may impact your financial planning.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Event</label>
              <Textarea 
                placeholder="e.g., Buy a house, Start a business, etc."
                value={newEvent.event}
                onChange={(e) => setNewEvent({ ...newEvent, event: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Expected Year</label>
              <Input 
                type="text"
                placeholder={`${new Date().getFullYear()} or later`}
                value={newEvent.year}
                onChange={(e) => setNewEvent({ ...newEvent, year: e.target.value })}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>Cancel</Button>
            <Button onClick={handleAddLifeEvent}>Add Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TwinProfile;
