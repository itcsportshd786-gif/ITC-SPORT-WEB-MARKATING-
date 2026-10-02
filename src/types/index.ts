export type ThemePreset = 'black-blue' | 'black-red' | 'black-gold' | 'darkblue-cyan' | 'custom';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  button: string;
  text: string;
  surface: string;
}

export type BookingStatus = 
  | 'NEW' 
  | 'CONTACTED' 
  | 'QUOTATION SENT' 
  | 'CONFIRMED' 
  | 'ADVANCE RECEIVED' 
  | 'COMPLETED' 
  | 'CANCELLED';

export interface Package {
  id: string;
  name: string;
  cameras: string;
  cameraCount: number;
  tagline: string;
  priceDisplay: string;
  isPopular?: boolean;
  isEnabled: boolean;
  sortOrder: number;
  features: string[];
  description: string;
  bestFor: string;
  specs: {
    cameras: string;
    operators: string;
    replay: string;
    scoreboard: string;
    streaming: string;
    delivery: string;
  };
}

export interface Booking {
  id: string; // E.g., ITC-2026-8942
  clientName: string;
  organization: string;
  mobile: string;
  whatsapp: string;
  email: string;
  eventName: string;
  eventType: string; // Cricket Tournament, League, Exhibition Match, Corporate Cup, Other
  venue: string;
  city: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  days: number;
  packageId: string;
  packageName: string;
  additionalServices: string[];
  requirements: string;
  notes: string;
  posterName?: string;
  referenceImagesCount?: number;
  status: BookingStatus;
  createdAt: string;
  internalNotes?: string;
  quotationAmount?: number;
  advancePaid?: number;
  balanceDue?: number;
  lastReminderSentAt?: string;
  reminderCount?: number;
  paymentMethod?: string;
  organizerAgreedTerms?: boolean;
  committeeProvisions?: string[];
}

export interface Client {
  id: string;
  name: string;
  organization: string;
  phone: string;
  whatsapp: string;
  email: string;
  city: string;
  totalEvents: number;
  totalBilled: number;
  notes: string;
  createdAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export type PaymentStatus = 'PENDING' | 'PARTIALLY PAID' | 'PAID' | 'CANCELLED';

export interface Invoice {
  id: string;
  invoiceNumber: string; // E.g., INV-ITC-2026-0042
  date: string;
  dueDate: string;
  bookingId?: string;
  clientName: string;
  organization: string;
  phone: string;
  email: string;
  eventName: string;
  venue: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  taxPercent: number;
  taxAmount: number;
  grandTotal: number;
  advancePaid: number;
  balanceDue: number;
  paymentStatus: PaymentStatus;
  notes: string;
  terms: string;
  createdAt?: string;
}

export type EventStatus = 'UPCOMING' | 'LIVE' | 'COMPLETED';

export interface EventItem {
  id: string;
  name: string;
  client: string;
  venue: string;
  city: string;
  date: string;
  time: string;
  package: string;
  status: EventStatus;
  description: string;
  posterColor: string;
  countdownTarget?: string; // ISO string for timer
  liveMatchDetails?: {
    matchTitle: string;
    team1: { name: string; score: string; overs: string; flag: string };
    team2: { name: string; score: string; overs: string; flag: string };
    statusText: string;
    currentBowler: string;
    currentBatsmen: string;
    streamActive: boolean;
  };
  tournamentResult?: string;
  galleryLink?: string;
}

export type GalleryCategory = 
  | 'All'
  | 'Cricket'
  | 'Live Matches'
  | 'Camera Setup'
  | 'Broadcasting'
  | 'Replay'
  | 'Scoreboard'
  | 'Multi-Camera'
  | 'Third Umpire'
  | 'Full Ground'
  | 'Tournaments'
  | 'Behind The Scenes';

export interface LiveStreamConfig {
  youtubeUrl: string;
  isLive: boolean;
  matchTitle: string;
  tournamentName: string;
  streamDescription: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  mediaType: 'image' | 'video';
  url: string; // Image URL or Video URL
  description: string;
  tag?: string;
  isFeatured?: boolean;
  createdAt?: string;
}

export interface BroadcastTechNode {
  id: string;
  label: string;
  iconName: string;
  shortTag: string;
  summary: string;
  fullDetails: string;
  specs: string[];
}

export interface WebsiteSettings {
  brandName: string;
  tagline: string;
  secondaryTagline: string;
  whatsapp: string; // Used internally for booking redirects
  email: string;
  address: string;
  city: string;
  heroHeading: string;
  heroSubtitle: string;
  aboutText: string;
  adminPassword?: string;
  liveStream: LiveStreamConfig;
  themePreset: ThemePreset;
  colors: ThemeColors;
  socials: {
    youtube: string;
    instagram: string;
    facebook: string;
  };
}
