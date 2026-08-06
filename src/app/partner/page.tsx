"use client";

import { useState } from "react";
import { FlamingoLogo } from "@/components/FlamingoLogo";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Users,
  Check,
  Send,
} from "lucide-react";
import Link from "next/link";

export default function PartnerPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    location: "",
    beachName: "",
    propertyType: "",
    units: "",
    website: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/partner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.ok) {
        setSubmitted(true);
      } else {
        console.error("Error submitting partner application:", data.error);
      }
    } catch (error) {
      console.error("Error submitting partner application:", error);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-emerald-50">
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
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-lg text-center">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <h1 className="text-2xl font-bold text-[#1a365d] mb-3">
                Demande envoyée !
              </h1>
              <p className="text-gray-500 mb-8">
                Merci pour votre intérêt ! Notre équipe vous contactera dans les
                48 heures pour discuter de votre partenariat.
              </p>
              <Link
                href="/"
                className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-emerald-50">
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

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    s <= step
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {s}
                </div>
                <span
                  className={`text-sm hidden sm:inline ${
                    s <= step ? "text-emerald-600 font-medium" : "text-gray-400"
                  }`}
                >
                  {s === 1
                    ? "Informations"
                    : s === 2
                    ? "Propriété"
                    : "Confirmation"}
                </span>
                {s < 3 && (
                  <div
                    className={`w-8 h-0.5 ${
                      s < step ? "bg-emerald-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            {/* Title */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-2xl shadow-lg">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-[#1a365d]">
                Devenir partenaire
              </h1>
              <p className="text-gray-500 text-sm mt-2">
                Proposez vos hébergements de plage sur FlamingoBeach.com.tn
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic info */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nom de l'établissement *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) =>
                          updateField("companyName", e.target.value)
                        }
                        placeholder="Ex: Madera & Lounge"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nom du contact *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={formData.contactName}
                        onChange={(e) =>
                          updateField("contactName", e.target.value)
                        }
                        placeholder="Votre nom"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            updateField("email", e.target.value)
                          }
                          placeholder="contact@exemple.com"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Téléphone *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            updateField("phone", e.target.value)
                          }
                          placeholder="+216 99 999 999"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Link
                      href="/"
                      className="px-6 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Annuler
                    </Link>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Property info */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Plage / Localisation *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                          value={formData.location}
                          onChange={(e) =>
                            updateField("location", e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all appearance-none cursor-pointer"
                          required
                        >
                          <option value="">Sélectionnez une destination</option>
                          <option value="ghar-el-melh">Ghar El Melh, Bizerte</option>
                        </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Type d'hébergement *
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                          value={formData.propertyType}
                          onChange={(e) =>
                            updateField("propertyType", e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all appearance-none cursor-pointer"
                          required
                        >
                          <option value="">Type</option>
                          <option value="parasol">Parasol</option>
                          <option value="pailotte">Pailotte</option>
                          <option value="cabane">Cabane</option>
                          <option value="cabane-vip">Cabane VIP</option>
                          <option value="mixte">Mixte (plusieurs types)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Nombre d'unités *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                          value={formData.units}
                          onChange={(e) =>
                            updateField("units", e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all appearance-none cursor-pointer"
                          required
                        >
                          <option value="">Nombre</option>
                          <option value="1-5">1 à 5</option>
                          <option value="6-10">6 à 10</option>
                          <option value="11-20">11 à 20</option>
                          <option value="20+">Plus de 20</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Site web
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) =>
                          updateField("website", e.target.value)
                        }
                        placeholder="https://votre-site.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message (optionnel)
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="Parlez-nous de votre établissement..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <div className="flex justify-between gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Retour
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                    >
                      Vérifier
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6 space-y-3">
                    <h3 className="font-semibold text-[#1a365d]">
                      Résumé de votre demande
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-400">Établissement :</span>
                        <p className="text-gray-700 font-medium">
                          {formData.companyName}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400">Contact :</span>
                        <p className="text-gray-700 font-medium">
                          {formData.contactName}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400">Email :</span>
                        <p className="text-gray-700 font-medium">
                          {formData.email}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400">Téléphone :</span>
                        <p className="text-gray-700 font-medium">
                          {formData.phone}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400">Plage :</span>
                        <p className="text-gray-700 font-medium">
                          {formData.location}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400">Type :</span>
                        <p className="text-gray-700 font-medium">
                          {formData.propertyType}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400">Unités :</span>
                        <p className="text-gray-700 font-medium">
                          {formData.units}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-700">
                      En soumettant ce formulaire, vous acceptez que nous vous
                      contactions concernant votre demande de partenariat.
                    </p>
                  </div>

                  <div className="flex justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Modifier
                    </button>
                    <button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Envoyer la demande
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}