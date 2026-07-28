import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  DollarSign, 
  Car, 
  Award,
  ChevronLeft,
} from 'lucide-react';
import { CountUp } from '../components/CountUp';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

type ClientKey =
  | 'luis-corripio'
  | 'maria-vasquez'
  | 'gustavo-tavares'
  | 'carlos-llenas'
  | 'jose-vicini'
  | 'patricia-bermudez'
  | 'fernando-rainieri'
  | 'roberto-bonetti'
  | 'alejandro-corripio'
  | 'isabela-pellerano'
  | 'milo-espaillat'
  | 'juan-vich'
  | 'eduardo-najri'
  | 'ana-vicini'
  | 'frank-rainieri';

interface ClientData {
  name: string;
  id: string;
  phone: string;
  email: string;
  location: string;
  lifetimeValue: number;
  aiPurchaseScore: number;
  financialProfile: { preferredPayment: string; creditTier: string; approvedEquity: string };
  currentFleet: { model: string; mileage: string; status: string }[];
  purchaseHistory: { vehicle: string; price: string; date: string }[];
  serviceHistory: { date: string; service: string; cost: string; status: string }[];
  tradeInHistory: { vehicle: string; tradeVal: string; appliedTo: string }[];
  journeyTimeline: { type: string; text: string; time: string }[];
  interestedModel: string;
  stage: string;
}

