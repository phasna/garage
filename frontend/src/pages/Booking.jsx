import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  CreditCard,
  User,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { vehicles } from "../data/vehicles";

const Booking = () => {
  const { id } = useParams();
  const vehicle = vehicles.find((v) => v.id === parseInt(id));

  const [formData, setFormData] = useState({
    // Dates de location
    startDate: "",
    endDate: "",
    startTime: "09:00",
    endTime: "18:00",

    // Informations client
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    drivingLicenseNumber: "",

    // Adresse
    address: "",
    city: "",
    postalCode: "",
    country: "France",

    // Options
    additionalDriver: false,
    gps: false,
    childSeat: false,

    // Paiement
    paymentMethod: "card",

    // Conditions
    termsAccepted: false,
    marketingConsent: false,
  });

  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Calculer le nombre de jours et le prix total
    if (name === "startDate" || name === "endDate") {
      const start =
        name === "startDate" ? new Date(value) : new Date(formData.startDate);
      const end =
        name === "endDate" ? new Date(value) : new Date(formData.endDate);

      if (start && end && end > start) {
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        setTotalDays(days);

        let price = days * vehicle.pricePerDay;
        if (formData.additionalDriver) price += days * 5;
        if (formData.gps) price += days * 3;
        if (formData.childSeat) price += days * 2;

        setTotalPrice(price);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, on enverrait les données à un serveur
    alert("Réservation envoyée ! Vous recevrez une confirmation par email.");
  };

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Véhicule non trouvé
          </h1>
          <Link to="/" className="btn-primary">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to={`/vehicle/${vehicle.id}`}
            className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour au véhicule
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire de réservation */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Réservation
              </h1>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Dates de location */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary-600" />
                    Période de location
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date de début *
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        min={today}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date de fin *
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        min={formData.startDate || today}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Heure de prise en charge
                      </label>
                      <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Heure de retour
                      </label>
                      <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Informations personnelles */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-primary-600" />
                    Informations personnelles
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date de naissance *
                      </label>
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Numéro de permis *
                      </label>
                      <input
                        type="text"
                        name="drivingLicenseNumber"
                        value={formData.drivingLicenseNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Adresse */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-primary-600" />
                    Adresse
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ville *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Code postal *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Options supplémentaires */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Options supplémentaires
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="additionalDriver"
                        checked={formData.additionalDriver}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Conducteur supplémentaire (+5€/jour)
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="gps"
                        checked={formData.gps}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        GPS (+3€/jour)
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="childSeat"
                        checked={formData.childSeat}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Siège enfant (+2€/jour)
                      </span>
                    </label>
                  </div>
                </div>

                {/* Conditions */}
                <div>
                  <div className="space-y-3">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleInputChange}
                        required
                        className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        J'accepte les{" "}
                        <a
                          href="#"
                          className="text-primary-600 hover:underline"
                        >
                          conditions générales
                        </a>{" "}
                        et la{" "}
                        <a
                          href="#"
                          className="text-primary-600 hover:underline"
                        >
                          politique de confidentialité
                        </a>{" "}
                        *
                      </span>
                    </label>
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="marketingConsent"
                        checked={formData.marketingConsent}
                        onChange={handleInputChange}
                        className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Je souhaite recevoir les offres et actualités par email
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!formData.termsAccepted}
                  className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirmer la réservation
                </button>
              </form>
            </div>
          </div>

          {/* Résumé de la commande */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Résumé de la réservation
              </h3>

              {/* Véhicule sélectionné */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <img
                  src={vehicle.imageUrl}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-semibold text-gray-900">
                  {vehicle.brand} {vehicle.model}
                </h4>
                <p className="text-sm text-gray-600">Année {vehicle.year}</p>
              </div>

              {/* Détails de la location */}
              {totalDays > 0 && (
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Durée:</span>
                    <span className="font-medium">
                      {totalDays} jour{totalDays > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Prix de base:</span>
                    <span className="font-medium">
                      {(totalDays * vehicle.pricePerDay).toFixed(2)}€
                    </span>
                  </div>

                  {formData.additionalDriver && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Conducteur supplémentaire:
                      </span>
                      <span className="font-medium">
                        {(totalDays * 5).toFixed(2)}€
                      </span>
                    </div>
                  )}

                  {formData.gps && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">GPS:</span>
                      <span className="font-medium">
                        {(totalDays * 3).toFixed(2)}€
                      </span>
                    </div>
                  )}

                  {formData.childSeat && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Siège enfant:</span>
                      <span className="font-medium">
                        {(totalDays * 2).toFixed(2)}€
                      </span>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-2 mt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">
                        Total:
                      </span>
                      <span className="font-bold text-xl text-primary-600">
                        {totalPrice.toFixed(2)}€
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-xs text-gray-500 space-y-1">
                <p>• Prix TTC, assurance incluse</p>
                <p>• Kilométrage illimité</p>
                <p>• Annulation gratuite jusqu'à 24h avant</p>
                <p>• Assistance 24h/24</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
