import { useState } from "react";
import { TripPlannerForm } from "@/components/TripPlannerForm";
import { TravelPlan } from "@/components/TravelPlan";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Sparkles, Globe, Clock } from "lucide-react";
import heroImage from "@/assets/travel-hero.jpg";

interface TripFormData {
  startingPoint: string;
  destination: string;
  days: string;
  budget: string;
  travelers: string;
  travelMode: string;
  accommodation: string;
  tripType: string;
  preferences: string;
}

const Index = () => {
  const [tripPlan, setTripPlan] = useState<TripFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTripSubmit = async (data: TripFormData) => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setTripPlan(data);
    setIsLoading(false);
  };

  const features = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Smart Itineraries",
      description: "AI-powered daily plans using Google Places API"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Real-time Insights",
      description: "Live weather, traffic, and event information"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Coverage",
      description: "Destinations worldwide with local expertise"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Instant Planning",
      description: "Get your complete travel plan in seconds"
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-travel-navy mb-2">Creating Your Perfect Trip</h2>
          <p className="text-muted-foreground">Analyzing destinations and crafting your personalized itinerary...</p>
        </div>
      </div>
    );
  }

  if (tripPlan) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="container mx-auto">
          <TravelPlan
            startingPoint={tripPlan.startingPoint}
            destination={tripPlan.destination}
            days={tripPlan.days}
            budget={parseInt(tripPlan.budget)}
            travelers={tripPlan.travelers}
            travelMode={tripPlan.travelMode}
            accommodation={tripPlan.accommodation}
            tripType={tripPlan.tripType}
          />
          <div className="mt-8 text-center">
            <button
              onClick={() => setTripPlan(null)}
              className="text-primary hover:underline font-medium"
            >
              ← Plan Another Trip
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Google Trip Guru
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Your AI-powered travel companion for personalized, budget-friendly adventures
          </p>
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-floating">
            <TripPlannerForm onSubmit={handleTripSubmit} />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-travel-navy mb-4">
              Powered by Google's Travel Intelligence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get real-time recommendations, accurate travel times, and local insights 
              from Google's comprehensive travel APIs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-floating transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-travel-navy mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Google APIs Integration Info */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-travel-navy mb-6">
            Integrated Google Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-travel-blue rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">
                G
              </div>
              <h3 className="font-semibold text-travel-navy">Google Maps & Places</h3>
              <p className="text-sm text-muted-foreground">
                Real-time directions, top-rated places, and local business information
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-travel-green rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">
                ✈️
              </div>
              <h3 className="font-semibold text-travel-navy">Flights & Hotels</h3>
              <p className="text-sm text-muted-foreground">
                Best flight deals and accommodation options within your budget
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-travel-orange rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">
                📅
              </div>
              <h3 className="font-semibold text-travel-navy">Calendar Integration</h3>
              <p className="text-sm text-muted-foreground">
                Automatically add your itinerary to Google Calendar with reminders
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
