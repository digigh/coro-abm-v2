// Default Itinerary Data for ABM 2026 Summit
// This serves as the initial source for Supabase and the fallback if the DB is empty.

import venetianImg from '../assets/destinations/venetian.png';
import kowloonImg from '../assets/destinations/kowloon.png';
import oceanParkImg from '../assets/destinations/oceanpark.png';
import victoriaPeakImg from '../assets/destinations/victoria_peak.png';
import macauNeon from '../assets/destinations/macau_neon.png';
import np360Cool from '../assets/destinations/np360_cool.png';
import oceanParkFun from '../assets/destinations/ocean_park_fun.png';
import hotelNeon from '../assets/destinations/hotel_neon.png';
import landmarksCool from '../assets/destinations/landmarks_cool.png';

export const DEFAULT_BATCH_DATA = {
  1: {
    id: 1,
    title: "Batch 1",
    group: "GROUP 1",
    dates: "08–12 May 2026",
    stay: [
      { date: "08-10 May", hotel: "Harbour Grand Kowloon, Hong Kong" },
      { date: "10-12 May", hotel: "Venetian Macau" }
    ],
    itinerary: [
      {
        day: 1,
        date: "8th May",
        title: "Arrival & Lantau Exploration",
        dayImage: "https://images.unsplash.com/photo-1543059123-289b4f97125f?q=80&w=1000&auto=format&fit=crop",
        activities: [
          { time: "Morning", text: "Arrival into Hong Kong Airport", icon: "Plane", image: "/opt_landmarks.png" },
          { time: "Lunch", text: "Early lunch at Four Points by Sheraton", icon: "Utensils", map: "https://www.google.com/maps/search/?api=1&query=Four+Points+by+Sheraton+Hong+Kong+Tung+Chung", image: "/opt_hotels.png" },
          { time: "Afternoon", text: "NP 360 - Ngong Ping Cable Car Experience", icon: "Ship", map: "https://www.google.com/maps/search/?api=1&query=Ngong+Ping+360", image: "/opt_big_buddha.png" },
          { time: "Check-in", text: "Harbour Grand Kowloon", icon: "MapPin", map: "https://www.google.com/maps/search/?api=1&query=Harbour+Grand+Kowloon", image: "/batch1_bg.png" },
          { time: "Dinner", text: "Dinner at Indian restaurant", icon: "Utensils", image: "/bg-macao.png" }
        ],
        footer: "OVERNIGHT STAY AT HARBOUR GRAND KOWLOON"
      },
      {
        day: 2,
        date: "9th May",
        title: "Ocean Park Adventure",
        dayImage: "https://images.unsplash.com/photo-1513297856462-24e5c6a3dfb7?q=80&w=1000&auto=format&fit=crop",
        activities: [
          { time: "Breakfast", text: "Breakfast at the hotel", icon: "Coffee", image: "/opt_tea.png" },
          { time: "Full Day", text: "Trip to Ocean Park with Buffet Lunch", icon: "Star", map: "https://www.google.com/maps/search/?api=1&query=Ocean+Park+Hong+Kong", image: "/opt_landmarks.png" },
          { time: "Evening", text: "Spectacular Fireworks at Ocean Park", icon: "Music", image: "/stars_anime.gif" },
          { time: "Dinner", text: "Dinner at Indian restaurant", icon: "Utensils", image: "/opt_hotels.png" }
        ],
        footer: "OVERNIGHT STAY AT HARBOUR GRAND KOWLOON"
      },
      {
        day: 3,
        date: "10th May",
        title: "HK City Tour & Macau Transfer",
        dayImage: "https://images.unsplash.com/photo-1506351421178-63b52a2d2562?q=80&w=1000&auto=format&fit=crop",
        activities: [
          { time: "Morning", text: "Victoria Peak & Madame Tussauds", icon: "Compass", map: "https://www.google.com/maps/search/?api=1&query=Victoria+Peak+Hong+Kong", image: "/opt_landmarks.png" },
          { time: "Lunch", text: "Lunch at Indian Restaurant", icon: "Utensils", image: "/opt_hotels.png" },
          { time: "Transfer", text: "Hong Kong to Macau by High-Speed Ferry", icon: "Ship", image: "/ferry_image_ref.jpg" },
          { time: "Macau", text: "Check-in at Hotel Venetian", icon: "MapPin", map: "https://www.google.com/maps/search/?api=1&query=The+Venetian+Macao", image: "/opt_venetian_macau.png" },
          { time: "Tour", text: "Diamond Show, Eiffel Tower & Fountain show", icon: "Sparkles", image: "/opt_eiffel_tower.png" }
        ],
        footer: "OVERNIGHT STAY AT VENETIAN MACAU"
      },
      {
        day: 4,
        date: "11th May",
        title: "Strategic Meeting & Gala",
        dayImage: "https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?q=80&w=1000&auto=format&fit=crop",
        activities: [
          { time: "Morning", text: "Summit Meeting at Venetian Grand Ball room", icon: "Users", image: "/summit_bg.png" },
          { time: "Lunch", text: "Lunch at Venetian Grand Ball room", icon: "Utensils", image: "/opt_hotels.png" },
          { time: "Evening", text: "Grand Gala Dinner & Award Function", icon: "Crown", image: "/diamond_atrium.png" }
        ],
        footer: "OVERNIGHT STAY AT VENETIAN MACAU"
      },
      {
        day: 5,
        date: "12th May",
        title: "Macau City Tour & Departure",
        dayImage: "https://images.unsplash.com/photo-1589110477621-f2403caaf824?q=80&w=1000&auto=format&fit=crop",
        activities: [
          { time: "Morning", text: "Macau City Tour & Heritage exploration", icon: "Compass", image: "/opt_ruins_st_paul.png" },
          { time: "Lunch", text: "Lunch at the iconic Macau Tower", icon: "Utensils", map: "https://www.google.com/maps/search/?api=1&query=Macau+Tower", image: "/opt_galaxy_macau.png" },
          { time: "Departure", text: "Shuttle to HKIA via HZMB Bridge", icon: "Bus", image: "/hk_bg.png" },
          { time: "Final", text: "Fly back to India", icon: "Plane", image: "/opt_landmarks.png" }
        ],
        footer: "TOUR ENDS - BON VOYAGE"
      }
    ]
  },
  2: {
    id: 2,
    title: "Batch 2",
    group: "GROUP 2",
    dates: "10–14 May 2026",
    stay: [
      { date: "10-12 May", hotel: "Venetian Macau" },
      { date: "12-14 May", hotel: "Harbour Grand Kowloon, Hong Kong" }
    ],
    itinerary: [
      {
        day: 1,
        date: "10th May",
        title: "Arrival & Macau Heritage",
        dayImage: "https://images.unsplash.com/photo-1589110477621-f2403caaf824?q=80&w=1000&auto=format&fit=crop",
        activities: [
          { time: "Morning", text: "Arrival into Macau Ferry Terminal", icon: "Ship", image: "/ferry_image_ref.jpg" },
          { time: "Lunch", text: "Lunch at Indian Restaurant", icon: "Utensils", image: "/opt_hotels.png" },
          { time: "Macau", text: "Check-in at Hotel Venetian", icon: "MapPin", map: "https://www.google.com/maps/search/?api=1&query=The+Venetian+Macao", image: "/opt_venetian_macau.png" },
          { time: "Evening", text: "Diamond Show & Eiffel Tower Visit", icon: "Sparkles", image: "/opt_eiffel_tower.png" },
          { time: "Dinner", text: "Dinner at Venetian Grand Ball Room", icon: "Utensils", image: "/opt_hotels.png" }
        ],
        footer: "OVERNIGHT STAY AT VENETIAN MACAU"
      },
      {
        day: 2,
        date: "11th May",
        title: "Summit & Gala Celebration",
        dayImage: "https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?q=80&w=1000&auto=format&fit=crop",
        activities: [
          { time: "Morning", text: "Strategic Summit at Venetian Grand Ball room", icon: "Users", image: "/summit_bg.png" },
          { time: "Lunch", text: "Buffet Lunch at Venetian", icon: "Utensils", image: "/opt_hotels.png" },
          { time: "Gala", text: "Grand Gala Night & Recognition Awards", icon: "Crown", image: "/diamond_atrium.png" }
        ],
        footer: "OVERNIGHT STAY AT VENETIAN MACAU"
      },
      {
        day: 3,
        date: "12th May",
        title: "Macau Tour & HK Transfer",
        dayImage: "https://images.unsplash.com/photo-1506351421178-63b52a2d2562?q=80&w=1000&auto=format&fit=crop",
        activities: [
          { time: "Morning", text: "Macau City Tour & Heritage sights", icon: "Compass", image: "/opt_ruins_st_paul.png" },
          { time: "Lunch", text: "Lunch at Macau Tower", icon: "Utensils", map: "https://www.google.com/maps/search/?api=1&query=Macau+Tower", image: "/opt_galaxy_macau.png" },
          { time: "Transfer", text: "Macau to Hong Kong by Ferry", icon: "Ship", image: "/ferry_image_ref.jpg" },
          { time: "Check-in", text: "Harbour Grand Kowloon", icon: "MapPin", map: "https://www.google.com/maps/search/?api=1&query=Harbour+Grand+Kowloon", image: "/batch1_bg.png" }
        ],
        footer: "OVERNIGHT STAY AT HARBOUR GRAND KOWLOON"
      },
      {
        day: 4,
        date: "13th May",
        title: "Ocean Park Experience",
        dayImage: "https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?q=80&w=1000&auto=format&fit=crop",
        activities: [
          { time: "Morning", text: "Full day at Ocean Park", icon: "Star", map: "https://www.google.com/maps/search/?api=1&query=Ocean+Park+Hong+Kong", image: "/opt_landmarks.png" },
          { time: "Evening", text: "Free time for shopping in TST", icon: "MapPin", image: "/batch1_bg.png" },
          { time: "Dinner", text: "Farewell Dinner", icon: "Utensils", image: "/opt_hotels.png" }
        ],
        footer: "OVERNIGHT STAY AT HARBOUR GRAND KOWLOON"
      },
      {
        day: 5,
        date: "14th May",
        title: "Peak Visit & Departure",
        dayImage: "https://images.unsplash.com/photo-1513326738677-b964603b136d?q=80&w=1000&auto=format&fit=crop",
        activities: [
          { time: "Morning", text: "Victoria Peak & Madame Tussauds", icon: "Compass", map: "https://www.google.com/maps/search/?api=1&query=Victoria+Peak+Hong+Kong", image: "/opt_landmarks.png" },
          { time: "Transfer", text: "Transfer to Hong Kong Airport", icon: "Plane", image: "/hk_bg.png" },
          { time: "Final", text: "Departure for India", icon: "ChevronRight", image: "/opt_landmarks.png" }
        ],
        footer: "TOUR ENDS"
      }
    ]
  }
};