const ALL_CLIENTS: Record<ClientKey, ClientData> = {
  'luis-corripio': {
    name: 'Luis Corripio',
    id: 'VIP-SD-001',
    phone: '+1 (809) 555-0192',
    email: 'l.corripio@corripio.com.do',
    location: 'Piantini, Santo Domingo',
    lifetimeValue: 980000,
    aiPurchaseScore: 96,
    interestedModel: '911 Carrera GTS',
    stage: 'Finalizing Contract',
    financialProfile: {
      preferredPayment: 'Wire Transfer / Direct Escrow',
      creditTier: 'Tier 1 Executive Ultra',
      approvedEquity: '$450,000 USD',
    },
    currentFleet: [
      { model: '2023 Porsche 911 Turbo S', mileage: '12,400 mi', status: 'Active Garage' },
      { model: '2021 Porsche Cayenne GTS', mileage: '34,100 mi', status: 'Active Garage' },
    ],
    purchaseHistory: [
      { vehicle: '2023 Porsche 911 Turbo S', price: '$275,000 USD', date: 'Mar 2023' },
      { vehicle: '2021 Porsche Cayenne GTS', price: '$142,000 USD', date: 'Nov 2021' },
    ],
    serviceHistory: [
      { date: 'Jul 20, 2026', service: '10,000 mi Inspection & Oil Service', cost: '$1,200', status: 'Completed' },
      { date: 'Jan 14, 2026', service: 'PCCB Brake Fluid Flush', cost: '$850', status: 'Completed' },
    ],
    tradeInHistory: [
      { vehicle: '2019 Porsche Panamera 4S', tradeVal: '$78,000 USD', appliedTo: '2023 911 Turbo S' },
    ],
    journeyTimeline: [
      { type: 'Website', text: 'Configured 911 GT3 RS Weissach Package on porsche.com.do', time: 'Jul 24, 2026' },
      { type: 'WhatsApp', text: 'Inquired delivery time for Guards Red exterior finish', time: 'Jul 25, 2026' },
      { type: 'Showroom Visit', text: 'Met Eduardo Bisonó for private spec review', time: 'Jul 26, 2026' },
      { type: 'Test Drive', text: 'Completed 45-min highway track drive in 911 GTS', time: 'Jul 27, 2026' },
      { type: 'Proposal Sent', text: 'Official contract generated for $341,200 USD', time: 'Jul 27, 2026' },
    ],
  },
  'maria-vasquez': {
    name: 'María Vásquez',
    id: 'VIP-SD-002',
    phone: '+1 (809) 555-0482',
    email: 'm.vasquez@groupov.com.do',
    location: 'Naco, Santo Domingo',
    lifetimeValue: 420000,
    aiPurchaseScore: 88,
    interestedModel: 'Macan Electric Turbo',
    stage: 'Showroom Visit',
    financialProfile: {
      preferredPayment: 'Porsche Financial Lease',
      creditTier: 'Tier 1 Corporate',
      approvedEquity: '$210,000 USD',
    },
    currentFleet: [
      { model: '2022 Porsche Macan S', mileage: '28,900 mi', status: 'Active Garage' },
    ],
    purchaseHistory: [
      { vehicle: '2022 Porsche Macan S', price: '$89,000 USD', date: 'Jun 2022' },
    ],
    serviceHistory: [
      { date: 'May 12, 2026', service: '20,000 mi Annual Inspection', cost: '$950', status: 'Completed' },
    ],
    tradeInHistory: [
      { vehicle: '2018 Macan Base', tradeVal: '$42,000 USD', appliedTo: '2022 Macan S' },
    ],
    journeyTimeline: [
      { type: 'Website', text: 'Calculated 800V Taycan charging range on porsche.com.do', time: 'Jul 22, 2026' },
      { type: 'WhatsApp', text: 'Inquired about home 11kW Wallbox installation', time: 'Jul 24, 2026' },
      { type: 'Showroom Visit', text: 'Visited and reviewed Macan Electric Turbo in Frozen Blue', time: 'Jul 25, 2026' },
      { type: 'Test Drive Booked', text: 'Scheduled 800V Taycan Turbo GT test drive', time: 'Jul 27, 2026' },
    ],
  },
  'gustavo-tavares': {
    name: 'Gustavo Tavares',
    id: 'VIP-SD-003',
    phone: '+1 (809) 555-0319',
    email: 'g.tavares@tavaresgroupdo.com',
    location: 'Bella Vista, Santo Domingo',
    lifetimeValue: 310000,
    aiPurchaseScore: 72,
    interestedModel: 'Cayenne Coupé E-Hybrid',
    stage: 'Test Drive',
    financialProfile: {
      preferredPayment: 'Porsche Bank Financing',
      creditTier: 'Tier 2 High Net Worth',
      approvedEquity: '$150,000 USD',
    },
    currentFleet: [
      { model: '2022 Porsche 718 Cayman GT4 RS', mileage: '8,200 mi', status: 'Active Garage' },
      { model: '2020 Porsche Cayenne E-Hybrid', mileage: '41,800 mi', status: 'Active Garage' },
    ],
    purchaseHistory: [
      { vehicle: '2022 Porsche 718 Cayman GT4 RS', price: '$158,000 USD', date: 'Feb 2022' },
      { vehicle: '2020 Porsche Cayenne E-Hybrid', price: '$98,000 USD', date: 'Sep 2020' },
    ],
    serviceHistory: [
      { date: 'Jul 18, 2026', service: 'Carbon Brake Rotor 78% Wear Alert — Priority', cost: '$3,400', status: 'Scheduled' },
      { date: 'Mar 5, 2026', service: '5,000 mi Interim Service & Tire Rotation', cost: '$680', status: 'Completed' },
    ],
    tradeInHistory: [
      { vehicle: '2018 Porsche Boxster GTS', tradeVal: '$62,000 USD', appliedTo: '2022 718 Cayman GT4 RS' },
    ],
    journeyTimeline: [
      { type: 'Service Alert', text: 'Telemetry: Carbon brake wear at 78% on 718 Cayman GT4 RS', time: 'Jul 18, 2026' },
      { type: 'WhatsApp', text: 'Notified about Cayenne Coupé E-Hybrid sport exhaust upgrade', time: 'Jul 22, 2026' },
      { type: 'Showroom Visit', text: 'Test drove 2026 Cayenne Coupé E-Hybrid with 360° Camera', time: 'Jul 25, 2026' },
      { type: 'Proposal Pending', text: 'Cayenne Coupé E-Hybrid trade-in quote — $98,500 USD', time: 'Jul 27, 2026' },
    ],
  },
  'carlos-llenas': {
    name: 'Carlos Llenas',
    id: 'VIP-SD-004',
    phone: '+1 (809) 555-0274',
    email: 'c.llenas@llenasinvest.com.do',
    location: 'Los Cacicazgos, Santo Domingo',
    lifetimeValue: 560000,
    aiPurchaseScore: 91,
    interestedModel: '911 GT3 RS',
    stage: 'Allocation Approved',
    financialProfile: {
      preferredPayment: 'Full Cash Wire Transfer',
      creditTier: 'Tier 1 Executive Ultra',
      approvedEquity: '$350,000 USD',
    },
    currentFleet: [
      { model: '2024 Porsche 911 Carrera S', mileage: '4,100 mi', status: 'Active Garage' },
      { model: '2022 Porsche Taycan Turbo', mileage: '18,900 mi', status: 'Active Garage' },
    ],
    purchaseHistory: [
      { vehicle: '2024 Porsche 911 Carrera S', price: '$175,000 USD', date: 'Jan 2024' },
      { vehicle: '2022 Porsche Taycan Turbo', price: '$168,000 USD', date: 'Aug 2022' },
    ],
    serviceHistory: [
      { date: 'Jun 30, 2026', service: 'PDK Fluid Change & Software Update', cost: '$1,450', status: 'Completed' },
    ],
    tradeInHistory: [
      { vehicle: '2020 Porsche 911 Carrera 4S', tradeVal: '$118,000 USD', appliedTo: '2024 911 Carrera S' },
    ],
    journeyTimeline: [
      { type: 'Website', text: 'Registered interest for GT3 RS Allocation List', time: 'Jul 10, 2026' },
      { type: 'Showroom', text: 'Viewed available GT3 RS spec options with Eduardo Bisonó', time: 'Jul 18, 2026' },
      { type: 'Allocation', text: 'GT3 RS Weissach Package slot confirmed — Q4 2026 delivery', time: 'Jul 22, 2026' },
      { type: 'Deposit', text: '$50,000 USD deposit wired — contract in progress', time: 'Jul 26, 2026' },
    ],
  },
  'jose-vicini': {
    name: 'José Vicini',
    id: 'VIP-SD-005',
    phone: '+1 (809) 555-0387',
    email: 'j.vicini@vicinigroup.com.do',
    location: 'Serralles, Santo Domingo',
    lifetimeValue: 730000,
    aiPurchaseScore: 84,
    interestedModel: 'Cayenne Turbo GT',
    stage: 'Trade-in Evaluation',
    financialProfile: {
      preferredPayment: 'Porsche Approved Leasing',
      creditTier: 'Tier 1 Corporate Platinum',
      approvedEquity: '$320,000 USD',
    },
    currentFleet: [
      { model: '2023 Porsche Cayenne Turbo', mileage: '22,600 mi', status: 'Trade-in Pending' },
      { model: '2021 Porsche Panamera 4S E-Hybrid', mileage: '37,500 mi', status: 'Active Garage' },
    ],
    purchaseHistory: [
      { vehicle: '2023 Porsche Cayenne Turbo', price: '$185,000 USD', date: 'Feb 2023' },
      { vehicle: '2021 Porsche Panamera 4S E-Hybrid', price: '$145,000 USD', date: 'Apr 2021' },
    ],
    serviceHistory: [
      { date: 'Jul 12, 2026', service: 'Air Suspension Recalibration', cost: '$2,100', status: 'Completed' },
      { date: 'Apr 20, 2026', service: 'Annual 25,000 mi Inspection', cost: '$1,800', status: 'Completed' },
    ],
    tradeInHistory: [
      { vehicle: '2020 Porsche Cayenne S', tradeVal: '$88,000 USD', appliedTo: '2023 Cayenne Turbo' },
    ],
    journeyTimeline: [
      { type: 'WhatsApp', text: 'Inquired about Cayenne Turbo GT Sardinia Green availability', time: 'Jul 15, 2026' },
      { type: 'Trade-in', text: 'Submitted 2023 Cayenne Turbo for trade-in valuation — $142,000', time: 'Jul 20, 2026' },
      { type: 'Showroom', text: 'Compared Cayenne Turbo GT vs Turbo S E-Hybrid in showroom', time: 'Jul 24, 2026' },
      { type: 'Proposal', text: 'Awaiting final trade-in equity approval from finance desk', time: 'Jul 27, 2026' },
    ],
  },
  'patricia-bermudez': {
    name: 'Patricia Bermúdez',
    id: 'VIP-SD-006',
    phone: '+1 (809) 555-0431',
    email: 'p.bermudez@bermudezrd.com',
    location: 'Evaristo Morales, Santo Domingo',
    lifetimeValue: 185000,
    aiPurchaseScore: 79,
    interestedModel: 'Macan GTS',
    stage: 'Financing Approved',
    financialProfile: {
      preferredPayment: 'Porsche Financial Services — 60 Month',
      creditTier: 'Tier 2 Premium',
      approvedEquity: '$95,000 USD',
    },
    currentFleet: [
      { model: '2021 Porsche Macan S', mileage: '31,200 mi', status: 'Trade-in Pending' },
    ],
    purchaseHistory: [
      { vehicle: '2021 Porsche Macan S', price: '$78,000 USD', date: 'Mar 2021' },
    ],
    serviceHistory: [
      { date: 'Jun 8, 2026', service: '30,000 mi Major Service & Brake Pad Set', cost: '$2,200', status: 'Completed' },
    ],
    tradeInHistory: [
      { vehicle: '2019 Porsche Macan Base', tradeVal: '$31,000 USD', appliedTo: '2021 Macan S' },
    ],
    journeyTimeline: [
      { type: 'Website', text: 'Configured Macan GTS in Carmine Red on porsche.com.do', time: 'Jul 19, 2026' },
      { type: 'Finance', text: 'Porsche Financial 60-month plan approved at $1,580/month', time: 'Jul 23, 2026' },
      { type: 'Test Drive', text: 'Completed Macan GTS sport drive at Porsche Center', time: 'Jul 25, 2026' },
      { type: 'Contract', text: 'Reviewing delivery timeline — 3 weeks estimated', time: 'Jul 27, 2026' },
    ],
  },
  'fernando-rainieri': {
    name: 'Fernando Rainieri',
    id: 'VIP-SD-007',
    phone: '+1 (809) 555-0512',
    email: 'f.rainieri@multicentro.com.do',
    location: 'Acropolis, Santiago',
    lifetimeValue: 890000,
    aiPurchaseScore: 87,
    interestedModel: 'Panamera 4 E-Hybrid',
    stage: 'Corporate Fleet Order',
    financialProfile: {
      preferredPayment: 'Corporate Fleet Wire Transfer',
      creditTier: 'Tier 1 Corporate Fleet Platinum',
      approvedEquity: '$600,000 USD',
    },
    currentFleet: [
      { model: '2024 Porsche Panamera 4 E-Hybrid', mileage: '9,800 mi', status: 'Active Garage' },
      { model: '2022 Porsche Cayenne E-Hybrid', mileage: '26,100 mi', status: 'Active Garage' },
      { model: '2021 Porsche Panamera 4S', mileage: '44,200 mi', status: 'Active Garage' },
    ],
    purchaseHistory: [
      { vehicle: '2024 Porsche Panamera 4 E-Hybrid', price: '$138,000 USD', date: 'Jan 2024' },
      { vehicle: '2022 Porsche Cayenne E-Hybrid', price: '$112,000 USD', date: 'Jun 2022' },
      { vehicle: '2021 Porsche Panamera 4S', price: '$128,000 USD', date: 'Mar 2021' },
    ],
    serviceHistory: [
      { date: 'Jul 5, 2026', service: 'Fleet Battery Health Check — 3 Vehicles', cost: '$3,600', status: 'Completed' },
      { date: 'Apr 14, 2026', service: 'Annual Fleet Inspection & PDK Service', cost: '$4,200', status: 'Completed' },
    ],
    tradeInHistory: [
      { vehicle: '2020 Porsche Panamera 4S', tradeVal: '$82,000 USD', appliedTo: '2024 Panamera 4 E-Hybrid' },
    ],
    journeyTimeline: [
      { type: 'Fleet Request', text: 'Submitted RFQ for 4-unit Panamera 4 E-Hybrid fleet order', time: 'Jul 14, 2026' },
      { type: 'VIP Meeting', text: 'Corporate fleet presentation at Porsche Center Santiago', time: 'Jul 20, 2026' },
      { type: 'Approval', text: 'Internal board approval for $540,000 USD fleet budget', time: 'Jul 24, 2026' },
      { type: 'Contract', text: 'Fleet contract under final legal review — sign-off imminent', time: 'Jul 27, 2026' },
    ],
  },
  'roberto-bonetti': {
    name: 'Roberto Bonetti',
    id: 'VIP-SD-008',
    phone: '+1 (809) 555-0618',
    email: 'r.bonetti@bonegroup.com.do',
    location: 'Juanillo, Cap Cana',
    lifetimeValue: 340000,
    aiPurchaseScore: 81,
    interestedModel: 'Panamera GTS',
    stage: 'Executive Approval',
    financialProfile: {
      preferredPayment: 'Wire Transfer — USD',
      creditTier: 'Tier 1 Premium',
      approvedEquity: '$180,000 USD',
    },
    currentFleet: [
      { model: '2022 Porsche Panamera 4S', mileage: '19,400 mi', status: 'Active Garage' },
    ],
    purchaseHistory: [
      { vehicle: '2022 Porsche Panamera 4S', price: '$148,000 USD', date: 'Sep 2022' },
    ],
    serviceHistory: [
      { date: 'May 28, 2026', service: 'Air Suspension Overhaul & Wheel Alignment', cost: '$2,800', status: 'Completed' },
    ],
    tradeInHistory: [
      { vehicle: '2019 Porsche Panamera 4', tradeVal: '$72,000 USD', appliedTo: '2022 Panamera 4S' },
    ],
    journeyTimeline: [
      { type: 'Website', text: 'Built Panamera GTS in Night Blue Metallic with Sport Exhaust', time: 'Jul 16, 2026' },
      { type: 'Showroom', text: 'Reviewed GTS vs 4S comparison at Cap Cana delivery hub', time: 'Jul 22, 2026' },
      { type: 'Approval', text: 'Awaiting executive board signoff for $152,000 purchase', time: 'Jul 25, 2026' },
      { type: 'Test Drive', text: 'GTS highway test drive booked — Aug 2, 2026', time: 'Jul 27, 2026' },
    ],
  },
  'alejandro-corripio': {
    name: 'Alejandro Corripio',
    id: 'VIP-SD-009',
    phone: '+1 (809) 555-0144',
    email: 'a.corripio@corriopiogroup.com',
    location: 'Piantini, Santo Domingo',
    lifetimeValue: 1240000,
    aiPurchaseScore: 94,
    interestedModel: 'Taycan Turbo GT',
    stage: 'Contract Signed',
    financialProfile: {
      preferredPayment: 'Direct Bank Wire — USD',
      creditTier: 'Tier 1 Platinum Executive',
      approvedEquity: '$500,000 USD',
    },
    currentFleet: [
      { model: '2024 Porsche Taycan Turbo S', mileage: '6,200 mi', status: 'Active Garage' },
      { model: '2023 Porsche 911 GT3', mileage: '11,800 mi', status: 'Active Garage' },
      { model: '2022 Porsche Cayenne GTS', mileage: '28,400 mi', status: 'Active Garage' },
    ],
    purchaseHistory: [
      { vehicle: '2024 Porsche Taycan Turbo S', price: '$210,000 USD', date: 'Feb 2024' },
      { vehicle: '2023 Porsche 911 GT3', price: '$228,000 USD', date: 'Jul 2023' },
      { vehicle: '2022 Porsche Cayenne GTS', price: '$148,000 USD', date: 'Nov 2022' },
    ],
    serviceHistory: [
      { date: 'Jul 21, 2026', service: 'Taycan Annual Software Update & Battery Calibration', cost: '$1,100', status: 'Completed' },
      { date: 'May 3, 2026', service: 'GT3 Inspection — Brake & Clutch System Check', cost: '$2,400', status: 'Completed' },
    ],
    tradeInHistory: [
      { vehicle: '2022 Porsche Taycan Turbo', tradeVal: '$148,000 USD', appliedTo: '2024 Taycan Turbo S' },
    ],
    journeyTimeline: [
      { type: 'Allocation', text: 'Reserved Taycan Turbo GT — Purple Sky Metallic, 1 of 2 units', time: 'Jul 15, 2026' },
      { type: 'Showroom', text: 'Private Taycan Turbo GT unveil at Porsche Center SD', time: 'Jul 22, 2026' },
      { type: 'Test Drive', text: 'Verified 0-60 in 2.1s on closed circuit with Eduardo Bisonó', time: 'Jul 25, 2026' },
      { type: 'Contract', text: 'Contract signed — $230,000 USD wired, delivery Aug 10', time: 'Jul 27, 2026' },
    ],
  },
  'isabela-pellerano': {
    name: 'Isabela Pellerano',
    id: 'VIP-SD-010',
    phone: '+1 (809) 555-0729',
    email: 'i.pellerano@grupopalacio.com',
    location: 'Arroyo Hondo, Santo Domingo',
    lifetimeValue: 215000,
    aiPurchaseScore: 86,
    interestedModel: 'Taycan 4S Cross Turismo',
    stage: 'Spec Review',
    financialProfile: {
      preferredPayment: 'Porsche Financial Lease — 48 Month',
      creditTier: 'Tier 2 Corporate',
      approvedEquity: '$140,000 USD',
    },
    currentFleet: [
      { model: '2022 Porsche Cayenne S', mileage: '23,700 mi', status: 'Active Garage' },
    ],
    purchaseHistory: [
      { vehicle: '2022 Porsche Cayenne S', price: '$122,000 USD', date: 'May 2022' },
    ],
    serviceHistory: [
      { date: 'Jun 15, 2026', service: '20,000 mi Service & Cabin Filter Replacement', cost: '$1,350', status: 'Completed' },
    ],
    tradeInHistory: [
      { vehicle: '2019 Porsche Cayenne Base', tradeVal: '$54,000 USD', appliedTo: '2022 Cayenne S' },
    ],
    journeyTimeline: [
      { type: 'Website', text: 'Configured Taycan 4S Cross Turismo in Gentian Blue Metallic', time: 'Jul 18, 2026' },
      { type: 'WhatsApp', text: 'Requested Wallbox home charging feasibility assessment', time: 'Jul 21, 2026' },
      { type: 'Showroom', text: 'In-person spec review with Ramón García — EV range demo', time: 'Jul 25, 2026' },
      { type: 'Financing', text: 'Porsche Financial 48-month lease structure under review', time: 'Jul 27, 2026' },
    ],
  },
  'milo-espaillat': {
    name: 'Milo Espaillat',
    id: 'VIP-SD-011',
    phone: '+1 (809) 555-0812',
    email: 'm.espaillat@espaillat.com.do',
    location: 'Naco, Santo Domingo',
    lifetimeValue: 380000,
    aiPurchaseScore: 89,
    interestedModel: 'Macan Electric Turbo',
    stage: 'Renewal Opportunity',
    financialProfile: {
      preferredPayment: 'Porsche Leasing',
      creditTier: 'Tier 1 Executive',
      approvedEquity: '$190,000 USD',
    },
    currentFleet: [
      { model: '2020 Porsche Macan Turbo', mileage: '24,500 mi', status: 'Renewal Eligible' },
    ],
    purchaseHistory: [
      { vehicle: '2020 Porsche Macan Turbo', price: '$105,000 USD', date: 'Oct 2020' },
    ],
    serviceHistory: [
      { date: 'Jul 10, 2026', service: 'Cabin Filter Flush & Inspection', cost: '$480', status: 'Completed' },
    ],
    tradeInHistory: [
      { vehicle: '2017 Porsche Macan S', tradeVal: '$38,000 USD', appliedTo: '2020 Macan Turbo' },
    ],
    journeyTimeline: [
      { type: 'Trade-in', text: 'Initiated 2020 Macan Turbo renewal appraisal', time: 'Jul 24, 2026' },
    ],
  },
  'juan-vich': {
    name: 'Juan Vich',
    id: 'VIP-SD-012',
    phone: '+1 (809) 555-0943',
    email: 'j.vich@vichinvestments.com',
    location: 'Punta Cana Resort, La Altagracia',
    lifetimeValue: 290000,
    aiPurchaseScore: 78,
    interestedModel: 'Cayenne Turbo GT',
    stage: 'Trade-in Evaluation',
    financialProfile: {
      preferredPayment: 'Porsche Financing',
      creditTier: 'Tier 1 Corporate',
      approvedEquity: '$160,000 USD',
    },
    currentFleet: [
      { model: '2018 Porsche Cayenne E-Hybrid', mileage: '48,200 mi', status: 'Trade-in Pending' },
    ],
    purchaseHistory: [
      { vehicle: '2018 Porsche Cayenne E-Hybrid', price: '$94,000 USD', date: 'May 2018' },
    ],
    serviceHistory: [
      { date: 'Jul 15, 2026', service: 'Suspension Check & Sensor Reset', cost: '$1,200', status: 'Completed' },
    ],
    tradeInHistory: [
      { vehicle: '2015 Porsche Cayenne Base', tradeVal: '$32,000 USD', appliedTo: '2018 Cayenne E-Hybrid' },
    ],
    journeyTimeline: [
      { type: 'Service', text: 'Scheduled PASM suspension check at SD Hub', time: 'Jul 26, 2026' },
    ],
  },
  'eduardo-najri': {
    name: 'Eduardo Najri',
    id: 'VIP-SD-013',
    phone: '+1 (809) 555-0771',
    email: 'e.najri@najrigroup.com.do',
    location: 'Piantini, Santo Domingo',
    lifetimeValue: 650000,
    aiPurchaseScore: 93,
    interestedModel: 'Panamera Turbo E-Hybrid',
    stage: 'VIP Contract Signed',
    financialProfile: {
      preferredPayment: 'Wire Transfer / Direct Escrow',
      creditTier: 'Tier 1 Executive Ultra',
      approvedEquity: '$380,000 USD',
    },
    currentFleet: [
      { model: '2021 Porsche Panamera GTS', mileage: '18,900 mi', status: 'Active Garage' },
      { model: '2024 Porsche Panamera 4 E-Hybrid', mileage: '3,400 mi', status: 'Active Garage' },
    ],
    purchaseHistory: [
      { vehicle: '2024 Porsche Panamera 4 E-Hybrid', price: '$142,000 USD', date: 'Jan 2024' },
    ],
    serviceHistory: [
      { date: 'Jul 21, 2026', service: 'PDK Gearbox Service', cost: '$1,890', status: 'In Progress' },
    ],
    tradeInHistory: [
      { vehicle: '2019 Panamera 4', tradeVal: '$68,000 USD', appliedTo: '2021 Panamera GTS' },
    ],
    journeyTimeline: [
      { type: 'Contract', text: 'Panamera Turbo E-Hybrid deposit received', time: 'Jul 27, 2026' },
    ],
  },
  'ana-vicini': {
    name: 'Ana Vicini',
    id: 'VIP-SD-014',
    phone: '+1 (809) 555-0632',
    email: 'a.vicini@vicini.com.do',
    location: 'Casa de Campo, La Romana',
    lifetimeValue: 510000,
    aiPurchaseScore: 85,
    interestedModel: 'Taycan Turbo S Cross Turismo',
    stage: 'Spec Customization',
    financialProfile: {
      preferredPayment: 'Porsche Leasing',
      creditTier: 'Tier 1 Platinum',
      approvedEquity: '$290,000 USD',
    },
    currentFleet: [
      { model: '2020 Porsche Taycan 4S Cross Turismo', mileage: '11,200 mi', status: 'Active Garage' },
    ],
    purchaseHistory: [
      { vehicle: '2020 Porsche Taycan 4S Cross Turismo', price: '$135,000 USD', date: 'Dec 2020' },
    ],
    serviceHistory: [
      { date: 'Jun 18, 2026', service: '800V High Voltage Diagnostic', cost: '$750', status: 'Completed' },
    ],
    tradeInHistory: [
      { vehicle: '2018 Macan GTS', tradeVal: '$49,000 USD', appliedTo: '2020 Taycan 4S' },
    ],
    journeyTimeline: [
      { type: 'Website', text: 'Configured Taycan Turbo S Cross Turismo', time: 'Jul 25, 2026' },
    ],
  },
  'frank-rainieri': {
    name: 'Frank Rainieri',
    id: 'VIP-SD-015',
    phone: '+1 (809) 555-0100',
    email: 'f.rainieri@puntacana.com',
    location: 'Punta Cana Resort & Club',
    lifetimeValue: 1450000,
    aiPurchaseScore: 97,
    interestedModel: 'Cayenne Turbo GT',
    stage: 'Executive VIP Delivery',
    financialProfile: {
      preferredPayment: 'Direct Corporate Escrow',
      creditTier: 'Tier 1 Executive Ultra',
      approvedEquity: '$750,000 USD',
    },
    currentFleet: [
      { model: '2023 Porsche Cayenne Turbo GT', mileage: '9,800 mi', status: 'Active Garage' },
      { model: '2022 Porsche 911 Targa 4 GTS', mileage: '5,400 mi', status: 'Active Garage' },
    ],
    purchaseHistory: [
      { vehicle: '2023 Porsche Cayenne Turbo GT', price: '$225,000 USD', date: 'Aug 2023' },
    ],
    serviceHistory: [
      { date: 'Jul 22, 2026', service: 'AWD Differential Service', cost: '$1,450', status: 'Completed' },
    ],
    tradeInHistory: [
      { vehicle: '2020 Cayenne Turbo', tradeVal: '$115,000 USD', appliedTo: '2023 Cayenne Turbo GT' },
    ],
    journeyTimeline: [
      { type: 'Delivery', text: 'Confirmed VIP Cayenne Turbo GT delivery at Punta Cana Resort', time: 'Jul 27, 2026' },
    ],
  },
};

