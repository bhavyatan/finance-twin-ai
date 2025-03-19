
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockMonthlyData } from '@/data/mockData';

const FinancialOverview = () => {
  const { monthlyIncome, monthlyExpenses } = useFinance();

  return (
    <Card className="col-span-full card-hover">
      <CardHeader>
        <CardTitle className="text-lg">Income & Expenses Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={mockMonthlyData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value}`, '']}
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.8)', 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
                  border: 'none',
                  backdropFilter: 'blur(8px)',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#FF8042" 
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-accent p-4">
            <div className="text-sm font-medium text-muted-foreground">This Month's Income</div>
            <div className="mt-1 text-2xl font-bold">${monthlyIncome.toLocaleString()}</div>
          </div>
          
          <div className="rounded-lg bg-accent p-4">
            <div className="text-sm font-medium text-muted-foreground">This Month's Expenses</div>
            <div className="mt-1 text-2xl font-bold">${monthlyExpenses.toLocaleString()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialOverview;
