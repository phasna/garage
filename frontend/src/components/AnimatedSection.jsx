import { useEffect, useRef, useState } from 'react';

/**
 * Composant qui anime ses enfants une seule fois quand ils entrent dans le viewport
 */
const AnimatedSection = ({ 
  children, 
  className = '', 
  animation = 'animate-fade-in-up',
  delay = '0s',
  threshold = 0.1 
}) => {
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

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? animation : 'opacity-0'}`}
      style={isVisible ? { animationDelay: delay, animationFillMode: 'both' } : {}}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;

