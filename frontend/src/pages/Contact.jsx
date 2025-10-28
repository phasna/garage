import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici on enverrait le message
    alert(
      "Message envoyé ! Nous vous recontacterons dans les plus brefs délais."
    );
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "general",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      details: ["123 Rue de la Location", "75001 Paris, France"],
      action: "Voir sur Maps",
    },
    {
      icon: Phone,
      title: "Téléphone",
      details: ["01 23 45 67 89", "Disponible 24h/24"],
      action: "Appeler maintenant",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["contact@garagelocation.fr", "Réponse sous 24h"],
      action: "Envoyer un email",
    },
  ];

  const hours = [
    { day: "Lundi - Vendredi", hours: "8h00 - 19h00" },
    { day: "Samedi", hours: "9h00 - 17h00" },
    { day: "Dimanche", hours: "10h00 - 16h00" },
    { day: "Urgences", hours: "24h/24 - 7j/7" },
  ];

  const faq = [
    {
      question: "Quels documents sont nécessaires pour louer un véhicule ?",
      answer:
        "Vous devez présenter un permis de conduire valide (depuis plus d'un an), une pièce d'identité et une carte bancaire au nom du conducteur principal.",
    },
    {
      question: "Puis-je modifier ou annuler ma réservation ?",
      answer:
        "Oui, vous pouvez modifier ou annuler votre réservation gratuitement jusqu'à 24h avant la prise en charge du véhicule.",
    },
    {
      question: "Le kilométrage est-il limité ?",
      answer:
        "Non, tous nos véhicules sont proposés avec un kilométrage illimité, vous pouvez rouler autant que vous le souhaitez.",
    },
    {
      question: "Que faire en cas de panne ou d'accident ?",
      answer:
        "Notre service d'assistance est disponible 24h/24. Appelez immédiatement le numéro d'urgence fourni dans le véhicule.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Une question ? Un besoin particulier ? Notre équipe est à votre
            écoute pour vous accompagner dans tous vos projets de mobilité.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <MessageCircle className="h-6 w-6 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Envoyez-nous un message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Votre téléphone"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Sujet
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="general">Demande générale</option>
                    <option value="reservation">
                      Question sur une réservation
                    </option>
                    <option value="vehicle">Information véhicule</option>
                    <option value="support">Support technique</option>
                    <option value="partnership">Partenariat</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Décrivez votre demande en détail..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary text-lg py-4"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Envoyer le message
                </button>
              </form>

              <p className="text-sm text-gray-600 mt-4">
                * Champs obligatoires. Nous nous engageons à répondre dans les
                24h.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <item.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      {item.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600">
                          {detail}
                        </p>
                      ))}
                      <button className="text-primary-600 hover:text-primary-700 font-medium text-sm mt-2">
                        {item.action}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-primary-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Horaires d'ouverture
                </h3>
              </div>
              <div className="space-y-2">
                {hours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-600">{schedule.day}</span>
                    <span className="font-medium text-gray-900">
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Nous trouver
              </h3>
              <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p>Carte interactive</p>
                  <p className="text-sm">123 Rue de la Location, Paris</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trouvez rapidement les réponses aux questions les plus courantes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faq.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {item.question}
                </h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center">
            <Phone className="h-6 w-6 text-red-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-red-900">
                Urgence 24h/24
              </h3>
              <p className="text-red-700">
                En cas d'urgence (panne, accident), appelez immédiatement le{" "}
                <strong>01 23 45 67 89</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
