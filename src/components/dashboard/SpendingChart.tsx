
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { mockCategorySpending } from '@/data/mockData';
import { cn } from '@/lib/utils';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A259FF', '#4BC0C0', '#F87171', '#818CF8'];

const SpendingChart = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const total = mockCategorySpending.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card className="h-[400px] card-hover">
      <CardHeader>
        <CardTitle className="text-lg">Spending by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={mockCategorySpending}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              innerRadius={60}
              paddingAngle={2}
              dataKey="amount"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {mockCategorySpending.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  stroke="none"
                  className={cn(
                    "transition-all duration-300",
                    activeIndex === index && "filter drop-shadow-lg"
                  )}
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`$${value}`, 'Amount']}
              contentStyle={{ 
                background: 'rgba(255, 255, 255, 0.8)', 
                borderRadius: '8px', 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
                border: 'none',
                backdropFilter: 'blur(8px)',
              }}
            />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              iconSize={8}
              formatter={(value: string) => (
                <span className="text-xs text-muted-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SpendingChart;
