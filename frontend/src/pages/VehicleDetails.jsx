import { useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import { vehiclesAPI } from "../services/api";

const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const data = await vehiclesAPI.getOne(id);
        setVehicle(data);
      } catch (err) {
        console.error("Erreur lors du chargement du véhicule:", err);
        setError("Impossible de charger les détails du véhicule");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Chargement du véhicule...</p>
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Véhicule non trouvé"}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery - Sticky on scroll */}
          <div className="lg:sticky lg:top-24 transition-all duration-300 ease-out">
            <div className="card hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
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
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  {vehicle.category}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {vehicle.brand} {vehicle.model}
              </h1>
              <p className="text-xl text-gray-600 mb-4">Année {vehicle.year}</p>
              {vehicle.description && (
                <p className="text-gray-700 mb-6">{vehicle.description}</p>
              )}
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

            {/* Features / Equipments */}
            {vehicle.equipments && vehicle.equipments.length > 0 && (
              <div className="bg-white rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Équipements inclus
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vehicle.equipments.map((equipment, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="text-lg">{equipment.icon}</span>
                      <span className="text-gray-700">{equipment.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

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

              <Link
                to={`/booking/${vehicle.id}`}
                className="btn-primary w-full flex items-center justify-center text-lg py-4"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Réserver maintenant
              </Link>

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
