import { 
  Package, 
  Booking, 
  Client, 
  Invoice, 
  EventItem, 
  GalleryItem, 
  BroadcastTechNode, 
  WebsiteSettings,
  ThemeColors,
  ThemePreset
} from '../types';

export const THEME_PRESETS: Record<ThemePreset, ThemeColors> = {
  'black-blue': {
    primary: '#0284c7', // Sky / Electric blue
    secondary: '#0a101d',
    accent: '#38bdf8',
    bg: '#05070c',
    button: '#0284c7',
    text: '#f8fafc',
    surface: '#0d1527',
  },
  'black-red': {
    primary: '#e11d48', // Electric rose red
    secondary: '#160b0e',
    accent: '#fb7185',
    bg: '#080305',
    button: '#e11d48',
    text: '#fff1f2',
    surface: '#1a0d11',
  },
  'black-gold': {
    primary: '#d97706', // Championship gold
    secondary: '#17140e',
    accent: '#fbbf24',
    bg: '#080705',
    button: '#d97706',
    text: '#fffbeb',
    surface: '#1c170c',
  },
  'darkblue-cyan': {
    primary: '#06b6d4', // Deep cyan
    secondary: '#071828',
    accent: '#22d3ee',
    bg: '#030c16',
    button: '#0891b2',
    text: '#ecfeff',
    surface: '#092135',
  },
  'custom': {
    primary: '#0284c7',
    secondary: '#0a101d',
    accent: '#38bdf8',
    bg: '#05070c',
    button: '#0284c7',
    text: '#f8fafc',
    surface: '#0d1527',
  }
};

export const INITIAL_WEBSITE_SETTINGS: WebsiteSettings = {
  brandName: 'ITC SPORTS',
  tagline: 'LIVE SPORTS BROADCASTING & PRODUCTION',
  secondaryTagline: 'Experience the Game Like Never Before',
  whatsapp: '9986095581',
  email: 'broadcast@itcsports.com',
  address: 'ITC Sports Media Studio, Belagavi',
  city: 'Belagavi, Karnataka & Pan-India',
  heroHeading: 'LIVE SPORTS BROADCASTING & PRODUCTION',
  heroSubtitle: 'Experience the Game Like Never Before',
  aboutText: 'ITC SPORTS is a professional sports broadcasting and production company delivering broadcast-grade live coverage for cricket tournaments, state leagues, and marquee sporting events across India. From multi-camera setups with telephoto lenses and slow-motion replays to customized live on-screen scoreboards and third umpire systems, we bring international TV broadcast quality to every cricket ground.',
  adminPassword: 'asifmulla786',
  liveStream: {
    youtubeUrl: '',
    isLive: false,
    matchTitle: 'Belagavi Champions Trophy 2026 - Live Match Coverage',
    tournamentName: 'Belagavi Premier League',
    streamDescription: 'Live multi-camera cricket stream in 1080p 60fps HD with instant replay and dynamic on-screen scorecard.'
  },
  themePreset: 'black-blue',
  colors: THEME_PRESETS['black-blue'],
  socials: {
    youtube: 'https://youtube.com/@itcsports',
    instagram: 'https://instagram.com/itcsportshd',
    facebook: 'https://facebook.com/itcsports',
  }
};

