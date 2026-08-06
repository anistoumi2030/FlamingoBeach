"use client";

import { useState, useEffect } from "react";
import { Sparkles, RefreshCw, ThumbsUp, MessageCircle, Share2 } from "lucide-react";

/* ─── Meme Data ─── */
interface Meme {
  id: number;
  text: string;
  emoji: string;
  author: string;
  likes: number;
  comments: number;
  color: string;
  bgColor: string;
}

const memes: Meme[] = [
  {
    id: 1,
    text: "Quand tu arrives à la plage et que toutes les pailottes sont déjà réservées...",
    emoji: "😭",
    author: "Coucou Beach",
    likes: 42,
    comments: 7,
    color: "#ef4444",
    bgColor: "#fef2f2",
  },
  {
    id: 2,
    text: "Moi en train de négocier le prix du parasol avec le vendeur :",
    emoji: "🤝",
    author: "Plage Lover",
    likes: 38,
    comments: 12,
    color: "#f59e0b",
    bgColor: "#fffbeb",
  },
  {
    id: 3,
    text: "Le soleil en Tunisie en été vs ma crème solaire SPF 50 :",
    emoji: "☀️",
    author: "Bronzé Malgré Lui",
    likes: 56,
    comments: 9,
    color: "#f97316",
    bgColor: "#fff7ed",
  },
  {
    id: 4,
    text: "Quand tu vois le prix du Coca à la plage : *sweat intensifies*",
    emoji: "🥤",
    author: "Éco Nomade",
    likes: 71,
    comments: 15,
    color: "#3b82f6",
    bgColor: "#eff6ff",
  },
  {
    id: 5,
    text: "Le gars qui arrive à 7h du mat pour \"réserver\" 6 parasols avec ses serviettes :",
    emoji: "🧢",
    author: "Early Bird Hater",
    likes: 89,
    comments: 23,
    color: "#8b5cf6",
    bgColor: "#f5f3ff",
  },
  {
    id: 6,
    text: "Quand tu commandes un poisson grillé et qu'on t'amène la tête qui te regarde :",
    emoji: "🐟",
    author: "Végétarien Repenti",
    likes: 34,
    comments: 5,
    color: "#06b6d4",
    bgColor: "#ecfeff",
  },
  {
    id: 7,
    text: "Chercher le wifi à la plage comme :",
    emoji: "📡",
    author: "Digital Detox Fail",
    likes: 63,
    comments: 11,
    color: "#10b981",
    bgColor: "#ecfdf5",
  },
  {
    id: 8,
    text: "Quand tu te baignes et que tu sens un truc visqueux te toucher le pied :",
    emoji: "🦑",
    author: "Peur de l'Eau",
    likes: 47,
    comments: 8,
    color: "#ec4899",
    bgColor: "#fdf2f8",
  },
  {
    id: 9,
    text: "Le vendeur de beignets qui passe toutes les 5 minutes : *challenge accepted*",
    emoji: "🍩",
    author: "Régime Échec",
    likes: 52,
    comments: 6,
    color: "#a855f7",
    bgColor: "#faf5ff",
  },
  {
    id: 10,
    text: "Quand tu réalises que t'as oublié le chargeur de ton tel à la maison :",
    emoji: "📱",
    author: "Batterie 2%",
    likes: 95,
    comments: 31,
    color: "#64748b",
    bgColor: "#f8fafc",
  },
];

function getTodayMeme(): Meme {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return memes[dayOfYear % memes.length];
}

function getRandomMeme(): Meme {
  return memes[Math.floor(Math.random() * memes.length)];
}

export default function MemeDuJour() {
  const [meme, setMeme] = useState<Meme | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const m = getTodayMeme();
    setMeme(m);
    setLikeCount(m.likes);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    const m = getRandomMeme();
    setMeme(m);
    setLikeCount(m.likes);
    setLiked(false);
    setTimeout(() => setIsRefreshing(false), 400);
  };

  const handleLike = () => {
    if (liked) {
      setLikeCount((c) => c - 1);
    } else {
      setLikeCount((c) => c + 1);
    }
    setLiked(!liked);
  };

  if (!meme) return null;

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Sparkles className="w-6 h-6 text-amber-400" />
          <h2 className="text-[#1a365d] text-2xl sm:text-3xl font-bold text-center">
            Meme du Jour
          </h2>
          <Sparkles className="w-6 h-6 text-amber-400" />
        </div>
        <p className="text-gray-500 text-center mb-8 -mt-4 text-sm">
          Le meme qui t'accompagne à la plage aujourd'hui 🏖️
        </p>

        {/* Meme card */}
        <div className="max-w-lg mx-auto">
          <div
            className="relative rounded-2xl border border-gray-100 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            style={{ backgroundColor: meme.bgColor }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                  CB
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {meme.author}
                  </p>
                  <p className="text-xs text-gray-400">Meme du jour</p>
                </div>
              </div>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label="Nouveau meme"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
              </button>
            </div>

            {/* Meme content */}
            <div className="px-5 py-8 text-center">
              <div className="text-6xl mb-4">{meme.emoji}</div>
              <p
                className="text-lg sm:text-xl font-semibold leading-relaxed"
                style={{ color: meme.color }}
              >
                {meme.text}
              </p>
            </div>

            {/* Bottom actions */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100/50 bg-white/40">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 text-sm transition-colors ${
                  liked
                    ? "text-blue-500"
                    : "text-gray-400 hover:text-blue-500"
                }`}
              >
                <ThumbsUp
                  className={`w-4 h-4 ${liked ? "fill-blue-500" : ""}`}
                />
                <span>{likeCount}</span>
              </button>

              <div className="flex items-center gap-1.5 text-sm text-gray-400">
                <MessageCircle className="w-4 h-4" />
                <span>{meme.comments}</span>
              </div>

              <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Partager</span>
              </button>
            </div>
          </div>

          {/* Daily tag */}
          <p className="text-center text-xs text-gray-400 mt-4">
            🎯 Nouveau meme chaque jour — Reviens demain pour rigoler encore
            plus !
          </p>
        </div>
      </div>
    </section>
  );
}