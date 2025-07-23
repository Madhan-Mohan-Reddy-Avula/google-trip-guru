import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Plane, 
  Hotel, 
  Utensils, 
  Calendar,
  ExternalLink,
  Sun,
  CloudRain,
  AlertTriangle
} from "lucide-react";

interface DayActivity {
  time: string;
  activity: string;
  location: string;
  duration: string;
  cost?: number;
  description: string;
}

interface DayPlan {
  day: number;
  theme: string;
  activities: DayActivity[];
  meals: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
  };
  accommodation: string;
}

interface TravelPlanProps {
  destination: string;
  days: string;
  budget: number;
  travelers: string;
  travelMode: string;
  accommodation: string;
  tripType: string;
}

export const TravelPlan = ({ destination, days, budget, travelers, travelMode, accommodation, tripType }: TravelPlanProps) => {
  // Mock data for demonstration - in real app, this would come from Google APIs
  const mockPlan: DayPlan[] = [
    {
      day: 1,
      theme: "Arrival & Local Exploration",
      activities: [
        {
          time: "10:00 AM",
          activity: "Arrival at Manali",
          location: "Manali Bus Stand",
          duration: "1 hour",
          cost: 0,
          description: "Check-in to accommodation and freshen up"
        },
        {
          time: "12:00 PM",
          activity: "Mall Road Shopping",
          location: "Mall Road, Manali",
          duration: "2 hours",
          cost: 500,
          description: "Explore local markets, buy souvenirs and warm clothes"
        },
        {
          time: "3:00 PM",
          activity: "Hadimba Temple Visit",
          location: "Hadimba Temple",
          duration: "1.5 hours",
          cost: 0,
          description: "Ancient cave temple surrounded by cedar forests"
        },
        {
          time: "6:00 PM",
          activity: "Sunset at Van Vihar",
          location: "Van Vihar National Park",
          duration: "1 hour",
          cost: 50,
          description: "Beautiful sunset views and nature walk"
        }
      ],
      meals: {
        lunch: "Johnson's Cafe (₹800 for 2)",
        dinner: "Casa Bella Vista (₹1200 for 2)"
      },
      accommodation: "Hotel Snow Valley (₹3500/night)"
    },
    {
      day: 2,
      theme: "Adventure & Scenic Beauty",
      activities: [
        {
          time: "8:00 AM",
          activity: "Solang Valley Adventure",
          location: "Solang Valley",
          duration: "6 hours",
          cost: 2500,
          description: "Paragliding, zorbing, and ropeway activities"
        },
        {
          time: "3:00 PM",
          activity: "Atal Tunnel Visit",
          location: "Atal Tunnel",
          duration: "2 hours",
          cost: 200,
          description: "World's longest highway tunnel above 10,000 feet"
        },
        {
          time: "6:00 PM",
          activity: "Local Market Exploration",
          location: "Old Manali Market",
          duration: "2 hours",
          cost: 300,
          description: "Tibetan cafes and local handicraft shopping"
        }
      ],
      meals: {
        breakfast: "Hotel breakfast (included)",
        lunch: "Solang Valley Food Court (₹600 for 2)",
        dinner: "Il Forno (₹1000 for 2)"
      },
      accommodation: "Hotel Snow Valley (₹3500/night)"
    }
  ];

  const totalCost = {
    transportation: travelMode === 'bus' ? 2000 : travelMode === 'flight' ? 8000 : 4000,
    accommodation: 7000,
    food: 4000,
    activities: 3550,
    miscellaneous: 1000
  };

  const grandTotal = Object.values(totalCost).reduce((sum, cost) => sum + cost, 0);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="shadow-card bg-gradient-card">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="text-3xl font-bold text-travel-navy flex items-center gap-2">
                <MapPin className="w-8 h-8 text-primary" />
                {destination} Travel Plan
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                {days} days • {travelers} • {tripType} trip
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="bg-travel-green text-white">
                Budget: ₹{budget.toLocaleString()}
              </Badge>
              <Badge variant="outline" className="border-primary text-primary">
                {travelMode}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Weather & Safety Alert */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-travel-navy">
              <Sun className="w-5 h-5 text-travel-orange" />
              Weather Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Partly cloudy, 15-25°C. Perfect for outdoor activities. Pack light jackets for evenings.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-travel-navy">
              <AlertTriangle className="w-5 h-5 text-travel-orange" />
              Safety Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Carry warm clothes, stay hydrated at high altitude, book activities in advance during peak season.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Itinerary */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-travel-navy">Daily Itinerary</h2>
        {mockPlan.map((day) => (
          <Card key={day.day} className="shadow-card">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2 text-travel-navy">
                <Calendar className="w-6 h-6 text-primary" />
                Day {day.day}: {day.theme}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Activities */}
              <div className="space-y-3">
                {day.activities.map((activity, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="flex-shrink-0">
                      <Badge variant="outline" className="border-primary text-primary">
                        <Clock className="w-3 h-3 mr-1" />
                        {activity.time}
                      </Badge>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-travel-navy">{activity.activity}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {activity.location} • {activity.duration}
                          </p>
                          <p className="text-sm mt-1">{activity.description}</p>
                        </div>
                        {activity.cost && activity.cost > 0 && (
                          <Badge variant="secondary" className="bg-travel-green text-white">
                            ₹{activity.cost}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Meals */}
              <div className="border-t pt-4">
                <h5 className="font-semibold text-travel-navy mb-2 flex items-center gap-2">
                  <Utensils className="w-4 h-4" />
                  Recommended Meals
                </h5>
                <div className="grid md:grid-cols-3 gap-2 text-sm">
                  {day.meals.breakfast && (
                    <p><span className="font-medium">Breakfast:</span> {day.meals.breakfast}</p>
                  )}
                  {day.meals.lunch && (
                    <p><span className="font-medium">Lunch:</span> {day.meals.lunch}</p>
                  )}
                  {day.meals.dinner && (
                    <p><span className="font-medium">Dinner:</span> {day.meals.dinner}</p>
                  )}
                </div>
              </div>

              {/* Accommodation */}
              <div className="border-t pt-4">
                <p className="text-sm flex items-center gap-2">
                  <Hotel className="w-4 h-4 text-primary" />
                  <span className="font-medium">Stay:</span> {day.accommodation}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cost Breakdown */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-travel-navy">
            <DollarSign className="w-6 h-6 text-travel-green" />
            Cost Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(totalCost).map(([category, cost]) => (
              <div key={category} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                <span className="capitalize font-medium text-travel-navy">
                  {category === 'miscellaneous' ? 'Miscellaneous' : category}
                </span>
                <span className="font-semibold">₹{cost.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 border-t-2 border-primary">
              <span className="text-lg font-bold text-travel-navy">Total Cost</span>
              <span className="text-xl font-bold text-travel-green">₹{grandTotal.toLocaleString()}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Budget remaining: ₹{(budget - grandTotal).toLocaleString()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button variant="default" className="bg-gradient-hero hover:opacity-90 text-white">
          <Calendar className="w-4 h-4 mr-2" />
          Add to Google Calendar
        </Button>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
          <ExternalLink className="w-4 h-4 mr-2" />
          Book Hotels
        </Button>
        <Button variant="outline" className="border-travel-green text-travel-green hover:bg-travel-green hover:text-white">
          <Plane className="w-4 h-4 mr-2" />
          Check Flights
        </Button>
      </div>
    </div>
  );
};