import { GraduationCap, BookOpen, Users, Briefcase, Star, ArrowRight, Calendar, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const EmpowerHerCareer = () => {
  const featuredOpportunities = [
    {
      id: 1,
      type: "scholarship",
      title: "Women in STEM Scholarship",
      provider: "TechForward Foundation",
      amount: "$10,000",
      deadline: "2024-03-15",
      eligibility: "Women pursuing computer science, engineering, or data science",
      icon: GraduationCap,
      color: "purple"
    },
    {
      id: 2,
      type: "course",
      title: "Digital Marketing Mastery",
      provider: "SheLeads Academy",
      duration: "8 weeks",
      level: "Beginner",
      cost: "Free",
      icon: BookOpen,
      color: "blue"
    },
    {
      id: 3,
      type: "mentorship",
      title: "Career Transition Support",
      provider: "Women in Business Network",
      duration: "3 months",
      focus: "Career changing guidance",
      spots: "12 spots left",
      icon: Users,
      color: "green"
    }
  ];

  const quickStats = [
    { number: "50+", label: "Scholarships Available" },
    { number: "200+", label: "Free Courses" },
    { number: "150+", label: "Active Mentors" },
    { number: "95%", label: "Success Rate" }
  ];

  const upcomingEvents = [
    {
      title: "Women in Tech Networking",
      date: "March 20, 2024",
      time: "6:00 PM EST",
      type: "Virtual"
    },
    {
      title: "Resume Building Workshop",
      date: "March 25, 2024",
      time: "2:00 PM EST",
      type: "In-Person"
    },
    {
      title: "Salary Negotiation Masterclass",
      date: "April 2, 2024",
      time: "5:30 PM EST",
      type: "Virtual"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
            EmpowerHer Career
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Scholarships, courses, and mentorship opportunities designed to accelerate women's career growth
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {quickStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Featured Opportunities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredOpportunities.map((opportunity) => {
            const Icon = opportunity.icon;
            return (
              <Card key={opportunity.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className={`w-12 h-12 rounded-lg bg-${opportunity.color}-100 flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 text-${opportunity.color}-600`} />
                </div>
                
                <div className="mb-3">
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full bg-${opportunity.color}-100 text-${opportunity.color}-800 mb-2`}>
                    {opportunity.type.toUpperCase()}
                  </span>
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
                    {opportunity.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{opportunity.provider}</p>
                </div>

                <div className="space-y-2 mb-4">
                  {opportunity.type === "scholarship" && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Amount:</span>
                        <span className="font-semibold text-green-600">{opportunity.amount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Deadline:</span>
                        <span className="font-semibold">{opportunity.deadline}</span>
                      </div>
                    </>
                  )}
                  {opportunity.type === "course" && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Duration:</span>
                        <span className="font-semibold">{opportunity.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Cost:</span>
                        <span className="font-semibold text-green-600">{opportunity.cost}</span>
                      </div>
                    </>
                  )}
                  {opportunity.type === "mentorship" && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Duration:</span>
                        <span className="font-semibold">{opportunity.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Availability:</span>
                        <span className="font-semibold text-orange-600">{opportunity.spots}</span>
                      </div>
                    </>
                  )}
                </div>

                <Link to={opportunity.type === "scholarship" ? "/scholarships" : opportunity.type === "course" ? "/courses" : "/mentorship"}>
  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
    Learn More <ArrowRight className="w-4 h-4 ml-2" />
  </Button>
</Link>
              </Card>
            );
          })}
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Scholarships */}
          <Card className="p-6 bg-white/60 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-display text-xl font-bold text-gray-900 mb-4">Scholarships</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-sm">
                <Star className="w-4 h-4 text-purple-500 mr-2" />
                STEM & Technology Fields
              </li>
              <li className="flex items-center text-sm">
                <Star className="w-4 h-4 text-purple-500 mr-2" />
                Business & Entrepreneurship
              </li>
              <li className="flex items-center text-sm">
                <Star className="w-4 h-4 text-purple-500 mr-2" />
                Creative Arts & Design
              </li>
              <li className="flex items-center text-sm">
                <Star className="w-4 h-4 text-purple-500 mr-2" />
                Returning Student Programs
              </li>
            </ul>
            <Link to="/scholarships">
  <Button variant="outline" className="w-full">
    Browse All Scholarships
  </Button>
</Link>
          </Card>

          {/* Courses */}
          <Card className="p-6 bg-white/60 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-display text-xl font-bold text-gray-900 mb-4">Skill Courses</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-sm">
                <Target className="w-4 h-4 text-blue-500 mr-2" />
                Digital Marketing & SEO
              </li>
              <li className="flex items-center text-sm">
                <Target className="w-4 h-4 text-blue-500 mr-2" />
                Web Development & Coding
              </li>
              <li className="flex items-center text-sm">
                <Target className="w-4 h-4 text-blue-500 mr-2" />
                Leadership & Management
              </li>
              <li className="flex items-center text-sm">
                <Target className="w-4 h-4 text-blue-500 mr-2" />
                Financial Literacy
              </li>
            </ul>
            <Link to="/courses">
  <Button variant="outline" className="w-full">
    Explore Courses
  </Button>
</Link>
          </Card>

          {/* Mentorship */}
          <Card className="p-6 bg-white/60 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-display text-xl font-bold text-gray-900 mb-4">Mentorship</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-sm">
                <Briefcase className="w-4 h-4 text-green-500 mr-2" />
                Industry-Specific Guidance
              </li>
              <li className="flex items-center text-sm">
                <Briefcase className="w-4 h-4 text-green-500 mr-2" />
                Career Transition Support
              </li>
              <li className="flex items-center text-sm">
                <Briefcase className="w-4 h-4 text-green-500 mr-2" />
                Entrepreneurship Coaching
              </li>
              <li className="flex items-center text-sm">
                <Briefcase className="w-4 h-4 text-green-500 mr-2" />
                Peer Networking
              </li>
            </ul>
            <Link to="/mentorship">
  <Button variant="outline" className="w-full">
    Find a Mentor
  </Button>
</Link>
          </Card>
        </div>

        {/* Upcoming Events & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Events */}
          <Card className="p-6">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-purple-600" />
              Upcoming Events
            </h3>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.date} • {event.time}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    event.type === 'Virtual' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Events
            </Button>
          </Card>

          {/* Call to Action */}
          <Card className="p-8 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
            <h3 className="font-display text-2xl font-bold mb-4">
              Start Your Career Journey Today
            </h3>
            <p className="mb-6 opacity-90">
              Join thousands of women who have transformed their careers through our programs. 
              Get personalized recommendations and support every step of the way.
            </p>
            <div className="space-y-3">
              <Link to="/career-assessment">
  <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">
    Get Career Recommendations
  </Button>
</Link>
<Link to="/signup"> {/* Or your actual signup page */}
  <Button variant="outline" className="w-full border-white text-white hover:bg-white/10">
    Create Free Account
  </Button>
</Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EmpowerHerCareer;