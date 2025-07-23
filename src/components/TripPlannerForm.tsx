import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Calendar, Users, DollarSign, Plane, Car, Train, Home, Sparkles } from "lucide-react";

interface TripFormData {
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
}

export const TripPlannerForm = ({ onSubmit }: TripPlannerFormProps) => {
  const [formData, setFormData] = useState<TripFormData>({
    destination: "",
    days: "",
    budget: "",
    travelers: "",
    travelMode: "",
    accommodation: "",
    tripType: "",
    preferences: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof TripFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const fillParisExample = () => {
    setFormData({
      destination: "Paris",
      days: "5-7",
      budget: "180000", // ₹2000 EUR ≈ ₹180,000
      travelers: "2",
      travelMode: "flight",
      accommodation: "hotel",
      tripType: "sightseeing-culinary",
      preferences: "Interested in culinary experiences, food tours, famous landmarks like Eiffel Tower, Louvre Museum, and authentic French cuisine"
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-card bg-gradient-card">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-travel-navy">
          Plan Your Perfect Trip
        </CardTitle>
        <p className="text-muted-foreground mt-2">
          Tell us your preferences and we'll create a personalized itinerary using Google's travel insights
        </p>
        <div className="mt-4">
          <Button 
            type="button"
            variant="outline" 
            onClick={fillParisExample}
            className="flex items-center gap-2 mx-auto border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <Sparkles className="w-4 h-4" />
            Try Example: 5-day Paris Trip
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
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
                className="border-2 focus:border-primary"
              />
            </div>

            {/* Number of Days */}
            <div className="space-y-2">
              <Label htmlFor="days" className="flex items-center gap-2 text-travel-navy font-medium">
                <Calendar className="w-4 h-4" />
                Number of Days
              </Label>
              <Select value={formData.days} onValueChange={(value) => handleInputChange("days", value)}>
                <SelectTrigger className="border-2 focus:border-primary">
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
                className="border-2 focus:border-primary"
              />
            </div>

            {/* Number of Travelers */}
            <div className="space-y-2">
              <Label htmlFor="travelers" className="flex items-center gap-2 text-travel-navy font-medium">
                <Users className="w-4 h-4" />
                Number of Travelers
              </Label>
              <Select value={formData.travelers} onValueChange={(value) => handleInputChange("travelers", value)}>
                <SelectTrigger className="border-2 focus:border-primary">
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
                <SelectTrigger className="border-2 focus:border-primary">
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
                <SelectTrigger className="border-2 focus:border-primary">
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
              <SelectTrigger className="border-2 focus:border-primary">
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
              Additional Preferences (Optional)
            </Label>
            <Textarea
              id="preferences"
              placeholder="Any specific requirements, activities you want to include/avoid, dietary restrictions, etc."
              value={formData.preferences}
              onChange={(e) => handleInputChange("preferences", e.target.value)}
              className="border-2 focus:border-primary min-h-[100px]"
            />
          </div>

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