import { useState } from "react";
import { BookOpen, Search, Clock, Users, Star, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const courses = [
    {
      id: 1,
      title: "Digital Marketing Fundamentals",
      provider: "SheLeads Academy",
      duration: "6 weeks",
      level: "beginner",
      rating: 4.8,
      students: 1250,
      cost: "Free",
      description: "Learn the basics of digital marketing, SEO, and social media strategy.",
      skills: ["SEO", "Social Media", "Content Marketing"],
      image: "/api/placeholder/400/200"
    },
    {
      id: 2,
      title: "Web Development Bootcamp",
      provider: "CodeWithHer",
      duration: "12 weeks",
      level: "intermediate",
      rating: 4.9,
      students: 890,
      cost: "$99",
      description: "Comprehensive web development course covering HTML, CSS, JavaScript and more.",
      skills: ["HTML", "CSS", "JavaScript", "React"],
      image: "/api/placeholder/400/200"
    },
    {
      id: 3,
      title: "Leadership & Management",
      provider: "WomenLead Institute",
      duration: "8 weeks",
      level: "advanced",
      rating: 4.7,
      students: 567,
      cost: "Free",
      description: "Develop essential leadership skills for career advancement.",
      skills: ["Leadership", "Management", "Communication"],
      image: "/api/placeholder/400/200"
    },
    {
      id: 4,
      title: "Financial Literacy Masterclass",
      provider: "FinanceHer",
      duration: "4 weeks",
      level: "beginner",
      rating: 4.6,
      students: 1200,
      cost: "$49",
      description: "Master personal finance, investing, and wealth building strategies.",
      skills: ["Budgeting", "Investing", "Retirement Planning"],
      image: "/api/placeholder/400/200"
    }
  ];

  const levels = [
    { id: "all", name: "All Levels" },
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4" />
          <h1 className="font-display text-4xl font-bold mb-4">Skill Development Courses</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Enhance your skills with courses designed for women's career growth
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
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              className="p-2 border rounded-lg"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              {levels.map(level => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-40 bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <PlayCircle className="w-12 h-12 text-white opacity-80" />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display text-lg font-bold text-gray-900">{course.title}</h3>
                  <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                    {course.level}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 text-yellow-500 mr-2" />
                    <span>{course.rating} rating</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="font-bold text-lg text-gray-900">{course.cost}</div>
                  <div className="flex flex-wrap gap-1">
                    {course.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600">
                  Enroll Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;