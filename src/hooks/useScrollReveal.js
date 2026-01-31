import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered animations using Intersection Observer
 * 
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Percentage of element visible before triggering (0-1)
 * @param {string} options.rootMargin - Margin around viewport for early/late triggering
 * @param {boolean} options.triggerOnce - Whether to animate only once
 * @returns {Object} - { ref, isVisible } - Attach ref to element, isVisible tracks animation state
 * 
 * @example
 * const { ref, isVisible } = useScrollReveal({ threshold: 0.2, triggerOnce: true });
 * <div ref={ref} className={isVisible ? 'animate-fade-in' : 'opacity-0'}>Content</div>
 */
export const useScrollReveal = ({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
} = {}) => {
  const ref = useRef(null);
  
  // Initialize state based on reduced motion preference (only calculated once)
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // If user prefers reduced motion, skip observer setup
    if (prefersReducedMotion) return;

    // Create Intersection Observer instance
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When element enters viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // If triggerOnce is true, stop observing after first trigger
          if (triggerOnce && element) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          // If triggerOnce is false, allow re-animation when scrolling back
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Start observing the element
    observer.observe(element);

    // Cleanup: stop observing when component unmounts
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};
