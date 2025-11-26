import { useState, useEffect, useRef } from 'react';

/**
 * Hook pour gérer les animations qui ne doivent se jouer qu'une seule fois
 * Utilise Intersection Observer pour déclencher l'animation quand l'élément entre dans le viewport
 */
export const useAnimateOnce = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

/**
 * Hook simple pour animer au montage (une seule fois)
 */
export const useAnimateOnMount = () => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!hasAnimated.current) {
      // Petit délai pour s'assurer que le DOM est prêt
      const timer = setTimeout(() => {
        setShouldAnimate(true);
        hasAnimated.current = true;
      }, 50);
      return () => clearTimeout(timer);
    }
  }, []);

  return shouldAnimate;
};

export default useAnimateOnce;

