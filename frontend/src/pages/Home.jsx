import { useState, useEffect } from "react";
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
  GlowEffect,
} from "../components/ModernElements";
import { vehicles, categories } from "../data/vehicles";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 200]);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || vehicle.category === selectedCategory;
    const matchesPrice =
      vehicle.pricePerDay >= priceRange[0] &&
      vehicle.pricePerDay <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div>
      {/* Modern Hero Section */}
      <section className="relative modern-gradient overflow-hidden min-h-screen flex items-center">
        <FloatingParticles count={30} />
        <GeometricShapes />

        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 z-10">
          <div className="text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                <span className="block animate-slide-in-left">
                  Louez le véhicule
                </span>
                <span className="block text-gradient bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-slide-in-right">
                  de vos rêves ✨
                </span>
              </h1>
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
                Des véhicules de qualité premium, des prix compétitifs et un
                service exceptionnel. Découvrez notre flotte moderne et réservez
                votre aventure en quelques clics.
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <GlowEffect color="blue">
                <a
                  href="#vehicles"
                  className="btn-primary text-lg px-10 py-5 group"
                >
                  <span className="flex items-center">
                    <Zap className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                    Voir nos véhicules
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                </a>
              </GlowEffect>

              <Link
                to="/about"
                className="glass-morphism text-lg px-10 py-5 text-white hover:bg-white/20 border border-white/30 rounded-xl transition-all duration-300 hover:scale-105 group"
              >
                <span className="flex items-center">
                  <Star className="mr-2 h-5 w-5 group-hover:animate-spin" />
                  En savoir plus
                </span>
              </Link>
            </div>

            {/* Modern stats bar */}
            <div
              className="mt-16 glass-morphism rounded-2xl p-6 max-w-4xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.9s" }}
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
                  <div className="text-3xl font-bold text-pink-400 group-hover:scale-110 transition-transform">
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
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Pourquoi nous choisir ?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nous nous engageons à vous offrir la meilleure expérience de
              location de véhicules avec une approche moderne et innovante
            </p>
          </div>

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
              <GlowEffect key={index} color="blue">
                <div
                  className="text-center group animate-fade-in-up"
                  style={{ animationDelay: feature.delay }}
                >
                  <div className="glass-card p-8 h-full hover:scale-105 transition-all duration-500">
                    <div className="relative mb-6">
                      <div
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform duration-300 shadow-lg`}
                      >
                        <feature.icon className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Animated border bottom */}
                    <div className="mt-6 h-1 w-0 bg-gradient-to-r from-primary-500 to-purple-500 group-hover:w-full transition-all duration-500 mx-auto rounded-full"></div>
                  </div>
                </div>
              </GlowEffect>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Search and Filter Section */}
      <section
        id="vehicles"
        className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Notre flotte de véhicules</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Trouvez le véhicule parfait pour vos besoins parmi notre large
              sélection de véhicules modernes et bien entretenus ✨
            </p>
          </div>

          {/* Modern Search and Filters */}
          <GlowEffect color="purple">
            <div
              className="glass-card p-8 mb-16 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Modern Search */}
                <div className="relative group">
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
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Modern Category Filter */}
                <div className="relative group">
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
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Modern Price Range */}
                <div className="group">
                  <label className="block text-lg font-semibold text-gray-700 mb-3 group-hover:text-primary-600 transition-colors">
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

              {/* Quick filters */}
              <div
                className="mt-8 flex flex-wrap gap-3 justify-center animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                {["Économique", "SUV", "Luxe", "Électrique"].map(
                  (filter, index) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedCategory(filter)}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === filter
                          ? "bg-gradient-to-r from-primary-500 to-purple-500 text-white shadow-lg"
                          : "glass-morphism text-gray-700 hover:bg-primary-100 hover:text-primary-700"
                      } hover:scale-105`}
                      style={{ animationDelay: `${0.1 * index}s` }}
                    >
                      {filter}
                    </button>
                  )
                )}
              </div>
            </div>
          </GlowEffect>

          {/* Vehicle Grid */}
          <VehicleGrid vehicles={filteredVehicles} />

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

      {/* Stats Section */}
      <section className="py-16 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                150+
              </div>
              <div className="text-gray-200">Véhicules disponibles</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                10k+
              </div>
              <div className="text-gray-200">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                24/7
              </div>
              <div className="text-gray-200">Service client</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                98%
              </div>
              <div className="text-gray-200">Satisfaction client</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Prêt à réserver votre véhicule ?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de clients satisfaits et profitez de notre
            service exceptionnel
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#vehicles" className="btn-primary text-lg px-8 py-4">
              Voir tous les véhicules
            </a>
            <Link to="/contact" className="btn-secondary text-lg px-8 py-4">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
