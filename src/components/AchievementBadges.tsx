import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Star, Award, Zap, Heart } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  target: number;
}

const AchievementBadges: React.FC = () => {
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    checkAchievements();
  }, []);

  const checkAchievements = () => {
    const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    const streak = parseInt(localStorage.getItem('checkInStreak') || '0');
    const greatDays = moodHistory.filter((m: any) => m.emotion === 'Great').length;

    const achievementList: Badge[] = [
      {
        id: 'first_checkin',
        name: 'Getting Started',
        description: 'Complete your first daily check-in',
        icon: <Star className="w-6 h-6" />,
        unlocked: moodHistory.length >= 1,
        progress: Math.min(moodHistory.length, 1),
        target: 1
      },
      {
        id: 'week_streak',
        name: 'Consistent',
        description: '7-day check-in streak',
        icon: <Zap className="w-6 h-6" />,
        unlocked: streak >= 7,
        progress: Math.min(streak, 7),
        target: 7
      },
      {
        id: 'positive_week',
        name: 'Positive Vibes',
        description: '5 Great mood days in a week',
        icon: <Trophy className="w-6 h-6" />,
        unlocked: greatDays >= 5,
        progress: Math.min(greatDays, 5),
        target: 5
      },
      {
        id: 'month_complete',
        name: 'Dedicated',
        description: '30 total check-ins',
        icon: <Award className="w-6 h-6" />,
        unlocked: moodHistory.length >= 30,
        progress: Math.min(moodHistory.length, 30),
        target: 30
      },
      {
        id: 'high_score',
        name: 'Wellness Champion',
        description: 'Reach 95+ health score',
        icon: <Heart className="w-6 h-6" />,
        unlocked: parseInt(localStorage.getItem('healthScore') || '0') >= 95,
        progress: Math.min(parseInt(localStorage.getItem('healthScore') || '0'), 95),
        target: 95
      }
    ];

    setBadges(achievementList);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievement Badges</CardTitle>
        <CardDescription>Unlock rewards for your wellness journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                badge.unlocked
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-sm'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className={`mx-auto mb-2 ${
                badge.unlocked ? 'text-yellow-500' : 'text-gray-400'
              }`}>
                {badge.icon}
              </div>
              <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
              <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div
                  className="bg-green-500 h-1 rounded-full transition-all"
                  style={{ width: `${(badge.progress / badge.target) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs mt-1">
                {badge.progress}/{badge.target}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementBadges;