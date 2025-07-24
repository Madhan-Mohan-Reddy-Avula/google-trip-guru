import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Calendar, Users, DollarSign, Plane, Car, Train, Home, Sparkles, RefreshCw } from "lucide-react";

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

interface TripPlannerFormProps {
  onSubmit: (data: TripFormData) => void;
  initialData?: TripFormData | null;
}

export const TripPlannerForm = ({ onSubmit, initialData }: TripPlannerFormProps) => {
  const [formData, setFormData] = useState<TripFormData>({
    startingPoint: "",
    destination: "",
    days: "",
    budget: "",
    travelers: "",
    travelMode: "",
    accommodation: "",
    tripType: "",
    preferences: "",
  });

  // Update form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof TripFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const fillParisExample = () => {
    setFormData({
      startingPoint: "Mumbai",
      destination: "Paris",
      days: "5-7",
      budget: "180000",
      travelers: "2",
      travelMode: "flight",
      accommodation: "hotel",
      tripType: "sightseeing-culinary",
      preferences: "Interested in culinary experiences, food tours, famous landmarks like Eiffel Tower, Louvre Museum, and authentic French cuisine"
    });
  };

  const fillManaliExample = () => {
    setFormData({
      startingPoint: "Delhi",
      destination: "Manali",
      days: "5-7",
      budget: "25000",
      travelers: "2",
      travelMode: "bus",
      accommodation: "hotel",
      tripType: "adventure",
      preferences: "Love adventure activities like paragliding, trekking, and mountain biking. Want to experience local culture and try Himachali cuisine."
    });
  };

  const fillGoaExample = () => {
    setFormData({
      startingPoint: "Bangalore",
      destination: "Goa",
      days: "3-4",
      budget: "40000",
      travelers: "3-4",
      travelMode: "flight",
      accommodation: "resort",
      tripType: "relaxation",
      preferences: "Beach vacation with water sports, sunset views, and seafood. Looking for a mix of relaxation and some nightlife."
    });
  };

  const clearForm = () => {
    setFormData({
      startingPoint: "",
      destination: "",
      days: "",
      budget: "",
      travelers: "",
      travelMode: "",
      accommodation: "",
      tripType: "",
      preferences: "",
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-card bg-gradient-card">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-travel-navy">
          {initialData ? "Review & Customize Your Trip" : "Plan Your Perfect Trip"}
        </CardTitle>
        <p className="text-muted-foreground mt-2">
          {initialData 
            ? "AI has filled the form based on your description. Review and modify as needed."
            : "Tell us your preferences and we'll create a personalized itinerary using Google's travel insights"
          }
        </p>
        
        {/* Quick Examples */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <Button 
            type="button"
            variant="outline" 
            size="sm"
            onClick={fillParisExample}
            className="flex items-center gap-1 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <Sparkles className="w-3 h-3" />
            Paris Trip
          </Button>
          <Button 
            type="button"
            variant="outline" 
            size="sm"
            onClick={fillManaliExample}
            className="flex items-center gap-1 border-travel-green text-travel-green hover:bg-travel-green hover:text-white transition-all duration-300"
          >
            <Sparkles className="w-3 h-3" />
            Manali Adventure
          </Button>
          <Button 
            type="button"
            variant="outline" 
            size="sm"
            onClick={fillGoaExample}
            className="flex items-center gap-1 border-travel-orange text-travel-orange hover:bg-travel-orange hover:text-white transition-all duration-300"
          >
            <Sparkles className="w-3 h-3" />
            Goa Beach
          </Button>
          {(initialData || Object.values(formData).some(v => v !== "")) && (
            <Button 
              type="button"
              variant="outline" 
              size="sm"
              onClick={clearForm}
              className="flex items-center gap-1 border-gray-400 text-gray-600 hover:bg-gray-400 hover:text-white transition-all duration-300"
            >
              <RefreshCw className="w-3 h-3" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Starting Point */}
            <div className="space-y-2">
              <Label htmlFor="startingPoint" className="flex items-center gap-2 text-travel-navy font-medium">
                <MapPin className="w-4 h-4" />
                Starting Point
              </Label>
              <Input
                id="startingPoint"
                placeholder="e.g., Mumbai, Delhi, Bangalore"
                value={formData.startingPoint}
                onChange={(e) => handleInputChange("startingPoint", e.target.value)}
                required
                className={`border-2 focus:border-primary ${initialData ? 'bg-blue-50 border-blue-200' : ''}`}
              />
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <Label htmlFor="destination" className="flex items-center gap-2 text-travel-navy font-medium">
                <MapPin className="w-4 h-4" />
                Destination
              </Label>
              <Input
                id="destination"
                placeholder="e.g., Manali, Paris, Tokyo"
                value={formData.destination}
                onChange={(e) => handleInputChange("destination", e.target.value)}
                required
                className={`border-2 focus:border-primary ${initialData ? 'bg-blue-50 border-blue-200' : ''}`}
              />
            </div>

            {/* Number of Days */}
            <div className="space-y-2">
              <Label htmlFor="days" className="flex items-center gap-2 text-travel-navy font-medium">
                <Calendar className="w-4 h-4" />
                Number of Days
              </Label>
              <Select value={formData.days} onValueChange={(value) => handleInputChange("days", value)}>
                <SelectTrigger className={`border-2 focus:border-primary ${initialData ? 'bg-blue-50 border-blue-200' : ''}`}>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2">1-2 days</SelectItem>
                  <SelectItem value="3-4">3-4 days</SelectItem>
                  <SelectItem value="5-7">5-7 days</SelectItem>
                  <SelectItem value="8-14">1-2 weeks</SelectItem>
                  <SelectItem value="15+">More than 2 weeks</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <Label htmlFor="budget" className="flex items-center gap-2 text-travel-navy font-medium">
                <DollarSign className="w-4 h-4" />
                Budget (₹)
              </Label>
              <Input
                id="budget"
                type="number"
                placeholder="e.g., 25000"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                required
                className={`border-2 focus:border-primary ${initialData ? 'bg-blue-50 border-blue-200' : ''}`}
              />
            </div>

            {/* Number of Travelers */}
            <div className="space-y-2">
              <Label htmlFor="travelers" className="flex items-center gap-2 text-travel-navy font-medium">
                <Users className="w-4 h-4" />
                Number of Travelers
              </Label>
              <Select value={formData.travelers} onValueChange={(value) => handleInputChange("travelers", value)}>
                <SelectTrigger className={`border-2 focus:border-primary ${initialData ? 'bg-blue-50 border-blue-200' : ''}`}>
                  <SelectValue placeholder="Select travelers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Solo traveler</SelectItem>
                  <SelectItem value="2">Couple</SelectItem>
                  <SelectItem value="3-4">Small group (3-4)</SelectItem>
                  <SelectItem value="5+">Large group (5+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Travel Mode */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-travel-navy font-medium">
                <Plane className="w-4 h-4" />
                Travel Mode
              </Label>
              <Select value={formData.travelMode} onValueChange={(value) => handleInputChange("travelMode", value)}>
                <SelectTrigger className={`border-2 focus:border-primary ${initialData ? 'bg-blue-50 border-blue-200' : ''}`}>
                  <SelectValue placeholder="Select travel mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flight">Flight</SelectItem>
                  <SelectItem value="train">Train</SelectItem>
                  <SelectItem value="bus">Bus</SelectItem>
                  <SelectItem value="car">Car/Self-drive</SelectItem>
                  <SelectItem value="mixed">Mixed transport</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Accommodation */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-travel-navy font-medium">
                <Home className="w-4 h-4" />
                Accommodation
              </Label>
              <Select value={formData.accommodation} onValueChange={(value) => handleInputChange("accommodation", value)}>
                <SelectTrigger className={`border-2 focus:border-primary ${initialData ? 'bg-blue-50 border-blue-200' : ''}`}>
                  <SelectValue placeholder="Select accommodation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="airbnb">Airbnb/Apartment</SelectItem>
                  <SelectItem value="hostel">Hostel</SelectItem>
                  <SelectItem value="resort">Resort</SelectItem>
                  <SelectItem value="guesthouse">Guesthouse</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Trip Type */}
          <div className="space-y-2">
            <Label className="text-travel-navy font-medium">Trip Type</Label>
            <Select value={formData.tripType} onValueChange={(value) => handleInputChange("tripType", value)}>
              <SelectTrigger className={`border-2 focus:border-primary ${initialData ? 'bg-blue-50 border-blue-200' : ''}`}>
                <SelectValue placeholder="What kind of trip are you planning?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relaxation">Relaxation & Wellness</SelectItem>
                <SelectItem value="adventure">Adventure & Sports</SelectItem>
                <SelectItem value="sightseeing">Sightseeing & Culture</SelectItem>
                <SelectItem value="sightseeing-culinary">Sightseeing & Culinary</SelectItem>
                <SelectItem value="nature">Nature & Wildlife</SelectItem>
                <SelectItem value="food">Food & Culinary</SelectItem>
                <SelectItem value="nightlife">Nightlife & Entertainment</SelectItem>
                <SelectItem value="business">Business Travel</SelectItem>
                <SelectItem value="family">Family Vacation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Additional Preferences */}
          <div className="space-y-2">
            <Label htmlFor="preferences" className="text-travel-navy font-medium">
              Additional Preferences 
              {initialData && <span className="text-sm text-blue-600 font-normal">(Auto-filled from your description)</span>}
            </Label>
            <Textarea
              id="preferences"
              placeholder="Any specific requirements, activities you want to include/avoid, dietary restrictions, etc."
              value={formData.preferences}
              onChange={(e) => handleInputChange("preferences", e.target.value)}
              className={`border-2 focus:border-primary min-h-[100px] ${initialData ? 'bg-blue-50 border-blue-200' : ''}`}
            />
          </div>

          {initialData && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-700 mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="font-medium">AI Analysis Complete!</span>
              </div>
              <p className="text-sm text-green-600">
                We've automatically filled the form based on your description. Feel free to review and modify any details before generating your travel plan.
              </p>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-gradient-hero hover:opacity-90 text-white font-semibold py-3 text-lg shadow-floating transition-all duration-300 hover:shadow-floating hover:scale-[1.02]"
          >
            Generate My Travel Plan ✈️
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
