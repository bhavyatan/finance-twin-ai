
import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

type BalanceCardProps = {
  title: string;
  amount: number;
  previousAmount?: number;
  type?: 'primary' | 'secondary' | 'neutral';
};

const BalanceCard = ({ 
  title, 
  amount, 
  previousAmount,
  type = 'neutral' 
}: BalanceCardProps) => {
  const amountRef = useRef<HTMLSpanElement>(null);
  
  // Calculate percentage change
  const percentChange = previousAmount 
    ? ((amount - previousAmount) / previousAmount) * 100 
    : 0;
  
  // Format amounts
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Animate amount on change
  useEffect(() => {
    if (amountRef.current) {
      amountRef.current.classList.add('animate-pulse-subtle');
      const timer = setTimeout(() => {
        if (amountRef.current) {
          amountRef.current.classList.remove('animate-pulse-subtle');
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [amount]);

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 card-hover",
      type === 'primary' && "border-primary/20 bg-primary/5",
      type === 'secondary' && "border-accent-foreground/20 bg-accent/50"
    )}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-muted-foreground flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <span ref={amountRef} className="text-3xl font-bold tracking-tight">
            {formatCurrency(amount)}
          </span>
          
          {previousAmount && (
            <div className="mt-2 flex items-center text-sm">
              {percentChange > 0 ? (
                <div className="flex items-center text-green-500">
                  <ArrowUp className="mr-1 h-4 w-4" />
                  <span>{percentChange.toFixed(1)}%</span>
                </div>
              ) : percentChange < 0 ? (
                <div className="flex items-center text-red-500">
                  <ArrowDown className="mr-1 h-4 w-4" />
                  <span>{Math.abs(percentChange).toFixed(1)}%</span>
                </div>
              ) : (
                <span className="text-muted-foreground">No change</span>
              )}
              <span className="ml-2 text-muted-foreground">from last month</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
