"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

export interface GalerieImage {
  src: string;
  alt: string;
  category: string;
  title?: string;
}

interface GalerieProps {
  images: GalerieImage[];
  categories?: string[];
  title?: string;
  subtitle?: string;
}

const categoryLabels: Record<string, string> = {
  plage: "Plages",
  cabane: "Cabanes",
  pailotte: "Paillotes",
  parasol: "Parasols",
  coucher: "Couchers de soleil",
  restaurant: "Restaurants",
};

export default function Galerie({
  images,
  categories,
  title = "Galerie",
  subtitle = "Découvrez nos plus beaux moments",
}: GalerieProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const availableCategories = categories ?? [
    "all",
    ...Array.from(new Set(images.map((img) => img.category))),
  ];

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const navigate = useCallback(
    (direction: 1 | -1) => {
      setLightboxIndex((prev) => {
        if (prev === null) return prev;
        return (prev + direction + filteredImages.length) % filteredImages.length;
      });
    },
    [filteredImages.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, navigate]);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-blue-400 mb-3">
            <Camera className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-widest">
              Galerie
            </span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold leading-tight">
            {title}
          </h2>
          <p className="mt-3 text-gray-300 text-base max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                  : "bg-muted text-gray-300 hover:bg-blue-500/20 hover:text-white"
              }`}
            >
              {cat === "all" ? "Tout" : categoryLabels[cat] ?? cat}
            </button>
          ))}
        </div>

        {/* Masonry-like grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredImages.map((img, idx) => (
            <button
              key={img.src + idx}
              onClick={() => setLightboxIndex(idx)}
              className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <Camera className="w-12 h-12 mx-auto text-gray-500 mb-3" />
            <p className="text-gray-400">Aucune image dans cette catégorie.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
            className="absolute left-2 sm:left-6 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
              <Image
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(1);
            }}
            className="absolute right-2 sm:right-6 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Suivant"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </section>
  );
}