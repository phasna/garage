import { useEffect, useState } from "react";

// Composant pour les particules flottantes
export const FloatingParticles = ({ count = 20 }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white/20 animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  );
};

// Composant pour les formes géométriques décoratives
export const GeometricShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Cercles flottants */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full animate-float blur-xl" />
      <div
        className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-yellow-400/20 rounded-full animate-float blur-lg"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full animate-float blur-2xl"
        style={{ animationDelay: "2s" }}
      />

      {/* Formes polygonales */}
      <div
        className="absolute top-60 right-40 w-16 h-16 bg-gradient-to-br from-purple-400/30 to-pink-400/30 transform rotate-45 animate-spin"
        style={{ animationDuration: "20s" }}
      />
      <div className="absolute bottom-20 right-10 w-20 h-20 bg-gradient-to-br from-blue-400/25 to-cyan-400/25 transform rotate-12 animate-pulse" />
    </div>
  );
};

// Composant pour l'effet de grille moderne
export const ModernGrid = () => {
  return (
    <div className="absolute inset-0 opacity-10">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
};

// Composant pour l'effet de vague animée
export const AnimatedWave = ({ className = "" }) => {
  return (
    <div
      className={`absolute bottom-0 left-0 w-full overflow-hidden ${className}`}
    >
      <svg
        className="relative block w-full h-24"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="gentle-wave"
            d="m-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="opacity-75">
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="0"
            fill="rgba(255,255,255,0.1)"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              dur="10s"
              repeatCount="indefinite"
              values="-90 0;85 0;-90 0"
            />
          </use>
        </g>
        <g className="opacity-50">
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="3"
            fill="rgba(255,255,255,0.1)"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              dur="8s"
              repeatCount="indefinite"
              values="85 0;-90 0;85 0"
            />
          </use>
        </g>
        <g className="opacity-25">
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="5"
            fill="rgba(255,255,255,0.1)"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              dur="6s"
              repeatCount="indefinite"
              values="-90 0;85 0;-90 0"
            />
          </use>
        </g>
      </svg>
    </div>
  );
};

// Composant pour les bulles animées
export const AnimatedBubbles = ({ count = 10 }) => {
  const bubbles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            top: "100%",
            animationDelay: `${bubble.delay}s`,
            animation: `bubble-rise ${bubble.duration}s infinite linear`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes bubble-rise {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Composant pour l'effet de halo lumineux
export const GlowEffect = ({ children, color = "blue" }) => {
  const glowColors = {
    blue: "shadow-blue-500/50",
    purple: "shadow-purple-500/50",
    pink: "shadow-pink-500/50",
    green: "shadow-green-500/50",
  };

  return (
    <div className={`relative group`}>
      <div
        className={`absolute -inset-1 bg-gradient-to-r from-${color}-600 to-${color}-400 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`}
      />
      <div className="relative">{children}</div>
    </div>
  );
};

export default {
  FloatingParticles,
  GeometricShapes,
  ModernGrid,
  AnimatedWave,
  AnimatedBubbles,
  GlowEffect,
};
