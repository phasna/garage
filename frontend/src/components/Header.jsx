import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Car, Phone, MapPin, Sparkles } from "lucide-react";
import { FloatingParticles } from "./ModernElements";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Accueil", href: "/", current: location.pathname === "/" },
    { name: "Véhicules", href: "/#vehicles", current: false },
    {
      name: "À propos",
      href: "/about",
      current: location.pathname === "/about",
    },
    {
      name: "Contact",
      href: "/contact",
      current: location.pathname === "/contact",
    },
  ];

  return (
    <>
      {/* Modern Top Bar */}
      <div className="relative bg-gradient-to-r from-primary-900 via-primary-800 to-purple-900 text-white py-3 hidden md:block overflow-hidden">
        <FloatingParticles count={8} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 group">
                <Phone className="h-4 w-4 text-yellow-300 group-hover:animate-bounce" />
                <span className="hover:text-yellow-300 transition-colors duration-300">
                  01 23 45 67 89
                </span>
              </div>
              <div className="flex items-center space-x-2 group">
                <MapPin className="h-4 w-4 text-green-300 group-hover:animate-pulse" />
                <span className="hover:text-green-300 transition-colors duration-300">
                  123 Rue de la Location, 75001 Paris
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 glass-morphism px-3 py-1 rounded-full">
              <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
              <span className="text-yellow-100 font-medium">
                Ouvert 24h/24 - 7j/7
              </span>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
          <div className="absolute top-2 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1 left-1/2 w-1.5 h-1.5 bg-pink-300 rounded-full animate-bounce"></div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-morphism shadow-2xl"
            : "bg-white/95 backdrop-blur-sm shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex justify-between items-center transition-all duration-300 ${
              isScrolled ? "py-2" : "py-4"
            }`}
          >
            {/* Modern Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse-glow"></div>
                <div className="relative bg-gradient-to-br from-primary-600 to-primary-700 p-3 rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                  <Car className="h-8 w-8 text-white group-hover:animate-bounce" />
                </div>
              </div>
              <div className="group-hover:transform group-hover:scale-105 transition-all duration-300">
                <h1
                  className={`font-bold text-gradient transition-all duration-300 ${
                    isScrolled ? "text-xl" : "text-2xl"
                  }`}
                >
                  GarageLocation
                </h1>
                <p
                  className={`text-gray-600 transition-all duration-300 ${
                    isScrolled ? "text-xs opacity-75" : "text-sm"
                  }`}
                >
                  Votre partenaire mobilité ✨
                </p>
              </div>
            </Link>

            {/* Modern Desktop Navigation */}
            <nav className="hidden md:flex space-x-2">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 group overflow-hidden ${
                    item.current
                      ? "text-white bg-gradient-to-r from-primary-600 to-primary-700 shadow-lg"
                      : "text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Animated background for active link */}
                  {item.current && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-purple-600 to-primary-700 opacity-90"></div>
                  )}

                  {/* Hover effect background */}
                  {!item.current && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  )}

                  <span className="relative z-10 group-hover:transform group-hover:scale-110 transition-transform duration-200">
                    {item.name}
                  </span>

                  {/* Animated underline */}
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-600 to-purple-600 transition-all duration-300 ${
                      item.current ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></div>
                </Link>
              ))}
            </nav>

            {/* Modern CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <Link
                  to="/#vehicles"
                  className="relative btn-primary group-hover:shadow-2xl"
                >
                  <span className="relative z-10 flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 group-hover:animate-spin" />
                    Réserver maintenant
                  </span>
                </Link>
              </div>
            </div>

            {/* Modern Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative inline-flex items-center justify-center p-3 rounded-xl text-gray-700 hover:text-primary-600 glass-morphism hover:shadow-lg transition-all duration-300 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-purple-100 opacity-0 group-hover:opacity-50 rounded-xl transition-opacity duration-300"></div>
                <div className="relative z-10">
                  {isMenuOpen ? (
                    <X className="h-6 w-6 transform rotate-180 transition-transform duration-300" />
                  ) : (
                    <Menu className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Modern Mobile Navigation Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ${
              isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="glass-morphism m-4 rounded-2xl border border-white/20 animate-fade-in-up">
              <nav className="p-6 space-y-3">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`relative block px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 group overflow-hidden ${
                      item.current
                        ? "text-white bg-gradient-to-r from-primary-600 to-primary-700 shadow-lg"
                        : "text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Hover background */}
                    {!item.current && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    )}

                    <span className="relative z-10 group-hover:transform group-hover:translate-x-2 transition-transform duration-200">
                      {item.name}
                    </span>

                    {/* Animated border */}
                    <div
                      className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary-600 to-purple-600 transition-all duration-300 ${
                        item.current
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    ></div>
                  </Link>
                ))}

                <div
                  className="pt-4 animate-fade-in-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 rounded-xl blur opacity-20 group-hover:opacity-100 transition duration-500"></div>
                    <Link
                      to="/#vehicles"
                      onClick={() => setIsMenuOpen(false)}
                      className="relative btn-primary w-full justify-center group-hover:shadow-2xl"
                    >
                      <span className="flex items-center">
                        <Sparkles className="h-4 w-4 mr-2 group-hover:animate-spin" />
                        Réserver maintenant
                      </span>
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