const CLIENT_KEYS = Object.keys(ALL_CLIENTS) as string[];

const getClientData = (key?: string): ClientData => {
  if (!key) return ALL_CLIENTS['luis-corripio'];
  const formattedKey = key.toLowerCase().trim() as ClientKey;
  if (ALL_CLIENTS[formattedKey]) {
    return ALL_CLIENTS[formattedKey];
  }
  const titleCaseName = formattedKey
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  return {
    name: titleCaseName,
    id: `VIP-SD-${Math.floor(100 + Math.random() * 900)}`,
    phone: '+1 (809) 555-0199',
    email: `${formattedKey.replace('-', '.')}@porsche-client.com.do`,
    location: 'Santo Domingo, Dominican Republic',
    lifetimeValue: 450000,
    aiPurchaseScore: 85,
    interestedModel: 'Porsche 911 Carrera GTS',
    stage: 'In Review',
    financialProfile: {
      preferredPayment: 'Porsche Financial Wire Transfer',
      creditTier: 'Tier 1 Executive',
      approvedEquity: '$250,000 USD',
    },
    currentFleet: [
      { model: '2023 Porsche 911 Carrera GTS', mileage: '11,200 mi', status: 'Active Garage' },
    ],
    purchaseHistory: [
      { vehicle: '2023 Porsche 911 Carrera GTS', price: '$178,000 USD', date: 'Feb 2023' },
    ],
    serviceHistory: [
      { date: 'Jul 14, 2026', service: 'Annual Inspection & PDK Check', cost: '$950', status: 'Completed' },
    ],
    tradeInHistory: [
      { vehicle: '2020 Porsche Macan S', tradeVal: '$52,000 USD', appliedTo: '2023 911 GTS' },
    ],
    journeyTimeline: [
      { type: 'CRM Record', text: `Synchronized telemetry profile for ${titleCaseName}`, time: 'Jul 27, 2026' },
    ],
  };
};

