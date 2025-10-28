import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface EmotionPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmotionSelect: (emotion: string) => void;
}

const EmotionPickerModal: React.FC<EmotionPickerModalProps> = ({
  isOpen,
  onClose,
  onEmotionSelect
}) => {
  const emotions = [
    { emoji: '😊', label: 'Great', color: 'text-green-600' },
    { emoji: '🙂', label: 'Good', color: 'text-blue-600' },
    { emoji: '😐', label: 'Okay', color: 'text-yellow-600' },
    { emoji: '😕', label: 'Poor', color: 'text-orange-600' },
    { emoji: '😞', label: 'Terrible', color: 'text-red-600' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How are you feeling today?</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-4 py-4">
          {emotions.map((emotion) => (
            <Button
              key={emotion.label}
              variant="outline"
              className="flex flex-col h-16 gap-1"
              onClick={() => onEmotionSelect(emotion.label)}
            >
              <span className="text-2xl">{emotion.emoji}</span>
              <span className={`text-xs ${emotion.color}`}>{emotion.label}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmotionPickerModal;