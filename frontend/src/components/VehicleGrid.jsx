import { Link } from "react-router-dom";
import { Users, Fuel, Settings, Eye, Calendar, Zap, Heart } from "lucide-react";

const VehicleGrid = ({ vehicles, showAvailabilityBadge = false }) => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      style={{ gridAutoRows: '1fr' }}
    >
      {vehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          className="h-full"
        >
          <VehicleCard vehicle={vehicle} showAvailabilityBadge={showAvailabilityBadge} />
        </div>
      ))}
    </div>
  );
};

const VehicleCard = ({ vehicle, showAvailabilityBadge = false }) => {
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
  } = vehicle;

  const categoryColors = {
    Économique: "from-green-500 to-emerald-600",
    Compacte: "from-blue-500 to-cyan-600",
    SUV: "from-purple-500 to-violet-600",
    Luxe: "from-yellow-500 to-orange-600",
    Utilitaire: "from-gray-500 to-slate-600",
  };

  return (
    <div className="card group flex flex-col min-h-[650px]">
      {/* Modern Image Container */}
      <div className="relative overflow-hidden rounded-t-2xl flex-shrink-0">
        <img
          src={imageUrl}
          alt={`${brand} ${model}`}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

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

          {/* Modern Availability Badge - Only show if dates are selected */}
          {showAvailabilityBadge && (
            <div className="absolute top-4 right-4">
              <span
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-md border bg-green-500/90 text-white border-green-300/50 shadow-green-500/25 shadow-lg"
              >
                <Heart className="h-3 w-3 mr-1" />
                Disponible
              </span>
            </div>
          )}

    
        </div>

        {/* Modern Content */}
        <div className="p-6 relative flex-1 flex flex-col">
          {/* Header with gradient */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
              {brand} <span className="text-gradient">{model}</span>
            </h3>
            <p className="text-gray-500 font-medium text-sm">Année {year}</p>
          </div>

          {/* Modern Vehicle Specs */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { icon: Users, value: `${seats} places`, color: "text-blue-500" },
              { icon: Fuel, value: fuelType, color: "text-green-500" },
              { icon: Settings, value: transmission, color: "text-purple-500" },
            ].map((spec, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-2.5 bg-gray-50/80 rounded-xl border border-gray-100"
              >
                <spec.icon className={`h-5 w-5 ${spec.color} mb-1`} />
                <span className="text-xs text-gray-600 font-medium text-center">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {/* Modern Features */}
          <div className="overflow-x-auto scrollbar-hide pb-1">
            <div className="flex gap-2">
              {vehicle.equipments && vehicle.equipments.length > 0 && (
                <>
                  {vehicle.equipments.slice(0, 2).map((eq, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-gradient-to-r from-primary-100 to-purple-100 text-primary-700 rounded-full font-medium border border-primary-200/50 whitespace-nowrap"
                    >
                      <span>{eq.icon}</span>
                      {eq.name}
                    </span>
                  ))}
                  {vehicle.equipments.length > 2 && (
                    <span className="inline-block px-2.5 py-1 text-xs bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 rounded-full font-medium whitespace-nowrap">
                      +{vehicle.equipments.length - 2} équipements
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Modern Price and Actions */}
          <div className="mt-auto">
            {/* Prix */}
            <div className="pb-7 border-b border-gray-100 text-center">
              <div className="flex items-baseline gap-1 justify-center">
                <span className="text-4xl font-black text-gradient bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  {pricePerDay}€
                </span>
                <span className="text-gray-500 font-medium text-sm">/jour</span>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex gap-2 pt-7">
              <Link
                to={`/vehicle/${id}`}
                className="flex-1 glass-morphism px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-primary-600 rounded-lg transition-all duration-300 hover:scale-105 border border-gray-200/50 text-center flex items-center justify-center gap-1.5"
              >
                <Eye className="h-4 w-4" />
                Détails
              </Link>
              {isAvailable && (
                <Link
                  to={`/booking/${id}`}
                  className="flex-1 btn-primary px-4 py-2.5 text-sm !rounded-lg text-center flex items-center justify-center gap-1.5"
                >
                  <Calendar className="h-4 w-4" />
                  Réserver
                </Link>
              )}
            </div>
          </div>

          {/* Animated bottom border */}
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary-500 to-purple-500 group-hover:w-full transition-[width] duration-500 rounded-full"></div>
        </div>
      </div>
  );
};

export default VehicleGrid;