export const INITIAL_PACKAGES: Package[] = [
  {
    id: 'pkg-basic-hd',
    name: 'BASIC HD',
    cameras: '1 Camera Setup',
    cameraCount: 1,
    tagline: 'Ideal for local & club level matches',
    priceDisplay: 'CONTACT FOR PRICING',
    isPopular: false,
    isEnabled: true,
    sortOrder: 1,
    description: 'Crisp single-camera broadcast coverage with live graphic scorecard integration, dedicated operator, and clean YouTube/Facebook live streaming.',
    bestFor: 'Local club matches, inter-school tournaments, one-day exhibition fixtures',
    features: [
      '1 Full HD Broadcast Camera Setup',
      'Professional Camera Operator with fluid-head tripod',
      'Live Digital Scoreboard Overlay (Runs, Wickets, Overs, CRR)',
      'Direct-to-Web Live Streaming (YouTube/Facebook/App)',
      'Basic Sponsor Logo & Tournament Banner Integration',
      'Match Archive & Full Recording Delivery in 1080p',
      'Standard Commentary Audio Feed Integration'
    ],
    specs: {
      cameras: '1x Sony/Panasonic Broadcast Full HD',
      operators: '1x Lead Operator + 1x Stream Technician',
      replay: 'Not included (Available as add-on)',
      scoreboard: 'Real-time 2-Line Dynamic Bug',
      streaming: 'Single 1080p 60fps RTMP Stream',
      delivery: 'Direct YouTube archive link + Raw MP4'
    }
  },
  {
    id: 'pkg-pro',
    name: 'PRO',
    cameras: '2 Cameras Setup',
    cameraCount: 2,
    tagline: 'Multi-angle drama for competitive cricket leagues',
    priceDisplay: 'CONTACT FOR PRICING',
    isPopular: true,
    isEnabled: true,
    sortOrder: 2,
    description: 'Dynamic two-camera production switching between main pitch striker end and non-striker bowler angle, equipped with instant replay and dynamic overlays.',
    bestFor: 'District tournaments, corporate cups, college leagues, T20 weekend series',
    features: [
      '2 Full HD Broadcast Cameras (Bowler End + Striker End)',
      '2 Professional Operators + 1 Production Switcher Director',
      'Instant Replay System for boundary & wicket highlights',
      'Advanced Live Scoreboard with Player Names & Strike Rates',
      'Multi-Camera Live Switching with broadcast transitions',
      'Animated Lower-Thirds & Tournament Graphics',
      'Live Streaming to Multiple Platforms Simultaneously',
      'Full Match Footage + Highlight Reel Delivery'
    ],
    specs: {
      cameras: '2x HD Broadcast Cameras with Optical Zoom',
      operators: '2x Field Operators + 1x Director/Switcher',
      replay: 'Single-channel instant replay clip engine',
      scoreboard: 'Full-featured TV lower-third overlay',
      streaming: 'Simulcast (YouTube + Facebook Live)',
      delivery: 'Match recording + highlight reel package'
    }
  },
  {
    id: 'pkg-premium',
    name: 'PREMIUM',
    cameras: '3 Cameras Setup',
    cameraCount: 3,
    tagline: 'High-octane tournament broadcast with slow-motion',
    priceDisplay: 'CONTACT FOR PRICING',
    isPopular: false,
    isEnabled: true,
    sortOrder: 3,
    description: 'Three synchronised HD cameras offering pitch view, square leg / boundary view, and pavilion reactions with dedicated slow-motion replay operator.',
    bestFor: 'State-level cricket championships, high-stakes invitational trophies, franchise leagues',
    features: [
      '3 Full HD Broadcast Cameras with telephoto lenses',
      '3 Dedicated Operators + 1 Production Director + 1 Replay Tech',
      'Professional Multi-Angle Slow Motion Instant Replay',
      'Customized Broadcast Scorecard Suite with Team Branding',
      'Wicket Fall & Boundary Graphic Stinger Animations',
      'Multi-Angle Coverage (Straight pitch, Square-leg, Dugout)',
      'Dual-mic Commentary Box Audio Mixing Setup',
      'Post-match Presentation & Award Ceremony Coverage'
    ],
    specs: {
      cameras: '3x Heavy-Duty Broadcast Cine/ENG Cams',
      operators: '3x Operators + 1x Switcher + 1x Replay Tech',
      replay: 'Multi-speed slow motion with custom stingers',
      scoreboard: 'Full International Broadcast TV Graphic Suite',
      streaming: 'Dedicated High-Bitrate 1080p60 Stream with failover',
      delivery: 'Instant match clips for social media + Full HD Archive'
    }
  },
  {
    id: 'pkg-golden-pro',
    name: 'GOLDEN PRO',
    cameras: '4+ Cameras Setup',
    cameraCount: 4,
    tagline: 'Stadium TV broadcast standard with Third Umpire review',
    priceDisplay: 'CONTACT FOR PRICING',
    isPopular: false,
    isEnabled: true,
    sortOrder: 4,
    description: 'The pinnacle of cricket production. Complete 360-degree ground coverage, dedicated Third Umpire review desk, multi-angle slow-mo, and broadcast control van.',
    bestFor: 'Major premier leagues, state cricket associations, national-level tournaments',
    features: [
      '4+ Broadcast Cameras (Straight ends, Square legs, High-angle & Dugout)',
      'Third Umpire / DRS Decision Review System with synchronized playback',
      'Full Ground 360-Degree Panoramic Action Coverage',
      'Dedicated Slow-Motion Replay Desk & Highlight Producer',
      'Custom 3D Animated Scoreboard & Batter/Bowler Head-to-Head HUDs',
      'Wireless Boundary Roaming Cam for close-up player reactions & celebrations',
      'Broadcast Audio Setup for commentators & stump sound capture',
      'Social Media Clip-Cutter producing instant reels & viral moments',
      'Comprehensive Tournament Opening & Closing Mega Show Coverage'
    ],
    specs: {
      cameras: '4 to 6x Broadcast Telephoto & Field Cameras',
      operators: 'Full 7-Member Production Crew & Technical Director',
      replay: 'Independent multi-channel slow-motion replay server',
      scoreboard: 'Custom 3D TV Package, Spider / Radar Graphic Support',
      streaming: 'Quad-bonded 4K/1080p Ultra-Low Latency Broadcast',
      delivery: 'Broadcast-ready raw feeds, social clips, and master 4K archive'
    }
  }
];

