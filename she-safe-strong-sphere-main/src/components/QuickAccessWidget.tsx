import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface QuickAccessWidgetProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: "primary" | "secondary" | "accent";
  status: "good" | "warning" | "neutral";
}

const QuickAccessWidget = ({ title, value, icon: Icon, color, status }: QuickAccessWidgetProps) => {
  const colorClasses = {
    primary: "from-primary to-primary-light",
    secondary: "from-secondary to-secondary-dark",
    accent: "from-accent to-accent-dark"
  };

  const statusIndicator = {
    good: "bg-green-400",
    warning: "bg-yellow-400",
    neutral: "bg-gray-400"
  };

  return (
    <Card className="p-6 card-glow cursor-pointer hover:scale-[1.02] transition-transform">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-2xl bg-gradient-to-br ${colorClasses[color]}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`w-3 h-3 rounded-full ${statusIndicator[status]} pulse-glow`}></div>
      </div>
      <h4 className="font-semibold text-sm text-muted-foreground mb-2">{title}</h4>
      <p className="font-display text-xl font-bold text-foreground">{value}</p>
    </Card>
  );
};

export default QuickAccessWidget;
