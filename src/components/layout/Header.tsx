
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  LineChart, 
  Target, 
  User, 
  Menu, 
  X, 
  ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import UserMenu from '@/components/auth/UserMenu';

const navItems = [
  { 
    name: 'Dashboard', 
    path: '/dashboard', 
    icon: <LayoutDashboard className="h-5 w-5" /> 
  },
  { 
    name: 'Simulator', 
    path: '/simulator', 
    icon: <LineChart className="h-5 w-5" /> 
  },
  { 
    name: 'Goals', 
    path: '/goals', 
    icon: <Target className="h-5 w-5" /> 
  },
  { 
    name: 'Profile', 
    path: '/profile', 
    icon: <User className="h-5 w-5" /> 
  },
];

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/80 dark:bg-card/80 backdrop-blur-glass shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container-fluid h-16 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-primary font-semibold tracking-tight text-xl"
        >
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse-subtle"></div>
            <div className="absolute inset-[3px] bg-primary/20 rounded-full"></div>
            <div className="absolute inset-[6px] bg-primary rounded-full"></div>
          </div>
          <span>FinTwin</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {isAuthenticated ? (
            <>
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              <UserMenu />
            </>
          ) : (
            <>
              <Link 
                to="/sign-in" 
                className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors text-foreground/70 hover:text-primary hover:bg-primary/5"
              >
                Sign In
              </Link>
              <Link 
                to="/sign-up" 
                className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors bg-primary text-white hover:bg-primary/90"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-background border-t">
          {isAuthenticated ? (
            <>
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={cn(
                    "flex items-center justify-between px-6 py-4 border-b",
                    location.pathname === item.path
                      ? "bg-primary/5 text-primary font-medium"
                      : "text-foreground/80"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    {item.name}
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-70" />
                </Link>
              ))}
              <div className="px-6 py-4 border-b">
                <Button
                  variant="destructive" 
                  className="w-full"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.location.href = '/sign-out';
                  }}
                >
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/sign-in"
                className="flex items-center justify-between px-6 py-4 border-b text-foreground/80"
              >
                <span>Sign In</span>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </Link>
              <Link 
                to="/sign-up"
                className="flex items-center justify-between px-6 py-4 border-b text-foreground/80"
              >
                <span>Sign Up</span>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
