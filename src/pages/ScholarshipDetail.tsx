import { useParams } from "react-router-dom";
import { GraduationCap, Calendar, Users, DollarSign, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ScholarshipDetail = () => {
  const { id } = useParams();
  
  // In real app, you'd fetch based on ID
  const scholarship = {
    id: 1,
    title: "Women in STEM Scholarship",
    provider: "TechForward Foundation",
    amount: "$10,000",
    deadline: "2024-03-15",
    category: "stem",
    eligibility: "Women pursuing computer science, engineering, or data science degrees",
    description: "Supporting the next generation of women in technology fields.",
    fullDescription: "This scholarship is designed to support women pursuing degrees in STEM fields. We believe in empowering the next generation of female leaders in technology, engineering, and sciences. The scholarship can be used for tuition, books, and educational expenses.",
    requirements: [
      "Must be a woman pursuing a degree in STEM",
      "Minimum 3.0 GPA",
      "Submit a 500-word essay",
      "Two letters of recommendation"
    ],
    applicants: 234,
    website: "https://techforward.org/scholarships"
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
                {scholarship.title}
              </h1>
              <p className="text-xl text-gray-600">{scholarship.provider}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600 mb-2">{scholarship.amount}</div>
              <div className="text-sm text-gray-500">Award Amount</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-green-600 mr-2" />
              <div>
                <div className="font-semibold">{scholarship.amount}</div>
                <div className="text-sm text-gray-500">Amount</div>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-red-600 mr-2" />
              <div>
                <div className="font-semibold">{scholarship.deadline}</div>
                <div className="text-sm text-gray-500">Deadline</div>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-blue-600 mr-2" />
              <div>
                <div className="font-semibold">{scholarship.applicants}</div>
                <div className="text-sm text-gray-500">Applicants</div>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-purple-600 mr-2" />
              <div>
                <div className="font-semibold">Open</div>
                <div className="text-sm text-gray-500">Status</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{scholarship.fullDescription}</p>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Eligibility Requirements</h2>
              <ul className="space-y-2">
                {scholarship.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Ready to Apply?</h3>
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                  Apply Now
                </Button>
                <Button variant="outline" className="w-full">
                  Save for Later
                </Button>
                <Button variant="outline" className="w-full">
                  Visit Website
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Similar Scholarships</h3>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="font-semibold">Women in Engineering Grant</div>
                  <div className="text-sm text-green-600">$8,000</div>
                </div>
                <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="font-semibold">Tech Diversity Scholarship</div>
                  <div className="text-sm text-green-600">$7,500</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetail;