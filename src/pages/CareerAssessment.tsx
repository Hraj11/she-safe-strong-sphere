import { useState } from "react";
import { Target, ArrowRight, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const CareerAssessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      question: "What are your primary career interests?",
      options: [
        "Technology & Engineering",
        "Business & Management", 
        "Healthcare & Sciences",
        "Creative Arts & Design",
        "Education & Social Services"
      ]
    },
    {
      id: 2,
      question: "What's your current experience level?",
      options: [
        "Student / Just starting out",
        "Early career (1-3 years)",
        "Mid-career (4-10 years)", 
        "Senior professional (10+ years)",
        "Career changer"
      ]
    },
    {
      id: 3,
      question: "What are your main career goals?",
      options: [
        "Skill development & learning",
        "Career advancement",
        "Career change",
        "Entrepreneurship", 
        "Work-life balance"
      ]
    }
  ];

  const recommendations = [
    {
      type: "scholarship",
      title: "Women in Tech Scholarship",
      match: "95%",
      reason: "Matches your interest in Technology"
    },
    {
      type: "course", 
      title: "Leadership Development Program",
      match: "88%",
      reason: "Aligns with your career advancement goals"
    },
    {
      type: "mentorship",
      title: "Tech Industry Mentor",
      match: "92%", 
      reason: "Fits your experience level and interests"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="p-8 text-center mb-8">
          <Target className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
            Career Path Assessment
          </h1>
          <p className="text-xl text-gray-600">
            Take a quick assessment to get personalized scholarship, course, and mentorship recommendations
          </p>
        </Card>

        {currentStep <= questions.length ? (
          <Card className="p-8">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {questions[currentStep - 1].question}
                </h2>
                <span className="text-sm text-gray-500">
                  Step {currentStep} of {questions.length}
                </span>
              </div>
              
              <div className="space-y-3">
                {questions[currentStep - 1].options.map((option, index) => (
                  <button
                    key={index}
                    className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
                    onClick={() => {
                      setAnswers({...answers, [currentStep]: option});
                      setCurrentStep(currentStep + 1);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-8">
            <div className="text-center mb-8">
              <TrendingUp className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your Personalized Recommendations
              </h2>
              <p className="text-gray-600">
                Based on your interests and goals, here are the best opportunities for you
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {recommendations.map((rec, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded-full mb-3">
                    {rec.match} Match
                  </div>
                  <h3 className="font-bold text-lg mb-2">{rec.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{rec.reason}</p>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                    Explore Opportunity
                  </Button>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="w-full" onClick={() => setCurrentStep(1)}>
                Retake Assessment
              </Button>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                Save Recommendations
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CareerAssessment;