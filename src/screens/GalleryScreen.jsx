import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Calendar, ExternalLink } from 'lucide-react';
import { getOptimizedImageUrl, getOptimizedVideoUrl } from '../utils/cloudinaryUtils';
import './GalleryScreen.css';

const GALLERY_DATA = {
  2025: {
    year: "2025",
    theme: "REACHING NEW HEIGHTS",
    location: "Singapore & Bali",
    stats: { attendees: "450+", highlights: "Skyline Gala", rewards: "25 Awards" },
    media: [
      { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1525624905535-d46c31b81b7c?q=80&w=800&auto=format&fit=crop', title: 'Singapore Skyline' },
      { id: 2, type: 'video', url: 'https://images.unsplash.com/photo-1548625361-195fe576b510?q=80&w=800&auto=format&fit=crop', title: 'Bali Beach Retreat' },
      { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=800&auto=format&fit=crop', title: 'Grand Ballroom Setup' },
      { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop', title: 'Evening Gala Performance' },
      { id: 5, type: 'video', url: 'https://images.unsplash.com/photo-1514525253361-bee8718a300c?q=80&w=800&auto=format&fit=crop', title: 'Awards Ceremony Highlights' },
      { id: 6, type: 'image', url: 'https://images.unsplash.com/photo-1505232458627-41bed68113ad?q=80&w=800&auto=format&fit=crop', title: 'Team Building Adventure' },
    ]
  },
  2024: {
    year: "2024",
    theme: "STRATEGY UNLEASHED",
    location: "Dubai & Abu Dhabi",
    stats: { attendees: "400+", highlights: "Desert Safari", rewards: "20 Awards" },
    categories: ["ALL"],
    media: [
      { "id": 2000, "type": "image", "url": "/ABM_2024/251124_C1_0003.JPG", "title": "ABM 2024 Moment 1", "category": "ALL" },
      { "id": 2001, "type": "image", "url": "/ABM_2024/251124_C1_0005.JPG", "title": "ABM 2024 Moment 2", "category": "ALL" },
      { "id": 2002, "type": "image", "url": "/ABM_2024/251124_C1_0012.JPG", "title": "ABM 2024 Moment 3", "category": "ALL" },
      { "id": 2003, "type": "image", "url": "/ABM_2024/251124_C1_0022.JPG", "title": "ABM 2024 Moment 4", "category": "ALL" },
      { "id": 2004, "type": "image", "url": "/ABM_2024/251124_C1_0028.JPG", "title": "ABM 2024 Moment 5", "category": "ALL", "featured": true },
      { "id": 2005, "type": "image", "url": "/ABM_2024/251124_C1_0033.JPG", "title": "ABM 2024 Moment 6", "category": "ALL" },
      { "id": 2006, "type": "image", "url": "/ABM_2024/251124_C1_0034.JPG", "title": "ABM 2024 Moment 7", "category": "ALL" },
      { "id": 2007, "type": "image", "url": "/ABM_2024/251124_C1_0047.JPG", "title": "ABM 2024 Moment 8", "category": "ALL" },
      { "id": 2008, "type": "image", "url": "/ABM_2024/251124_C1_0048.JPG", "title": "ABM 2024 Moment 9", "category": "ALL" },
      { "id": 2009, "type": "image", "url": "/ABM_2024/251124_C1_0067.JPG", "title": "ABM 2024 Moment 10", "category": "ALL", "featured": true },
      { "id": 2010, "type": "image", "url": "/ABM_2024/251124_C1_0070.JPG", "title": "ABM 2024 Moment 11", "category": "ALL" },
      { "id": 2011, "type": "image", "url": "/ABM_2024/251124_C1_0075.JPG", "title": "ABM 2024 Moment 12", "category": "ALL" },
      { "id": 2012, "type": "image", "url": "/ABM_2024/251124_C1_0084.JPG", "title": "ABM 2024 Moment 13", "category": "ALL" },
      { "id": 2013, "type": "image", "url": "/ABM_2024/251124_C1_0093.JPG", "title": "ABM 2024 Moment 14", "category": "ALL" },
      { "id": 2014, "type": "image", "url": "/ABM_2024/251124_C1_0121.JPG", "title": "ABM 2024 Moment 15", "category": "ALL", "featured": true },
      { "id": 2015, "type": "image", "url": "/ABM_2024/251124_C1_0134.JPG", "title": "ABM 2024 Moment 16", "category": "ALL" },
      { "id": 2016, "type": "image", "url": "/ABM_2024/251124_C1_0135.JPG", "title": "ABM 2024 Moment 17", "category": "ALL" },
      { "id": 2017, "type": "image", "url": "/ABM_2024/251124_C1_0162.JPG", "title": "ABM 2024 Moment 18", "category": "ALL" },
      { "id": 2018, "type": "image", "url": "/ABM_2024/251124_C1_0204.JPG", "title": "ABM 2024 Moment 19", "category": "ALL" },
      { "id": 2019, "type": "image", "url": "/ABM_2024/251124_C1_0259.JPG", "title": "ABM 2024 Moment 20", "category": "ALL", "featured": true },
      { "id": 2020, "type": "image", "url": "/ABM_2024/251124_C1_0375.JPG", "title": "ABM 2024 Moment 21", "category": "ALL" },
      { "id": 2021, "type": "image", "url": "/ABM_2024/251124_C1_0376.JPG", "title": "ABM 2024 Moment 22", "category": "ALL" },
      { "id": 2022, "type": "image", "url": "/ABM_2024/251124_C1_0453.JPG", "title": "ABM 2024 Moment 23", "category": "ALL" },
      { "id": 2023, "type": "image", "url": "/ABM_2024/251124_C1_0474.JPG", "title": "ABM 2024 Moment 24", "category": "ALL" },
      { "id": 2024, "type": "image", "url": "/ABM_2024/251124_C1_0507.JPG", "title": "ABM 2024 Moment 25", "category": "ALL", "featured": true },
      { "id": 2025, "type": "image", "url": "/ABM_2024/251124_C1_0603.JPG", "title": "ABM 2024 Moment 26", "category": "ALL" },
      { "id": 2026, "type": "image", "url": "/ABM_2024/251124_C1_0606.JPG", "title": "ABM 2024 Moment 27", "category": "ALL" },
      { "id": 2027, "type": "image", "url": "/ABM_2024/251124_C1_0612.JPG", "title": "ABM 2024 Moment 28", "category": "ALL" },
      { "id": 2028, "type": "image", "url": "/ABM_2024/251124_C1_0635.JPG", "title": "ABM 2024 Moment 29", "category": "ALL" },
      { "id": 2029, "type": "image", "url": "/ABM_2024/251124_C1_0637.JPG", "title": "ABM 2024 Moment 30", "category": "ALL", "featured": true },
      { "id": 2030, "type": "image", "url": "/ABM_2024/251124_C1_0654.JPG", "title": "ABM 2024 Moment 31", "category": "ALL" },
      { "id": 2031, "type": "image", "url": "/ABM_2024/251124_C1_0731.JPG", "title": "ABM 2024 Moment 32", "category": "ALL" },
      { "id": 2032, "type": "image", "url": "/ABM_2024/251124_C1_0789.JPG", "title": "ABM 2024 Moment 33", "category": "ALL" },
      { "id": 2033, "type": "image", "url": "/ABM_2024/251124_C1_0791.JPG", "title": "ABM 2024 Moment 34", "category": "ALL" },
      { "id": 2034, "type": "image", "url": "/ABM_2024/251124_C1_0802.JPG", "title": "ABM 2024 Moment 35", "category": "ALL", "featured": true },
      { "id": 2035, "type": "image", "url": "/ABM_2024/251124_C1_0893.JPG", "title": "ABM 2024 Moment 36", "category": "ALL" },
      { "id": 2036, "type": "image", "url": "/ABM_2024/251124_C1_0931.JPG", "title": "ABM 2024 Moment 37", "category": "ALL" },
      { "id": 2037, "type": "image", "url": "/ABM_2024/251124_C1_0948.JPG", "title": "ABM 2024 Moment 38", "category": "ALL" },
      { "id": 2038, "type": "image", "url": "/ABM_2024/251124_C1_0997.JPG", "title": "ABM 2024 Moment 39", "category": "ALL" },
      { "id": 2039, "type": "image", "url": "/ABM_2024/251124_C1_1027.JPG", "title": "ABM 2024 Moment 40", "category": "ALL", "featured": true },
      { "id": 2040, "type": "image", "url": "/ABM_2024/C2 251124_0004.jpg", "title": "ABM 2024 Moment 41", "category": "ALL" },
      { "id": 2041, "type": "image", "url": "/ABM_2024/C2 251124_0005.jpg", "title": "ABM 2024 Moment 42", "category": "ALL" },
      { "id": 2042, "type": "image", "url": "/ABM_2024/C2 251124_0012.jpg", "title": "ABM 2024 Moment 43", "category": "ALL" },
      { "id": 2043, "type": "image", "url": "/ABM_2024/C2 251124_0020.jpg", "title": "ABM 2024 Moment 44", "category": "ALL" },
      { "id": 2044, "type": "image", "url": "/ABM_2024/C2 251124_0027.jpg", "title": "ABM 2024 Moment 45", "category": "ALL", "featured": true },
      { "id": 2045, "type": "image", "url": "/ABM_2024/C2 251124_0029.jpg", "title": "ABM 2024 Moment 46", "category": "ALL" },
      { "id": 2046, "type": "image", "url": "/ABM_2024/C2 251124_0039.jpg", "title": "ABM 2024 Moment 47", "category": "ALL" },
      { "id": 2047, "type": "image", "url": "/ABM_2024/C2 251124_0081.jpg", "title": "ABM 2024 Moment 48", "category": "ALL" },
      { "id": 2048, "type": "image", "url": "/ABM_2024/C2 251124_0082.jpg", "title": "ABM 2024 Moment 49", "category": "ALL" },
      { "id": 2049, "type": "image", "url": "/ABM_2024/C2 251124_0107.jpg", "title": "ABM 2024 Moment 50", "category": "ALL", "featured": true },
      { "id": 2050, "type": "image", "url": "/ABM_2024/C2 251124_0110.jpg", "title": "ABM 2024 Moment 51", "category": "ALL" },
      { "id": 2051, "type": "image", "url": "/ABM_2024/C2 251124_0124.jpg", "title": "ABM 2024 Moment 52", "category": "ALL" },
      { "id": 2052, "type": "image", "url": "/ABM_2024/C2 251124_0196.jpg", "title": "ABM 2024 Moment 53", "category": "ALL" },
      { "id": 2053, "type": "image", "url": "/ABM_2024/C2 251124_0203.jpg", "title": "ABM 2024 Moment 54", "category": "ALL" },
      { "id": 2054, "type": "image", "url": "/ABM_2024/C2 251124_0219.jpg", "title": "ABM 2024 Moment 55", "category": "ALL", "featured": true },
      { "id": 2055, "type": "image", "url": "/ABM_2024/C2 251124_0228.jpg", "title": "ABM 2024 Moment 56", "category": "ALL" },
      { "id": 2056, "type": "image", "url": "/ABM_2024/C2 251124_0251.jpg", "title": "ABM 2024 Moment 57", "category": "ALL" },
      { "id": 2057, "type": "image", "url": "/ABM_2024/C2 251124_0254.jpg", "title": "ABM 2024 Moment 58", "category": "ALL" },
      { "id": 2058, "type": "image", "url": "/ABM_2024/C2 251124_0256.jpg", "title": "ABM 2024 Moment 59", "category": "ALL" },
      { "id": 2059, "type": "image", "url": "/ABM_2024/C2 251124_0290.jpg", "title": "ABM 2024 Moment 60", "category": "ALL", "featured": true },
      { "id": 2060, "type": "image", "url": "/ABM_2024/C2 251124_0344.jpg", "title": "ABM 2024 Moment 61", "category": "ALL" },
      { "id": 2061, "type": "image", "url": "/ABM_2024/C2 251124_0622.jpg", "title": "ABM 2024 Moment 62", "category": "ALL" },
      { "id": 2062, "type": "image", "url": "/ABM_2024/C2 251124_0645.jpg", "title": "ABM 2024 Moment 63", "category": "ALL" },
      { "id": 2063, "type": "image", "url": "/ABM_2024/C2 251124_0657.jpg", "title": "ABM 2024 Moment 64", "category": "ALL" },
      { "id": 2064, "type": "image", "url": "/ABM_2024/C2 251124_0658.jpg", "title": "ABM 2024 Moment 65", "category": "ALL", "featured": true },
      { "id": 2065, "type": "image", "url": "/ABM_2024/C2 251124_0665.jpg", "title": "ABM 2024 Moment 66", "category": "ALL" },
      { "id": 2066, "type": "image", "url": "/ABM_2024/C2 251124_0675.jpg", "title": "ABM 2024 Moment 67", "category": "ALL" },
      { "id": 2067, "type": "image", "url": "/ABM_2024/C2 251124_0701.jpg", "title": "ABM 2024 Moment 68", "category": "ALL" },
      { "id": 2068, "type": "image", "url": "/ABM_2024/C2 251124_0713.jpg", "title": "ABM 2024 Moment 69", "category": "ALL" },
      { "id": 2069, "type": "image", "url": "/ABM_2024/C2 251124_0773.jpg", "title": "ABM 2024 Moment 70", "category": "ALL", "featured": true },
      { "id": 2070, "type": "image", "url": "/ABM_2024/C2 251124_0776.jpg", "title": "ABM 2024 Moment 71", "category": "ALL" },
      { "id": 2071, "type": "image", "url": "/ABM_2024/C2 251124_0782.jpg", "title": "ABM 2024 Moment 72", "category": "ALL" },
      { "id": 2072, "type": "image", "url": "/ABM_2024/C2 251124_0783.jpg", "title": "ABM 2024 Moment 73", "category": "ALL" },
      { "id": 2073, "type": "image", "url": "/ABM_2024/C2 251124_0855.jpg", "title": "ABM 2024 Moment 74", "category": "ALL" },
      { "id": 2074, "type": "image", "url": "/ABM_2024/C2 251124_0932.jpg", "title": "ABM 2024 Moment 75", "category": "ALL", "featured": true },
      { "id": 2075, "type": "image", "url": "/ABM_2024/C2 251124_1016.jpg", "title": "ABM 2024 Moment 76", "category": "ALL" },
      { "id": 2076, "type": "image", "url": "/ABM_2024/C2 251124_1070.jpg", "title": "ABM 2024 Moment 77", "category": "ALL" },
      { "id": 2077, "type": "image", "url": "/ABM_2024/C2 251124_1150.jpg", "title": "ABM 2024 Moment 78", "category": "ALL" },
      { "id": 2078, "type": "image", "url": "/ABM_2024/C2 251124_1194.jpg", "title": "ABM 2024 Moment 79", "category": "ALL" }
    ]
  },
  2023: {
    year: "2023",
    theme: "THE NEW FRONTIER",
    location: "Mumbai & Goa",
    stats: { attendees: "350+", highlights: "Beach Bash", rewards: "18 Awards" },
    categories: ["ALL", "ABM 2023", "GALA", "GO KART", "SHOOTING RANGE", "IMAGES"],
    media: [
      { "id": 1000, "type": "image", "url": "/ABM_2023/ABM 2023 Image/ABM 2023/_MG_4208.jpg", "title": "Summit Keynote", "category": "ABM 2023", "featured": true },
      { "id": 1001, "type": "image", "url": "/ABM_2023/ABM 2023 Image/ABM 2023/_MG_4220.jpg", "title": "Leadership Talk", "category": "ABM 2023" },
      { "id": 1002, "type": "image", "url": "/ABM_2023/ABM 2023 Image/ABM 2023/_MG_4272.jpg", "title": "Strategy Session", "category": "ABM 2023" },
      { "id": 1003, "type": "image", "url": "/ABM_2023/ABM 2023 Image/ABM 2023/_MG_4284.jpg", "title": "Interactive Workshop", "category": "ABM 2023", "featured": true },
      { "id": 1004, "type": "image", "url": "/ABM_2023/ABM 2023 Image/ABM 2023/_MG_4335.jpg", "title": "Group Photo", "category": "ABM 2023" },
      { "id": 1005, "type": "image", "url": "/ABM_2023/ABM 2023 Image/ABM 2023/_MG_4348.jpg", "title": "Networking Break", "category": "ABM 2023" },
      { "id": 1006, "type": "image", "url": "/ABM_2023/ABM 2023 Image/ABM 2023/_MG_4354.jpg", "title": "Discussion Panel", "category": "ABM 2023" },
      { "id": 1007, "type": "image", "url": "/ABM_2023/ABM 2023 Image/ABM 2023/_MG_4370.jpg", "title": "Q&A Session", "category": "ABM 2023" },
      { "id": 1008, "type": "image", "url": "/ABM_2023/ABM 2023 Image/ABM 2023/_MG_4387.jpg", "title": "Tech Showcase", "category": "ABM 2023" },
      { "id": 1009, "type": "image", "url": "/ABM_2023/ABM 2023 Image/ABM 2023/_MG_4534.jpg", "title": "Executive Briefing", "category": "ABM 2023" },
      { "id": 1010, "type": "image", "url": "/ABM_2023/ABM 2023 Image/ABM 2023/_MG_4824.jpg", "title": "Innovation Lab", "category": "ABM 2023" },
      { "id": 1011, "type": "image", "url": "/ABM_2023/ABM 2023 Image/ABM 2023/_MG_4828.jpg", "title": "Digital Transformation", "category": "ABM 2023" },
      { "id": 1012, "type": "image", "url": "/ABM_2023/ABM 2023 Image/ABM 2023/_MG_4843.jpg", "title": "Market Trends", "category": "ABM 2023" },
      { "id": 1013, "type": "image", "url": "/ABM_2023/ABM 2023 Image/ABM 2023/_MG_4844.jpg", "title": "Future Planning", "category": "ABM 2023" },
      { "id": 1014, "type": "image", "url": "/ABM_2023/ABM 2023 Image/ABM 2023/_MG_4860.jpg", "title": "Closing Remarks", "category": "ABM 2023" },
      { "id": 1015, "type": "image", "url": "/ABM_2023/ABM 2023 Image/ABM 2023/_MG_4883.jpg", "title": "Summit Wrap-up", "category": "ABM 2023" },
      { "id": 1016, "type": "image", "url": "/ABM_2023/ABM 2023 Image/GALA/_MG_1147.jpg", "title": "Gala Opening", "category": "GALA", "featured": true },
      { "id": 1017, "type": "image", "url": "/ABM_2023/ABM 2023 Image/GALA/_MG_1177.jpg", "title": "Award Presentation", "category": "GALA" },
      { "id": 1018, "type": "image", "url": "/ABM_2023/ABM 2023 Image/GALA/_MG_1209.jpg", "title": "Celebration Dance", "category": "GALA" },
      { "id": 1019, "type": "image", "url": "/ABM_2023/ABM 2023 Image/GALA/_MG_1373.jpg", "title": "Dinner Service", "category": "GALA" },
      { "id": 1020, "type": "image", "url": "/ABM_2023/ABM 2023 Image/GALA/_MG_1456.jpg", "title": "Red Carpet Moment", "category": "GALA", "featured": true },
      { "id": 1021, "type": "image", "url": "/ABM_2023/ABM 2023 Image/GALA/_MG_1528.jpg", "title": "Trophy Showcase", "category": "GALA" },
      { "id": 1022, "type": "image", "url": "/ABM_2023/ABM 2023 Image/GALA/_MG_1581.jpg", "title": "Evening Performance", "category": "GALA" },
      { "id": 1023, "type": "image", "url": "/ABM_2023/ABM 2023 Image/GALA/_MG_1616.jpg", "title": "Gala Farewell", "category": "GALA" },
      { "id": 1024, "type": "image", "url": "/ABM_2023/ABM 2023 Image/Go Kart/_MG_0095.jpg", "title": "Track Entry", "category": "GO KART", "featured": true },
      { "id": 1025, "type": "image", "url": "/ABM_2023/ABM 2023 Image/Go Kart/_MG_0116.jpg", "title": "Racing Duel", "category": "GO KART" },
      { "id": 1026, "type": "image", "url": "/ABM_2023/ABM 2023 Image/Go Kart/_MG_0311.jpg", "title": "Pit Stop", "category": "GO KART" },
      { "id": 1027, "type": "image", "url": "/ABM_2023/ABM 2023 Image/Go Kart/_MG_0358.jpg", "title": "Speed Challenge", "category": "GO KART", "featured": true },
      { "id": 1028, "type": "image", "url": "/ABM_2023/ABM 2023 Image/Go Kart/_MG_0360.jpg", "title": "Winner's Circle", "category": "GO KART" },
      { "id": 1029, "type": "image", "url": "/ABM_2023/ABM 2023 Image/Go Kart/_MG_0368.jpg", "title": "Action Shot", "category": "GO KART" },
      { "id": 1030, "type": "image", "url": "/ABM_2023/ABM 2023 Image/Go Kart/_MG_0445.jpg", "title": "Team Race", "category": "GO KART" },
      { "id": 1031, "type": "image", "url": "/ABM_2023/ABM 2023 Image/Shooting Range/_MG_3271.jpg", "title": "Target Practice", "category": "SHOOTING RANGE", "featured": true },
      { "id": 1032, "type": "image", "url": "/ABM_2023/ABM 2023 Image/Shooting Range/_MG_3283.jpg", "title": "Aiming High", "category": "SHOOTING RANGE" },
      { "id": 1033, "type": "image", "url": "/ABM_2023/ABM 2023 Image/Shooting Range/_MG_3310.jpg", "title": "Focus Mode", "category": "SHOOTING RANGE" },
      { "id": 1034, "type": "image", "url": "/ABM_2023/ABM 2023 Image/Shooting Range/_MG_3318.jpg", "title": "Safety Briefing", "category": "SHOOTING RANGE" },
      { "id": 1035, "type": "image", "url": "/ABM_2023/ABM 2023 Image/Shooting Range/_MG_3343.jpg", "title": "Range Action", "category": "SHOOTING RANGE", "featured": true },
      { "id": 1036, "type": "image", "url": "/ABM_2023/ABM 2023 Image/Shooting Range/_MG_3376.jpg", "title": "Precision Shot", "category": "SHOOTING RANGE" },
      { "id": 1037, "type": "image", "url": "/ABM_2023/ABM 2023 Image/Shooting Range/_MG_3393.jpg", "title": "Team Bonding", "category": "SHOOTING RANGE" },
      { "id": 1038, "type": "image", "url": "/ABM_2023/ABM 2023 Image/Shooting Range/_MG_3411.jpg", "title": "Marksmanship", "category": "SHOOTING RANGE" },
      { "id": 1039, "type": "image", "url": "/ABM_2023/ABM 2023 Image/Shooting Range/_MG_3429.jpg", "title": "Shooting Drill", "category": "SHOOTING RANGE" },
      { "id": 1040, "type": "image", "url": "/ABM_2023/ABM 2023 Image/Shooting Range/_MG_3480.jpg", "title": "Range Day", "category": "SHOOTING RANGE" },
      { "id": 1041, "type": "image", "url": "/ABM_2023/ABM 2023 Image/Shooting Range/_MG_3762.jpg", "title": "Bullseye Moment", "category": "SHOOTING RANGE" },
      { "id": 1042, "type": "image", "url": "/ABM_2023/ABM 2023 Image/Shooting Range/_MG_3769.jpg", "title": "Competition End", "category": "SHOOTING RANGE" },
      { "id": 1043, "type": "image", "url": "/ABM_2023/Images/Coromandel-100.JPG", "title": "Beach View", "category": "IMAGES", "featured": true },
      { "id": 1044, "type": "image", "url": "/ABM_2023/Images/Coromandel-101.JPG", "title": "Coastal Walk", "category": "IMAGES" },
      { "id": 1045, "type": "image", "url": "/ABM_2023/Images/Coromandel-102.JPG", "title": "Ocean Breeze", "category": "IMAGES" },
      { "id": 1046, "type": "image", "url": "/ABM_2023/Images/Coromandel-109.JPG", "title": "Sunset Horizon", "category": "IMAGES", "featured": true },
      { "id": 1047, "type": "image", "url": "/ABM_2023/Images/Coromandel-110.JPG", "title": "Leisure Time", "category": "IMAGES" },
      { "id": 1048, "type": "image", "url": "/ABM_2023/Images/Coromandel-125.JPG", "title": "Morning Surf", "category": "IMAGES" },
      { "id": 1049, "type": "image", "url": "/ABM_2023/Images/Coromandel-127.JPG", "title": "Beachside Fun", "category": "IMAGES" },
      { "id": 1050, "type": "image", "url": "/ABM_2023/Images/Coromandel-143.JPG", "title": "Tropical Vibes", "category": "IMAGES" },
      { "id": 1051, "type": "image", "url": "/ABM_2023/Images/Coromandel-16.JPG", "title": "Island Life", "category": "IMAGES" },
      { "id": 1052, "type": "image", "url": "/ABM_2023/Images/Coromandel-166.JPG", "title": "Azure Waters", "category": "IMAGES" },
      { "id": 1053, "type": "image", "url": "/ABM_2023/Images/Coromandel-193.JPG", "title": "Relaxing Sands", "category": "IMAGES" },
      { "id": 1054, "type": "image", "url": "/ABM_2023/Images/Coromandel-201.JPG", "title": "Palm Trees", "category": "IMAGES" },
      { "id": 1055, "type": "image", "url": "/ABM_2023/Images/Coromandel-231.JPG", "title": "Coastal Cliffs", "category": "IMAGES" },
      { "id": 1056, "type": "image", "url": "/ABM_2023/Images/Coromandel-233.JPG", "title": "Secret Cove", "category": "IMAGES" },
      { "id": 1057, "type": "image", "url": "/ABM_2023/Images/Coromandel-243.JPG", "title": "Rocky Shore", "category": "IMAGES" },
      { "id": 1058, "type": "image", "url": "/ABM_2023/Images/Coromandel-249.JPG", "title": "Pristine Beach", "category": "IMAGES" },
      { "id": 1059, "type": "image", "url": "/ABM_2023/Images/Coromandel-261.JPG", "title": "Wave Action", "category": "IMAGES" },
      { "id": 1060, "type": "image", "url": "/ABM_2023/Images/Coromandel-274.JPG", "title": "Summer Sun", "category": "IMAGES" },
      { "id": 1061, "type": "image", "url": "/ABM_2023/Images/Coromandel-292.JPG", "title": "Clear Sky", "category": "IMAGES" },
      { "id": 1062, "type": "image", "url": "/ABM_2023/Images/Coromandel-356.JPG", "title": "Beach Path", "category": "IMAGES" },
      { "id": 1063, "type": "image", "url": "/ABM_2023/Images/Coromandel-39.JPG", "title": "Wild Coast", "category": "IMAGES" },
      { "id": 1064, "type": "image", "url": "/ABM_2023/Images/Coromandel-393.JPG", "title": "Panoramic View", "category": "IMAGES" },
      { "id": 1065, "type": "image", "url": "/ABM_2023/Images/Coromandel-407.JPG", "title": "Shell Hunting", "category": "IMAGES" },
      { "id": 1066, "type": "image", "url": "/ABM_2023/Images/Coromandel-409.JPG", "title": "Sand Dunes", "category": "IMAGES" },
      { "id": 1067, "type": "image", "url": "/ABM_2023/Images/Coromandel-415.JPG", "title": "Ocean Spray", "category": "IMAGES" },
      { "id": 1068, "type": "image", "url": "/ABM_2023/Images/Coromandel-421.JPG", "title": "Bright Day", "category": "IMAGES" },
      { "id": 1069, "type": "image", "url": "/ABM_2023/Images/Coromandel-440.JPG", "title": "Nature's Best", "category": "IMAGES" },
      { "id": 1070, "type": "image", "url": "/ABM_2023/Images/Coromandel-446.JPG", "title": "Greenery", "category": "IMAGES" },
      { "id": 1071, "type": "image", "url": "/ABM_2023/Images/Coromandel-456.JPG", "title": "Retreat Setting", "category": "IMAGES" },
      { "id": 1072, "type": "image", "url": "/ABM_2023/Images/Coromandel-5.JPG", "title": "First Look", "category": "IMAGES" },
      { "id": 1073, "type": "image", "url": "/ABM_2023/Images/Coromandel-74.JPG", "title": "Tide Pool", "category": "IMAGES" },
      { "id": 1074, "type": "image", "url": "/ABM_2023/Images/Coromandel-90.JPG", "title": "Shoreline", "category": "IMAGES" },
      { "id": 1075, "type": "image", "url": "/ABM_2023/Images/Coromandel.JPG", "title": "Destination Hub", "category": "IMAGES" },
      { "id": 1076, "type": "image", "url": "/ABM_2023/Images/_MG_4921.jpg", "title": "Evening Chill", "category": "IMAGES" },
      { "id": 1077, "type": "image", "url": "/ABM_2023/Images/_MG_4925.jpg", "title": "Group Dinner", "category": "IMAGES" },
      { "id": 1078, "type": "image", "url": "/ABM_2023/Images/_MG_4932.jpg", "title": "Night Out", "category": "IMAGES" },
      { "id": 1079, "type": "image", "url": "/ABM_2023/Images/_MG_4985.jpg", "title": "Bonfire Night", "category": "IMAGES" },
      { "id": 1080, "type": "image", "url": "/ABM_2023/Images/_MG_8446.jpg", "title": "Morning Yoga", "category": "IMAGES" },
      { "id": 1081, "type": "image", "url": "/ABM_2023/Images/_MG_8487.jpg", "title": "Breakfast Buffet", "category": "IMAGES" },
      { "id": 1082, "type": "image", "url": "/ABM_2023/Images/_MG_8556.jpg", "title": "Spa Session", "category": "IMAGES" },
      { "id": 1083, "type": "image", "url": "/ABM_2023/Images/_MG_8727.jpg", "title": "Poolside", "category": "IMAGES" },
      { "id": 1084, "type": "image", "url": "/ABM_2023/Images/_MG_8983.jpg", "title": "Grand Finale", "category": "IMAGES" }
    ]
  }
};

const CinematicTitle = ({ text }) => {
  const letters = text.split("");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      y: 10,
      filter: "blur(10px)",
      scale: 1.5,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h1
      className="gallery-main-title cinematic-reveal"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: "inline-block", whiteSpace: letter === " " ? "pre" : "normal" }}
        >
          {letter}
        </motion.span>
      ))}
      <motion.div 
        className="title-shimmer-flare"
        initial={{ left: '-100%' }}
        animate={{ left: '200%' }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
      />
    </motion.h1>
  );
};

