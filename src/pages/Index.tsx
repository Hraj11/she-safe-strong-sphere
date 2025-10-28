import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-empowerment.jpg";
import { Shield, Heart, Sparkles, TrendingUp, BookOpen, ShoppingBag, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuickAccessWidget from "@/components/QuickAccessWidget";
import FeatureCard from "@/components/FeatureCard";
import EmergencyButton from "@/components/EmergencyButton";



const Index = () => {
  const [greeting, setGreeting] = useState("");
  const [userName] = useState("Amazing Woman");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
    
    
  }, []);

  const features: Array<{
    icon: typeof Shield;
    title: string;
    description: string;
    color: "primary" | "secondary" | "accent";
    link: string;
  }> = [
    {
      icon: Shield,
      title: "Smart Safety Tracker",
      description: "Real-time route safety predictions and travel monitoring",
      color: "primary",
      link: "/safety"
    },
    {
      icon: Heart,
      title: "Sakhi - Your Companion",
      description: "Emotionally intelligent chat support available 24/7",
      color: "secondary",
      link: "/sakhi"
    },
    {
      icon: Sparkles,
      title: "STEM Spark Zone",
      description: "Interactive projects and challenges to ignite curiosity",
      color: "accent",
      link: "/stem"
    },
    {
      icon: TrendingUp,
      title: "Health & Wellness",
      description: "Track your cycle, nutrition, and overall wellbeing",
      color: "primary",
      link: "/health"
    },
    {
      icon: BookOpen,
      title: "EmpowerHer Career",
      description: "Scholarships, courses, and mentorship opportunities",
      color: "accent",
      link: "/career"
    },
    {
      icon: ShoppingBag,
      title: "Talent Marketplace",
      description: "Showcase and sell your handmade creations",
      color: "secondary",
      link: "/marketplace"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Emergency Button - Always Accessible */}
      <EmergencyButton />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Empowered women standing together" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-accent/30 to-background"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-4 floating-animation">
            SheSphere
          </h1>
          <p className="text-xl md:text-2xl text-white/95 font-semibold mb-8 max-w-2xl">
            Where every woman feels safe, seen, and strong
          </p>
          <Button className="btn-empowerment text-lg">
            Begin Your Journey
          </Button>
        </div>
      </section>

      {/* Personalized Greeting */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-3xl p-8 text-center card-glow">
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
            {greeting}, {userName}! 💜
          </h2>
          <p className="text-lg text-muted-foreground">
            You're doing amazing today. Here's your personalized dashboard.
          </p>
        </div>
      </section>

      {/* Quick Access Widgets */}
      <section className="container mx-auto px-4 py-8">
        <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
          <Sparkles className="text-accent" />
          Quick Access
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickAccessWidget 
            title="Safety Status"
            value="Safe Zone"
            icon={Shield}
            color="primary"
            status="good"
          />
          <QuickAccessWidget 
            title="Daily Check-in"
            value="How are you feeling?"
            icon={Heart}
            color="secondary"
            status="neutral"
          />
          <QuickAccessWidget 
            title="Health Score"
            value="85%"
            icon={TrendingUp}
            color="accent"
            status="good"
          />
        </div>
      </section>

      {/* Main Features */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="font-display text-2xl font-bold mb-8 text-center">
          Your Empowerment Ecosystem
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      {/* Motivational Quote */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-br from-primary via-accent to-secondary p-12 rounded-3xl text-center text-white card-glow">
          <p className="font-display text-2xl md:text-3xl font-semibold italic mb-4">
            "She believed she could, so she did."
          </p>
          <p className="text-lg opacity-90">
            Your journey of empowerment starts here, continues forever.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="mb-2">SheSphere - Empowering hearts, minds, and futures</p>
          <p className="text-sm">© 2024 SheSphere. Where every woman belongs.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;