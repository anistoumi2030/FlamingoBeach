"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, UtensilsCrossed } from "lucide-react";

/* ─── Data ─── */
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

const menus: MenuItem[] = [
  {
    id: 1,
    name: "Poisson Grillé",
    description: "Poisson frais du jour grillé, accompagné de légumes et de riz.",
    price: "45 TND",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Crevettes Grillées",
    description: "Crevettes royales grillées, servies avec une sauce à l'ail.",
    price: "55 TND",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Salade Méditerranéenne",
    description: "Salade fraîche avec tomates, concombres, olives et feta.",
    price: "18 TND",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Couscous aux Fruits de Mer",
    description: "Couscous traditionnel aux fruits de mer, légumes et épices.",
    price: "50 TND",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Poulpe à la Plancha",
    description: "Poulpe tendre grillé à la plancha, huile d'olive et citron.",
    price: "60 TND",
    image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Plateau de Fruits de Mer",
    description: "Assortiment de fruits de mer frais : huîtres, crevettes, moules.",
    price: "85 TND",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Soupe de Poisson",
    description: "Soupe de poisson traditionnelle avec croûtons et rouille.",
    price: "25 TND",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Calmars Frits",
    description: "Anneaux de calamars croustillants, sauce tartare maison.",
    price: "35 TND",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "Tajine de Poisson",
    description: "Tajine de poisson aux olives, citron confit et herbes fraîches.",
    price: "48 TND",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 10,
    name: "Brochettes de Gambas",
    description: "Brochettes de gambas marinées, grillées au feu de bois.",
    price: "58 TND",
    image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 11,
    name: "Risotto aux Fruits de Mer",
    description: "Risotto crémeux aux fruits de mer, parmesan et safran.",
    price: "52 TND",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 12,
    name: "Salade de Poulpe",
    description: "Salade de poulpe fraîche, oignons rouges et persil.",
    price: "38 TND",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
  },
];

/* ─── Component ─── */
export default function RestaurantsPartenaires() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", updateScrollButtons);
      window.addEventListener("resize", updateScrollButtons);
      return () => {
        el.removeEventListener("scroll", updateScrollButtons);
        window.removeEventListener("resize", updateScrollButtons);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth / 3;
    el.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-blue-400 mb-3">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold leading-tight">
            Nos menus à offrir
          </h2>
          <p className="mt-4 text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Découvrez nos délicieux menus de fruits de mer et de spécialités
            méditerranéennes, préparés avec des produits frais du jour.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Left arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="hidden sm:flex absolute top-1/2 -left-3 transform -translate-y-1/2 z-20 w-9 h-9 items-center justify-center bg-white/10 backdrop-blur-sm rounded-full shadow-sm hover:bg-white/20 transition-all focus:outline-none cursor-pointer"
              aria-label="Précédent"
              style={{ top: "calc(50% - 18px)" }}
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
          )}

          {/* Right arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="hidden sm:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-20 w-9 h-9 items-center justify-center bg-white/10 backdrop-blur-sm rounded-full shadow-sm hover:bg-white/20 transition-all focus:outline-none cursor-pointer"
              aria-label="Suivant"
              style={{ top: "calc(50% - 18px)" }}
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
          )}

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide flex gap-4 pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {menus.map((menu) => (
              <div
                key={menu.id}
                className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                style={{ minWidth: "250px" }}
              >
                <div className="group cursor-pointer">
                  <div className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border hover:border-blue-500/50">
                    {/* Image */}
                    <div className="relative h-40 sm:h-44 overflow-hidden">
                      <Image
                        src={menu.image}
                        alt={menu.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {/* Price badge */}
                      <div className="absolute top-2 right-2">
                        <span className="inline-block px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-[#173b56] rounded-md shadow-sm">
                          {menu.price}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-white text-base line-clamp-1 group-hover:text-blue-400 transition-colors">
                        {menu.name}
                      </h3>
                      <p className="text-gray-400 text-xs mt-1.5 leading-relaxed line-clamp-2">
                        {menu.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}