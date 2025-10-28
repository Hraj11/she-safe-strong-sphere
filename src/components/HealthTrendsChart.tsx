import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const HealthTrendsChart: React.FC = () => {
  const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
  
  // Calculate weekly average
  const weeklyMoods = moodHistory.slice(-7);
  const weeklyAverage = weeklyMoods.length > 0 
    ? weeklyMoods.reduce((acc: number, curr: any) => {
        const scoreMap: { [key: string]: number } = {
          'Great': 100, 'Good': 80, 'Okay': 60, 'Poor': 40, 'Terrible': 20
        };
        return acc + (scoreMap[curr.emotion] || 60);
      }, 0) / weeklyMoods.length
    : 0;

  // Calculate trend
  const previousWeek = moodHistory.slice(-14, -7);
  const previousAverage = previousWeek.length > 0 
    ? previousWeek.reduce((acc: number, curr: any) => {
        const scoreMap: { [key: string]: number } = {
          'Great': 100, 'Good': 80, 'Okay': 60, 'Poor': 40, 'Terrible': 20
        };
        return acc + (scoreMap[curr.emotion] || 60);
      }, 0) / previousWeek.length
    : weeklyAverage;

  const trend = weeklyAverage - previousAverage;
  const TrendIcon = trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus;
  const trendColor = trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Trends</CardTitle>
        <CardDescription>Your mood patterns over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>This Week's Average</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{Math.round(weeklyAverage)}%</span>
              <TrendIcon className={`w-5 h-5 ${trendColor}`} />
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {moodHistory.slice(-7).map((mood: any, index: number) => (
              <div key={index} className="text-center">
                <div className={`h-8 rounded-t-sm ${
                  mood.emotion === 'Great' ? 'bg-green-400' :
                  mood.emotion === 'Good' ? 'bg-blue-400' :
                  mood.emotion === 'Okay' ? 'bg-yellow-400' :
                  mood.emotion === 'Poor' ? 'bg-orange-400' : 'bg-red-400'
                }`}></div>
                <div className="text-xs mt-1">
                  {new Date(mood.date).getDate()}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-sm text-muted-foreground">
            {trend > 0 ? 'Improving trend! 🎉' : 
             trend < 0 ? 'Time for self-care 💜' : 
             'Stable and consistent 🌟'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthTrendsChart;