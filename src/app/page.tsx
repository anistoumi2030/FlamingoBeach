"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FlamingoLogo } from "@/components/FlamingoLogo";
import {
  Search,
  MapPin,
  Home,
  CalendarDays,
  Users,
  Heart,
  Star,
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";

/* ─── SVG Social Icons ─── */
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.11v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.15V11.7a4.78 4.78 0 01-3.77-1.74V6.69h3.77z"/>
    </svg>
  );
}

function SocialIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "facebook":
      return <FacebookIcon className={className} />;
    case "instagram":
      return <InstagramIcon className={className} />;
    case "youtube":
      return <YoutubeIcon className={className} />;
    case "tiktok":
      return <TiktokIcon className={className} />;
    default:
      return null;
  }
}

/* ─── Data ─── */
const listings = [
  {
    id: 1,
    title: "Parasol Madera & Lounge",
    location: "Ghar El Melh, Bizerte",
    type: "Parasol",
    price: 80,
    priceUnit: "Par Adulte",
    image: "https://sfile.chatglm.cn/images-ppt/b9c2129b92cb.jpg",
    color: "#FCD34D",
    emoji: "🏖️",
    rating: 0,
    reviews: 0,
    featured: true,
    avatar: null,
  },
  {
    id: 2,
    title: "Pailotte Madera & Lounge",
    location: "Ghar El Melh, Bizerte",
    type: "Pailotte",
    price: 70,
    priceUnit: "Par Adulte",
    image: "https://sfile.chatglm.cn/images-ppt/623810489076.jpg",
    color: "#34D399",
    emoji: "🌴",
    rating: 0,
    reviews: 0,
    featured: true,
    avatar: null,
  },
  {
    id: 3,
    title: "Cabane Madera & Lounge",
    location: "Ghar El Melh, Bizerte",
    type: "Cabane",
    price: 70,
    priceUnit: "Par Adulte",
    image: "https://sfile.chatglm.cn/images-ppt/d96351d722cf.jpg",
    color: "#60A5FA",
    emoji: "🏠",
    rating: 5,
    reviews: 1,
    featured: true,
    avatar: null,
  },
  {
    id: 4,
    title: "Pailotte Pied Dans L'eau",
    location: "Ghar El Melh, Bizerte",
    type: "Pailotte",
    price: 90,
    priceUnit: "Par Adulte",
    image: "https://sfile.chatglm.cn/images-ppt/7809f3bf0aba.jpg",
    color: "#34D399",
    emoji: "🌴",
    rating: 0,
    reviews: 0,
    featured: true,
    avatar: null,
  },
  {
    id: 5,
    title: "Pailotte Pieds Dans L'eau",
    location: "Ghar El Melh, Bizerte",
    type: "Pailotte",
    price: 90,
    priceUnit: "Par Adulte",
    image: "https://sfile.chatglm.cn/images-ppt/ff921471e92f.jpg",
    color: "#34D399",
    emoji: "🌴",
    rating: 0,
    reviews: 0,
    featured: true,
    avatar: null,
  },
  {
    id: 6,
    title: "Cabane Sur Sable",
    location: "Ghar El Melh, Bizerte",
    type: "Cabane",
    price: 70,
    priceUnit: "Par Adulte",
    image: "https://sfile.chatglm.cn/images-ppt/c42b7a204aee.jpg",
    color: "#60A5FA",
    emoji: "🏠",
    rating: 0,
    reviews: 0,
    featured: true,
    avatar: null,
  },
];

const socialLinks = [
  { icon: "facebook", href: "#", label: "Facebook" },
  { icon: "instagram", href: "#", label: "Instagram" },
  { icon: "tiktok", href: "#", label: "TikTok" },
  { icon: "youtube", href: "#", label: "YouTube" },
];

const footerLinks: Record<string, { label: string; href: string }[]> = {
  DÉCOUVRIR: [
    { label: "Accueil", href: "/" },
    { label: "Annonces", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "/contact" },
  ],
  TYPES: [
    { label: "Parasols", href: "/?type=parasol" },
    { label: "Paillottes", href: "/?type=pailotte" },
    { label: "Cabanes", href: "/?type=cabane" },
    { label: "Paillotes en mer", href: "/?type=cabane-vip" },
  ],
  DESTINATIONS: [
    { label: "Ghar El Melh", href: "#" },
  ],
  INFORMATIONS: [
    { label: "Conditions générales", href: "/conditions-generales" },
    { label: "Confidentialité", href: "/confidentialite" },
    { label: "FAQ", href: "/faq" },
  ],
};

