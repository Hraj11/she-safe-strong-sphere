// src/utils/notifications.ts
export class NotificationService {
  static async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      return 'denied';
    }
    
    if (Notification.permission === 'default') {
      return await Notification.requestPermission();
    }
    
    return Notification.permission;
  }

  static async showCheckinReminder(minutes: number) {
    if (Notification.permission === 'granted') {
      new Notification('Safety Check-in Reminder', {
        body: `Your safety check-in expires in ${minutes} minutes. Please confirm you're safe.`,
        icon: '/icon-192x192.png',
        tag: 'safety-checkin'
      });
    }
  }

  static async showCheckinExpired(location: string) {
    if (Notification.permission === 'granted') {
      new Notification('Safety Check-in Expired', {
        body: `Your safety check-in has expired at ${location}. Emergency contacts have been notified.`,
        icon: '/icon-192x192.png',
        tag: 'safety-alert'
      });
    }
  }

  static async showSOSAlert(location: string) {
    if (Notification.permission === 'granted') {
      new Notification('🚨 SOS Alert Activated', {
        body: `Emergency alert sent from ${location}. Help is on the way.`,
        icon: '/icon-192x192.png',
        tag: 'sos-alert'
      });
    }
  }

  static async showSafetyUpdate(score: number, level: string) {
    if (Notification.permission === 'granted') {
      new Notification('Safety Update', {
        body: `Area safety: ${level} (${score}/100). ${this.getSafetyMessage(level)}`,
        icon: '/icon-192x192.png',
        tag: 'safety-update'
      });
    }
  }

  private static getSafetyMessage(level: string): string {
    switch (level) {
      case 'safe': return 'You are in a safe area.';
      case 'moderate': return 'Stay alert and aware of your surroundings.';
      case 'caution': return 'High risk area detected. Take precautions.';
      default: return 'Safety status updated.';
    }
  }
}