import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const PricingPage = () => {
  const tiers = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      description: "Perfect for trying out LearnQube",
      features: [
        "2 videos per day",
        "Access to free courses only",
        "Basic course materials",
        "Mobile access",
        "Course discussions"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline"
    },
    {
      name: "Pro",
      price: "29",
      period: "per month",
      description: "Great for serious learners",
      features: [
        "10 videos per day",
        "Access to premium courses",
        "Downloadable resources",
        "Priority support",
        "Course completion certificates",
        "Offline viewing"
      ],
      buttonText: "Start Pro",
      buttonVariant: "default",
      popular: true
    },
    {
      name: "Ultimate",
      price: "49",
      period: "per month",
      description: "For unlimited learning",
      features: [
        "Unlimited video access",
        "All premium courses included",
        "1-on-1 mentor sessions",
        "Exclusive workshops",
        "Early access to new courses",
        "Custom learning path",
        "Group study sessions"
      ],
      buttonText: "Go Ultimate",
      buttonVariant: "outline"
    }
  ];

  return (
    <div className="container mx-auto px-4 pb-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#481895] mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600">Choose the perfect plan for your learning journey</p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tiers.map((tier) => (
          <Card 
            key={tier.name}
            className={`relative flex flex-col ${
              tier.popular ? 'border-[#481895] shadow-lg scale-105' : ''
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-0 right-0 text-center">
                <span className="bg-[#481895] text-white px-4 py-1 rounded-full text-sm">
                  Most Popular
                </span>
              </div>
            )}

            <CardHeader className="text-center pt-8">
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="text-gray-600 mb-4">{tier.description}</p>
              <div className="mb-4">
                <span className="text-4xl font-bold">${tier.price}</span>
                <span className="text-gray-600">/{tier.period}</span>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-[#481895]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={tier.buttonVariant as "outline" | "default"}
                className={`w-full ${
                  tier.buttonVariant === "default" ? "bg-[#481895] hover:bg-[#481895]/90" : ""
                }`}
              >
                {tier.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;