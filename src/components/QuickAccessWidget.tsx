import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EmotionPickerModal from './EmotionPickerModal';

interface QuickAccessWidgetProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: "primary" | "secondary" | "accent";
  status: "good" | "neutral" | "warning";
}

const QuickAccessWidget: React.FC<QuickAccessWidgetProps> = ({
  title,
  value,
  icon: Icon,
  color,
  status
}) => {
  const navigate = useNavigate();
  const [currentMood, setCurrentMood] = useState(value);
  const [showEmotionPicker, setShowEmotionPicker] = useState(false);

  const handleClick = () => {
    switch (title) {
      case 'Safety Status':
        navigate('/safety');
        break;
      case 'Daily Check-in':
        setShowEmotionPicker(true);
        break;
      case 'Health Score':
        navigate('/health/insights');
        break;
      default:
        break;
    }
  };

  const handleEmotionSelect = (emotion: string) => {
    const emotionMap: { [key: string]: string } = {
      'Great': '😊',
      'Good': '🙂',
      'Okay': '😐',
      'Poor': '😕',
      'Terrible': '😞'
    };
    
    const emoji = emotionMap[emotion] || '🙂';
    setCurrentMood(`Feeling ${emotion} ${emoji}`);
    setShowEmotionPicker(false);
    alert(`Thanks for checking in! You're feeling: ${emotion}`);
  };

  const getColorClasses = () => {
    const colorClasses = {
      primary: 'border-blue-200 bg-blue-50 hover:bg-blue-100',
      secondary: 'border-purple-200 bg-purple-50 hover:bg-purple-100',
      accent: 'border-pink-200 bg-pink-50 hover:bg-pink-100'
    };
    return colorClasses[color];
  };

  const getStatusIcon = () => {
    const statusMap = {
      good: '🟢',
      neutral: '🟡', 
      warning: '🔴'
    };
    return statusMap[status];
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`
          w-full h-24 p-4 border-2 rounded-xl transition-all duration-200
          hover:scale-105 hover:shadow-md cursor-pointer
          flex items-center justify-between
          ${getColorClasses()}
        `}
      >
        <div className="flex items-center gap-3">
          <div className={`
            p-2 rounded-lg
            ${color === 'primary' && 'bg-blue-200'}
            ${color === 'secondary' && 'bg-purple-200'}
            ${color === 'accent' && 'bg-pink-200'}
          `}>
            <Icon className={`
              w-6 h-6
              ${color === 'primary' && 'text-blue-700'}
              ${color === 'secondary' && 'text-purple-700'}
              ${color === 'accent' && 'text-pink-700'}
            `} />
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-foreground">{title}</h4>
            <p className="text-sm text-muted-foreground">
              {title === 'Daily Check-in' ? currentMood : value}
            </p>
          </div>
        </div>
        <span className="text-2xl">{getStatusIcon()}</span>
      </div>

      <EmotionPickerModal
        isOpen={showEmotionPicker}
        onClose={() => setShowEmotionPicker(false)}
        onEmotionSelect={handleEmotionSelect}
      />
    </>
  );
};

export default QuickAccessWidget;