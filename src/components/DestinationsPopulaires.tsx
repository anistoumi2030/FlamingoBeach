"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

/* ─── Data ─── */
interface Destination {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Ghar El Melh",
    location: "Bizerte",
    description:
      "Profitez du sable fin et des eaux cristallines de la plage de Ghar El Melh, idéale pour les familles.",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Sidi Ali El Mekki",
    location: "Bizerte",
    description:
      "Détendez-vous sur la plage paisible de Sidi Ali El Mekki, réputée pour ses paysages naturels et son eau limpide.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Rafraf",
    location: "Bizerte",
    description:
      "Plongez dans les eaux turquoises de Rafraf et profitez d'une plage préservée entre mer et montagne.",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
  },
];

/* ─── Component ─── */
export default function DestinationsPopulaires() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-white text-3xl sm:text-4xl font-bold leading-tight">
            Destinations populaires
          </h2>
          <p className="mt-4 text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Explorez nos destinations les plus prisées à Bizerte et découvrez
            des lieux exceptionnels pour vos prochaines vacances en bord de mer.
          </p>
        </div>

        {/* Destinations grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <Link key={dest.id} href="/galerie">
              <div className="group bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all hover:border-blue-500/50 cursor-pointer h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={`${dest.name}, ${dest.location}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {dest.name}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1">
                    {dest.description}
                  </p>
                  <span className="text-blue-400 font-medium text-sm flex items-center gap-1">
                    Découvrir la destination
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
