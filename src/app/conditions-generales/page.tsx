"use client";

import Image from "next/image";
import Link from "next/link";
import { FlamingoLogo } from "@/components/FlamingoLogo";
import {
  MapPin,
  Mail,
  Clock,
  Send,
  MessageCircle,
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

export default function ConditionsGeneralesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#173b56] border-b border-[#0f2a4a] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Social Icons */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="text-white/70 hover:text-white transition-colors"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-white/70 hover:text-white transition-colors"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="text-white/70 hover:text-white transition-colors"
              >
                <TiktokIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="text-white/70 hover:text-white transition-colors"
              >
                <YoutubeIcon className="w-5 h-5" />
              </a>
            </div>

            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <FlamingoLogo className="h-9 w-9" />
              <span className="text-white font-bold text-xl tracking-wide">
                FLAMINGO COUCOU BEACH
              </span>
            </a>

            {/* Nav Links */}
            <nav className="hidden sm:flex items-center gap-4">
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

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-[#1a365d] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Conditions générales
            </h1>
            <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
              Dernière mise à jour : Janvier 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-8">
              {/* Article 1 */}
              <div>
                <h2 className="text-xl font-semibold text-[#1a365d] mb-3">
                  1. Objet
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Les présentes conditions générales définissent les modalités et conditions d'utilisation des services de réservation de FlamingoBeach.com.tn, plateforme de réservation de locations de plage (parasols, paillotes, cabanes) en Tunisie.
                </p>
              </div>

              {/* Article 2 */}
              <div>
                <h2 className="text-xl font-semibold text-[#1a365d] mb-3">
                  2. Réservations
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Toute réservation est soumise à disponibilité. La réservation ne devient effective qu'après confirmation par FlamingoBeach.com.tn et réception du paiement intégral si requis.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Le client s'engage à respecter les horaires d'ouverture et les règles de conduite sur les sites de plage partenaires.
                </p>
              </div>

              {/* Article 3 */}
              <div>
                <h2 className="text-xl font-semibold text-[#1a365d] mb-3">
                  3. Annulations et remboursements
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Toute annulation doit être effectuée au moins 24 heures avant la date de réservation pour bénéficier d'un remboursement intégral. En cas d'annulation moins de 24 heures avant la réservation, aucun remboursement ne sera effectué.
                </p>
              </div>

              {/* Article 4 */}
              <div>
                <h2 className="text-xl font-semibold text-[#1a365d] mb-3">
                  4. Responsabilités
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  FlamingoBeach.com.tn agit en tant qu'intermédiaire entre les clients et les établissements partenaires. Nous ne sommes pas responsables des incidents, vols ou dommages survenant pendant la prestation. Les clients sont invités à vérifier leurs effets personnels.
                </p>
              </div>

              {/* Article 5 */}
              <div>
                <h2 className="text-xl font-semibold text-[#1a365d] mb-3">
                  5. Données personnelles
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Les données personnelles collectées lors des réservations sont traitées conformément à notre politique de confidentialité. Elles sont nécessaires au traitement des réservations et ne sont pas transmises à des tiers sans consentement.
                </p>
              </div>

              {/* Article 6 */}
              <div>
                <h2 className="text-xl font-semibold text-[#1a365d] mb-3">
                  6. Contact
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Pour toute question concernant ces conditions générales, vous pouvez nous contacter à l'adresse suivante : info@flamingobeach.com.tn
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
                <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-white transition-colors">
                  <FacebookIcon className="w-5 h-5" />
                </a>
                <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-white transition-colors">
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a href="#" aria-label="TikTok" className="text-gray-300 hover:text-white transition-colors">
                  <TiktokIcon className="w-5 h-5" />
                </a>
                <a href="#" aria-label="YouTube" className="text-gray-300 hover:text-white transition-colors">
                  <YoutubeIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links columns */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold text-sm mb-4 text-white">DÉCOUVRIR</h3>
                <ul className="space-y-2">
                  <li><a href="/" className="text-gray-300 hover:text-white text-sm transition-colors">Accueil</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Annonces</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Blog</a></li>
                  <li><a href="/contact" className="text-gray-300 hover:text-white text-sm transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-4 text-white">TYPES</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Parasols</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Paillottes</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Cabanes</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Paillotes en mer</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-4 text-white">DESTINATIONS</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Bizerte</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Ghar El Melh</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Rafraf</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Sidi Ali El Mekki</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-4 text-white">INFORMATIONS</h3>
                <ul className="space-y-2">
                  <li><a href="/conditions-generales" className="text-gray-300 hover:text-white text-sm transition-colors">Conditions générales</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Confidentialité</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">FAQ</a></li>
                </ul>
              </div>
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