export const TECH_WHEEL_ITEMS: BroadcastTechNode[] = [
  {
    id: 'camera',
    label: 'CAMERA',
    iconName: 'Camera',
    shortTag: 'Ultra-HD Optics',
    summary: 'Professional HD camera coverage for live sports events.',
    fullDetails: 'We deploy studio-grade broadcast cameras equipped with high-magnification telephoto zoom lenses, heavy-duty fluid heads, and fiber optic cabling to ensure pristine clarity even under dazzling stadium floodlights.',
    specs: ['Sony & Panasonic Broadcast Sensors', 'High-Magnification Optical Zoom', 'Fluid-Head Tripods', '4K / 1080p 60fps Broadcast Standard']
  },
  {
    id: 'replay',
    label: 'REPLAY',
    iconName: 'RotateCcw',
    shortTag: 'Frame-by-Frame Slow-Mo',
    summary: 'Instant replay system for important match moments.',
    fullDetails: 'Zero-delay slow-motion replay servers capture every boundary, close run-out, edge to keeper, and celebrating dugout, instantly queued and rendered with branded transition stingers.',
    specs: ['Multi-Channel Synchronized Record', '0.25x to 1x Variable Slow-Motion', 'Custom Animated Broadcast Stingers', 'Instant Highlight Reel Compilation']
  },
  {
    id: 'scoreboard',
    label: 'SCOREBOARD',
    iconName: 'BarChart2',
    shortTag: 'Real-time TV Graphics',
    summary: 'Live real-time broadcast scoreboards & match statistics.',
    fullDetails: 'Customized on-screen graphic bugs mirroring international television feeds. Integrates runs, wickets, overs, current run-rate, target requirements, player stats, and custom tournament sponsor watermarks.',
    specs: ['Real-time Ball-by-Ball Sync', 'Batter & Bowler Performance Cards', 'Sponsor Logo Carousel Integration', 'Tournament Lower-Thirds & Match Banners']
  },
  {
    id: 'multi-angle',
    label: 'MULTI-ANGLE',
    iconName: 'Video',
    shortTag: 'Tactical Visuals',
    summary: 'Multi-angle production capturing every strategic viewpoint.',
    fullDetails: 'Simultaneous camera positions covering bowler run-up, striker strokeplay, slips cordon, mid-wicket, and boundary ropes, switched dynamically in live time by veteran directors.',
    specs: ['Straight Pitch Angle A & B', 'Square-Leg Umpire Line Cam', 'High-Elevation Tactical Perspective', 'Wireless Dugout & Celebration Roamer']
  },
  {
    id: 'third-umpire',
    label: 'THIRD UMPIRE',
    iconName: 'Scale',
    shortTag: 'DRS & Line Decisions',
    summary: 'Official third umpire decision review system.',
    fullDetails: 'Synchronized multi-camera frame-by-frame scrubbing that empowers umpires to make precision decisions on run-outs, stumpings, boundary check ropes, and no-balls with on-screen "DECISION PENDING" broadcast graphics.',
    specs: ['Synchronized Split-Screen Playback', 'Frame-by-Frame Jog Shuttle Controller', 'Live TV "DECISION PENDING" Graphics', 'Umpire Intercom Integration']
  },
  {
    id: 'full-ground',
    label: 'FULL GROUND',
    iconName: 'Compass',
    shortTag: '360° Field Presence',
    summary: 'Complete ground coverage from boundary ropes to pavilion.',
    fullDetails: 'Comprehensive camera deployment leaving zero blind spots. From boundary catches inches from the foam to emotional team dugouts and electric crowd reactions across the stadium.',
    specs: ['Perimeter Boundary Wire Feeds', 'Pavilion & Dugout Telephoto Coverage', 'Spectator Stand Atmosphere Mics', 'Trophy Presentation Stage Production']
  },
  {
    id: 'live-stream',
    label: 'LIVE STREAM',
    iconName: 'Radio',
    shortTag: 'Bonded 60fps Broadcast',
    summary: 'Uninterrupted live streaming to YouTube, Facebook, and Apps.',
    fullDetails: 'Multi-SIM cellular bonded encoders and satellite redundancy guarantee zero buffering and crisp 60fps high-bitrate streaming even in packed stadiums with congested local network cell towers.',
    specs: ['Multi-Network Bonded Cellular Encoders', 'YouTube, Facebook & Custom RTMP', 'Full 1080p 60fps Constant Bitrate', 'Simultaneous Local Master Backup']
  },
  {
    id: 'production',
    label: 'PRODUCTION',
    iconName: 'Mic',
    shortTag: 'Mobile Control Van',
    summary: 'Complete turnkey tournament broadcast management.',
    fullDetails: 'Mobile broadcast production control room equipped with hardware video switchers, dual-commentary audio consoles, live graphics engines, and a coordinated crew of technical directors.',
    specs: ['Dedicated Production Director', 'Dual Commentary Box Setup', 'Stump Mic & Stadium Ambience Audio', 'Pre-match & Post-match Show Packaging']
  }
];

