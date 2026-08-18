"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FlamingoLogo } from "@/components/FlamingoLogo";
import {
  ArrowLeft,
  MapPin,
  Home,
  Star,
  Heart,
  Mail,
  Lock,
  User,
  CalendarDays,
  Users,
  ChevronDown,
  CheckCircle2,
  Phone,
} from "lucide-react";

const listings = [
  {
      id: 1,
      title: "Parasol Madera & Lounge",
      location: "Ghar El Melh, Bizerte",
      type: "Parasol",
      price: 80,
      priceUnit: "Par Adulte",
      image: "https://sfile.chatglm.cn/images-ppt/b9c2129b92cb.jpg",
      images: [
        "https://sfile.chatglm.cn/images-ppt/b9c2129b92cb.jpg",
        "https://sfile.chatglm.cn/images-ppt/623810489076.jpg",
        "https://sfile.chatglm.cn/images-ppt/d96351d722cf.jpg",
      ],
      rating: 0,
      reviews: 0,
      featured: true,
      avatar: null,
      description:
        "Profitez d'une journée de détente sous notre parasol confortable avec transats, service de plage et accès direct à la mer. Un cadre idyllique pour se ressourcer en famille ou entre amis.",
    },
    {
      id: 2,
      title: "Pailotte Madera & Lounge",
      location: "Ghar El Melh, Bizerte",
      type: "Pailotte",
      price: 70,
      priceUnit: "Par Adulte",
      image: "https://sfile.chatglm.cn/images-ppt/623810489076.jpg",
      images: [
        "https://sfile.chatglm.cn/images-ppt/623810489076.jpg",
        "https://sfile.chatglm.cn/images-ppt/7809f3bf0aba.jpg",
        "https://sfile.chatglm.cn/images-ppt/ff921471e92f.jpg",
      ],
      rating: 0,
      reviews: 0,
      featured: true,
      avatar: null,
      description:
        "Notre paillote en bois sur pilotis vous offre ombre et fraîcheur les pieds dans l'eau. Dégustez des plats traditionnels tunisiens préparés avec des produits frais.",
    },
  {
    id: 3,
    title: "Cabane Madera & Lounge",
      location: "Ghar El Melh, Bizerte",
      type: "Cabane",
      price: 70,
      priceUnit: "Par Adulte",
      image: "https://sfile.chatglm.cn/images-ppt/d96351d722cf.jpg",
      images: [
        "https://sfile.chatglm.cn/images-ppt/d96351d722cf.jpg",
        "https://sfile.chatglm.cn/images-ppt/c42b7a204aee.jpg",
        "https://sfile.chatglm.cn/images-ppt/b9c2129b92cb.jpg",
      ],
      rating: 5,
      reviews: 1,
      featured: true,
      avatar: null,
      description:
        "Cabane élégante et spacieuse avec literie confortable, électricité et espace privatif. Parfaite pour une expérience de plage premium.",
    },
  {
    id: 4,
    title: "Pailotte Pied Dans L'eau",
    location: "Ghar El Melh, Bizerte",
    type: "Pailotte",
    price: 90,
    priceUnit: "Par Adulte",
    image: "https://sfile.chatglm.cn/images-ppt/7809f3bf0aba.jpg",
    images: [
      "https://sfile.chatglm.cn/images-ppt/7809f3bf0aba.jpg",
      "https://sfile.chatglm.cn/images-ppt/ff921471e92f.jpg",
      "https://sfile.chatglm.cn/images-ppt/623810489076.jpg",
    ],
    rating: 0,
    reviews: 0,
    featured: true,
    avatar: null,
    description:
      "Une paillote authentique les pieds dans l'eau pour une expérience unique. Service attentionné, cuisine locale et vue imprenable sur la mer.",
  },
  {
    id: 5,
    title: "Pailotte Pieds Dans L'eau",
    location: "Ghar El Melh, Bizerte",
    type: "Pailotte",
    price: 90,
    priceUnit: "Par Adulte",
    image: "https://sfile.chatglm.cn/images-ppt/ff921471e92f.jpg",
    images: [
      "https://sfile.chatglm.cn/images-ppt/ff921471e92f.jpg",
      "https://sfile.chatglm.cn/images-ppt/7809f3bf0aba.jpg",
      "https://sfile.chatglm.cn/images-ppt/b9c2129b92cb.jpg",
    ],
    rating: 0,
    reviews: 0,
    featured: true,
    avatar: null,
    description:
      "Paillote pieds dans l'eau avec espace lounge, musique d'ambiance et cocktail bar. L'endroit parfait pour une journée festive entre amis.",
  },
   {
     id: 6,
     title: "Cabane Sur Sable",
     location: "Ghar El Melh, Bizerte",
    type: "Cabane",
    price: 70,
    priceUnit: "Par Adulte",
    image: "https://sfile.chatglm.cn/images-ppt/c42b7a204aee.jpg",
    images: [
      "https://sfile.chatglm.cn/images-ppt/c42b7a204aee.jpg",
      "https://sfile.chatglm.cn/images-ppt/d96351d722cf.jpg",
      "https://sfile.chatglm.cn/images-ppt/7809f3bf0aba.jpg",
    ],
    rating: 0,
    reviews: 0,
    featured: true,
    avatar: null,
    description:
      "Cabane confortable sur le sable avec vue mer dégagée. Idéale pour les couples en quête d'intimité et de tranquillité.",
  },
];

