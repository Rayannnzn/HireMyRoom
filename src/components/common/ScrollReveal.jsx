import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * ScrollReveal Component - Wrapper for scroll-triggered animations
 * 
 * Applies fade-in and slide-up animation when element enters viewport.
 * Automatically respects prefers-reduced-motion setting.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {number} props.delay - Animation delay in ms (0, 100, 200, etc.)
 * @param {number} props.threshold - Intersection threshold (0-1), default 0.1
 * @param {boolean} props.triggerOnce - Animate only once, default true
 * @param {string} props.className - Additional CSS classes
 * 
 * @example
 * <ScrollReveal delay={100}>
 *   <div>This content will fade in and slide up</div>
 * </ScrollReveal>
 */
const ScrollReveal = ({ 
  children, 
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold, triggerOnce });

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isVisible ? 'scroll-reveal-visible' : ''} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
