import { Link } from "react-router-dom";
import { Construction, ArrowLeft, Home } from "lucide-react";
import {
  FloatingParticles,
  GeometricShapes,
  GlowEffect,
} from "../components/ModernElements";

const WorkInProgress = () => {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-purple-200/40 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-pink-200/30 to-yellow-200/30 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 animate-fade-in-up border border-gray-100">
          {/* Construction Icon */}
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-xl">
              <Construction className="h-16 w-16 text-white" />
            </div>
            <div className="absolute -inset-4 bg-primary-400/20 rounded-full blur-2xl"></div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-in-left">
            <span className="text-gradient bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Page en travaux
            </span>
          </h1>

          {/* Description */}
          <div
            className="animate-fade-in-up mb-12"
            style={{ animationDelay: "0.3s" }}
          >
            <p className="text-lg text-gray-600 leading-relaxed">
              Cette page sera bientôt disponible.
            </p>
          </div>

          {/* Animated Progress Bar */}
          <div
            className="mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full w-3/4 shadow-lg transition-all duration-1000"></div>
            </div>
            <p className="text-sm text-gray-500 mt-3 font-medium">En cours de développement...</p>
          </div>

          {/* Action Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: "0.9s" }}
          >
            <Link
              to="/"
              className="btn-primary text-lg px-8 py-4 group"
            >
              <span className="flex items-center justify-center">
                <Home className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Retour à l'accueil
              </span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="bg-gray-100 hover:bg-gray-200 text-lg px-8 py-4 text-gray-700 font-semibold border-2 border-gray-300 rounded-xl transition-all duration-300 hover:scale-105 group shadow-md"
            >
              <span className="flex items-center justify-center">
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-2 transition-transform" />
                Page précédente
              </span>
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="mt-12 flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-primary-500 to-purple-500"
                style={{ 
                  animation: `bounce 1.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s` 
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkInProgress;
