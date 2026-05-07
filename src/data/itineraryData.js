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
        date: "08/05/2026",
        title: "HK Arrival & Ngong Ping",
        activities: [
          { time: "Morning", text: "Arrival at Hong Kong Airport and freshen up", icon: "Plane", image: "/opt_landmarks.png" },
          { time: "12:30 PM", text: "Early lunch at Indian Restaurant", icon: "Utensils", image: "/opt_hotels.png" },
          { time: "02:00 PM", text: "Proceed to Ngong Ping 360 Cable Car", icon: "Ship", map: "https://www.google.com/maps/search/?api=1&query=Ngong+Ping+360", image: "/opt_big_buddha.png" },
          { time: "05:00 PM", text: "Check-in at Harbour Grand Kowloon", icon: "MapPin", map: "https://www.google.com/maps/search/?api=1&query=Harbour+Grand+Kowloon", image: "/batch1_bg.png" },
          { time: "07:00 PM", text: "Visit Hong Kong Avenue", icon: "Compass", image: "/opt_landmarks.png" },
          { time: "08:30 PM", text: "Dinner at Indian Restaurant", icon: "Utensils", image: "/bg-macao.png" }
        ],
        footer: "OVERNIGHT STAY AT HARBOUR GRAND KOWLOON"
      },
      {
        day: 2,
        date: "09/05/2026",
        title: "City Tour & Ocean Park",
        activities: [
          { time: "Morning", text: "Hong Kong City Tour – Victoria Peak", icon: "Compass", map: "https://www.google.com/maps/search/?api=1&query=Victoria+Peak+Hong+Kong", image: "/opt_landmarks.png" },
          { time: "Afternoon", text: "Trip to Ocean Park", icon: "Star", map: "https://www.google.com/maps/search/?api=1&query=Ocean+Park+Hong+Kong", image: "/opt_landmarks.png" },
          { time: "08:00 PM", text: "Dinner at Indian Restaurant", icon: "Utensils", image: "/opt_hotels.png" }
        ],
        footer: "OVERNIGHT STAY AT HARBOUR GRAND KOWLOON"
      },
      {
        day: 3,
        date: "10/05/2026",
        title: "HK – Macao City Tour",
        activities: [
          { time: "Morning", text: "Check out and transfer to Macao", icon: "Ship", image: "/ferry_image_ref.jpg" },
          { time: "Lunch", text: "Lunch at Macao Tower & City Tour", icon: "Utensils", map: "https://www.google.com/maps/search/?api=1&query=Macau+Tower", image: "/opt_galaxy_macau.png" },
          { time: "Check-in", text: "Check-in at The Venetian Hotel, Macao", icon: "MapPin", map: "https://www.google.com/maps/search/?api=1&query=The+Venetian+Macao", image: "/opt_venetian_macau.png" },
          { time: "Evening", text: "Macao Night Tour & Dinner at Indian Restaurant", icon: "Sparkles", image: "/opt_eiffel_tower.png" }
        ],
        footer: "OVERNIGHT STAY AT THE VENETIAN HOTEL, MACAO"
      },
      {
        day: 4,
        date: "11/05/2026",
        title: "Macao – Meeting (Full Day)",
        activities: [
          { time: "Full Day", text: "Strategic Meeting at the Grand Ballroom", icon: "Users", image: "/summit_bg.png" },
          { time: "Evening", text: "Gala Dinner and Awards Function", icon: "Crown", image: "/diamond_atrium.png" }
        ],
        footer: "OVERNIGHT STAY AT THE VENETIAN HOTEL, MACAO"
      },
      {
        day: 5,
        date: "12/05/2026",
        title: "Shopping & Departure",
        activities: [
          { time: "Morning", text: "Proceed to Hong Kong by Ferry Pier", icon: "Ship", image: "/ferry_image_ref.jpg" },
          { time: "Lunch", text: "Lunch at Indian Restaurant", icon: "Utensils", image: "/opt_hotels.png" },
          { time: "Afternoon", text: "Free time for shopping", icon: "MapPin", image: "/batch1_bg.png" },
          { time: "Transfer", text: "Transfer to HK International Airport", icon: "Plane", image: "/hk_bg.png" },
          { time: "Final", text: "Departure for India", icon: "CheckCircle", image: "/opt_landmarks.png" }
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
        date: "10/05/2026",
        title: "Arrival & Macao Tour",
        activities: [
          { time: "Morning", text: "Arrival at Hong Kong Airport and freshen-up", icon: "Plane", image: "/opt_landmarks.png" },
          { time: "Lunch", text: "Lunch at Indian Restaurant", icon: "Utensils", image: "/opt_hotels.png" },
          { time: "02:00 PM", text: "Proceed to Ngong Ping 360 Cable Car", icon: "Ship", map: "https://www.google.com/maps/search/?api=1&query=Ngong+Ping+360", image: "/opt_big_buddha.png" },
          { time: "Transfer", text: "Transfer to Macao", icon: "Ship", image: "/ferry_image_ref.jpg" },
          { time: "Check-in", text: "Check-in at The Venetian Hotel, Macao", icon: "MapPin", map: "https://www.google.com/maps/search/?api=1&query=The+Venetian+Macao", image: "/opt_venetian_macau.png" },
          { time: "Tour", text: "Macao City Tour and Dinner at Indian Restaurant", icon: "Compass", image: "/opt_ruins_st_paul.png" }
        ],
        footer: "OVERNIGHT STAY AT THE VENETIAN HOTEL, MACAO"
      },
      {
        day: 2,
        date: "11/05/2026",
        title: "Macao – Meeting (Full Day)",
        activities: [
          { time: "Full Day", text: "Meeting at the Grand Ballroom", icon: "Users", image: "/summit_bg.png" },
          { time: "Evening", text: "Gala Dinner and Awards Function", icon: "Crown", image: "/diamond_atrium.png" }
        ],
        footer: "OVERNIGHT STAY AT THE VENETIAN HOTEL, MACAO"
      },
      {
        day: 3,
        date: "12/05/2026",
        title: "Macao – HK Transfer",
        activities: [
          { time: "Morning", text: "Proceed for the Macao City Tour", icon: "Compass", image: "/opt_ruins_st_paul.png" },
          { time: "Lunch", text: "Lunch at Macao Tower", icon: "Utensils", map: "https://www.google.com/maps/search/?api=1&query=Macau+Tower", image: "/opt_galaxy_macau.png" },
          { time: "Transfer", text: "Transfer to Hong Kong", icon: "Ship", image: "/ferry_image_ref.jpg" },
          { time: "Check-in", text: "Check-in at Harbour Grand Kowloon", icon: "MapPin", map: "https://www.google.com/maps/search/?api=1&query=Harbour+Grand+Kowloon", image: "/batch1_bg.png" }
        ],
        footer: "OVERNIGHT STAY AT HARBOUR GRAND KOWLOON"
      },
      {
        day: 4,
        date: "13/05/2026",
        title: "City Tour & Ocean Park",
        activities: [
          { time: "Morning", text: "Hong Kong City Tour – Victoria Peak", icon: "Compass", map: "https://www.google.com/maps/search/?api=1&query=Victoria+Peak+Hong+Kong", image: "/opt_landmarks.png" },
          { time: "Afternoon", text: "Trip to Ocean Park", icon: "Star", map: "https://www.google.com/maps/search/?api=1&query=Ocean+Park+Hong+Kong", image: "/opt_landmarks.png" },
          { time: "08:00 PM", text: "Dinner at Indian Restaurant", icon: "Utensils", image: "/opt_hotels.png" }
        ],
        footer: "OVERNIGHT STAY AT HARBOUR GRAND KOWLOON"
      },
      {
        day: 5,
        date: "14/05/2026",
        title: "Shopping & Departure",
        activities: [
          { time: "After breakfast", text: "Check-out of the hotel", icon: "MapPin", image: "/opt_hotels.png" },
          { time: "Lunch", text: "Lunch at Indian Restaurant", icon: "Utensils", image: "/opt_hotels.png" },
          { time: "Afternoon", text: "Free time for shopping", icon: "MapPin", image: "/batch1_bg.png" },
          { time: "Transfer", text: "Transfer to HK International Airport", icon: "Plane", image: "/hk_bg.png" },
          { time: "Final", text: "Departure for India", icon: "CheckCircle", image: "/opt_landmarks.png" }
        ],
        footer: "TOUR ENDS - BON VOYAGE"
      }
    ]
  }
};