const testimonials = [
  {
    name: "Sarra B.",
    avatar: "SB",
    text: "Une expérience incroyable ! La plage était magnifique et le service impeccable. Je recommande vivement le parasol Madera.",
    rating: 5,
    date: "Juillet 2025",
  },
  {
    name: "Mohamed K.",
    avatar: "MK",
    text: "Superbe journée en famille. Les enfants ont adoré la paillote pieds dans l'eau. Le personnel est très accueillant.",
    rating: 5,
    date: "Août 2025",
  },
  {
    name: "Amina T.",
    avatar: "AT",
    text: "Un cadre paradisiaque, des prestations de qualité. La cabane était parfaite pour notre escapade en amoureux.",
    rating: 5,
    date: "Septembre 2025",
  },
  {
    name: "Karim J.",
    avatar: "KJ",
    text: "Excellent rapport qualité-prix. Réservation facile et plage privée très propre. À refaire !",
    rating: 4,
    date: "Juin 2025",
  },
];

export default function ListingDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const listing = listings.find((l) => l.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState<{
    name: string;
    email: string;
    password: string;
    phone: string;
    date: string;
    guests: string;
  } | null>(null);
  const [formKey, setFormKey] = useState(0);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [currentUser, setCurrentUser] = useState<{
    id: number;
    email: string;
    name: string;
  } | null>(null);
  const [emailStatus, setEmailStatus] = useState<{
    owner: boolean;
    client: boolean;
  } | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const user = JSON.parse(stored);
        setCurrentUser(user);
        if (user.name) setName(user.name);
        if (user.email) setEmail(user.email);
      }
    } catch {
      // ignore
    }
  }, []);

  // Reset form when listing ID changes
  useEffect(() => {
    setIsSubmitted(false);
    setBookingData(null);
    setEmailStatus(null);
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setDate("");
    setGuests("2");
    setFormKey((k) => k + 1);
    // Clear any browser autofill after remount
    setTimeout(() => {
      if (emailRef.current) {
        emailRef.current.value = "";
        setEmail("");
      }
      if (passwordRef.current) {
        passwordRef.current.value = "";
        setPassword("");
      }
    }, 0);
  }, [id]);

  // Date du jour au format YYYY-MM-DD pour l'attribut min
  const today = new Date().toISOString().split("T")[0];

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Annonce non trouvée</h1>
          <Link href="/" className="text-emerald-600 hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!currentUser || isBooking) return;

    const payload = {
      name: currentUser.name || name,
      email: currentUser.email || email,
      phone,
      date,
      guests,
      listing: {
        title: listing.title,
        price: listing.price,
        location: listing.location,
        type: listing.type,
      },
    };

    // Show confirmation immediately (optimistic UI)
    setBookingData(payload as any);
    setIsSubmitted(true);
    setEmail("");
    setPassword("");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Fire the API call in the background — no need to block the UI
    setIsBooking(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.email}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setEmailStatus(data.emailsSent || null);
      } else {
        setEmailStatus(null);
      }
    } catch {
      setEmailStatus(null);
    } finally {
      setIsBooking(false);
    }
  };

  const handleNewBooking = () => {
    setIsSubmitted(false);
    setBookingData(null);
    setEmailStatus(null);
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setDate("");
    setGuests("2");
    setFormKey((k) => k + 1);
    // Clear any browser autofill after remount
    setTimeout(() => {
      if (emailRef.current) {
        emailRef.current.value = "";
        setEmail("");
      }
      if (passwordRef.current) {
        passwordRef.current.value = "";
        setPassword("");
      }
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#173b56] border-b border-[#0f2a4a] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <ArrowLeft className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
              <FlamingoLogo className="h-8 w-8" />
              <span className="text-white font-bold text-lg tracking-wide">
                FLAMINGO COUCOU BEACH
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* ─── LEFT: Images + Description + Témoignages ─── */}
          <div className="lg:col-span-3 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="relative aspect-[16/10]">
                <Image
                  src={listing.images[selectedImage] || listing.image}
                  alt={listing.title}
                  fill
                  className="object-cover"
                  priority
                />
                {listing.featured && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                    En vedette
                  </span>
                )}
                <button
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-md cursor-pointer"
                  aria-label="Ajouter aux favoris"
                >
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 p-4 overflow-x-auto">
                {listing.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                      idx === selectedImage
                        ? "border-emerald-500 shadow-md"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${listing.title} - Image ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-[#1a365d] mb-2">
                {listing.title}
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {listing.location}
                </span>
                <span className="flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  {listing.type}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {listing.rating > 0 ? listing.rating : "Nouveau"}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {listing.description}
              </p>
              <div className="mt-4 text-2xl font-bold text-emerald-600">
                {listing.price} TND{" "}
                <span className="text-sm font-normal text-gray-500">
                  / {listing.priceUnit}
                </span>
              </div>
            </div>

            {/* Témoignages */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#1a365d] mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                Témoignages de visiteurs
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {testimonials.map((t, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-800">
                          {t.name}
                        </p>
                        <p className="text-xs text-gray-400">{t.date}</p>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= t.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Connexion requise / Réservation / Confirmation ─── */}
          <div className="lg:col-span-2">
            {!currentUser ? (
              /* ─── Écran : connexion requise ─── */
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24 text-center">
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Lock className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#1a365d] mb-2">
                  Connexion requise
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  Vous devez être inscrit et connecté pour réserver {listing.title}.{" "}
                  Connectez-vous ou créez un compte pour continuer.
                </p>
                <div className="space-y-3">
                  <Link
                    href="/auth?mode=login"
                    className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-center shadow-md hover:shadow-lg cursor-pointer"
                  >
                    Se connecter
                  </Link>
                  <Link
                    href="/auth?mode=signup"
                    className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all duration-200 text-center cursor-pointer"
                  >
                    Créer un compte
                  </Link>
                </div>
              </div>
            ) : isSubmitted && bookingData ? (
              /* ─── Écran de confirmation ─── */
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24 text-center">
                <div className="bg-gradient-to-br from-emerald-400 to-green-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <CheckCircle2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1a365d] mb-2">
                  Réservation confirmée ! 🎉
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  Merci <span className="font-semibold text-gray-700">{bookingData.name}</span> ! Votre réservation pour <span className="font-semibold text-gray-700">{listing.title}</span> a bien été reçue.
                </p>
                <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Hébergement</span>
                    <span className="font-medium text-gray-800">{listing.title}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium text-gray-800">{bookingData.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Personnes</span>
                    <span className="font-medium text-gray-800">{bookingData.guests}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between text-sm">
                    <span className="text-gray-500">Total</span>
                    <span className="font-bold text-emerald-700">{listing.price * Number(bookingData.guests)} TND</span>
                  </div>
                </div>
                {emailStatus?.client ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-6 text-left">
                    <p className="text-sm text-emerald-700 font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Un email de confirmation vous a été envoyé à {bookingData.email}.
                    </p>
                    <p className="text-xs text-emerald-600 mt-1">
                      Notre équipe vous contactera également pour finaliser votre réservation.
                    </p>
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 text-left">
                    <p className="text-sm text-amber-700 font-medium">
                      Votre réservation a bien été enregistrée. L'envoi du email de confirmation est en cours de traitement.
                    </p>
                    <p className="text-xs text-amber-600 mt-1">
                      Notre équipe vous contactera bientôt pour finaliser votre réservation.
                    </p>
                  </div>
                )}
                <div className="space-y-3">
                  <Link
                    href="/"
                    className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-center cursor-pointer"
                  >
                    Retour à l'accueil
                  </Link>
                  <button
                    onClick={handleNewBooking}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all duration-200 cursor-pointer"
                  >
                    Nouvelle réservation
                  </button>
                </div>
              </div>
            ) : (
              /* ─── Formulaire (utilisateur connecté) ─── */
              <div key={formKey} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-br from-amber-400 to-orange-500 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <FlamingoLogo className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1a365d]">
                    Réservez maintenant
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Réservez {listing.title} en tant que{" "}
                    <span className="font-semibold text-gray-700">{currentUser.name}</span>
                  </p>
                </div>

              <div className="space-y-4">
                {/* Informations du compte */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-gray-700 font-medium">{currentUser.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-gray-700">{currentUser.email}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Numéro de téléphone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+216 XX XXX XXX"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition-all"
                      required
                      autoComplete="off"
                      name="reservation-phone"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Détails de la réservation
                  </p>
                  <div className="space-y-3">
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={today}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition-all"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition-all"
                      >
                        <option value="1">1 personne</option>
                        <option value="2">2 personnes</option>
                        <option value="3">3 personnes</option>
                        <option value="4">4 personnes</option>
                        <option value="5">5 personnes</option>
                        <option value="6">6+ personnes</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-xl p-3 text-center">
                  <p className="text-sm text-gray-600">
                    Total estimé :{" "}
                    <span className="font-bold text-emerald-700">
                      {listing.price * Number(guests)} TND
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isBooking}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-wait disabled:active:scale-100"
                >
                  {isBooking ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Confirmation en cours...
                    </span>
                  ) : (
                    "Réserver maintenant"
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  En cliquant, vous acceptez nos{" "}
                  <a href="#" className="underline hover:text-gray-600">
                    conditions générales
                  </a>
                </p>
              </div>
            </div>
          )}
          </div>
        </div>
      </main>
    </div>
  );
}
