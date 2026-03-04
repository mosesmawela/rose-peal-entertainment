export interface Artist {
  id: string;
  slug: string;
  name: string;
  role: string;
  genre: string;
  image: string;
  bio: string;
  monthlyListeners?: string;
  socials?: {
    instagram?: string;
    twitter?: string;
    spotify?: string;
    youtube?: string;
  };
  releases?: {
    title: string;
    year: string;
    type: string;
  }[];
}

export const ARTISTS: Artist[] = [
  {
    id: "1",
    slug: "maglera-doe-boy",
    name: "Maglera Doe Boy",
    role: "Hip-Hop / Lyricist",
    genre: "Hip-Hop",
    image: "https://ik.imagekit.io/mosesmawela/Rose%20Pearl/maglera%20doe%20boy?updatedAt=1772020851365",
    bio: "Maglera Doe Boy is a visionary hip-hop artist known for his intricate lyricism and authentic storytelling. Hailing from the Maglera township, his music reflects the raw experiences of street life while offering hope and inspiration. With a unique flow that blends vernacular rap with contemporary hip-hop, he has carved out a distinct sound that resonates with audiences across South Africa and beyond.",
    monthlyListeners: "125K",
    socials: {
      instagram: "https://instagram.com/magleradoeboy",
      twitter: "https://twitter.com/magleradoeboy",
      spotify: "https://open.spotify.com/artist/magleradoeboy",
    },
    releases: [
      { title: "Diaspora", year: "2023", type: "Album" },
      { title: "Township Dreams", year: "2022", type: "EP" },
      { title: "Streets Made Me", year: "2021", type: "Single" },
    ]
  },
  {
    id: "2",
    slug: "mawelele",
    name: "Mawelele",
    role: "Amapiano / Soul",
    genre: "Amapiano",
    image: "https://ik.imagekit.io/mosesmawela/Rose%20Pearl/mawelele?updatedAt=1772020850890",
    bio: "Mawelele brings a fresh perspective to the Amapiano scene, infusing soulful melodies with the infectious rhythms that have made the genre a global phenomenon. With roots in traditional African music and modern electronic production, Mawelele creates soundscapes that transport listeners while keeping them moving on the dance floor.",
    monthlyListeners: "89K",
    socials: {
      instagram: "https://instagram.com/mawelele",
      twitter: "https://twitter.com/mawelele",
      spotify: "https://open.spotify.com/artist/mawelele",
    },
    releases: [
      { title: "Soulful Nights", year: "2024", type: "EP" },
      { title: "Vibration", year: "2023", type: "Single" },
    ]
  },
  {
    id: "3",
    slug: "mawhoo",
    name: "Mawhoo",
    role: "Vocalist / Performer",
    genre: "Amapiano / Pop",
    image: "https://ik.imagekit.io/mosesmawela/Rose%20Pearl/mawhoo?updatedAt=1772020850709",
    bio: "Mawhoo is a dynamic vocalist and performer whose powerful voice has become synonymous with the new wave of Amapiano music. Known for electrifying live performances and collaborations with top producers, Mawhoo continues to push boundaries and redefine what it means to be a modern African artist.",
    monthlyListeners: "156K",
    socials: {
      instagram: "https://instagram.com/mawhoo",
      twitter: "https://twitter.com/mawhoo",
      spotify: "https://open.spotify.com/artist/mawhoo",
    },
    releases: [
      { title: "Ngiphe", year: "2024", type: "Single" },
      { title: "Thanda", year: "2023", type: "Single" },
    ]
  },
  {
    id: "4",
    slug: "uncool-angels",
    name: "Uncool Angels",
    role: "Alternative / Group",
    genre: "Alternative / Indie",
    image: "https://ik.imagekit.io/mosesmawela/Rose%20Pearl/UNCOOL%20ANGELS%20?updatedAt=1772020862852",
    bio: "Uncool Angels is an alternative music collective that defies categorization. Blending elements of indie, electronic, and experimental sounds, the group creates atmospheric and emotionally resonant music that speaks to a generation of listeners seeking authenticity. Their live shows are immersive experiences that blur the lines between concert and art installation.",
    monthlyListeners: "45K",
    socials: {
      instagram: "https://instagram.com/uncoolangels",
      twitter: "https://twitter.com/uncoolangels",
      spotify: "https://open.spotify.com/artist/uncoolangels",
    },
    releases: [
      { title: "Heaven's Basement", year: "2024", type: "Album" },
      { title: "Falling Up", year: "2023", type: "EP" },
    ]
  },
  {
    id: "5",
    slug: "springle",
    name: "Springle",
    role: "Amapiano / House",
    genre: "Amapiano / House",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60",
    bio: "Springle is a rising force in the Amapiano and House music scene. With an ear for infectious beats and a talent for creating dance anthems, Springle has quickly gained recognition as one of the most exciting producers and DJs to watch. Their music captures the energy of South African nightlife while pushing the genre in new directions.",
    monthlyListeners: "67K",
    socials: {
      instagram: "https://instagram.com/springle",
      spotify: "https://open.spotify.com/artist/springle",
    },
    releases: [
      { title: "Spring Fever", year: "2024", type: "EP" },
    ]
  },
  {
    id: "6",
    slug: "016-banger-boyz",
    name: "016 Banger Boyz",
    role: "Hip-Hop / Duo",
    genre: "Hip-Hop",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop&q=60",
    bio: "016 Banger Boyz is a dynamic hip-hop duo representing the 016 area code. Their high-energy performances and street-smart lyrics have earned them a loyal following. Combining traditional rap elements with modern trap influences, they create music that speaks to the hustlers and dreamers of their generation.",
    monthlyListeners: "34K",
    socials: {
      instagram: "https://instagram.com/016bangerboyz",
      twitter: "https://twitter.com/016bangerboyz",
    },
    releases: [
      { title: "Area Code", year: "2023", type: "Mixtape" },
    ]
  },
  {
    id: "7",
    slug: "civil-soul",
    name: "Civil Soul",
    role: "Soul / R&B",
    genre: "Soul / R&B",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60",
    bio: "Civil Soul delivers smooth, heartfelt R&B with a contemporary edge. Drawing inspiration from classic soul legends while incorporating modern production techniques, Civil Soul creates music that speaks directly to the heart. Their intimate performances and relatable lyrics have made them a favorite among R&B enthusiasts.",
    monthlyListeners: "28K",
    socials: {
      instagram: "https://instagram.com/civilsoul",
      spotify: "https://open.spotify.com/artist/civilsoul",
    },
    releases: [
      { title: "Inner Peace", year: "2024", type: "EP" },
    ]
  },
  {
    id: "8",
    slug: "leora",
    name: "Leora",
    role: "Pop / Indie",
    genre: "Pop / Indie",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60",
    bio: "Leora is a pop sensation in the making, blending indie sensibilities with mainstream appeal. Her ethereal vocals and introspective songwriting have garnered attention from critics and fans alike. With a sound that's both intimate and expansive, Leora represents the future of African pop music on the global stage.",
    monthlyListeners: "52K",
    socials: {
      instagram: "https://instagram.com/leora",
      twitter: "https://twitter.com/leora",
      spotify: "https://open.spotify.com/artist/leora",
    },
    releases: [
      { title: "Daydream", year: "2024", type: "Single" },
      { title: "Echoes", year: "2023", type: "EP" },
    ]
  },
  {
    id: "9",
    slug: "carter-najar",
    name: "Carter Najar",
    role: "Electronic / Producer",
    genre: "Electronic",
    image: "https://images.unsplash.com/photo-1571269742015-476d1678eb98?w=800&auto=format&fit=crop&q=60",
    bio: "Carter Najar is an electronic music producer pushing the boundaries of sound design and composition. With influences ranging from ambient to techno, Carter creates sonic landscapes that challenge conventional electronic music. His live performances are audio-visual journeys that captivate audiences in clubs and festivals alike.",
    monthlyListeners: "19K",
    socials: {
      instagram: "https://instagram.com/carternajar",
      spotify: "https://open.spotify.com/artist/carternajar",
    },
    releases: [
      { title: "Frequency", year: "2024", type: "Album" },
    ]
  },
];

export function getArtistBySlug(slug: string): Artist | undefined {
  return ARTISTS.find(artist => artist.slug === slug);
}