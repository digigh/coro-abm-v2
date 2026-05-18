import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Calendar, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getOptimizedImageUrl, getOptimizedVideoUrl } from '../utils/cloudinaryUtils';
import './GalleryScreen.css';

const GALLERY_DATA = {
  2026: {
    year: "2026",
    theme: "THE FUTURE IS NOW",
    location: "Hong Kong & Macao",
    stats: { attendees: "500+", highlights: "Grand Summit", rewards: "30 Awards" },
    categories: ["ALL"],
    media: [
  {
    "id": 3000,
    "type": "image",
    "url": "/ABM_2026/DSC_0531-96.jpg",
    "title": "ABM 2026 Moment 1",
    "category": "ALL"
  },
  {
    "id": 3001,
    "type": "image",
    "url": "/ABM_2026/DSC_0626-131.jpg",
    "title": "ABM 2026 Moment 2",
    "category": "ALL"
  },
  {
    "id": 3002,
    "type": "image",
    "url": "/ABM_2026/DSC_0627-132.jpg",
    "title": "ABM 2026 Moment 3",
    "category": "ALL"
  },
  {
    "id": 3003,
    "type": "image",
    "url": "/ABM_2026/DSC_0645-146.jpg",
    "title": "ABM 2026 Moment 4",
    "category": "ALL"
  },
  {
    "id": 3004,
    "type": "image",
    "url": "/ABM_2026/DSC_0658-153.jpg",
    "title": "ABM 2026 Moment 5",
    "category": "ALL"
  },
  {
    "id": 3005,
    "type": "image",
    "url": "/ABM_2026/DSC_0677-167.jpg",
    "title": "ABM 2026 Moment 6",
    "category": "ALL"
  },
  {
    "id": 3006,
    "type": "image",
    "url": "/ABM_2026/DSC_0683-173.jpg",
    "title": "ABM 2026 Moment 7",
    "category": "ALL"
  },
  {
    "id": 3007,
    "type": "image",
    "url": "/ABM_2026/DSC_0686-176.jpg",
    "title": "ABM 2026 Moment 8",
    "category": "ALL"
  },
  {
    "id": 3008,
    "type": "image",
    "url": "/ABM_2026/DSC_0710-193.jpg",
    "title": "ABM 2026 Moment 9",
    "category": "ALL"
  },
  {
    "id": 3009,
    "type": "image",
    "url": "/ABM_2026/DSC_0713-196.jpg",
    "title": "ABM 2026 Moment 10",
    "category": "ALL"
  },
  {
    "id": 3010,
    "type": "image",
    "url": "/ABM_2026/DSC_0740-214.jpg",
    "title": "ABM 2026 Moment 11",
    "category": "ALL"
  },
  {
    "id": 3011,
    "type": "image",
    "url": "/ABM_2026/DSC_0744-217.jpg",
    "title": "ABM 2026 Moment 12",
    "category": "ALL"
  },
  {
    "id": 3012,
    "type": "image",
    "url": "/ABM_2026/DSC_0748-221.jpg",
    "title": "ABM 2026 Moment 13",
    "category": "ALL"
  },
  {
    "id": 3013,
    "type": "image",
    "url": "/ABM_2026/DSC_0752-223.jpg",
    "title": "ABM 2026 Moment 14",
    "category": "ALL"
  },
  {
    "id": 3014,
    "type": "image",
    "url": "/ABM_2026/DSC_0754-225.jpg",
    "title": "ABM 2026 Moment 15",
    "category": "ALL"
  },
  {
    "id": 3015,
    "type": "image",
    "url": "/ABM_2026/DSC_0762-227.jpg",
    "title": "ABM 2026 Moment 16",
    "category": "ALL"
  },
  {
    "id": 3016,
    "type": "image",
    "url": "/ABM_2026/DSC_0771-233.jpg",
    "title": "ABM 2026 Moment 17",
    "category": "ALL"
  },
  {
    "id": 3017,
    "type": "image",
    "url": "/ABM_2026/DSC_0794-243.jpg",
    "title": "ABM 2026 Moment 18",
    "category": "ALL"
  },
  {
    "id": 3018,
    "type": "image",
    "url": "/ABM_2026/DSC_0800-248.jpg",
    "title": "ABM 2026 Moment 19",
    "category": "ALL"
  },
  {
    "id": 3019,
    "type": "image",
    "url": "/ABM_2026/DSC_0802-250.jpg",
    "title": "ABM 2026 Moment 20",
    "category": "ALL"
  },
  {
    "id": 3020,
    "type": "image",
    "url": "/ABM_2026/DSC_0804-252.jpg",
    "title": "ABM 2026 Moment 21",
    "category": "ALL"
  },
  {
    "id": 3021,
    "type": "image",
    "url": "/ABM_2026/DSC_0805-253.jpg",
    "title": "ABM 2026 Moment 22",
    "category": "ALL"
  },
  {
    "id": 3022,
    "type": "image",
    "url": "/ABM_2026/DSC_0821-264.jpg",
    "title": "ABM 2026 Moment 23",
    "category": "ALL"
  },
  {
    "id": 3023,
    "type": "image",
    "url": "/ABM_2026/DSC_0823-266.jpg",
    "title": "ABM 2026 Moment 24",
    "category": "ALL"
  },
  {
    "id": 3024,
    "type": "image",
    "url": "/ABM_2026/DSC_0837-277.jpg",
    "title": "ABM 2026 Moment 25",
    "category": "ALL"
  },
  {
    "id": 3025,
    "type": "image",
    "url": "/ABM_2026/DSC_0838-278.jpg",
    "title": "ABM 2026 Moment 26",
    "category": "ALL"
  },
  {
    "id": 3026,
    "type": "image",
    "url": "/ABM_2026/DSC_0856-292.jpg",
    "title": "ABM 2026 Moment 27",
    "category": "ALL"
  },
  {
    "id": 3027,
    "type": "image",
    "url": "/ABM_2026/DSC_0858-294.jpg",
    "title": "ABM 2026 Moment 28",
    "category": "ALL"
  },
  {
    "id": 3028,
    "type": "image",
    "url": "/ABM_2026/DSC_0859-295.jpg",
    "title": "ABM 2026 Moment 29",
    "category": "ALL"
  },
  {
    "id": 3029,
    "type": "image",
    "url": "/ABM_2026/DSC_0864-300.jpg",
    "title": "ABM 2026 Moment 30",
    "category": "ALL"
  },
  {
    "id": 3030,
    "type": "image",
    "url": "/ABM_2026/DSC_0865-301.jpg",
    "title": "ABM 2026 Moment 31",
    "category": "ALL"
  },
  {
    "id": 3031,
    "type": "image",
    "url": "/ABM_2026/DSC_0872-308.jpg",
    "title": "ABM 2026 Moment 32",
    "category": "ALL"
  },
  {
    "id": 3032,
    "type": "image",
    "url": "/ABM_2026/DSC_0873-309.jpg",
    "title": "ABM 2026 Moment 33",
    "category": "ALL"
  },
  {
    "id": 3033,
    "type": "image",
    "url": "/ABM_2026/DSC_0887-322.jpg",
    "title": "ABM 2026 Moment 34",
    "category": "ALL"
  },
  {
    "id": 3034,
    "type": "image",
    "url": "/ABM_2026/DSC_0900-333.jpg",
    "title": "ABM 2026 Moment 35",
    "category": "ALL"
  },
  {
    "id": 3035,
    "type": "image",
    "url": "/ABM_2026/DSC_0901-334.jpg",
    "title": "ABM 2026 Moment 36",
    "category": "ALL"
  },
  {
    "id": 3036,
    "type": "image",
    "url": "/ABM_2026/DSC_0996-377.jpg",
    "title": "ABM 2026 Moment 37",
    "category": "ALL"
  },
  {
    "id": 3037,
    "type": "image",
    "url": "/ABM_2026/DSC_1068-414.jpg",
    "title": "ABM 2026 Moment 38",
    "category": "ALL"
  },
  {
    "id": 3038,
    "type": "image",
    "url": "/ABM_2026/DSC_1074-420.jpg",
    "title": "ABM 2026 Moment 39",
    "category": "ALL"
  },
  {
    "id": 3039,
    "type": "image",
    "url": "/ABM_2026/DSC_1091-428.jpg",
    "title": "ABM 2026 Moment 40",
    "category": "ALL"
  },
  {
    "id": 3040,
    "type": "image",
    "url": "/ABM_2026/DSC_1102-433.jpg",
    "title": "ABM 2026 Moment 41",
    "category": "ALL"
  },
  {
    "id": 3041,
    "type": "image",
    "url": "/ABM_2026/DSC_1104-434.jpg",
    "title": "ABM 2026 Moment 42",
    "category": "ALL"
  },
  {
    "id": 3042,
    "type": "image",
    "url": "/ABM_2026/DSC_1122-437.jpg",
    "title": "ABM 2026 Moment 43",
    "category": "ALL"
  },
  {
    "id": 3043,
    "type": "image",
    "url": "/ABM_2026/DSC_1127-439.jpg",
    "title": "ABM 2026 Moment 44",
    "category": "ALL"
  },
  {
    "id": 3044,
    "type": "image",
    "url": "/ABM_2026/DSC_1302-534.jpg",
    "title": "ABM 2026 Moment 45",
    "category": "ALL"
  },
  {
    "id": 3045,
    "type": "image",
    "url": "/ABM_2026/DSC_1335-548.jpg",
    "title": "ABM 2026 Moment 46",
    "category": "ALL"
  },
  {
    "id": 3046,
    "type": "image",
    "url": "/ABM_2026/DSC_1396-580.jpg",
    "title": "ABM 2026 Moment 47",
    "category": "ALL"
  },
  {
    "id": 3047,
    "type": "image",
    "url": "/ABM_2026/DSC_1399-583.jpg",
    "title": "ABM 2026 Moment 48",
    "category": "ALL"
  },
  {
    "id": 3048,
    "type": "image",
    "url": "/ABM_2026/DSC_1404-586.jpg",
    "title": "ABM 2026 Moment 49",
    "category": "ALL"
  },
  {
    "id": 3049,
    "type": "image",
    "url": "/ABM_2026/DSC_1406-588.jpg",
    "title": "ABM 2026 Moment 50",
    "category": "ALL"
  },
  {
    "id": 3050,
    "type": "image",
    "url": "/ABM_2026/DSC_1418-593.jpg",
    "title": "ABM 2026 Moment 51",
    "category": "ALL"
  },
  {
    "id": 3051,
    "type": "image",
    "url": "/ABM_2026/DSC_1421-596.jpg",
    "title": "ABM 2026 Moment 52",
    "category": "ALL"
  },
  {
    "id": 3052,
    "type": "image",
    "url": "/ABM_2026/DSC_1491-632.jpg",
    "title": "ABM 2026 Moment 53",
    "category": "ALL"
  },
  {
    "id": 3053,
    "type": "image",
    "url": "/ABM_2026/DSC_1496-637.jpg",
    "title": "ABM 2026 Moment 54",
    "category": "ALL"
  },
  {
    "id": 3054,
    "type": "image",
    "url": "/ABM_2026/DSC_1591-696.jpg",
    "title": "ABM 2026 Moment 55",
    "category": "ALL"
  },
  {
    "id": 3055,
    "type": "image",
    "url": "/ABM_2026/DSC_1595-699.jpg",
    "title": "ABM 2026 Moment 56",
    "category": "ALL"
  },
  {
    "id": 3056,
    "type": "image",
    "url": "/ABM_2026/DSC_1597-701.jpg",
    "title": "ABM 2026 Moment 57",
    "category": "ALL"
  },
  {
    "id": 3057,
    "type": "image",
    "url": "/ABM_2026/DSC_1604-708.jpg",
    "title": "ABM 2026 Moment 58",
    "category": "ALL"
  },
  {
    "id": 3058,
    "type": "image",
    "url": "/ABM_2026/DSC_1606-710.jpg",
    "title": "ABM 2026 Moment 59",
    "category": "ALL"
  },
  {
    "id": 3059,
    "type": "image",
    "url": "/ABM_2026/DSC_1607-711.jpg",
    "title": "ABM 2026 Moment 60",
    "category": "ALL"
  },
  {
    "id": 3060,
    "type": "image",
    "url": "/ABM_2026/DSC_6622-2.jpg",
    "title": "ABM 2026 Moment 61",
    "category": "ALL"
  },
  {
    "id": 3061,
    "type": "image",
    "url": "/ABM_2026/DSC_6625-3.jpg",
    "title": "ABM 2026 Moment 62",
    "category": "ALL"
  },
  {
    "id": 3062,
    "type": "image",
    "url": "/ABM_2026/DSC_6633-7.jpg",
    "title": "ABM 2026 Moment 63",
    "category": "ALL"
  },
  {
    "id": 3063,
    "type": "image",
    "url": "/ABM_2026/DSC_6635-9.jpg",
    "title": "ABM 2026 Moment 64",
    "category": "ALL"
  },
  {
    "id": 3064,
    "type": "image",
    "url": "/ABM_2026/DSC_6638-12.jpg",
    "title": "ABM 2026 Moment 65",
    "category": "ALL"
  },
  {
    "id": 3065,
    "type": "image",
    "url": "/ABM_2026/DSC_6644-14.jpg",
    "title": "ABM 2026 Moment 66",
    "category": "ALL"
  },
  {
    "id": 3066,
    "type": "image",
    "url": "/ABM_2026/DSC_6652-20.jpg",
    "title": "ABM 2026 Moment 67",
    "category": "ALL"
  },
  {
    "id": 3067,
    "type": "image",
    "url": "/ABM_2026/DSC_6659-22.jpg",
    "title": "ABM 2026 Moment 68",
    "category": "ALL"
  },
  {
    "id": 3068,
    "type": "image",
    "url": "/ABM_2026/DSC_6661-24.jpg",
    "title": "ABM 2026 Moment 69",
    "category": "ALL"
  },
  {
    "id": 3069,
    "type": "image",
    "url": "/ABM_2026/DSC_6675-28.jpg",
    "title": "ABM 2026 Moment 70",
    "category": "ALL"
  },
  {
    "id": 3070,
    "type": "image",
    "url": "/ABM_2026/DSC_6678-31.jpg",
    "title": "ABM 2026 Moment 71",
    "category": "ALL"
  },
  {
    "id": 3071,
    "type": "image",
    "url": "/ABM_2026/DSC_6682-35.jpg",
    "title": "ABM 2026 Moment 72",
    "category": "ALL"
  },
  {
    "id": 3072,
    "type": "image",
    "url": "/ABM_2026/DSC_6685-37.jpg",
    "title": "ABM 2026 Moment 73",
    "category": "ALL"
  },
  {
    "id": 3073,
    "type": "image",
    "url": "/ABM_2026/DSC_6697-49.jpg",
    "title": "ABM 2026 Moment 74",
    "category": "ALL"
  },
  {
    "id": 3074,
    "type": "image",
    "url": "/ABM_2026/DSC_6704-55.jpg",
    "title": "ABM 2026 Moment 75",
    "category": "ALL"
  },
  {
    "id": 3075,
    "type": "image",
    "url": "/ABM_2026/DSC_6705-56.jpg",
    "title": "ABM 2026 Moment 76",
    "category": "ALL"
  },
  {
    "id": 3076,
    "type": "image",
    "url": "/ABM_2026/DSC_6718-69.jpg",
    "title": "ABM 2026 Moment 77",
    "category": "ALL"
  },
  {
    "id": 3077,
    "type": "image",
    "url": "/ABM_2026/DSC_6720-71.jpg",
    "title": "ABM 2026 Moment 78",
    "category": "ALL"
  },
  {
    "id": 3078,
    "type": "image",
    "url": "/ABM_2026/DSC_6734-85.jpg",
    "title": "ABM 2026 Moment 79",
    "category": "ALL"
  },
  {
    "id": 3079,
    "type": "image",
    "url": "/ABM_2026/DSC_6745-92.jpg",
    "title": "ABM 2026 Moment 80",
    "category": "ALL"
  },
  {
    "id": 3080,
    "type": "image",
    "url": "/ABM_2026/DSC_6749-96.jpg",
    "title": "ABM 2026 Moment 81",
    "category": "ALL"
  },
  {
    "id": 3081,
    "type": "image",
    "url": "/ABM_2026/DSC_6753-100.jpg",
    "title": "ABM 2026 Moment 82",
    "category": "ALL"
  },
  {
    "id": 3082,
    "type": "image",
    "url": "/ABM_2026/DSC_6755-102.jpg",
    "title": "ABM 2026 Moment 83",
    "category": "ALL"
  },
  {
    "id": 3083,
    "type": "image",
    "url": "/ABM_2026/DSC_6757-104.jpg",
    "title": "ABM 2026 Moment 84",
    "category": "ALL"
  },
  {
    "id": 3084,
    "type": "image",
    "url": "/ABM_2026/DSC_6761-108.jpg",
    "title": "ABM 2026 Moment 85",
    "category": "ALL"
  },
  {
    "id": 3085,
    "type": "image",
    "url": "/ABM_2026/DSC_6768-115.jpg",
    "title": "ABM 2026 Moment 86",
    "category": "ALL"
  },
  {
    "id": 3086,
    "type": "image",
    "url": "/ABM_2026/DSC_6769-116.jpg",
    "title": "ABM 2026 Moment 87",
    "category": "ALL"
  },
  {
    "id": 3087,
    "type": "image",
    "url": "/ABM_2026/DSC_6773-120.jpg",
    "title": "ABM 2026 Moment 88",
    "category": "ALL"
  },
  {
    "id": 3088,
    "type": "image",
    "url": "/ABM_2026/DSC_6774-121.jpg",
    "title": "ABM 2026 Moment 89",
    "category": "ALL"
  },
  {
    "id": 3089,
    "type": "image",
    "url": "/ABM_2026/DSC_6783-129.jpg",
    "title": "ABM 2026 Moment 90",
    "category": "ALL"
  },
  {
    "id": 3090,
    "type": "image",
    "url": "/ABM_2026/DSC_6790-135.jpg",
    "title": "ABM 2026 Moment 91",
    "category": "ALL"
  },
  {
    "id": 3091,
    "type": "image",
    "url": "/ABM_2026/DSC_6794-139.jpg",
    "title": "ABM 2026 Moment 92",
    "category": "ALL"
  },
  {
    "id": 3092,
    "type": "image",
    "url": "/ABM_2026/DSC_6803-148.jpg",
    "title": "ABM 2026 Moment 93",
    "category": "ALL"
  },
  {
    "id": 3093,
    "type": "image",
    "url": "/ABM_2026/DSC_6818-159.jpg",
    "title": "ABM 2026 Moment 94",
    "category": "ALL"
  },
  {
    "id": 3094,
    "type": "image",
    "url": "/ABM_2026/DSC_6839-171.jpg",
    "title": "ABM 2026 Moment 95",
    "category": "ALL"
  },
  {
    "id": 3095,
    "type": "image",
    "url": "/ABM_2026/DSC_6848-178.jpg",
    "title": "ABM 2026 Moment 96",
    "category": "ALL"
  },
  {
    "id": 3096,
    "type": "image",
    "url": "/ABM_2026/DSC_6854-183.jpg",
    "title": "ABM 2026 Moment 97",
    "category": "ALL"
  },
  {
    "id": 3097,
    "type": "image",
    "url": "/ABM_2026/DSC_6912-238.jpg",
    "title": "ABM 2026 Moment 98",
    "category": "ALL"
  },
  {
    "id": 3098,
    "type": "image",
    "url": "/ABM_2026/DSC_6916-242.jpg",
    "title": "ABM 2026 Moment 99",
    "category": "ALL"
  },
  {
    "id": 3099,
    "type": "image",
    "url": "/ABM_2026/DSC_6929-253.jpg",
    "title": "ABM 2026 Moment 100",
    "category": "ALL"
  },
  {
    "id": 3100,
    "type": "image",
    "url": "/ABM_2026/DSC_6954-277.jpg",
    "title": "ABM 2026 Moment 101",
    "category": "ALL"
  },
  {
    "id": 3101,
    "type": "image",
    "url": "/ABM_2026/DSC_6975-298.jpg",
    "title": "ABM 2026 Moment 102",
    "category": "ALL"
  },
  {
    "id": 3102,
    "type": "image",
    "url": "/ABM_2026/DSC_7003-323.jpg",
    "title": "ABM 2026 Moment 103",
    "category": "ALL"
  },
  {
    "id": 3103,
    "type": "image",
    "url": "/ABM_2026/DSC_7010-330.jpg",
    "title": "ABM 2026 Moment 104",
    "category": "ALL"
  },
  {
    "id": 3104,
    "type": "image",
    "url": "/ABM_2026/DSC_7044-362.jpg",
    "title": "ABM 2026 Moment 105",
    "category": "ALL"
  },
  {
    "id": 3105,
    "type": "image",
    "url": "/ABM_2026/DSC_7048-365.jpg",
    "title": "ABM 2026 Moment 106",
    "category": "ALL"
  },
  {
    "id": 3106,
    "type": "image",
    "url": "/ABM_2026/DSC_7051-367.jpg",
    "title": "ABM 2026 Moment 107",
    "category": "ALL"
  },
  {
    "id": 3107,
    "type": "image",
    "url": "/ABM_2026/DSC_7077-382.jpg",
    "title": "ABM 2026 Moment 108",
    "category": "ALL"
  },
  {
    "id": 3108,
    "type": "image",
    "url": "/ABM_2026/DSC_7084-389.jpg",
    "title": "ABM 2026 Moment 109",
    "category": "ALL"
  },
  {
    "id": 3109,
    "type": "image",
    "url": "/ABM_2026/DSC_7087-392.jpg",
    "title": "ABM 2026 Moment 110",
    "category": "ALL"
  },
  {
    "id": 3110,
    "type": "image",
    "url": "/ABM_2026/DSC_7095-400.jpg",
    "title": "ABM 2026 Moment 111",
    "category": "ALL"
  },
  {
    "id": 3111,
    "type": "image",
    "url": "/ABM_2026/DSC_7096-401.jpg",
    "title": "ABM 2026 Moment 112",
    "category": "ALL"
  },
  {
    "id": 3112,
    "type": "image",
    "url": "/ABM_2026/DSC_7145-433.jpg",
    "title": "ABM 2026 Moment 113",
    "category": "ALL"
  },
  {
    "id": 3113,
    "type": "image",
    "url": "/ABM_2026/DSC_7160-437.jpg",
    "title": "ABM 2026 Moment 114",
    "category": "ALL"
  },
  {
    "id": 3114,
    "type": "image",
    "url": "/ABM_2026/DSC_7189-453.jpg",
    "title": "ABM 2026 Moment 115",
    "category": "ALL"
  },
  {
    "id": 3115,
    "type": "image",
    "url": "/ABM_2026/DSC_7203-463.jpg",
    "title": "ABM 2026 Moment 116",
    "category": "ALL"
  },
  {
    "id": 3116,
    "type": "image",
    "url": "/ABM_2026/DSC_7205-464.jpg",
    "title": "ABM 2026 Moment 117",
    "category": "ALL"
  },
  {
    "id": 3117,
    "type": "image",
    "url": "/ABM_2026/DSC_7209-467.jpg",
    "title": "ABM 2026 Moment 118",
    "category": "ALL"
  },
  {
    "id": 3118,
    "type": "image",
    "url": "/ABM_2026/DSC_7213-470.jpg",
    "title": "ABM 2026 Moment 119",
    "category": "ALL"
  },
  {
    "id": 3119,
    "type": "image",
    "url": "/ABM_2026/DSC_7215-472.jpg",
    "title": "ABM 2026 Moment 120",
    "category": "ALL"
  },
  {
    "id": 3120,
    "type": "image",
    "url": "/ABM_2026/DSC_7222-477.jpg",
    "title": "ABM 2026 Moment 121",
    "category": "ALL"
  },
  {
    "id": 3121,
    "type": "image",
    "url": "/ABM_2026/DSC_7284-521.jpg",
    "title": "ABM 2026 Moment 122",
    "category": "ALL"
  },
  {
    "id": 3122,
    "type": "image",
    "url": "/ABM_2026/DSC_7285-522.jpg",
    "title": "ABM 2026 Moment 123",
    "category": "ALL"
  },
  {
    "id": 3123,
    "type": "image",
    "url": "/ABM_2026/DSC_7287-524.jpg",
    "title": "ABM 2026 Moment 124",
    "category": "ALL"
  },
  {
    "id": 3124,
    "type": "image",
    "url": "/ABM_2026/DSC_7306-533.jpg",
    "title": "ABM 2026 Moment 125",
    "category": "ALL"
  },
  {
    "id": 3125,
    "type": "image",
    "url": "/ABM_2026/DSC_7317-538.jpg",
    "title": "ABM 2026 Moment 126",
    "category": "ALL"
  },
  {
    "id": 3126,
    "type": "image",
    "url": "/ABM_2026/DSC_7320-540.jpg",
    "title": "ABM 2026 Moment 127",
    "category": "ALL"
  },
  {
    "id": 3127,
    "type": "image",
    "url": "/ABM_2026/DSC_7324-543.jpg",
    "title": "ABM 2026 Moment 128",
    "category": "ALL"
  },
  {
    "id": 3128,
    "type": "image",
    "url": "/ABM_2026/DSC_7325-544.jpg",
    "title": "ABM 2026 Moment 129",
    "category": "ALL"
  },
  {
    "id": 3129,
    "type": "image",
    "url": "/ABM_2026/DSC_7326-545.jpg",
    "title": "ABM 2026 Moment 130",
    "category": "ALL"
  },
  {
    "id": 3130,
    "type": "image",
    "url": "/ABM_2026/DSC_7327-546.jpg",
    "title": "ABM 2026 Moment 131",
    "category": "ALL"
  },
  {
    "id": 3131,
    "type": "image",
    "url": "/ABM_2026/DSC_7328-547.jpg",
    "title": "ABM 2026 Moment 132",
    "category": "ALL"
  },
  {
    "id": 3132,
    "type": "image",
    "url": "/ABM_2026/DSC_7330-549.jpg",
    "title": "ABM 2026 Moment 133",
    "category": "ALL"
  },
  {
    "id": 3133,
    "type": "image",
    "url": "/ABM_2026/DSC_7332-551.jpg",
    "title": "ABM 2026 Moment 134",
    "category": "ALL"
  },
  {
    "id": 3134,
    "type": "image",
    "url": "/ABM_2026/DSC_7339-558.jpg",
    "title": "ABM 2026 Moment 135",
    "category": "ALL"
  }
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
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedSubCategory, setSelectedSubCategory] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [carouselIndex, setCarouselIndex] = useState(null);
  const [brokenImages, setBrokenImages] = useState(new Set());
  const itemsPerPage = 12;

  const handleImageError = (id) => {
    setBrokenImages((prev) => {
      const updated = new Set(prev);
      updated.add(id);
      return updated;
    });
  };

  // Initialize and reshuffle 2026 media on entry
  const [shuffled2026Media, setShuffled2026Media] = useState(() => {
    return [...GALLERY_DATA[2026].media].sort(() => Math.random() - 0.5);
  });

  useEffect(() => {
    if (selectedYear === 2026) {
      setShuffled2026Media([...GALLERY_DATA[2026].media].sort(() => Math.random() - 0.5));
    }
  }, [selectedYear]);

  const currentYearData = GALLERY_DATA[selectedYear];
  
  const filteredMedia = (selectedYear === 2026
    ? shuffled2026Media
    : currentYearData.media.filter(item => {
        const matchesSubCat = selectedYear !== 2023 || selectedSubCategory === 'ALL' || item.category === selectedSubCategory;
        return matchesSubCat;
      })
  ).filter(item => !brokenImages.has(item.id));

  const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);
  const displayedMedia = filteredMedia.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  const handleOpenCarousel = (item) => {
    const index = filteredMedia.findIndex(m => m.id === item.id);
    if (index !== -1) setCarouselIndex(index);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCarouselIndex((prev) => (prev + 1) % filteredMedia.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCarouselIndex((prev) => (prev - 1 + filteredMedia.length) % filteredMedia.length);
  };

  const handleCloseCarousel = () => setCarouselIndex(null);

  return (
    <div className={`gallery-screen theme-${selectedYear}`}>
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="gallery-bg-mesh" />
      <div className="gallery-bg-scanlines" />

      {/* --- 2026 AMBIENT BACKGROUND --- */}
      {selectedYear === 2026 && (
        <div className="hk-ambient-bg" aria-hidden="true">
          <div className="hk-blue-glow" />
          <div className="hk-dot-grid" />
        </div>
      )}

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
        {[2026, 2024, 2023].map(year => (
          <button 
            key={year}
            className={`year-tab-btn ${selectedYear === year ? 'active' : ''}`}
            
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
                  whileHover={{ scale: 1.05, y: -10, zIndex: 10, transition: { duration: 0.3 } }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    duration: 0.5,
                    delay: (index % itemsPerPage) * 0.05 
                  }}
                  className={`media-card ${item.featured ? 'featured' : ''}`}
                  onClick={() => handleOpenCarousel(item)}
                >
                  <div className="media-preview-wrap">
                    <img 
                      src={item.publicId ? getOptimizedImageUrl(item.publicId, { width: 600, height: 450 }) : item.url} 
                      alt={item.title} 
                      className="media-img" 
                      loading="lazy"
                      onError={() => handleImageError(item.id)}
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
        <p>ABM SUMMIT LEGACY · 2023 - 2026 · EMPOWERING THE FUTURE</p>
      </footer>

      {/* --- CAROUSEL OVERLAY --- */}
      <AnimatePresence>
        {carouselIndex !== null && (
          <motion.div 
            className="gallery-carousel-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseCarousel}
          >
            <button className="gallery-carousel-close-btn" onClick={handleCloseCarousel}>
              <X size={32} />
            </button>
            <button className="gallery-carousel-nav-btn prev" onClick={handlePrev}>
              <ChevronLeft size={48} />
            </button>
            <motion.div 
              className="gallery-carousel-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={filteredMedia[carouselIndex].publicId ? getOptimizedImageUrl(filteredMedia[carouselIndex].publicId, { width: 1200 }) : filteredMedia[carouselIndex].url} 
                alt={filteredMedia[carouselIndex].title} 
              />
              <div className="gallery-carousel-info">
                <h3>{filteredMedia[carouselIndex].title}</h3>
              </div>
            </motion.div>
            <button className="gallery-carousel-nav-btn next" onClick={handleNext}>
              <ChevronRight size={48} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryScreen;

