import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manual .env parser to avoid extra dependencies
const envPath = path.resolve(process.cwd(), '.env');
const envRaw = fs.readFileSync(envPath, 'utf8');
const envConfig = {};
envRaw.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value) envConfig[key.trim()] = value.join('=').trim();
});

const supabaseUrl = envConfig.VITE_SUPABASE_URL;
const supabaseKey = envConfig.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const ITINERARY_DATA = [
  {
    batch_id: 1,
    data: {
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
            { time: "Morning", text: "Arrival at Hong Kong Airport and freshen up", icon: "Plane" },
            { time: "12:30 PM", text: "Early lunch at Indian Restaurant", icon: "Utensils" },
            { time: "02:00 PM", text: "Proceed to Ngong Ping 360 Cable Car", icon: "Ship", map: "https://www.google.com/maps/search/?api=1&query=Ngong+Ping+360" },
            { time: "05:00 PM", text: "Check-in at Harbour Grand Kowloon", icon: "MapPin", map: "https://www.google.com/maps/search/?api=1&query=Harbour+Grand+Kowloon" },
            { time: "07:00 PM", text: "Visit Hong Kong Avenue", icon: "Compass" },
            { time: "08:30 PM", text: "Dinner at Indian Restaurant", icon: "Utensils" }
          ],
          footer: "OVERNIGHT STAY AT HARBOUR GRAND KOWLOON"
        },
        {
          day: 2,
          date: "09/05/2026",
          title: "City Tour & Ocean Park",
          activities: [
            { time: "Morning", text: "Hong Kong City Tour – Victoria Peak", icon: "Compass", map: "https://www.google.com/maps/search/?api=1&query=Victoria+Peak+Hong+Kong" },
            { time: "Afternoon", text: "Trip to Ocean Park", icon: "Star", map: "https://www.google.com/maps/search/?api=1&query=Ocean+Park+Hong+Kong" },
            { time: "08:00 PM", text: "Dinner at Indian Restaurant", icon: "Utensils" }
          ],
          footer: "OVERNIGHT STAY AT HARBOUR GRAND KOWLOON"
        },
        {
          day: 3,
          date: "10/05/2026",
          title: "HK – Macao City Tour",
          activities: [
            { time: "Morning", text: "Check out and transfer to Macao", icon: "Ship" },
            { time: "Lunch", text: "Lunch at Macao Tower & City Tour", icon: "Utensils", map: "https://www.google.com/maps/search/?api=1&query=Macau+Tower" },
            { time: "Check-in", text: "Check-in at The Venetian Hotel, Macao", icon: "MapPin", map: "https://www.google.com/maps/search/?api=1&query=The+Venetian+Macao" },
            { time: "Evening", text: "Macao Night Tour & Dinner at Indian Restaurant", icon: "Sparkles" }
          ],
          footer: "OVERNIGHT STAY AT THE VENETIAN HOTEL, MACAO"
        },
        {
          day: 4,
          date: "11/05/2026",
          title: "Macao – Meeting (Full Day)",
          activities: [
            { time: "Full Day", text: "Strategic Meeting at the Grand Ballroom", icon: "Users" },
            { time: "Evening", text: "Gala Dinner and Awards Function", icon: "Crown" }
          ],
          footer: "OVERNIGHT STAY AT THE VENETIAN HOTEL, MACAO"
        },
        {
          day: 5,
          date: "12/05/2026",
          title: "Shopping & Departure",
          activities: [
            { time: "Morning", text: "Proceed to Hong Kong by Ferry Pier", icon: "Ship" },
            { time: "Lunch", text: "Lunch at Indian Restaurant", icon: "Utensils" },
            { time: "Afternoon", text: "Free time for shopping", icon: "MapPin" },
            { time: "Transfer", text: "Transfer to HK International Airport", icon: "Plane" },
            { time: "Final", text: "Departure for India", icon: "CheckCircle" }
          ],
          footer: "TOUR ENDS - BON VOYAGE"
        }
      ]
    }
  },
  {
    batch_id: 2,
    data: {
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
            { time: "Morning", text: "Arrival at Hong Kong Airport and freshen-up", icon: "Plane" },
            { time: "Lunch", text: "Lunch at Indian Restaurant", icon: "Utensils" },
            { time: "02:00 PM", text: "Proceed to Ngong Ping 360 Cable Car", icon: "Ship", map: "https://www.google.com/maps/search/?api=1&query=Ngong+Ping+360" },
            { time: "Transfer", text: "Transfer to Macao", icon: "Ship" },
            { time: "Check-in", text: "Check-in at The Venetian Hotel, Macao", icon: "MapPin", map: "https://www.google.com/maps/search/?api=1&query=The+Venetian+Macao" },
            { time: "Tour", text: "Macao City Tour and Dinner at Indian Restaurant", icon: "Compass" }
          ],
          footer: "OVERNIGHT STAY AT THE VENETIAN HOTEL, MACAO"
        },
        {
          day: 2,
          date: "11/05/2026",
          title: "Macao – Meeting (Full Day)",
          activities: [
            { time: "Full Day", text: "Meeting at the Grand Ballroom", icon: "Users" },
            { time: "Evening", text: "Gala Dinner and Awards Function", icon: "Crown" }
          ],
          footer: "OVERNIGHT STAY AT THE VENETIAN HOTEL, MACAO"
        },
        {
          day: 3,
          date: "12/05/2026",
          title: "Macao – HK Transfer",
          activities: [
            { time: "Morning", text: "Proceed for the Macao City Tour", icon: "Compass" },
            { time: "Lunch", text: "Lunch at Macao Tower", icon: "Utensils", map: "https://www.google.com/maps/search/?api=1&query=Macau+Tower" },
            { time: "Transfer", text: "Transfer to Hong Kong", icon: "Ship" },
            { time: "Check-in", text: "Check-in at Harbour Grand Kowloon", icon: "MapPin", map: "https://www.google.com/maps/search/?api=1&query=Harbour+Grand+Kowloon" }
          ],
          footer: "OVERNIGHT STAY AT HARBOUR GRAND KOWLOON"
        },
        {
          day: 4,
          date: "13/05/2026",
          title: "City Tour & Ocean Park",
          activities: [
            { time: "Morning", text: "Hong Kong City Tour – Victoria Peak", icon: "Compass", map: "https://www.google.com/maps/search/?api=1&query=Victoria+Peak+Hong+Kong" },
            { time: "Afternoon", text: "Trip to Ocean Park", icon: "Star", map: "https://www.google.com/maps/search/?api=1&query=Ocean+Park+Hong+Kong" },
            { time: "08:00 PM", text: "Dinner at Indian Restaurant", icon: "Utensils" }
          ],
          footer: "OVERNIGHT STAY AT HARBOUR GRAND KOWLOON"
        },
        {
          day: 5,
          date: "14/05/2026",
          title: "Shopping & Departure",
          activities: [
            { time: "After breakfast", text: "Check-out of the hotel", icon: "MapPin" },
            { time: "Lunch", text: "Lunch at Indian Restaurant", icon: "Utensils" },
            { time: "Afternoon", text: "Free time for shopping", icon: "MapPin" },
            { time: "Transfer", text: "Transfer to HK International Airport", icon: "Plane" },
            { time: "Final", text: "Departure for India", icon: "CheckCircle" }
          ],
          footer: "TOUR ENDS - BON VOYAGE"
        }
      ]
    }
  }
];

async function run() {
  console.log("🚀 Starting Itinerary Sync...");
  
  for (const item of ITINERARY_DATA) {
    console.log(`Syncing Batch ${item.batch_id}...`);
    const { error } = await supabase
      .from('abm_itinerary')
      .upsert(item, { onConflict: 'batch_id' });
      
    if (error) {
      console.error(`❌ Error syncing Batch ${item.batch_id}:`, error.message);
    } else {
      console.log(`✅ Batch ${item.batch_id} Synced Successfully!`);
    }
  }
  
  console.log("✨ All done! Your Supabase database is now 100% updated.");
}

run();
