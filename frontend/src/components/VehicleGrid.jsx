import { Link } from "react-router-dom";
import { Users, Fuel, Settings, Eye, Calendar, Zap, Heart } from "lucide-react";
import { GlowEffect } from "./ModernElements";

const VehicleGrid = ({ vehicles }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {vehicles.map((vehicle, index) => (
        <div
          key={vehicle.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <VehicleCard vehicle={vehicle} />
        </div>
      ))}
    </div>
  );
};

const VehicleCard = ({ vehicle }) => {
  const {
    id,
    brand,
    model,
    year,
    fuelType,
    transmission,
    seats,
    pricePerDay,
    imageUrl,
    category,
    isAvailable,
    features,
  } = vehicle;

  const categoryColors = {
    Économique: "from-green-500 to-emerald-600",
    Compacte: "from-blue-500 to-cyan-600",
    SUV: "from-purple-500 to-violet-600",
    Luxe: "from-yellow-500 to-orange-600",
    Utilitaire: "from-gray-500 to-slate-600",
  };

  return (
    <GlowEffect color="purple">
      <div className="card group perspective-1000">
        {/* Modern Image Container */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={imageUrl}
            alt={`${brand} ${model}`}
            className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Modern Category Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${
                categoryColors[category] || "from-primary-500 to-primary-600"
              } shadow-lg backdrop-blur-sm`}
            >
              <Zap className="h-3 w-3 mr-1" />
              {category}
            </span>
          </div>

          {/* Modern Availability Badge */}
          <div className="absolute top-4 right-4">
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-md border ${
                isAvailable
                  ? "bg-green-500/90 text-white border-green-300/50 shadow-green-500/25"
                  : "bg-red-500/90 text-white border-red-300/50 shadow-red-500/25"
              } shadow-lg`}
            >
              <Heart className="h-3 w-3 mr-1" />
              {isAvailable ? "Disponible" : "Indisponible"}
            </span>
          </div>

          {/* Hover Overlay with Quick Actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
            <div className="flex space-x-3">
              <Link
                to={`/vehicle/${id}`}
                className="glass-morphism p-3 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
              >
                <Eye className="h-5 w-5" />
              </Link>
              {isAvailable && (
                <Link
                  to={`/booking/${id}`}
                  className="bg-gradient-to-r from-primary-500 to-purple-500 p-3 rounded-full text-white hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse-glow"
                >
                  <Calendar className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Modern Content */}
        <div className="p-8 relative">
          {/* Header with gradient */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
              {brand} <span className="text-gradient">{model}</span>
            </h3>
            <p className="text-gray-500 font-medium">Année {year}</p>
          </div>

          {/* Modern Vehicle Specs */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { icon: Users, value: `${seats} places`, color: "text-blue-500" },
              { icon: Fuel, value: fuelType, color: "text-green-500" },
              { icon: Settings, value: transmission, color: "text-purple-500" },
            ].map((spec, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-3 glass-morphism rounded-xl group-hover:scale-105 transition-transform duration-300"
              >
                <spec.icon className={`h-5 w-5 ${spec.color} mb-1`} />
                <span className="text-xs text-gray-600 font-medium text-center">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {/* Modern Features */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {features.slice(0, 2).map((feature, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 text-xs bg-gradient-to-r from-primary-100 to-purple-100 text-primary-700 rounded-full font-medium border border-primary-200/50"
                >
                  {feature}
                </span>
              ))}
              {features.length > 2 && (
                <span className="inline-block px-3 py-1 text-xs bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 rounded-full font-medium">
                  +{features.length - 2} équipements
                </span>
              )}
            </div>
          </div>

          {/* Modern Price and Actions */}
          <div className="flex items-center justify-between">
            <div className="group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl font-black text-gradient bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                {pricePerDay}€
              </span>
              <span className="text-gray-500 font-medium">/jour</span>
            </div>

            <div className="flex space-x-2">
              <Link
                to={`/vehicle/${id}`}
                className="glass-morphism px-4 py-2 text-sm font-semibold text-gray-700 hover:text-primary-600 rounded-xl transition-all duration-300 hover:scale-105 border border-gray-200/50"
              >
                <Eye className="h-4 w-4 inline mr-1" />
                Détails
              </Link>
              {isAvailable && (
                <Link
                  to={`/booking/${id}`}
                  className="btn-primary px-4 py-2 text-sm"
                >
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Réserver
                </Link>
              )}
            </div>
          </div>

          {/* Animated bottom border */}
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary-500 to-purple-500 group-hover:w-full transition-all duration-700 rounded-full"></div>
        </div>
      </div>
    </GlowEffect>
  );
};

export default VehicleGrid;
