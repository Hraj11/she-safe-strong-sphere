import { useState } from "react";
import { Users, Search, MessageCircle, Calendar, Star, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Mentorship = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");

  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      title: "Senior Software Engineer",
      company: "Google",
      industry: "tech",
      experience: "8 years",
      rating: 4.9,
      sessions: 147,
      specialties: ["Career Growth", "Technical Interviews", "Leadership"],
      availability: "5 spots left",
      image: "/api/placeholder/100/100"
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      title: "Marketing Director",
      company: "Nike",
      industry: "marketing",
      experience: "12 years",
      rating: 4.8,
      sessions: 203,
      specialties: ["Brand Strategy", "Digital Marketing", "Team Management"],
      availability: "3 spots left",
      image: "/api/placeholder/100/100"
    },
    {
      id: 3,
      name: "Dr. Amanda Foster",
      title: "Chief Medical Officer",
      company: "Mayo Clinic",
      industry: "healthcare",
      experience: "15 years",
      rating: 4.9,
      sessions: 89,
      specialties: ["Healthcare Leadership", "Work-Life Balance", "Career Transition"],
      availability: "2 spots left",
      image: "/api/placeholder/100/100"
    },
    {
      id: 4,
      name: "Lisa Thompson",
      title: "Founder & CEO",
      company: "EcoSolutions",
      industry: "entrepreneurship",
      experience: "10 years",
      rating: 4.7,
      sessions: 156,
      specialties: ["Startup Funding", "Business Strategy", "Scaling Companies"],
      availability: "7 spots left",
      image: "/api/placeholder/100/100"
    }
  ];

  const industries = [
    { id: "all", name: "All Industries" },
    { id: "tech", name: "Technology" },
    { id: "marketing", name: "Marketing" },
    { id: "healthcare", name: "Healthcare" },
    { id: "entrepreneurship", name: "Entrepreneurship" }
  ];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.specialties.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesIndustry = selectedIndustry === "all" || mentor.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Users className="w-16 h-16 mx-auto mb-4" />
          <h1 className="font-display text-4xl font-bold mb-4">Find Your Mentor</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Connect with experienced professionals who can guide your career journey
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search mentors or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              className="p-2 border rounded-lg"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
            >
              {industries.map(industry => (
                <option key={industry.id} value={industry.id}>
                  {industry.name}
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMentors.map(mentor => (
            <Card key={mentor.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-semibold">
                  {mentor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-gray-900">{mentor.name}</h3>
                  <p className="text-gray-600">{mentor.title} at {mentor.company}</p>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-semibold">{mentor.rating}</span>
                    <span className="text-sm text-gray-500 ml-2">({mentor.sessions} sessions)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm">
                  <Briefcase className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{mentor.experience} experience</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-orange-600 font-semibold">{mentor.availability}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2">Specialties:</h4>
                <div className="flex flex-wrap gap-2">
                  {mentor.specialties.map((specialty, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" className="flex-1">
                  View Profile
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mentorship;