const GalleryScreen = ({ onBack }) => {
  const [selectedYear, setSelectedYear] = useState(2023);
  const [selectedSubCategory, setSelectedSubCategory] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const currentYearData = GALLERY_DATA[selectedYear];
  
  const filteredMedia = currentYearData.media.filter(item => {
    const matchesSubCat = selectedYear !== 2023 || selectedSubCategory === 'ALL' || item.category === selectedSubCategory;
    return matchesSubCat;
  });

  const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);
  const displayedMedia = filteredMedia.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="gallery-screen">
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="gallery-bg-mesh" />
      <div className="gallery-bg-scanlines" />

      {/* --- HEADER --- */}
      <header className="gallery-header">
        <button className="gallery-back-btn" onClick={onBack}>
          <ArrowLeft size={24} />
          <span>BACK</span>
        </button>
        <div className="gallery-title-wrap">
          <CinematicTitle text="THE LEGACY GALLERY" />
          <div className="gallery-title-underline" />
        </div>
      </header>

      {/* --- YEAR TABS --- */}
      <div className="gallery-year-tabs">
        {[2025, 2024, 2023].map(year => (
          <button 
            key={year}
            className={`year-tab-btn ${selectedYear === year ? 'active' : ''} ${year === 2025 ? 'disabled' : ''}`}
            disabled={year === 2025}
            onClick={() => {
              setSelectedYear(year);
              setSelectedSubCategory('ALL');
              setCurrentPage(1);
            }}
          >
            <span className="year-text">{year}</span>
            {selectedYear === year && (
              <motion.div layoutId="activeTab" className="active-tab-glow" />
            )}
          </button>
        ))}
      </div>

      {/* --- YEAR INFO --- */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedYear}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="year-info-panel"
        >
          <div className="year-hero-content">
            <h2 className="year-theme">{currentYearData.theme}</h2>
            <div className="year-meta">
              <span className="meta-item"><Calendar size={16} /> Annual Meet {selectedYear}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* --- SUB-CATEGORY TABS (ONLY FOR 2023) --- */}
      {selectedYear === 2023 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="gallery-sub-tabs"
        >
          {currentYearData.categories.map(cat => (
            <button 
              key={cat}
              className={`sub-tab-btn ${selectedSubCategory === cat ? 'active' : ''}`}
              onClick={() => {
                setSelectedSubCategory(cat);
                setCurrentPage(1);
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      )}


      {/* --- MEDIA CONTENT --- */}
      <AnimatePresence mode="wait">
        <div className="grid-container" key={`${selectedYear}-${selectedSubCategory}-${currentPage}`}>
            <motion.div 
              layout
              className="gallery-grid masonry-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {displayedMedia.map((item, index) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.5,
                    delay: (index % itemsPerPage) * 0.05 
                  }}
                  className={`media-card ${item.featured ? 'featured' : ''}`}
                >
                  <div className="media-preview-wrap">
                    <img 
                      src={item.publicId ? getOptimizedImageUrl(item.publicId, { width: 600, height: 450 }) : item.url} 
                      alt={item.title} 
                      className="media-img" 
                      loading="lazy"
                    />
                    <div className="media-overlay">
                      {item.type === 'video' && (
                        <div className="play-icon-wrap">
                          <Play fill="currentColor" size={32} />
                        </div>
                      )}
                      <div className="media-info-bottom">
                        <h3>{item.title}</h3>
                        <button 
                          className="expand-link-btn" 
                          onClick={() => window.open(item.publicId ? (item.type === 'video' ? getOptimizedVideoUrl(item.publicId) : getOptimizedImageUrl(item.publicId)) : item.url, '_blank')}
                        >
                          <ExternalLink size={16} className="expand-icon" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {totalPages > 1 && (
              <div className="pagination-wrap">
                <button 
                  className="page-nav-btn" 
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage(prev => prev - 1);
                    document.querySelector('.gallery-screen').scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  PREV
                </button>
                
                <div className="page-numbers">
                  {[...Array(totalPages)].map((_, i) => (
                    <button 
                      key={i + 1}
                      className={`page-num-btn ${currentPage === i + 1 ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentPage(i + 1);
                        document.querySelector('.gallery-screen').scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button 
                  className="page-nav-btn" 
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage(prev => prev + 1);
                    document.querySelector('.gallery-screen').scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  NEXT
                </button>
              </div>
            )}
          </div>
      </AnimatePresence>

      {/* --- FOOTER DECO --- */}
      <footer className="gallery-footer">
        <p>ABM SUMMIT LEGACY · 2023 - 2025 · EMPOWERING THE FUTURE</p>
      </footer>
    </div>
  );
};

export default GalleryScreen;
