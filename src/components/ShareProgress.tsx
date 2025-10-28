import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Twitter, MessageCircle, Copy } from 'lucide-react';

const ShareProgress: React.FC = () => {
  const shareData = {
    score: localStorage.getItem('healthScore') || '85',
    streak: localStorage.getItem('checkInStreak') || '0',
    totalCheckins: JSON.parse(localStorage.getItem('moodHistory') || '[]').length
  };

  const shareMessage = `I'm taking care of my wellbeing with SheSphere! 🎉 
Current Health Score: ${shareData.score}% 
${shareData.streak} day streak • ${shareData.totalCheckins} total check-ins

Join me on this wellness journey! 💜`;

  const handleShare = async (platform: string) => {
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`, '_blank');
    } else if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`, '_blank');
    } else if (platform === 'copy') {
      await navigator.clipboard.writeText(shareMessage);
      alert('Copied to clipboard! 📋');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          Share Your Progress
        </CardTitle>
        <CardDescription>Inspire others with your wellness journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm">{shareMessage}</p>
          </div>
          
          <div className="flex gap-2 justify-center">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleShare('twitter')}
              className="flex items-center gap-2"
            >
              <Twitter className="w-4 h-4" />
              Twitter
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleShare('whatsapp')}
              className="flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleShare('copy')}
              className="flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareProgress;