import { Sparkles, Code, Zap, Trophy, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import stemImage from "@/assets/stem-spark.jpg";

const Stem = () => {
  const projects = [
    {
      title: "Build Your First Arduino Robot",
      difficulty: "Beginner",
      duration: "2 hours",
      badge: "🤖",
      description: "Learn basic robotics and create a simple moving robot using Arduino."
    },
    {
      title: "Weather Station with Sensors",
      difficulty: "Intermediate",
      duration: "3 hours",
      badge: "🌤️",
      description: "Build a real weather station that tracks temperature, humidity, and pressure."
    },
    {
      title: "Smart Home LED Controller",
      difficulty: "Beginner",
      duration: "1.5 hours",
      badge: "💡",
      description: "Control LED lights with your phone using simple coding."
    }
  ];

  const challenges = [
    { title: "Code a Game in Scratch", points: 50, participants: 234 },
    { title: "Design a Sustainable City", points: 75, participants: 156 },
    { title: "AI Art Generator", points: 100, participants: 89 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-accent to-accent-dark text-white p-6">
        <div className="container mx-auto">
          <a href="/" className="text-white/80 hover:text-white mb-2 inline-block">← Back to Home</a>
          <h1 className="font-display text-4xl font-bold flex items-center gap-3">
            <Sparkles className="w-10 h-10" />
            STEM Spark Zone
          </h1>
          <p className="text-white/90 mt-2">Where curiosity meets creation</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Project */}
        <Card className="mb-8 overflow-hidden card-glow">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-64 md:h-auto">
              <img src={stemImage} alt="STEM Projects" className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex flex-col justify-center">
              <Badge className="w-fit mb-3 bg-accent text-white">Featured Project</Badge>
              <h2 className="font-display text-3xl font-bold mb-3">
                Project of the Week: Solar-Powered Phone Charger
              </h2>
              <p className="text-muted-foreground mb-4">
                Learn about renewable energy while building a functional solar charger for your devices!
              </p>
              <div className="flex gap-4 mb-4">
                <span className="text-sm">⏱️ 4 hours</span>
                <span className="text-sm">📊 Advanced</span>
                <span className="text-sm">🏆 150 points</span>
              </div>
              <Button className="btn-empowerment w-fit">
                Start Building
              </Button>
            </div>
          </div>
        </Card>

        {/* DIY Projects */}
        <section className="mb-12">
          <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
            <Code className="text-primary" />
            DIY Project Library
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="p-6 card-glow group hover:scale-[1.02] transition-transform">
                <div className="text-4xl mb-3">{project.badge}</div>
                <h4 className="font-display text-xl font-bold mb-2">{project.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                <div className="flex gap-2 mb-4">
                  <Badge variant="secondary">{project.difficulty}</Badge>
                  <Badge variant="outline">{project.duration}</Badge>
                </div>
                <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                  Learn More →
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Active Challenges */}
        <section className="mb-12">
          <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
            <Trophy className="text-accent" />
            Active Challenges
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {challenges.map((challenge, index) => (
              <Card key={index} className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-0 card-glow">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold">{challenge.title}</h4>
                  <Badge className="bg-accent text-white">{challenge.points} pts</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {challenge.participants} participants
                </p>
                <Button className="w-full bg-gradient-to-r from-primary to-accent">
                  Join Challenge
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Learning Resources */}
        <Card className="p-8 bg-gradient-to-br from-secondary/40 to-secondary-dark/40 border-0">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-2xl font-bold mb-2">Technovation Connect</h3>
              <p className="text-muted-foreground mb-4">
                Join Technovation Girls and participate in global competitions, mentorship programs, and workshops.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="btn-empowerment">
              <Zap className="w-4 h-4 mr-2" />
              Register for Technovation
            </Button>
            <Button variant="outline" className="border-2">
              Browse NGO Programs
            </Button>
          </div>
        </Card>

        {/* Badge System */}
        <section className="mt-12">
          <h3 className="font-display text-2xl font-bold mb-6 text-center">Your STEM Journey</h3>
          <div className="flex justify-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-3xl mb-2 floating-animation">
                🌟
              </div>
              <p className="font-semibold text-sm">Beginner</p>
            </div>
            <div className="text-center opacity-50">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-3xl mb-2">
                ⚡
              </div>
              <p className="font-semibold text-sm">Explorer</p>
            </div>
            <div className="text-center opacity-30">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center text-3xl mb-2">
                🚀
              </div>
              <p className="font-semibold text-sm">Innovator</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Stem;
