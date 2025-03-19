
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, MinusCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const RecentTransactions = () => {
  const { transactions } = useFinance();
  
  // Get 5 most recent transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="flex items-center gap-4 p-2 rounded-md transition-colors hover:bg-muted/40"
            >
              <div className="flex-shrink-0">
                {transaction.type === 'income' ? (
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <PlusCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                ) : (
                  <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                    <MinusCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(transaction.date)} • {transaction.category}
                </p>
              </div>
              
              <div className={cn(
                "text-right",
                transaction.type === 'income' ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              )}>
                <p className="text-sm font-semibold">
                  {transaction.type === 'income' ? '+' : '-'}
                  ${transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
