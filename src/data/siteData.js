// Kiritara Resorts - Centralized Content Management System
// This file contains all editable content for the website

export const siteData = {
  // Site Meta Information
  meta: {
    title: "Kiritara Resorts - Exclusive Investment Opportunities",
    description: "Discover premium resort investment opportunities with Kiritara Resorts. Luxury accommodations, high returns, and exclusive access to world-class destinations.",
    keywords: "luxury resort investment, premium hospitality, real estate investment, resort development, exclusive opportunities",
    author: "Kiritara Resorts",
  },

  // Branding
  brand: {
    name: "Kiritara Resorts",
    tagline: "Where Luxury Meets Investment Excellence",
    logo: "/src/assets/kiritara-logo.png", // To be generated
  },

  // Navigation
  navigation: {
    links: [
      { name: "Home", href: "/", active: true },
      { name: "Investments", href: "#investments" },
      { name: "Properties", href: "#properties" },
      { name: "Gallery", href: "#gallery" },
      { name: "About", href: "#about" },
      { name: "Contact", href: "#contact" },
    ],
  },

  // Hero Section
  hero: {
    title: "Exclusive Resort Investment Opportunities",
    subtitle: "Premium Returns. Luxury Experiences. Unmatched Exclusivity.",
    description: "Join an elite group of investors in world-class resort developments. Experience the perfect blend of luxury hospitality and exceptional financial returns in the most sought-after destinations.",
    backgroundImage: "/src/assets/hero-resort.jpg", // To be generated
    primaryCTA: {
      text: "Explore Investments",
      href: "#investments"
    },
    secondaryCTA: {
      text: "Schedule Consultation",
      href: "#contact"
    },
    features: [
      "15-25% Annual Returns",
      "Prime Locations",
      "Full Management",
      "Luxury Amenities"
    ]
  },

  // Investment Opportunities Section
  investments: {
    title: "Premium Investment Opportunities",
    subtitle: "Carefully curated resort projects with exceptional return potential",
    description: "Our exclusive portfolio features hand-selected resort developments in the world's most desirable locations, offering investors unparalleled returns and luxury amenities.",
    opportunities: [
      {
        id: 1,
        title: "Tropical Paradise Resort",
        location: "Maldives",
        expectedReturn: "22% Annual",
        minInvestment: "$500,000",
        duration: "5-7 Years",
        image: "/src/assets/maldives-resort.jpg", // To be generated
        features: [
          "Overwater Villas",
          "Private Beach Access",
          "World-class Spa",
          "Michelin-star Dining",
          "Guaranteed Occupancy"
        ],
        description: "An exclusive 50-villa resort in the pristine Maldives, featuring overwater accommodations and premium amenities. Limited to 20 investors only.",
        status: "Available",
        availability: "40% Remaining"
      },
      {
        id: 2,
        title: "Mountain Retreat Lodge",
        location: "Swiss Alps",
        expectedReturn: "18% Annual",
        minInvestment: "$750,000",
        duration: "7-10 Years",
        image: "/src/assets/swiss-resort.jpg", // To be generated
        features: [
          "Ski-in/Ski-out Access",
          "Luxury Chalets",
          "Alpine Spa",
          "Fine Dining",
          "Year-round Operations"
        ],
        description: "A luxury mountain resort with direct slope access, featuring 30 premium chalets and world-class facilities in the heart of the Swiss Alps.",
        status: "Limited",
        availability: "15% Remaining"
      },
      {
        id: 3,
        title: "Coastal Wellness Sanctuary",
        location: "Santorini, Greece",
        expectedReturn: "20% Annual",
        minInvestment: "$400,000",
        duration: "5-8 Years",
        image: "/src/assets/santorini-resort.jpg", // To be generated
        features: [
          "Cliff-side Suites",
          "Infinity Pools",
          "Wellness Center",
          "Private Yacht Access",
          "Sunset Views"
        ],
        description: "An intimate wellness resort perched on Santorini's famous cliffs, offering breathtaking sunset views and holistic luxury experiences.",
        status: "New",
        availability: "85% Remaining"
      }
    ]
  },

  // Gallery Section
  gallery: {
    title: "Experience Luxury",
    subtitle: "A glimpse into the extraordinary world of Kiritara Resorts",
    images: [
      {
        src: "/src/assets/gallery-1.jpg", // Luxury resort pool
        alt: "Infinity pool overlooking ocean",
        category: "Amenities"
      },
      {
        src: "/src/assets/gallery-2.jpg", // Spa treatment
        alt: "Luxury spa treatment room",
        category: "Wellness"
      },
      {
        src: "/src/assets/gallery-3.jpg", // Fine dining
        alt: "Michelin-star restaurant",
        category: "Dining"
      },
      {
        src: "/src/assets/gallery-4.jpg", // Suite interior
        alt: "Luxury suite interior",
        category: "Accommodations"
      },
      {
        src: "/src/assets/gallery-5.jpg", // Beach scene
        alt: "Private beach access",
        category: "Location"
      },
      {
        src: "/src/assets/gallery-6.jpg", // Activities
        alt: "Water sports and activities",
        category: "Activities"
      }
    ]
  },

  // About Section
  about: {
    title: "Excellence in Luxury Hospitality Investment",
    subtitle: "Building premium destinations, delivering exceptional returns",
    description: "Kiritara Resorts specializes in developing and managing world-class resort properties that deliver both exceptional guest experiences and outstanding investor returns. Our team combines decades of hospitality expertise with proven investment strategies.",
    image: "/src/assets/about-image.jpg", // To be generated
    features: [
      {
        title: "Proven Track Record",
        description: "Over $2B in successful resort developments with consistently high returns for our investors.",
        icon: "trophy"
      },
      {
        title: "Prime Locations",
        description: "Exclusive access to the world's most desirable destinations and premium real estate opportunities.",
        icon: "map-pin"
      },
      {
        title: "Full Management",
        description: "Complete end-to-end management from development to operations, ensuring optimal performance.",
        icon: "settings"
      },
      {
        title: "Luxury Standards",
        description: "Uncompromising commitment to luxury, quality, and exceptional guest experiences.",
        icon: "star"
      }
    ],
    stats: [
      { number: "50+", label: "Luxury Properties" },
      { number: "98%", label: "Investor Satisfaction" },
      { number: "$2B+", label: "Assets Under Management" },
      { number: "15+", label: "Years Experience" }
    ]
  },

  // Contact Section
  contact: {
    title: "Ready to Explore Exclusive Opportunities?",
    subtitle: "Connect with our investment specialists to learn more about our premium resort developments",
    description: "Schedule a private consultation to discuss investment opportunities tailored to your portfolio and preferences.",
    phone: "+1 (555) 123-4567",
    email: "investments@kiritararesorts.com",
    address: "1234 Luxury Avenue, Suite 5000, New York, NY 10001",
    form: {
      title: "Request Investment Information",
      fields: [
        { name: "fullName", label: "Full Name", type: "text", required: true },
        { name: "email", label: "Email Address", type: "email", required: true },
        { name: "phone", label: "Phone Number", type: "tel", required: true },
        { name: "investmentAmount", label: "Investment Budget", type: "select", required: true, options: [
          "$250K - $500K",
          "$500K - $1M",
          "$1M - $2.5M",
          "$2.5M - $5M",
          "$5M+"
        ]},
        { name: "timeline", label: "Investment Timeline", type: "select", required: true, options: [
          "Immediately",
          "Within 3 months",
          "Within 6 months",
          "Within 1 year",
          "Just exploring"
        ]},
        { name: "message", label: "Additional Information", type: "textarea", required: false }
      ]
    }
  },

  // Footer
  footer: {
    description: "Kiritara Resorts - Where luxury meets exceptional investment returns. Discover exclusive opportunities in the world's most prestigious destinations.",
    quickLinks: [
      { name: "Investment Opportunities", href: "#investments" },
      { name: "Property Portfolio", href: "#properties" },
      { name: "Investment Process", href: "#process" },
      { name: "Investor Resources", href: "#resources" }
    ],
    legalLinks: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Investment Disclaimer", href: "/disclaimer" },
      { name: "Contact", href: "#contact" }
    ],
    social: [
      { name: "LinkedIn", href: "#", icon: "linkedin" },
      { name: "Twitter", href: "#", icon: "twitter" },
      { name: "Instagram", href: "#", icon: "instagram" },
      { name: "YouTube", href: "#", icon: "youtube" }
    ],
    copyright: "© 2024 Kiritara Resorts. All rights reserved."
  }
};

// Admin Configuration
export const adminConfig = {
  credentials: {
    username: "admin",
    password: "kiritara2024", // In production, this should be properly hashed
  },
  editableFields: [
    "hero.title",
    "hero.subtitle", 
    "hero.description",
    "investments.title",
    "investments.subtitle",
    "investments.description",
    "about.title",
    "about.subtitle",
    "about.description",
    "contact.title",
    "contact.subtitle",
    "contact.description"
  ]
};

// Theme Configuration
export const themeConfig = {
  defaultTheme: "light",
  themes: {
    light: {
      name: "Luxury Light",
      colors: {
        primary: "hsl(45, 100%, 50%)",
        background: "hsl(0, 0%, 98%)",
        foreground: "hsl(0, 0%, 12%)"
      }
    },
    dark: {
      name: "Luxury Dark", 
      colors: {
        primary: "hsl(45, 100%, 50%)",
        background: "hsl(0, 0%, 8%)",
        foreground: "hsl(0, 0%, 95%)"
      }
    }
  }
};