// Mock data for different destinations when Google API is not available
export const getMockAttractions = (destination: string) => {
  const destinationData: Record<string, any[]> = {
    'manali': [
      {
        place_id: 'mock_1_manali',
        name: 'Hadimba Temple',
        formatted_address: 'Hadimba Temple Rd, Manali, Himachal Pradesh',
        rating: 4.3,
        price_level: 1,
        types: ['tourist_attraction', 'place_of_worship'],
        geometry: { location: { lat: 32.2396, lng: 77.1887 } }
      },
      {
        place_id: 'mock_2_manali',
        name: 'Solang Valley',
        formatted_address: 'Solang Valley, Manali, Himachal Pradesh',
        rating: 4.5,
        price_level: 2,
        types: ['tourist_attraction', 'natural_feature'],
        geometry: { location: { lat: 32.3080, lng: 77.1641 } }
      },
      {
        place_id: 'mock_3_manali',
        name: 'Mall Road',
        formatted_address: 'Mall Rd, Manali, Himachal Pradesh',
        rating: 4.2,
        price_level: 2,
        types: ['tourist_attraction', 'establishment'],
        geometry: { location: { lat: 32.2432, lng: 77.1892 } }
      }
    ],
    'goa': [
      {
        place_id: 'mock_1_goa',
        name: 'Baga Beach',
        formatted_address: 'Baga, Goa',
        rating: 4.1,
        price_level: 2,
        types: ['tourist_attraction', 'natural_feature'],
        geometry: { location: { lat: 15.5557, lng: 73.7519 } }
      },
      {
        place_id: 'mock_2_goa',
        name: 'Basilica of Bom Jesus',
        formatted_address: 'Old Goa, Goa',
        rating: 4.4,
        price_level: 1,
        types: ['tourist_attraction', 'place_of_worship'],
        geometry: { location: { lat: 15.5008, lng: 73.9114 } }
      }
    ],
    'vijayawada': [
      {
        place_id: 'mock_1_vijayawada',
        name: 'Kanaka Durga Temple',
        formatted_address: 'Indrakeeladri, Vijayawada, Andhra Pradesh',
        rating: 4.5,
        price_level: 1,
        types: ['tourist_attraction', 'place_of_worship'],
        geometry: { location: { lat: 16.5062, lng: 80.6480 } }
      },
      {
        place_id: 'mock_2_vijayawada',
        name: 'Prakasam Barrage',
        formatted_address: 'Prakasam Barrage, Vijayawada, Andhra Pradesh',
        rating: 4.2,
        price_level: 1,
        types: ['tourist_attraction', 'establishment'],
        geometry: { location: { lat: 16.5167, lng: 80.6167 } }
      }
    ]
  };

  const key = destination.toLowerCase();
  return destinationData[key] || [
    {
      place_id: `mock_1_${key}`,
      name: `${destination} City Center`,
      formatted_address: `Central ${destination}`,
      rating: 4.0 + Math.random() * 0.8,
      price_level: Math.floor(Math.random() * 3) + 1,
      types: ['tourist_attraction', 'establishment'],
      geometry: { location: { lat: 20 + Math.random() * 20, lng: 70 + Math.random() * 20 } }
    },
    {
      place_id: `mock_2_${key}`,
      name: `${destination} Heritage Site`,
      formatted_address: `Historic ${destination}`,
      rating: 4.2 + Math.random() * 0.6,
      price_level: Math.floor(Math.random() * 3) + 1,
      types: ['tourist_attraction', 'establishment'],
      geometry: { location: { lat: 20 + Math.random() * 20, lng: 70 + Math.random() * 20 } }
    }
  ];
};

export const getMockRestaurants = (destination: string) => {
  const destinationData: Record<string, any[]> = {
    'manali': [
      {
        place_id: 'rest_1_manali',
        name: "Johnson's Cafe",
        formatted_address: 'Mall Rd, Manali, Himachal Pradesh',
        rating: 4.4,
        price_level: 2,
        types: ['restaurant', 'food'],
        geometry: { location: { lat: 32.2432, lng: 77.1892 } }
      },
      {
        place_id: 'rest_2_manali',
        name: 'Casa Bella Vista',
        formatted_address: 'Log Huts Area, Manali, Himachal Pradesh',
        rating: 4.3,
        price_level: 3,
        types: ['restaurant', 'food'],
        geometry: { location: { lat: 32.2396, lng: 77.1887 } }
      }
    ],
    'goa': [
      {
        place_id: 'rest_1_goa',
        name: 'Britto\'s',
        formatted_address: 'Baga Beach, Goa',
        rating: 4.2,
        price_level: 2,
        types: ['restaurant', 'food'],
        geometry: { location: { lat: 15.5557, lng: 73.7519 } }
      }
    ],
    'vijayawada': [
      {
        place_id: 'rest_1_vijayawada',
        name: 'Minerva Coffee Shop',
        formatted_address: 'MG Road, Vijayawada, Andhra Pradesh',
        rating: 4.1,
        price_level: 2,
        types: ['restaurant', 'food'],
        geometry: { location: { lat: 16.5062, lng: 80.6480 } }
      }
    ]
  };

  const key = destination.toLowerCase();
  return destinationData[key] || [
    {
      place_id: `rest_1_${key}`,
      name: `${destination} Local Restaurant`,
      formatted_address: `Main Street, ${destination}`,
      rating: 4.0 + Math.random() * 0.8,
      price_level: Math.floor(Math.random() * 3) + 1,
      types: ['restaurant', 'food'],
      geometry: { location: { lat: 20 + Math.random() * 20, lng: 70 + Math.random() * 20 } }
    }
  ];
};