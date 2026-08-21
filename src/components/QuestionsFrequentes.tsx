"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

/* ─── Data ─── */
interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "Comment fonctionne la réservation ?",
    answer:
      "Choisissez votre destination, la date et le nombre de personnes. Sélectionnez l'équipement souhaité (parasol, paillote, cabane) et procédez au paiement en ligne. Une fois le paiement effectué, votre réservation est automatiquement confirmée.",
  },
  {
    id: "faq-2",
    question: "Quand dois-je payer ma réservation ?",
    answer:
      "Le paiement s'effectue intégralement à l'avance, au moment de la réservation. Une réservation payée est une réservation confirmée. Sans paiement, aucune réservation n'est garantie.",
  },
  {
    id: "faq-3",
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Nous acceptons les cartes de crédit et de débit majeures (Visa, Mastercard). Tous les paiements sont 100% sécurisés grâce à notre système de cryptage des données.",
  },
];

/* ─── FAQ Accordion Item ─── */
function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left bg-card hover:bg-muted transition-colors flex items-center justify-between"
      >
        <span className="text-white font-medium text-lg">{item.question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-card border-t border-border">
          <p className="text-gray-300 leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Component ─── */
export default function QuestionsFrequentes() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-blue-400 mb-3">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold leading-tight">
            Questions fréquentes
          </h2>
          <p className="mt-4 text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Retrouvez les réponses aux questions les plus courantes concernant
            nos services de réservation et notre fonctionnement.
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <FaqAccordionItem
              key={faq.id}
              item={faq}
              isOpen={openItem === faq.id}
              onToggle={() => toggleItem(faq.id)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-white text-lg font-medium mb-2">
            Besoin de plus d'informations ?
          </h3>
          <p className="text-gray-300 text-sm mb-4">
            Consultez notre page FAQ complète pour toutes les réponses à vos
            questions.
          </p>
          <Link
            href="/faq"
            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
          >
            Consulter la FAQ
          </Link>
        </div>
      </div>
    </section>
  );
}
