import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Bell, BellOff } from 'lucide-react';

const NotificationManager: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    // Check notification preferences
    const enabled = localStorage.getItem('notificationsEnabled') === 'true';
    setNotificationsEnabled(enabled);
    
    if (enabled) {
      checkForNotifications();
    }
  }, []);

  const checkForNotifications = () => {
    const lastCheckIn = localStorage.getItem('lastCheckInDate');
    const today = new Date().toDateString();
    const healthScore = parseInt(localStorage.getItem('healthScore') || '85');

    // Check if user hasn't checked in today
    if (lastCheckIn !== today) {
      showNotification('Daily Check-in Reminder', 'How are you feeling today? Take a moment to check in! 💜');
    }

    // Check if health score is low
    if (healthScore < 60) {
      showNotification('Wellness Check', 'Your health score is low. Consider some self-care activities today. 🛟');
    }

    // Check for streak milestones
    const streak = parseInt(localStorage.getItem('checkInStreak') || '0');
    if (streak > 0 && streak % 5 === 0) {
      showNotification('Amazing Streak!', `You've maintained a ${streak}-day check-in streak! 🎉`);
    }
  };

  const showNotification = (title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/icon.png' });
    } else {
      // Fallback to alert if notifications not supported
      console.log(`Notification: ${title} - ${body}`);
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        localStorage.setItem('notificationsEnabled', 'true');
        checkForNotifications();
      }
    }
  };

  const toggleNotifications = (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    localStorage.setItem('notificationsEnabled', enabled.toString());
    
    if (enabled) {
      requestNotificationPermission();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {notificationsEnabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
          Smart Notifications
        </CardTitle>
        <CardDescription>Get reminders and wellness tips</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Enable Notifications</h4>
              <p className="text-sm text-muted-foreground">
                Get reminders for daily check-ins and wellness tips
              </p>
            </div>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={toggleNotifications}
            />
          </div>

          {notificationsEnabled && (
            <div className="space-y-2 text-sm">
              <p className="font-semibold">You'll receive:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Daily check-in reminders</li>
                <li>Low health score alerts</li>
                <li>Streak milestone celebrations</li>
                <li>Personalized wellness tips</li>
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationManager;