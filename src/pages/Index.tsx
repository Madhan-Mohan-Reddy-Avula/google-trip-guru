import { useState } from "react";
import { TripPlannerForm } from "@/components/TripPlannerForm";
import { TravelPlan } from "@/components/TravelPlan";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Sparkles, Globe, Clock, Wand2, Send, MessageCircle, Lightbulb } from "lucide-react";
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
  const [showPromptArea, setShowPromptArea] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [parsedData, setParsedData] = useState<TripFormData | null>(null);
  const [isProcessingPrompt, setIsProcessingPrompt] = useState(false);

  // Smart prompt parser function
  const parsePrompt = (prompt: string): TripFormData => {
    const text = prompt.toLowerCase();
    
    // Helper function to extract information using regex patterns
    const extractInfo = (patterns: string[], defaultValue: string = "") => {
      for (const pattern of patterns) {
        const regex = new RegExp(pattern, 'i');
        const match = text.match(regex);
        if (match) {
          return (match[1] || match[0]).trim();
        }
      }
      return defaultValue;
    };

    // Extract starting point
    const startingPoint = extractInfo([
      'from ([a-zA-Z\\s]+?)(?:\\s+to|\\s+going|,|$)',
      'starting from ([a-zA-Z\\s]+?)(?:\\s+to|\\s+going|,|$)',
      'leave from ([a-zA-Z\\s]+?)(?:\\s+to|\\s+going|,|$)',
      'flying from ([a-zA-Z\\s]+?)(?:\\s+to|\\s+going|,|$)'
    ], "Mumbai");

    // Extract destination
    const destination = extractInfo([
      'to ([a-zA-Z\\s]+?)(?:\\s+for|\\s+in|\\s+with|\\s+on|,|$)',
      'visit ([a-zA-Z\\s]+?)(?:\\s+for|\\s+in|\\s+with|\\s+on|,|$)',
      'going to ([a-zA-Z\\s]+?)(?:\\s+for|\\s+in|\\s+with|\\s+on|,|$)',
      'trip to ([a-zA-Z\\s]+?)(?:\\s+for|\\s+in|\\s+with|\\s+on|,|$)',
      'vacation to ([a-zA-Z\\s]+?)(?:\\s+for|\\s+in|\\s+with|\\s+on|,|$)',
      'travel to ([a-zA-Z\\s]+?)(?:\\s+for|\\s+in|\\s+with|\\s+on|,|$)'
    ], "Paris");

    // Extract number of days
    let days = "5-7";
    const dayPatterns = [
      '(\\d+)\\s*days?',
      '(\\d+)\\s*day',
      'for\\s*(\\d+)\\s*days?',
      '(\\d+-\\d+)\\s*days?',
      '(\\d+)\\s*week',
      'week'
    ];
    const dayMatch = extractInfo(dayPatterns);
    if (dayMatch) {
      if (dayMatch.includes('week')) {
        days = "5-7";
      } else {
        const num = parseInt(dayMatch);
        if (num <= 2) days = "1-2";
        else if (num <= 4) days = "3-4";
        else if (num <= 7) days = "5-7";
        else if (num <= 14) days = "8-14";
        else days = "15+";
      }
    }

    // Extract budget
    let budget = "50000";
    const budgetPatterns = [
      'budget[\\s\\w]*?(?:₹|rs\\.?|rupees?)\\s*(\\d+)',
      '(?:₹|rs\\.?|rupees?)\\s*(\\d+)',
      'spend[\\s\\w]*?(\\d+)',
      '(\\d+)\\s*(?:₹|rs\\.?|rupees?)',
      'budget[\\s\\w]*?(\\d+)',
      '(\\d+)k',
      '(\\d+)\\s*lakh',
      '(\\d+)\\s*thousand'
    ];
    const budgetMatch = extractInfo(budgetPatterns);
    if (budgetMatch) {
      let budgetNum = budgetMatch.replace(/[^\d]/g, '');
      if (budgetMatch.includes('k') || budgetMatch.includes('thousand')) {
        budgetNum = (parseInt(budgetNum) * 1000).toString();
      } else if (budgetMatch.includes('lakh')) {
        budgetNum = (parseInt(budgetNum) * 100000).toString();
      }
      budget = budgetNum;
    }

    // Extract number of travelers
    let travelers = "2";
    const travelerPatterns = [
      '(\\d+)\\s*people',
      '(\\d+)\\s*persons?',
      '(\\d+)\\s*travelers?',
      '(\\d+)\\s*adults?',
      'couple|two people|2 people',
      'solo|alone|myself|single',
      'family',
      'group'
    ];
    const travelerMatch = extractInfo(travelerPatterns);
    if (travelerMatch) {
      if (travelerMatch.includes('couple') || travelerMatch.includes('two') || travelerMatch.includes('2')) {
        travelers = "2";
      } else if (travelerMatch.includes('solo') || travelerMatch.includes('alone') || travelerMatch.includes('single')) {
        travelers = "1";
      } else if (travelerMatch.includes('family')) {
        travelers = "3-4";
      } else if (travelerMatch.includes('group')) {
        travelers = "5+";
      } else {
        const num = parseInt(travelerMatch);
        if (num === 1) travelers = "1";
        else if (num === 2) travelers = "2";
        else if (num <= 4) travelers = "3-4";
        else travelers = "5+";
      }
    }

    // Extract travel mode
    let travelMode = "flight";
    if (text.includes('flight') || text.includes('fly') || text.includes('plane') || text.includes('air')) {
      travelMode = "flight";
    } else if (text.includes('train') || text.includes('railway')) {
      travelMode = "train";
    } else if (text.includes('bus') || text.includes('road')) {
      travelMode = "bus";
    } else if (text.includes('car') || text.includes('drive') || text.includes('self')) {
      travelMode = "car";
    }

    // Extract accommodation type
    let accommodation = "hotel";
    if (text.includes('hotel')) {
      accommodation = "hotel";
    } else if (text.includes('airbnb') || text.includes('apartment')) {
      accommodation = "airbnb";
    } else if (text.includes('hostel')) {
      accommodation = "hostel";
    } else if (text.includes('resort')) {
      accommodation = "resort";
    } else if (text.includes('guesthouse')) {
      accommodation = "guesthouse";
    }

    // Extract trip type based on keywords
    let tripType = "sightseeing";
    if (text.includes('adventure') || text.includes('trekking') || text.includes('sports') || text.includes('hiking')) {
      tripType = "adventure";
    } else if (text.includes('relax') || text.includes('spa') || text.includes('wellness') || text.includes('beach')) {
      tripType = "relaxation";
    } else if (text.includes('food') || text.includes('culinary') || text.includes('cuisine') || text.includes('restaurant')) {
      tripType = "food";
    } else if (text.includes('culture') || text.includes('heritage') || text.includes('museum') || text.includes('sightseeing')) {
      tripType = "sightseeing";
    } else if (text.includes('nature') || text.includes('wildlife') || text.includes('safari')) {
      tripType = "nature";
    } else if (text.includes('nightlife') || text.includes('party') || text.includes('club')) {
      tripType = "nightlife";
    } else if (text.includes('family') || text.includes('kids') || text.includes('children')) {
      tripType = "family";
    } else if (text.includes('business') || text.includes('work') || text.includes('conference')) {
      tripType = "business";
    }

    return {
      startingPoint: startingPoint || "Mumbai",
      destination: destination || "Paris",
      days,
      budget,
      travelers,
      travelMode,
      accommodation,
      tripType,
      preferences: prompt
    };
  };

  const handlePromptSubmit = async () => {
    if (!promptText.trim()) return;
    
    setIsProcessingPrompt(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const parsed = parsePrompt(promptText);
    setParsedData(parsed);
    setShowPromptArea(false);
    setIsProcessingPrompt(false);
    
    // Scroll to form
    setTimeout(() => {
      const formElement = document.querySelector('.trip-planner-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleTripSubmit = async (data: TripFormData) => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setTripPlan(data);
    setIsLoading(false);
  };

  const promptExamples = [
    "Plan a 7-day trip from Mumbai to Paris for 2 people with a budget of ₹1,80,000. We love food and want to explore museums.",
    "I want to go to Manali from Delhi for 5 days with ₹25,000 budget. Solo trip, love adventure activities like trekking.",
    "Family trip to Goa from Bangalore for 4 days, budget ₹60,000, 2 adults and 2 kids, staying in a beach resort.",
    "Business trip to Singapore from Chennai for 3 days, budget ₹80,000, need good hotels near the city center.",
    "Honeymoon in Udaipur, 1 week, flying from Mumbai, romantic hotels, budget 1 lakh, love heritage and culture.",
    "Solo backpacking to Rishikesh for 10 days, train from Delhi, hostel stay, budget 15k, yoga and rafting."
  ];

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
              onClick={() => {
                setTripPlan(null);
                setParsedData(null);
                setPromptText("");
              }}
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
          
          {/* Smart Prompt Area */}
          {!showPromptArea && !parsedData && (
            <div className="mb-8">
              <Button
                onClick={() => setShowPromptArea(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-floating transition-all duration-300 hover:scale-105 mr-4"
              >
                <Wand2 className="w-5 h-5 mr-2" />
                Try Smart Planning with AI
              </Button>
              <Button
                onClick={() => setShowPromptArea(false)}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-800 py-4 px-8 rounded-full text-lg"
              >
                Use Manual Form
              </Button>
              <p className="text-blue-100 text-sm mt-4">
                🤖 Describe your trip in natural language and let AI fill the form automatically!
              </p>
            </div>
          )}

          {showPromptArea && (
            <Card className="mb-8 bg-white/95 backdrop-blur-sm shadow-floating">
              <CardHeader>
                <CardTitle className="text-travel-navy flex items-center gap-2 justify-center">
                  <MessageCircle className="w-5 h-5" />
                  Tell us about your dream trip
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  Describe your travel plans in natural language and our AI will automatically extract all the details
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Textarea
                    placeholder="Example: Plan a 7-day trip from Mumbai to Paris for 2 people with a budget of ₹1,80,000. We love food and want to explore museums and landmarks like the Eiffel Tower..."
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    className="min-h-[120px] text-gray-700 resize-none"
                    disabled={isProcessingPrompt}
                  />
                  {isProcessingPrompt && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-primary font-medium">AI is analyzing your request...</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                    <Lightbulb className="w-4 h-4" />
                    Click any example to try it out:
                  </div>
                  <div className="grid gap-2 max-h-48 overflow-y-auto">
                    {promptExamples.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setPromptText(example)}
                        disabled={isProcessingPrompt}
                        className="text-left text-xs text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="font-medium">Example {index + 1}:</span> {example}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handlePromptSubmit}
                    disabled={!promptText.trim() || isProcessingPrompt}
                    className="bg-gradient-hero hover:opacity-90 text-white flex-1"
                  >
                    {isProcessingPrompt ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Generate Plan with AI
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => setShowPromptArea(false)}
                    variant="outline"
                    disabled={isProcessingPrompt}
                    className="border-gray-300 text-gray-600"
                  >
                    Manual Form
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {parsedData && (
            <div className="mb-4">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-green-700 mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-medium">AI Analysis Complete!</span>
                  </div>
                  <p className="text-sm text-green-600">
                    ✅ Successfully extracted: {parsedData.destination} trip for {parsedData.travelers} travelers, {parsedData.days} days, ₹{parseInt(parsedData.budget).toLocaleString()} budget
                  </p>
                  <Button
                    onClick={() => {
                      setParsedData(null);
                      setPromptText("");
                      setShowPromptArea(true);
                    }}
                    variant="outline"
                    size="sm"
                    className="mt-2 border-green-300 text-green-600 hover:bg-green-100"
                  >
                    Try Different Prompt
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-floating trip-planner-form">
            <TripPlannerForm 
              onSubmit={handleTripSubmit}
              initialData={parsedData}
            />
          </div>
        </div>
      </div>

      {/* Smart AI Features Section */}
      <div className="py-16 px-4 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-travel-navy mb-6">
            Smart AI Trip Planning
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">
                🤖
              </div>
              <h3 className="font-semibold text-travel-navy">Natural Language Processing</h3>
              <p className="text-sm text-muted-foreground">
                Just describe your trip in plain English and our AI will automatically extract all the details - destinations, budget, preferences, and more
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">
                ⚡
              </div>
              <h3 className="font-semibold text-travel-navy">Instant Form Filling</h3>
              <p className="text-sm text-muted-foreground">
                Save time by letting AI parse your travel description and automatically populate all form fields with intelligent suggestions
              </p>
            </div>
          </div>
          
          <div className="mt-8 bg-white rounded-lg p-6 shadow-card">
            <h4 className="font-semibold text-travel-navy mb-3">What Our AI Can Extract:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="space-y-1">
                <p>✅ Starting point and destination</p>
                <p>✅ Trip duration and dates</p>
                <p>✅ Budget and currency</p>
                <p>✅ Number of travelers</p>
              </div>
              <div className="space-y-1">
                <p>✅ Travel mode preferences</p>
                <p>✅ Accommodation type</p>
                <p>✅ Trip type and activities</p>
                <p>✅ Special requirements</p>
              </div>
            </div>
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
