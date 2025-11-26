import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Star,
  Shield,
  Clock,
  Award,
  ArrowRight,
  Zap,
} from "lucide-react";
import VehicleGrid from "../components/VehicleGrid";
import {
  FloatingParticles,
  GeometricShapes,
  AnimatedWave,
} from "../components/ModernElements";
import AnimatedSection from "../components/AnimatedSection";
import { useAnimateOnMount } from "../hooks/useAnimateOnce";
import { vehiclesAPI, categoriesAPI, rentalsAPI } from "../services/api";

// Hook personnalisé pour le debounce
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 200]);
  
  // États pour les dates de location
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [availabilityMap, setAvailabilityMap] = useState({});
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  
  // Animation contrôlée (ne se joue qu'une fois)
  const shouldAnimate = useAnimateOnMount();

  // Charger les données depuis l'API
  useEffect(() => {
    let cancelled = false;
    
    const loadData = async () => {
      try {
        const [vehiclesData, categoriesData] = await Promise.all([
          vehiclesAPI.getAll().catch(() => []),
          categoriesAPI.getAll().catch(() => []),
        ]);
        
        if (cancelled) return;
        
        setVehicles(Array.isArray(vehiclesData) ? vehiclesData : []);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Erreur lors du chargement des véhicules:', error);
        if (!cancelled) {
          setVehicles([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadData();
    
    return () => {
      cancelled = true;
    };
  }, []);

  // Debounce des dates pour éviter trop d'appels API
  const debouncedStartDate = useDebounce(startDate, 500);
  const debouncedEndDate = useDebounce(endDate, 500);

  // Mémoriser les IDs des véhicules pour éviter les re-renders
  const vehicleIds = useMemo(() => 
    vehicles.map(v => v.id).join(','), 
    [vehicles]
  );

  // Vérifier la disponibilité quand les dates changent (avec debounce)
  useEffect(() => {
    if (!debouncedStartDate || !debouncedEndDate || vehicles.length === 0) {
      setAvailabilityMap({});
      return;
    }

    let cancelled = false;
    
    const checkAvailability = async () => {
      setCheckingAvailability(true);
      const newAvailabilityMap = {};

      try {
        await Promise.all(
          vehicles.map(async (vehicle) => {
            try {
              const result = await rentalsAPI.checkAvailability(vehicle.id, debouncedStartDate, debouncedEndDate);
              if (!cancelled) {
                newAvailabilityMap[vehicle.id] = result.available;
              }
            } catch (error) {
              console.error(`Erreur pour le véhicule ${vehicle.id}:`, error);
              newAvailabilityMap[vehicle.id] = true;
            }
          })
        );

        if (!cancelled) {
          setAvailabilityMap(newAvailabilityMap);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification des disponibilités:', error);
      } finally {
        if (!cancelled) {
          setCheckingAvailability(false);
        }
      }
    };

    checkAvailability();
    
    return () => {
      cancelled = true;
    };
  }, [debouncedStartDate, debouncedEndDate, vehicleIds]);

  // Date minimale = aujourd'hui
  const today = new Date().toISOString().split("T")[0];

  // Mémoriser le filtrage des véhicules
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      // Exclure les véhicules marqués comme indisponibles (maintenance, etc.)
      if (vehicle.isAvailable === false) return false;
      
      const matchesSearch =
        vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || vehicle.category === selectedCategory;
      const matchesPrice =
        vehicle.pricePerDay >= priceRange[0] &&
        vehicle.pricePerDay <= priceRange[1];
      
      // Si des dates sont sélectionnées, filtrer par disponibilité (réservations)
      const matchesAvailability = 
        !startDate || !endDate || // Pas de filtre si pas de dates
        Object.keys(availabilityMap).length === 0 || // Pas encore chargé
        availabilityMap[vehicle.id] !== false; // Disponible ou inconnu

      return matchesSearch && matchesCategory && matchesPrice && matchesAvailability;
    });
  }, [vehicles, searchQuery, selectedCategory, priceRange, startDate, endDate, availabilityMap]);

  // Mémoriser les composants d'animation (évite les recréations)
  const heroAnimations = useMemo(() => (
    <>
      <FloatingParticles count={15} />
      <GeometricShapes />
    </>
  ), []);

  // Loader pendant le chargement initial
  if (loading) {
    return (
      <div className="min-h-screen modern-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 mx-auto bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-28 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
          </div>
          <p className="text-white/90 text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Modern Hero Section */}
      <section className="relative modern-gradient overflow-hidden min-h-screen flex items-center">
        {heroAnimations}

        {/* Overlay léger sans blur */}
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 z-10">
          <div className="text-center">
            <div className={shouldAnimate ? 'animate-fade-in-up' : 'opacity-0'}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                <span className={`block ${shouldAnimate ? 'animate-slide-in-left' : ''}`}>
                  Louez le véhicule
                </span>
                <span className={`block text-gradient bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent ${shouldAnimate ? 'animate-slide-in-right' : ''}`}>
                  de vos rêves ✨
                </span>
              </h1>
            </div>

            <div 
              className={shouldAnimate ? 'animate-fade-in-up' : 'opacity-0'}
              style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            >
              <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
                Du classique au premium, votre route commence ici.<br/>
                Réservez en quelques minutes.
              </p>
            </div>

            <div 
              className={`flex flex-col sm:flex-row gap-6 justify-center items-center ${shouldAnimate ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
            >
              <a
                href="#vehicles"
                className="btn-primary text-lg px-10 py-5 group"
              >
                <span className="flex items-center">
                  <Zap className="mr-3 h-6 w-6" />
                  Voir nos véhicules
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-200" />
                </span>
              </a>

              <Link
                to="/en-travaux"
                className="glass-morphism text-lg px-10 py-5 text-white hover:bg-white/20 border border-white/30 rounded-xl transition-colors duration-200 group"
              >
                <span className="flex items-center">
                  <Star className="mr-2 h-5 w-5" />
                  En savoir plus
                </span>
              </Link>
            </div>

            {/* Modern stats bar */}
            <div
              className={`mt-16 glass-morphism rounded-2xl p-6 max-w-4xl mx-auto ${shouldAnimate ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center group">
                  <div className="text-3xl font-bold text-yellow-400 group-hover:scale-110 transition-transform">
                    150+
                  </div>
                  <div className="text-gray-200 text-sm">Véhicules</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-bold text-green-400 group-hover:scale-110 transition-transform">
                    10k+
                  </div>
                  <div className="text-gray-200 text-sm">Clients</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-bold text-blue-400 group-hover:scale-110 transition-transform">
                    24/7
                  </div>
                  <div className="text-gray-200 text-sm">Support</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform">
                    98%
                  </div>
                  <div className="text-gray-200 text-sm">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated wave at bottom */}
        <AnimatedWave />
      </section>

      {/* Modern Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-yellow-200/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Pourquoi nous choisir ?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nous nous engageons à vous offrir la meilleure expérience de
              location de véhicules avec une approche moderne et innovante
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Sécurisé",
                description:
                  "Véhicules contrôlés et assurés pour votre sécurité",
                color: "from-green-400 to-blue-500",
                delay: "0s",
              },
              {
                icon: Clock,
                title: "Service 24/7",
                description: "Assistance et support disponibles à tout moment",
                color: "from-purple-400 to-pink-500",
                delay: "0.1s",
              },
              {
                icon: Award,
                title: "Qualité Premium",
                description: "Flotte récente et bien entretenue",
                color: "from-yellow-400 to-orange-500",
                delay: "0.2s",
              },
              {
                icon: Star,
                title: "Satisfaction",
                description: "Plus de 10 000 clients satisfaits",
                color: "from-pink-400 to-red-500",
                delay: "0.3s",
              },
            ].map((feature, index) => (
              <AnimatedSection
                key={index}
                className="text-center group"
                delay={feature.delay}
              >
                <div className="glass-card p-8 h-full hover:-translate-y-1 transition-transform duration-300">
                  <div className="relative mb-6">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto group-hover:rotate-6 transition-transform duration-300 shadow-lg`}
                    >
                      <feature.icon className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Animated border bottom */}
                  <div className="mt-6 h-1 w-0 bg-gradient-to-r from-primary-500 to-purple-500 group-hover:w-full transition-[width] duration-300 mx-auto rounded-full"></div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Search and Filter Section */}
      <section
        id="vehicles"
        className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Notre flotte de véhicules</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Trouvez le véhicule parfait pour vos besoins parmi notre large
              sélection de véhicules modernes et bien entretenus ✨
            </p>
          </AnimatedSection>

          {/* Modern Search and Filters */}
          <AnimatedSection
            className="glass-card p-8 mb-16"
            delay="0.1s"
          >
              {/* Dates de location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-200">
                <div className="group">
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    📅 Date de prise en charge
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={today}
                    className="modern-input h-14 text-lg"
                  />
                </div>
                <div className="group">
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    📅 Date de retour
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || today}
                    className="modern-input h-14 text-lg"
                  />
                </div>
              </div>

              {/* Loader de vérification */}
              {startDate && endDate && checkingAvailability && (
                <div className="mb-6 p-4 rounded-xl bg-blue-50 text-blue-700">
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent mr-2"></div>
                    Vérification des disponibilités...
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Modern Search */}
                <div className="group">
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Véhicule recherché :{" "}
                    <span className="text-primary-600">
                      {searchQuery || "Aucun"}
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <Search className="h-6 w-6 text-primary-500 group-hover:animate-pulse" />
                    </div>
                    <input
                      type="text"
                      placeholder="Rechercher par marque ou modèle..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="modern-input pl-12 h-14 text-lg"
                    />
                  </div>
                </div>

                {/* Modern Category Filter */}
                <div className="group">
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Type de véhicule :{" "}
                    <span className="text-primary-600">
                      {categories.find((c) => c.value === selectedCategory)?.name || "Tous"}
                    </span>
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="modern-input h-14 text-lg appearance-none cursor-pointer"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Modern Price Range */}
                <div className="group">
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Prix max:{" "}
                    <span className="text-primary-600">
                      {priceRange[1]}€/jour
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([0, parseInt(e.target.value)])
                      }
                      className="w-full h-3 bg-gradient-to-r from-primary-200 to-purple-200 rounded-full appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #8b5cf6 ${
                          (priceRange[1] / 200) * 100
                        }%, #e5e7eb ${
                          (priceRange[1] / 200) * 100
                        }%, #e5e7eb 100%)`,
                      }}
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>0€</span>
                      <span>200€</span>
                    </div>
                  </div>
                </div>
              </div>
          </AnimatedSection>

          {/* Vehicle Grid */}
          <VehicleGrid vehicles={filteredVehicles} showAvailabilityBadge={!!(startDate && endDate)} />

          {filteredVehicles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Aucun véhicule ne correspond à vos critères. Essayez de modifier
                vos filtres.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
