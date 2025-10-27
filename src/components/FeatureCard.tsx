import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "primary" | "secondary" | "accent";
  link: string;
}

const FeatureCard = ({ icon: Icon, title, description, color, link }: FeatureCardProps) => {
  const colorClasses = {
    primary: "from-primary/20 to-primary-light/20 hover:from-primary/30 hover:to-primary-light/30",
    secondary: "from-secondary/40 to-secondary-dark/40 hover:from-secondary/50 hover:to-secondary-dark/50",
    accent: "from-accent/30 to-accent-dark/30 hover:from-accent/40 hover:to-accent-dark/40"
  };

  const iconBgClasses = {
    primary: "bg-gradient-to-br from-primary to-primary-light",
    secondary: "bg-gradient-to-br from-secondary to-secondary-dark",
    accent: "bg-gradient-to-br from-accent to-accent-dark"
  };

  return (
    <Card className={`p-6 bg-gradient-to-br ${colorClasses[color]} border-0 card-glow group`}>
      <div className={`w-14 h-14 rounded-2xl ${iconBgClasses[color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="font-display text-xl font-bold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Link to={link}>
        <Button variant="ghost" className="p-0 h-auto font-semibold group-hover:gap-2 transition-all">
          Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </Card>
  );
};

export default FeatureCard;
