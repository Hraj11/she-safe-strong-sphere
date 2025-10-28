import { useState } from "react";
import { GraduationCap, Search, Filter, DollarSign, Calendar, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Scholarships = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const scholarships = [
    {
      id: 1,
      title: "Women in STEM Scholarship",
      provider: "TechForward Foundation",
      amount: "$10,000",
      deadline: "2024-03-15",
      category: "stem",
      eligibility: "Women pursuing computer science, engineering, or data science degrees",
      description: "Supporting the next generation of women in technology fields.",
      applicants: 234,
      website: "https://techforward.org/scholarships"
    },
    {
      id: 2,
      title: "Business Leadership Grant",
      provider: "Women in Business Association",
      amount: "$7,500",
      deadline: "2024-04-01",
      category: "business",
      eligibility: "Female entrepreneurs and business students",
      description: "Empowering women to become leaders in the business world.",
      applicants: 156,
      website: "https://womeninbusiness.org/grants"
    },
    {
      id: 3,
      title: "Creative Arts Fellowship",
      provider: "Arts for Women Foundation",
      amount: "$5,000",
      deadline: "2024-03-30",
      category: "arts",
      eligibility: "Women in visual arts, writing, or performing arts",
      description: "Nurturing creative talent among women artists.",
      applicants: 89,
      website: "https://artsforwomen.org/fellowships"
    },
    {
      id: 4,
      title: "Healthcare Professionals Scholarship",
      provider: "Medical Women's Association",
      amount: "$8,000",
      deadline: "2024-05-15",
      category: "healthcare",
      eligibility: "Women pursuing nursing, medicine, or healthcare administration",
      description: "Supporting women in healthcare professions.",
      applicants: 187,
      website: "https://medicalwomen.org/scholarships"
    }
  ];

  const categories = [
    { id: "all", name: "All Categories", count: scholarships.length },
    { id: "stem", name: "STEM", count: scholarships.filter(s => s.category === "stem").length },
    { id: "business", name: "Business", count: scholarships.filter(s => s.category === "business").length },
    { id: "arts", name: "Arts & Design", count: scholarships.filter(s => s.category === "arts").length },
    { id: "healthcare", name: "Healthcare", count: scholarships.filter(s => s.category === "healthcare").length }
  ];

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || scholarship.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <GraduationCap className="w-16 h-16 mx-auto mb-4" />
          <h1 className="font-display text-4xl font-bold mb-4">Scholarships for Women</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover funding opportunities to support your educational journey and career growth
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
                placeholder="Search scholarships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              className="p-2 border rounded-lg"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredScholarships.map(scholarship => (
            <Card key={scholarship.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-display text-xl font-bold text-gray-900">{scholarship.title}</h3>
                <span className="px-2 py-1 text-sm font-semibold bg-purple-100 text-purple-800 rounded-full">
                  {scholarship.category.toUpperCase()}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{scholarship.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <DollarSign className="w-4 h-4 text-green-600 mr-2" />
                  <span className="font-semibold">{scholarship.amount}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 text-red-600 mr-2" />
                  <span>Deadline: {scholarship.deadline}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 text-blue-600 mr-2" />
                  <span>{scholarship.applicants} applicants</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600">
                  Apply Now
                </Button>
                <Button variant="outline" className="flex-1">
                  Save
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredScholarships.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">No scholarships found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scholarships;