export default function Customer360() {
  const { language } = useLanguage();
  const t = translations[language];
  const { customerId } = useParams<{ customerId?: string }>();
  const navigate = useNavigate();

  const [activeKey, setActiveKey] = useState<string>(customerId || 'luis-corripio');
  const [customerSearch, setCustomerSearch] = useState('');

  useEffect(() => {
    if (customerId) setActiveKey(customerId);
  }, [customerId]);

  const client = getClientData(activeKey);

  const switchTo = (key: string) => {
    navigate(`/customer-360/${key}`);
  };

  const filteredKeys = CLIENT_KEYS.filter((key) => {
    const c = ALL_CLIENTS[key];
    const q = customerSearch.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.interestedModel.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-porsche-red font-bold mb-1">
            VIP CLIENT DIRECTORY & TELEMETRY
          </div>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            Customer 360 Hub
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">Select any client below to inspect complete fleet, financial, and engagement telemetry</p>
        </div>

        {/* Back to Sales */}
        <button
          onClick={() => navigate('/sales')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-porsche-red transition-colors cursor-pointer self-start sm:self-auto"
        >
          <ChevronLeft size={14} />
          Back to Sales
        </button>
      </div>

      {/* Customer Switcher Search & Pills */}
      <div className="porsche-card flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-porsche-red" />
            <span className="text-xs font-bold font-mono text-slate-900 dark:text-white uppercase">
              All Clients Directory ({filteredKeys.length} / {CLIENT_KEYS.length})
            </span>
          </div>

          {/* Search bar */}
          <div className="relative min-w-[240px] sm:min-w-[320px]">
            <input
              type="text"
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              placeholder="Search clients by name, model, location..."
              className="w-full pl-3 pr-4 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-porsche-red"
            />
          </div>
        </div>

        {/* Pills */}
        <div className="flex items-center gap-2 flex-wrap max-h-[160px] overflow-y-auto pr-1">
          {filteredKeys.map((key) => (
            <button
              key={key}
              onClick={() => switchTo(key)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold theme-transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeKey === key
                  ? 'bg-porsche-red text-white shadow-glow-red'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>{ALL_CLIENTS[key].name}</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                activeKey === key ? 'bg-white/20 text-white' : 'bg-black/10 dark:bg-white/10 text-slate-400'
              }`}>
                {ALL_CLIENTS[key].aiPurchaseScore} pts
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 1. VIP HEADER CARD */}
      <div className="porsche-card flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-porsche-red/10 via-transparent to-transparent">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-3xl flex items-center justify-center shrink-0 border-2 border-porsche-red shadow-glow-red">
            {client.name.charAt(0)}
          </div>
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-porsche-red uppercase font-mono">
              <ShieldCheck size={14} />
              {client.id} VIP Account
            </div>
            <h2 className="text-title-48 font-bold text-slate-900 dark:text-white leading-tight">{client.name}</h2>
            <p className="text-small-13 text-slate-500 dark:text-slate-400">
              {client.email} • {client.phone} • {client.location}
            </p>
            <div className="flex items-center gap-2 mt-1 flex-wrap justify-center sm:justify-start">
              <span className="text-[10px] font-bold uppercase font-mono px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500">
                {client.interestedModel}
              </span>
              <span className="text-[10px] font-bold uppercase font-mono px-2.5 py-1 rounded-full bg-porsche-red/10 text-porsche-red">
                {client.stage}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8 shrink-0 border-t md:border-t-0 md:border-l border-black/10 dark:border-white/10 pt-4 md:pt-0 md:pl-8">
          <div className="text-center">
            <p className="text-[10px] text-slate-400 uppercase font-mono">Lifetime Value</p>
            <p className="text-section-30 font-bold text-slate-900 dark:text-white">
              <CountUp prefix="$" end={client.lifetimeValue} decimals={0} />
            </p>
          </div>
          <div className="h-10 w-px bg-slate-200 dark:bg-white/10" />
          <div className="text-center">
            <p className="text-[10px] text-slate-400 uppercase font-mono">AI Purchase Score</p>
            <p className="text-section-30 font-bold text-porsche-red">{client.aiPurchaseScore} / 100</p>
          </div>
        </div>
      </div>

      {/* 2. FINANCIAL PROFILE & GARAGE FLEET */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="porsche-card flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Financial Profile & Credit Tier</h3>
            <DollarSign size={20} className="text-porsche-red" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <p className="text-[9px] text-slate-400 font-mono uppercase">Payment Preference</p>
              <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">{client.financialProfile.preferredPayment}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <p className="text-[9px] text-slate-400 font-mono uppercase">Credit Classification</p>
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">{client.financialProfile.creditTier}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <p className="text-[9px] text-slate-400 font-mono uppercase">Pre-Approved Equity</p>
              <p className="text-xs font-bold text-porsche-red mt-1">{client.financialProfile.approvedEquity}</p>
            </div>
          </div>
        </div>

        <div className="porsche-card flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Active Porsche Garage Fleet</h3>
            <Car size={20} className="text-blue-500" />
          </div>
          <div className="flex flex-col gap-3">
            {client.currentFleet.map((v, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-body-16 font-bold text-slate-900 dark:text-white">{v.model}</p>
                  <p className="text-[10px] text-slate-400 font-mono">Mileage: {v.mileage}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  v.status.includes('Trade') ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                }`}>
                  {v.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. PURCHASE, SERVICE & TRADE-IN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="porsche-card flex flex-col gap-4">
          <h4 className="text-card-22 font-bold text-slate-900 dark:text-white">Purchase History</h4>
          <div className="flex flex-col gap-2">
            {client.purchaseHistory.map((ph, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{ph.vehicle}</p>
                  <p className="text-[9px] text-slate-400 font-mono">{ph.date}</p>
                </div>
                <span className="font-bold text-porsche-red">{ph.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="porsche-card flex flex-col gap-4">
          <h4 className="text-card-22 font-bold text-slate-900 dark:text-white">Service History</h4>
          <div className="flex flex-col gap-2">
            {client.serviceHistory.map((sh, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{sh.service}</p>
                  <p className="text-[9px] text-slate-400 font-mono">{sh.date}</p>
                </div>
                <span className={`font-bold ${sh.status === 'Scheduled' ? 'text-amber-500' : 'text-emerald-600 dark:text-emerald-400'}`}>{sh.cost}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="porsche-card flex flex-col gap-4">
          <h4 className="text-card-22 font-bold text-slate-900 dark:text-white">Trade-In History</h4>
          <div className="flex flex-col gap-2">
            {client.tradeInHistory.map((th, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{th.vehicle}</p>
                  <p className="text-[9px] text-slate-400 font-mono">Applied to: {th.appliedTo}</p>
                </div>
                <span className="font-bold text-amber-500">{th.tradeVal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. RELATIONSHIP JOURNEY TIMELINE */}
      <div className="porsche-card flex flex-col gap-6">
        <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
          <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Relationship Journey Timeline</h3>
          <span className="text-xs font-mono text-slate-400">{client.journeyTimeline.length} Interactions</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {client.journeyTimeline.map((step, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-porsche-red uppercase font-mono px-2 py-0.5 rounded-full bg-porsche-red/10">
                  {step.type}
                </span>
                <span className="text-[9px] text-slate-400 font-mono">{step.time}</span>
              </div>
              <p className="text-small-13 text-slate-700 dark:text-slate-300 font-semibold leading-snug">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
