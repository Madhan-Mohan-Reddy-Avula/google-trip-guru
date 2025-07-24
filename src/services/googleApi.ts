const GOOGLE_API_KEY = 'AIzaSyAglxuMhEL70F9Q_TnAsPIXvVweAbgL9lc';

export interface PlaceDetails {
  place_id: string;
  name: string;
  formatted_address: string;
  rating?: number;
  price_level?: number;
  photos?: Array<{
    photo_reference: string;
    width: number;
    height: number;
  }>;
  types: string[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export interface RouteData {
  distance: string;
  duration: string;
  steps: Array<{
    instruction: string;
    distance: string;
    duration: string;
  }>;
}

// Places API - Search for destinations and attractions
export const searchPlaces = async (query: string, location?: { lat: number; lng: number }): Promise<PlaceDetails[]> => {
  try {
    const locationParam = location ? `&location=${location.lat},${location.lng}&radius=50000` : '';
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}${locationParam}&key=${GOOGLE_API_KEY}`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching places:', error);
    return [];
  }
};

// Places API - Get place details
export const getPlaceDetails = async (placeId: string): Promise<PlaceDetails | null> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,formatted_address,price_level,photos,types,geometry&key=${GOOGLE_API_KEY}`
    );
    const data = await response.json();
    return data.result || null;
  } catch (error) {
    console.error('Error getting place details:', error);
    return null;
  }
};

// Geocoding API - Get coordinates for a destination
export const geocodeDestination = async (destination: string): Promise<{ lat: number; lng: number } | null> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(destination)}&key=${GOOGLE_API_KEY}`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].geometry.location;
    }
    return null;
  } catch (error) {
    console.error('Error geocoding destination:', error);
    return null;
  }
};

// Routes API - Get route information
export const getRoute = async (origin: string, destination: string): Promise<RouteData | null> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${GOOGLE_API_KEY}`
    );
    const data = await response.json();
    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      const leg = route.legs[0];
      return {
        distance: leg.distance.text,
        duration: leg.duration.text,
        steps: leg.steps.map((step: any) => ({
          instruction: step.html_instructions.replace(/<[^>]*>/g, ''),
          distance: step.distance.text,
          duration: step.duration.text,
        })),
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting route:', error);
    return null;
  }
};

// Weather API (using OpenWeatherMap as Google doesn't have a direct weather API)
export const getWeatherData = async (destination: string): Promise<WeatherData | null> => {
  try {
    // First get coordinates
    const coords = await geocodeDestination(destination);
    if (!coords) return null;

    // Note: This would require OpenWeatherMap API key, using mock data for now
    // In production, you'd need to sign up for OpenWeatherMap API
    return {
      temperature: Math.floor(Math.random() * 30) + 10,
      description: 'Partly cloudy',
      humidity: Math.floor(Math.random() * 40) + 40,
      windSpeed: Math.floor(Math.random() * 10) + 5,
      icon: '02d',
    };
  } catch (error) {
    console.error('Error getting weather data:', error);
    return null;
  }
};

// Translation API
export const translateText = async (text: string, targetLanguage: string): Promise<string> => {
  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLanguage,
          format: 'text',
        }),
      }
    );
    const data = await response.json();
    return data.data.translations[0].translatedText || text;
  } catch (error) {
    console.error('Error translating text:', error);
    return text;
  }
};

// Get nearby attractions
export const getNearbyAttractions = async (location: { lat: number; lng: number }, type: string = 'tourist_attraction'): Promise<PlaceDetails[]> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=10000&type=${type}&key=${GOOGLE_API_KEY}`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error getting nearby attractions:', error);
    return [];
  }
};

// Get nearby restaurants
export const getNearbyRestaurants = async (location: { lat: number; lng: number }): Promise<PlaceDetails[]> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=5000&type=restaurant&key=${GOOGLE_API_KEY}`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error getting nearby restaurants:', error);
    return [];
  }
};

// Get photo URL from photo reference
export const getPhotoUrl = (photoReference: string, maxWidth: number = 400): string => {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${GOOGLE_API_KEY}`;
};