export const INITIAL_SERVICES = [
  {
    id: 'srv-1',
    title: 'Live Sports Broadcasting',
    shortDesc: 'End-to-end television grade broadcast production for leagues and championships.',
    icon: 'Tv',
    tag: 'Turnkey Production',
    details: 'Complete end-to-end broadcast packaging including professional multi-camera switching, director guidance, on-screen TV graphics, and multi-platform streaming.'
  },
  {
    id: 'srv-2',
    title: 'Cricket Live Streaming',
    shortDesc: 'Ultra-low latency, stable 1080p 60fps streaming to YouTube, OTT apps and Facebook.',
    icon: 'Radio',
    tag: 'Zero Lag Streaming',
    details: 'Bonded 4G/5G cellular live transmission rigs ensure that your stream never drops, delivering butter-smooth 60 frames per second to thousands of fans watching worldwide.'
  },
  {
    id: 'srv-3',
    title: 'HD Camera Production',
    shortDesc: 'Broadcast cameras with high-grade telephoto zoom for razor-sharp action.',
    icon: 'Camera',
    tag: 'Broadcast Optics',
    details: 'Equipped with heavy-duty telephoto lenses that bring viewers right to the seam of the ball, the batsman’s eyes, and the bail flying through the air.'
  },
  {
    id: 'srv-4',
    title: 'Multi-Camera Coverage',
    shortDesc: 'Synchronized multi-camera setups from 2 to 6+ cameras across all pitch angles.',
    icon: 'Layers',
    tag: 'Multi-Point Vision',
    details: 'Multiple camera positions switched live seamlessly: bowler view, batsman view, slip cordon, square leg, boundary rope, and spectator reactions.'
  },
  {
    id: 'srv-5',
    title: 'Instant Replay',
    shortDesc: 'Instant slow-motion replays of every wicket, six, catch, and turning point.',
    icon: 'RotateCcw',
    tag: 'Slow Motion Tech',
    details: 'Slow down critical split-second action down to 25% speed with branded tournament animated stingers that give your tournament an IPL-level broadcast feel.'
  },
  {
    id: 'srv-6',
    title: 'Live Scoreboard',
    shortDesc: 'Real-time dynamic TV score graphics, player strike rates, and tournament branding.',
    icon: 'BarChart2',
    tag: 'Digital TV Bug',
    details: 'Sleek, broadcast-compliant lower-third bugs showing live scores, batsman runs/balls, bowler figures, required run rates, partnership stats, and sponsor logos.'
  },
  {
    id: 'srv-7',
    title: 'Multi-Angle Production',
    shortDesc: 'Tactical camera angles offering varied perspectives for commentators and viewers.',
    icon: 'Video',
    tag: 'Director Control',
    details: 'Dynamic switching between wide ground perspectives, tight face closeups, umpire POV angles, and dugout excitement to keep viewers glued.'
  },
  {
    id: 'srv-8',
    title: 'Third Umpire System',
    shortDesc: 'Precision line-review system for run outs, stumpings, and boundary rope checks.',
    icon: 'Scale',
    tag: 'Fair Play Technology',
    details: 'Specialized video referee console allowing umpires to view synchronized split screens, zoom in on crease lines, and render on-screen review decisions.'
  },
  {
    id: 'srv-9',
    title: 'Full Ground Coverage',
    shortDesc: '360° perimeter coverage capturing every corner of the stadium and stands.',
    icon: 'Maximize2',
    tag: 'Complete Arena',
    details: 'No play goes unseen. Strategic camera towers and wireless roving cameras cover deep boundaries, pavilion gates, VIP enclosures, and trophy presentations.'
  },
  {
    id: 'srv-10',
    title: 'Tournament Production',
    shortDesc: 'Comprehensive tournament media coverage including interviews and ceremonies.',
    icon: 'Trophy',
    tag: 'Championship Media',
    details: 'Complete turnkey media management: pre-match captain tosses, innings breaks player talks, presentation ceremonies, player of the match awards, and highlight packages.'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'ITC-2026-1039',
    clientName: 'Rajesh Naidu',
    organization: 'Bangalore Premier Cricket League Association',
    mobile: '9844011223',
    whatsapp: '9844011223',
    email: 'naidu.rajesh@bplcricket.org',
    eventName: 'Bangalore Champions League T20 (Season 4)',
    eventType: 'Cricket Tournament',
    venue: 'RWF Cricket Stadium',
    city: 'Bangalore',
    eventDate: '2026-09-18',
    startTime: '08:30 AM',
    endTime: '06:00 PM',
    days: 4,
    packageId: 'pkg-golden-pro',
    packageName: 'GOLDEN PRO (4+ Cameras with Third Umpire)',
    additionalServices: ['Third Umpire Review', 'Instant Slow-Mo Replay', 'Drone Aerial Coverage'],
    requirements: 'Complete multi-cam setup with Third Umpire review and dual commentary audio mixing.',
    notes: 'Opening match broadcast live on YouTube with 40,000+ viewers.',
    status: 'COMPLETED',
    createdAt: '2026-09-01T10:00:00Z',
    internalNotes: '100% Full Payment of ₹1,95,000 cleared via NEFT. Broadcast successfully delivered with zero drops. Client gave 5-star review!',
    quotationAmount: 195000,
    advancePaid: 195000,
    balanceDue: 0,
    reminderCount: 0,
    paymentMethod: 'NEFT / RTGS Bank Transfer'
  },
  {
    id: 'ITC-2026-1040',
    clientName: 'Anand Kulkarni',
    organization: 'Hubli Sports Federation',
    mobile: '9900223344',
    whatsapp: '9900223344',
    email: 'anand.kulkarni@hublisports.in',
    eventName: 'North Karnataka Corporate Super Cup 2026',
    eventType: 'Corporate Cup',
    venue: 'BVB Engineering College Ground',
    city: 'Hubli',
    eventDate: '2026-09-10',
    startTime: '09:00 AM',
    endTime: '05:30 PM',
    days: 3,
    packageId: 'pkg-premium',
    packageName: 'PREMIUM (3 Cameras Setup)',
    additionalServices: ['Instant Slow-Mo Replay', 'Sponsor Scoreboard Branding'],
    requirements: '3 camera setup with custom sponsor overlays and boundary player roving cam.',
    notes: 'Full tournament delivered in Full HD 1080p 60fps.',
    status: 'COMPLETED',
    createdAt: '2026-08-25T14:30:00Z',
    internalNotes: '100% Full Payment of ₹1,20,000 received via UPI. Broadcast completed on schedule.',
    quotationAmount: 120000,
    advancePaid: 120000,
    balanceDue: 0,
    reminderCount: 0,
    paymentMethod: 'UPI'
  },
  {
    id: 'ITC-2026-1042',
    clientName: 'Rahul Verma',
    organization: 'Karnataka Premier League Organizers',
    mobile: '9845012345',
    whatsapp: '9845012345',
    email: 'verma.rahul@kplcricket.in',
    eventName: 'KPL Gold Cup 2026',
    eventType: 'Cricket Tournament',
    venue: 'Chinnaswamy Sub-Ground',
    city: 'Bangalore',
    eventDate: '2026-10-15',
    startTime: '08:30 AM',
    endTime: '06:00 PM',
    days: 4,
    packageId: 'pkg-golden-pro',
    packageName: 'GOLDEN PRO (4+ Cameras)',
    additionalServices: ['Third Umpire Review', 'Social Media Instant Reels', 'Drone Ground Coverage'],
    requirements: 'Need 5 cameras + Third Umpire review console for finals. Full Hindi & English dual commentary audio mix.',
    notes: 'Opening match scheduled with state players.',
    status: 'CONFIRMED',
    createdAt: '2026-09-24T10:14:00Z',
    internalNotes: 'Advance payment of 50% received via NEFT. Crew assigned: Team Alpha (7 members).',
    quotationAmount: 185000,
    advancePaid: 92500,
    balanceDue: 92500,
    lastReminderSentAt: '2026-09-28T11:00:00Z',
    reminderCount: 1,
    paymentMethod: 'NEFT / Bank Transfer'
  },
  {
    id: 'ITC-2026-1043',
    clientName: 'Karthik Shenoy',
    organization: 'Apex Corporate Sports',
    mobile: '9740112233',
    whatsapp: '9740112233',
    email: 'karthik@apexsports.org',
    eventName: 'Bangalore Tech Super Cup',
    eventType: 'Corporate Cup',
    venue: 'Hennur Cricket Ground',
    city: 'Bangalore',
    eventDate: '2026-10-22',
    startTime: '09:00 AM',
    endTime: '05:30 PM',
    days: 2,
    packageId: 'pkg-pro',
    packageName: 'PRO (2 Cameras)',
    additionalServices: ['Live Scoreboard Custom Sponsors', 'Highlight Reel'],
    requirements: 'Live streaming on YouTube with live scoreboard showing corporate sponsors.',
    notes: 'Requires YouTube stream link provided 2 days before.',
    status: 'ADVANCE RECEIVED',
    createdAt: '2026-09-27T14:30:00Z',
    internalNotes: 'Quotation sent and confirmed. Advance received on UPI.',
    quotationAmount: 64000,
    advancePaid: 30000,
    balanceDue: 34000,
    reminderCount: 0,
    paymentMethod: 'UPI'
  },
  {
    id: 'ITC-2026-1044',
    clientName: 'Suresh Patil',
    organization: 'Belagavi District Cricket Association',
    mobile: '9448098765',
    whatsapp: '9448098765',
    email: 'bdca.suresh@gmail.com',
    eventName: 'North Karnataka T20 Trophy',
    eventType: 'League Tournament',
    venue: 'Union Gymkhana Ground',
    city: 'Belgaum',
    eventDate: '2026-11-05',
    startTime: '08:00 AM',
    endTime: '06:30 PM',
    days: 5,
    packageId: 'pkg-premium',
    packageName: 'PREMIUM (3 Cameras Setup)',
    additionalServices: ['Instant Slow-Mo Replay', 'Presentation Ceremony Packaging'],
    requirements: '3 Camera setup with slow motion replay and trophy ceremony broadcast.',
    notes: 'Outstation event, crew travel and accommodation arranged by client.',
    status: 'CONFIRMED',
    createdAt: '2026-09-18T10:00:00Z',
    internalNotes: 'Booking confirmed 14 days ago. Advance ₹40,000 received. Balance ₹1,00,000 pending due for technical dispatch.',
    quotationAmount: 140000,
    advancePaid: 40000,
    balanceDue: 100000,
    reminderCount: 1,
    paymentMethod: 'UPI'
  },
  {
    id: 'ITC-2026-1045',
    clientName: 'Mohammed Zameer',
    organization: 'Mysore Lions Sports Club',
    mobile: '9880554433',
    whatsapp: '9880554433',
    email: 'zameer.mysore@yahoo.com',
    eventName: 'Heritage City Invitational T10',
    eventType: 'Cricket Tournament',
    venue: 'Gangothri Glades Cricket Ground',
    city: 'Mysore',
    eventDate: '2026-11-14',
    startTime: '09:00 AM',
    endTime: '05:00 PM',
    days: 3,
    packageId: 'pkg-pro',
    packageName: 'PRO (2 Cameras)',
    additionalServices: ['Instant Replay'],
    requirements: 'Live streaming on YouTube with live scoreboard.',
    notes: 'Awaiting venue clearance.',
    status: 'NEW',
    createdAt: '2026-10-01T08:15:00Z',
    internalNotes: 'New booking via website form. Needs quick call on WhatsApp.',
    quotationAmount: 78000,
    advancePaid: 0,
    balanceDue: 78000,
    reminderCount: 0
  }
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'cl-1',
    name: 'Rahul Verma',
    organization: 'Karnataka Premier League Organizers',
    phone: '9845012345',
    whatsapp: '9845012345',
    email: 'verma.rahul@kplcricket.in',
    city: 'Bangalore',
    totalEvents: 4,
    totalBilled: 420000,
    notes: 'Premium client. Regularly books 4+ camera setups with Third Umpire.',
    createdAt: '2025-11-10T12:00:00Z'
  },
  {
    id: 'cl-2',
    name: 'Karthik Shenoy',
    organization: 'Apex Corporate Sports',
    phone: '9740112233',
    whatsapp: '9740112233',
    email: 'karthik@apexsports.org',
    city: 'Bangalore',
    totalEvents: 3,
    totalBilled: 168000,
    notes: 'Corporate event organizer with 8 corporate tournaments yearly.',
    createdAt: '2026-02-15T09:20:00Z'
  },
  {
    id: 'cl-3',
    name: 'Suresh Patil',
    organization: 'Belagavi District Cricket Association',
    phone: '9448098765',
    whatsapp: '9448098765',
    email: 'bdca.suresh@gmail.com',
    city: 'Belgaum',
    totalEvents: 2,
    totalBilled: 210000,
    notes: 'State district association. Prefers Premium 3-camera package.',
    createdAt: '2026-04-05T15:10:00Z'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-101',
    invoiceNumber: 'INV-ITC-2026-0041',
    date: '2026-09-25',
    dueDate: '2026-10-14',
    bookingId: 'ITC-2026-1042',
    clientName: 'Rahul Verma',
    organization: 'Karnataka Premier League Organizers',
    phone: '9845012345',
    email: 'verma.rahul@kplcricket.in',
    eventName: 'KPL Gold Cup 2026',
    venue: 'Chinnaswamy Sub-Ground, Bangalore',
    items: [
      { id: '1', description: 'GOLDEN PRO 4+ Camera Setup (4 Days)', quantity: 4, unitPrice: 38000, total: 152000 },
      { id: '2', description: 'Third Umpire / DRS Line Decision Review Console', quantity: 1, unitPrice: 18000, total: 18000 },
      { id: '3', description: 'Social Media Instant Highlight Clip Cutting', quantity: 1, unitPrice: 15000, total: 15000 }
    ],
    subtotal: 185000,
    discount: 5000,
    taxPercent: 18,
    taxAmount: 32400,
    grandTotal: 212400,
    advancePaid: 106200,
    balanceDue: 106200,
    paymentStatus: 'PARTIALLY PAID',
    notes: 'Advance 50% credited. Remaining balance due on completion of Day 4.',
    terms: 'Payment via Bank NEFT / RTGS or UPI. GST included as per law.'
  },
  {
    id: 'inv-102',
    invoiceNumber: 'INV-ITC-2026-0042',
    date: '2026-09-28',
    dueDate: '2026-10-21',
    bookingId: 'ITC-2026-1043',
    clientName: 'Karthik Shenoy',
    organization: 'Apex Corporate Sports',
    phone: '9740112233',
    email: 'karthik@apexsports.org',
    eventName: 'Bangalore Tech Super Cup',
    venue: 'Hennur Cricket Ground, Bangalore',
    items: [
      { id: '1', description: 'PRO 2-Camera Live Broadcast & Streaming (2 Days)', quantity: 2, unitPrice: 28000, total: 56000 },
      { id: '2', description: 'Custom Corporate Sponsor Overlays & High-Res MP4 Archive', quantity: 1, unitPrice: 8000, total: 8000 }
    ],
    subtotal: 64000,
    discount: 0,
    taxPercent: 18,
    taxAmount: 11520,
    grandTotal: 75520,
    advancePaid: 35000,
    balanceDue: 40520,
    paymentStatus: 'PARTIALLY PAID',
    notes: 'Advance received. Final balance due on match evening.',
    terms: 'Broadcast feed guaranteed in 1080p 60fps.'
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-live',
    name: 'Karnataka Champions Trophy - Semi Final 2',
    client: 'Karnataka Cricket Association',
    venue: 'RWF Cricket Stadium',
    city: 'Bangalore',
    date: 'Today',
    time: '01:30 PM - 05:45 PM',
    package: 'GOLDEN PRO (4+ Cameras)',
    status: 'LIVE',
    description: 'High-intensity semi-final clash broadcasted live in 1080p60 with instant slow-motion replay and Third Umpire review.',
    posterColor: 'from-blue-900 to-slate-950',
    liveMatchDetails: {
      matchTitle: 'Bangalore Warriors vs Mysore Strikers',
      team1: { name: 'BAN WARRIORS', score: '184/5', overs: '19.4', flag: '🏏' },
      team2: { name: 'MYS STRIKERS', score: 'Target: 185', overs: 'Yet to bat', flag: '⚡' },
      statusText: '1st Innings · Over 19.4 · Last Pair In',
      currentBowler: 'K. Gowtham (3.4-0-32-2)',
      currentBatsmen: 'V. Kumar 48* (29) & R. Samarth 12* (6)',
      streamActive: true
    }
  },
  {
    id: 'evt-up-1',
    name: 'Bangalore Corporate Super League 2026',
    client: 'Apex Corporate Sports',
    venue: 'Hennur Sports Ground',
    city: 'Bangalore',
    date: 'October 15, 2026',
    time: '09:00 AM Onwards',
    package: 'PRO (2 Cameras)',
    status: 'UPCOMING',
    countdownTarget: '2026-10-15T09:00:00Z',
    description: '16 top corporate tech giants battling for the annual Bangalore IT Cricket Crown with full HD broadcast.',
    posterColor: 'from-cyan-900 to-slate-950'
  },
  {
    id: 'evt-up-2',
    name: 'All-India Inter-Collegiate T20 Championship',
    client: 'State Youth Sports Federation',
    venue: 'Chinnaswamy Stadium B-Ground',
    city: 'Bangalore',
    date: 'October 28, 2026',
    time: '08:30 AM Onwards',
    package: 'PREMIUM (3 Cameras)',
    status: 'UPCOMING',
    countdownTarget: '2026-10-28T08:30:00Z',
    description: 'Top collegiate cricket stars from across India competing under broadcast telephoto scrutiny.',
    posterColor: 'from-indigo-900 to-slate-950'
  },
  {
    id: 'evt-comp-1',
    name: 'Deccan Grand Challenge Cup Finals',
    client: 'Deccan Sports League',
    venue: 'Gymkhana Sports Arena',
    city: 'Hubli',
    date: 'September 22, 2026',
    time: 'Completed',
    package: 'GOLDEN PRO (4+ Cameras)',
    status: 'COMPLETED',
    description: 'Thrilling last-over finish broadcasted live with full DRS review and 6-camera ground coverage.',
    posterColor: 'from-slate-900 to-black',
    tournamentResult: 'Champions: Hubli Titans by 4 runs · Player of the Tournament: Arjun M. (246 runs + 8 wickets)',
    galleryLink: '#gallery'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Multi-Camera Field Setup at Day-Night Cricket Tournament',
    category: 'Cricket',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    description: 'High-end pitch camera setup with telephoto zoom on the bowler and batsman action.',
    tag: 'Main Pitch Cam'
  },
  {
    id: 'gal-2',
    title: 'Mobile Broadcast Production Switcher Console',
    category: 'Broadcasting',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    description: 'Live video switching deck with instant slow-motion replay triggers and scorecard controls.',
    tag: 'Control Room'
  },
  {
    id: 'gal-3',
    title: 'Third Umpire Run-Out Review Frame-by-Frame Scrubbing',
    category: 'Third Umpire',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80',
    description: 'Precision decision review technology with on-screen TV replay graphics.',
    tag: 'DRS Review'
  },
  {
    id: 'gal-4',
    title: 'Full Ground Floodlight Cricket Championship Match',
    category: 'Full Ground',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80',
    description: 'Crisp 1080p60 multi-camera live broadcast covering all boundary corners.',
    tag: 'Live Match'
  }
];
