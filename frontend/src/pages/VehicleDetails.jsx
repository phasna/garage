import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Fuel,
  Settings,
  Check,
  Calendar,
  Shield,
  Award,
} from "lucide-react";
import { vehicles } from "../data/vehicles";

const VehicleDetails = () => {
  const { id } = useParams();
  const vehicle = vehicles.find((v) => v.id === parseInt(id));

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour aux véhicules
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="card">
              <img
                src={vehicle.imageUrl}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>
          </div>

          {/* Vehicle Info */}
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  {vehicle.category}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    vehicle.isAvailable
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {vehicle.isAvailable ? "Disponible" : "Indisponible"}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {vehicle.brand} {vehicle.model}
              </h1>
              <p className="text-xl text-gray-600 mb-4">Année {vehicle.year}</p>
              <p className="text-gray-700 mb-6">{vehicle.description}</p>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Spécifications
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-primary-600" />
                  <span className="text-gray-700">{vehicle.seats} places</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Fuel className="h-5 w-5 text-primary-600" />
                  <span className="text-gray-700">{vehicle.fuelType}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Settings className="h-5 w-5 text-primary-600" />
                  <span className="text-gray-700">{vehicle.transmission}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary-600" />
                  <span className="text-gray-700">Année {vehicle.year}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Équipements inclus
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vehicle.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantees */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Nos garanties
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-primary-600" />
                  <span className="text-gray-700">
                    Assurance tous risques incluse
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-primary-600" />
                  <span className="text-gray-700">
                    Véhicule contrôlé et entretenu
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary-600" />
                  <span className="text-gray-700">
                    Assistance 24h/24 - 7j/7
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary-600" />
                  <span className="text-gray-700">Kilométrage illimité</span>
                </div>
              </div>
            </div>

            {/* Price and Booking */}
            <div className="bg-primary-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-3xl font-bold text-primary-900">
                    {vehicle.pricePerDay}€
                  </span>
                  <span className="text-lg text-primary-700">/jour</span>
                </div>
                <div className="text-right text-sm text-primary-700">
                  <div>Prix TTC</div>
                  <div>Assurance incluse</div>
                </div>
              </div>

              {vehicle.isAvailable ? (
                <Link
                  to={`/booking/${vehicle.id}`}
                  className="btn-primary w-full justify-center text-lg py-4"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Réserver maintenant
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-500 px-6 py-4 rounded-lg text-lg font-medium cursor-not-allowed"
                >
                  Indisponible
                </button>
              )}

              <p className="text-sm text-primary-600 text-center mt-4">
                Réservation gratuite • Annulation jusqu'à 24h avant
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