/* ─── Component ─── */
export default function HomePage() {
  const [destination, setDestination] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [today, setToday] = useState("");
  const [filteredListings, setFilteredListings] = useState(listings);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  // Auto-filter by type from URL params
  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam) {
      const typeMap: Record<string, string> = {
        parasol: "Parasol",
        pailotte: "Pailotte",
        cabane: "Cabane",
        "cabane-vip": "Cabane VIP",
      };
      const typeName = typeMap[typeParam.toLowerCase()];
      if (typeName) {
        setType(typeParam.toLowerCase());
        const results = listings.filter(
          (item) => item.type.toLowerCase() === typeName.toLowerCase()
        );
        setFilteredListings(results);
        setSearchAttempted(true);
      }
    }
  }, [searchParams]);

  const handleSearch = () => {
    setSearchAttempted(true);
    let results = [...listings];

    if (destination) {
      const destMap: Record<string, string> = {
        "ghar-el-melh": "Ghar El Melh",
      };
      const destName = destMap[destination];
      if (destName) {
        results = results.filter((item) =>
          item.location.toLowerCase().includes(destName.toLowerCase())
        );
      }
    }

    if (type) {
      const typeMap: Record<string, string> = {
        parasol: "Parasol",
        pailotte: "Pailotte",
        cabane: "Cabane",
        "cabane-vip": "Cabane VIP",
      };
      const typeName = typeMap[type];
      if (typeName) {
        results = results.filter(
          (item) => item.type.toLowerCase() === typeName.toLowerCase()
        );
      }
    }

    setFilteredListings(results);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-50 bg-[#173b56] border-b border-[#0f2a4a] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Social icons */}
            <div className="hidden md:flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <SocialIcon name={link.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Center: Logo */}
            <a href="/" className="flex items-center gap-2">
              <FlamingoLogo className="h-9 w-9" />
              <span className="text-white font-bold text-xl tracking-wide">
                FLAMINGO COUCOU BEACH
              </span>
            </a>

            {/* Right: Nav links */}
            <nav className="hidden sm:flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-sm text-white/70">
                    Bonjour, {user.name || user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-white/70 hover:text-white transition-colors text-sm font-medium flex items-center gap-1"
                  >
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth?mode=login"
                    className="text-white/70 hover:text-white transition-colors text-sm font-medium"
                  >
                    Se connecter
                  </Link>
                  <Link
                    href="/auth?mode=signup"
                    className="text-white/70 hover:text-white transition-colors text-sm font-medium"
                  >
                    S'inscrire
                  </Link>
                </>
              )}
              <Link
                href="/partner"
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Devenir partenaire
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button className="sm:hidden text-white" aria-label="Menu">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ─── MAIN ─── */}
      <main className="flex-1">
        {/* ─── SEARCH BAR SECTION ─── */}
        <section className="pt-8 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-stretch gap-3 glass-effect p-4 rounded-xl">
              {/* Destination */}
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-border rounded-lg text-sm text-white bg-muted appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Destination ?</option>
                  <option value="ghar-el-melh">Ghar El Melh, Bizerte</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Type */}
              <div className="flex-1 relative">
                <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-border rounded-lg text-sm text-white bg-muted appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Type ?</option>
                  <option value="parasol">Parasol</option>
                  <option value="pailotte">Pailotte</option>
                  <option value="cabane">Cabane</option>
                  <option value="cabane-vip">Cabane VIP</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Date */}
              <div className="flex-1 relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={today}
                  className="w-full pl-10 pr-3 py-3 border border-border rounded-lg text-sm text-white bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Date"
                />
              </div>

              {/* Guests */}
              <div className="flex-1 relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-border rounded-lg text-sm text-white bg-muted appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Invités</option>
                  <option value="1">1 personne</option>
                  <option value="2">2 personnes</option>
                  <option value="3">3 personnes</option>
                  <option value="4">4 personnes</option>
                  <option value="5">5 personnes</option>
                  <option value="6">6+ personnes</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Search button */}
              <button
                onClick={handleSearch}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-medium text-sm transition-colors min-w-[140px]"
              >
                <Search className="w-4 h-4" />
                Rechercher
              </button>
            </div>
          </div>
        </section>

        {/* ─── HERO SECTION ─── */}
        <section className="py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Réservez votre coin de paradis
              <br className="hidden sm:block" /> sur la plage,
            </h1>
            <p className="mt-4 text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
              Cabanes, pailottes et parasols à louer sur les plus belles plages
              de Tunisie.
            </p>
          </div>
        </section>

        {/* ─── LISTINGS GRID ─── */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredListings.length === 0 && searchAttempted ? (
              <div className="text-center py-16">
                <div className="text-gray-500 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Aucun résultat trouvé
                </h2>
                <p className="text-gray-400">
                  Essayez de modifier vos critères de recherche.
                </p>
              </div>
            ) : (
              <>
                {searchAttempted && (
                  <p className="text-sm text-gray-400 mb-4">
                    {filteredListings.length} résultat{filteredListings.length > 1 ? "s" : ""} trouvé{filteredListings.length > 1 ? "s" : ""}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredListings.map((listing) => (
                    <Link key={listing.id} href={`/listing/${listing.id}`}>
                      <ListingCard listing={listing} />
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#1a365d] text-white mt-auto">
        {/* Wave top */}
        <div className="w-full overflow-hidden leading-none rotate-180">
          <svg viewBox="0 0 1440 120" className="w-full h-16 sm:h-24" preserveAspectRatio="none">
            <path fill="#1a365d" d="M0,60 C150,20 350,100 550,70 C750,40 900,90 1100,60 C1300,30 1400,80 1440,70 L1440,120 L0,120 Z"></path>
            <path fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.3" d="M280,45 C320,25 360,55 400,35"></path>
            <path fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.25" d="M320,70 C360,50 400,75 440,58"></path>
            <path fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.35" d="M1100,55 C1140,35 1180,60 1220,40"></path>
            <circle cx="280" cy="48" r="2" fill="#ffffff" opacity="0.4"></circle>
            <circle cx="320" cy="72" r="1.5" fill="#ffffff" opacity="0.35"></circle>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left column: Logo + description + social */}
            <div className="md:col-span-4">
              <div className="flex items-center gap-2 mb-4">
                <FlamingoLogo className="h-9 w-9" />
                <span className="font-bold text-xl tracking-wide">FLAMINGO COUCOU BEACH</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-sm">
                Découvrez notre sélection de locations sur les plus belles plages de la Tunisie. Parasols, paillotes ou cabanes de luxe pour des journées inoubliables.
              </p>
              <div className="flex items-center gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <SocialIcon name={link.icon} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links columns */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title}>
                  <h3 className="font-semibold text-sm mb-4 text-white">
                    {title}
                  </h3>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-gray-300 hover:text-white text-sm transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-blue-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-xs">
              © {new Date().getFullYear()} FlamingoBeach.com.tn — Tous droits réservés.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs">Devise:</span>
              <select className="bg-[#0f2a4a] text-white text-xs rounded px-2 py-1 border border-blue-700">
                <option>TND</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Listing Card ─── */
function ListingCard({
  listing,
}: {
  listing: {
    id: number;
    title: string;
    location: string;
    type: string;
    price: number;
    priceUnit: string;
    image: string | null;
    color?: string;
    emoji?: string;
    rating: number;
    reviews: number;
    featured: boolean;
    avatar: string | null;
  };
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="group bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-blue-500/50">
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {listing.image ? (
          <Image
            src={listing.image}
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: listing.color || "#FCD34D" }}
          >
            <span className="text-6xl">{listing.emoji || "🏖️"}</span>
          </div>
        )}
        {/* Image dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white opacity-90" />
          <span className="w-2 h-2 rounded-full bg-white/40" />
          <span className="w-2 h-2 rounded-full bg-white/40" />
        </div>

        {/* Featured badge */}
        {listing.featured && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            En vedette
          </span>
        )}

        {/* Favorite button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          aria-label="Ajouter aux favoris"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-gray-600"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <p className="text-white font-bold text-lg">
          {listing.price} TND{" "}
          <span className="text-sm font-normal text-gray-400">
            / {listing.priceUnit}
          </span>
        </p>

        {/* Title */}
        <h3 className="text-white font-semibold mt-1 text-base leading-snug">
          {listing.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 mt-1.5">
          <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span className="text-gray-400 text-sm truncate">
            {listing.location}
          </span>
        </div>

        {/* Type */}
        <div className="flex items-center gap-1 mt-1">
          <Home className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span className="text-gray-400 text-sm">{listing.type}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-4 h-4 ${
                  s <= listing.rating
                    ? "fill-amber-400 text-amber-400"
                    : "fill-none text-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-500 text-xs ml-1">
            - {listing.reviews > 0 ? `${listing.reviews} avis` : "avis"}
          </span>
        </div>
      </div>
    </div>
  );
}