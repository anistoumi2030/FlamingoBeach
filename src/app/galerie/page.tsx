import type { Metadata } from "next";
import Galerie, { type GalerieImage } from "@/components/Galerie";

export const metadata: Metadata = {
  title: "Galerie - Flamingo Coucou Beach",
  description:
    "Découvrez notre galerie photos : plages, cabanes, paillotes, parasols et couchers de soleil à Ghar El Melh, Bizerte.",
};

const images: GalerieImage[] = [
  {
    src: "https://sfile.chatglm.cn/images-ppt/b9c2129b92cb.jpg",
    alt: "Parasol Madera & Lounge",
    title: "Parasol Madera & Lounge",
    category: "parasol",
  },
  {
    src: "https://sfile.chatglm.cn/images-ppt/623810489076.jpg",
    alt: "Pailotte Madera & Lounge",
    title: "Pailotte Madera & Lounge",
    category: "pailotte",
  },
  {
    src: "https://sfile.chatglm.cn/images-ppt/d96351d722cf.jpg",
    alt: "Cabane Madera & Lounge",
    title: "Cabane Madera & Lounge",
    category: "cabane",
  },
  {
    src: "https://sfile.chatglm.cn/images-ppt/7809f3bf0aba.jpg",
    alt: "Pailotte Pied Dans L'eau",
    title: "Pailotte Pied Dans L'eau",
    category: "pailotte",
  },
  {
    src: "https://sfile.chatglm.cn/images-ppt/ff921471e92f.jpg",
    alt: "Pailotte Pieds Dans L'eau",
    title: "Pailotte Pieds Dans L'eau",
    category: "pailotte",
  },
  {
    src: "https://sfile.chatglm.cn/images-ppt/c42b7a204aee.jpg",
    alt: "Cabane Sur Sable",
    title: "Cabane Sur Sable",
    category: "cabane",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    alt: "Plage de sable fin",
    title: "Plage de sable fin",
    category: "plage",
  },
  {
    src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
    alt: "Plage et parasols",
    title: "Plage et parasols",
    category: "plage",
  },
  {
    src: "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1200&auto=format&fit=crop",
    alt: "Coucher de soleil sur la plage",
    title: "Coucher de soleil sur la plage",
    category: "coucher",
  },
  {
    src: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=1200&auto=format&fit=crop",
    alt: "Coucher de soleil doré",
    title: "Coucher de soleil doré",
    category: "coucher",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
    alt: "Restaurant en bord de mer",
    title: "Restaurant en bord de mer",
    category: "restaurant",
  },
  {
    src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop",
    alt: "Dîner face à la mer",
    title: "Dîner face à la mer",
    category: "restaurant",
  },
];

export default function GaleriePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-1">
        <Galerie
          images={images}
          title="Nos plus beaux moments"
          subtitle="Plages, cabanes, paillotes, parasols et couchers de soleil à Ghar El Melh, Bizerte."
        />
      </main>
    </div>
  );
}