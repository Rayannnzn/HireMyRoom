import ScrollReveal from '../components/common/ScrollReveal';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * Example usage of scroll reveal animations
 * 
 * NOTE: This is a reference file showing various usage patterns.
 * Copy and adapt these examples to your actual components.
 * Some examples may have lint warnings - they're for illustration purposes.
 */

// ============================================
// EXAMPLE 1: Basic ScrollReveal Component
// ============================================
export function BasicExample() {
  return (
    <ScrollReveal>
      <section className="p-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold">Welcome Section</h2>
        <p>This entire section animates together</p>
      </section>
    </ScrollReveal>
  );
}

// ============================================
// EXAMPLE 2: Staggered Card Grid
// ============================================
export function StaggeredCards() {
  const cards = [
    { id: 1, title: 'Card 1' },
    { id: 2, title: 'Card 2' },
    { id: 3, title: 'Card 3' },
    { id: 4, title: 'Card 4' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {cards.map((card, index) => (
        <ScrollReveal key={card.id} delay={index * 100}>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="font-semibold">{card.title}</h3>
            <p>Card content here</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

// ============================================
// EXAMPLE 3: Multiple Sections with Delays
// ============================================
export function MultipleSections() {
  return (
    <div className="space-y-12">
      <ScrollReveal>
        <section>
          <h2>First Section</h2>
          <p>Appears immediately when scrolled into view</p>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <section>
          <h2>Second Section</h2>
          <p>Appears 200ms after first section</p>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={400}>
        <section>
          <h2>Third Section</h2>
          <p>Appears 400ms after first section</p>
        </section>
      </ScrollReveal>
    </div>
  );
}

// ============================================
// EXAMPLE 4: Using the Hook Directly
// ============================================
export function CustomAnimationHook() {
  const { ref, isVisible } = useScrollReveal({
    threshold: 0.3, // Trigger when 30% visible
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700
        ${isVisible 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 -translate-x-12'
        }
      `}
    >
      <h2>Custom Slide from Left Animation</h2>
      <p>Using the hook gives you full control</p>
    </div>
  );
}

// ============================================
// EXAMPLE 5: Complex Component with Hook
// ============================================
export function ComplexComponent() {
  const { ref: titleRef, isVisible: isTitleVisible } = useScrollReveal({ threshold: 0.5 });
  const { ref: contentRef, isVisible: isContentVisible } = useScrollReveal({ threshold: 0.3 });
  const { ref: ctaRef, isVisible: isCtaVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <div className="space-y-6">
      <h1
        ref={titleRef}
        className={`
          text-4xl font-bold transition-all duration-500
          ${isTitleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
      >
        Animate Different Elements Separately
      </h1>

      <div
        ref={contentRef}
        className={`
          transition-all duration-500 delay-200
          ${isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        <p>This content has its own animation timing</p>
      </div>

      <button
        ref={ctaRef}
        className={`
          px-6 py-3 bg-indigo-600 text-white rounded-lg
          transition-all duration-500 delay-300
          ${isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        Call to Action
      </button>
    </div>
  );
}

// ============================================
// EXAMPLE 6: Repeating Animation
// ============================================
export function RepeatingAnimation() {
  return (
    <ScrollReveal triggerOnce={false}>
      <div className="p-8 bg-linear-to-r from-purple-500 to-pink-500 text-white">
        <h2>This Animates Every Time</h2>
        <p>Scroll up and down to see it again!</p>
      </div>
    </ScrollReveal>
  );
}

// ============================================
// EXAMPLE 7: Different Thresholds
// ============================================
export function ThresholdExamples() {
  return (
    <div className="space-y-12">
      {/* Triggers immediately when any part enters viewport */}
      <ScrollReveal threshold={0.1}>
        <div className="p-6 bg-blue-100">
          <p>Triggers at 10% visibility (early trigger)</p>
        </div>
      </ScrollReveal>

      {/* Triggers when half visible */}
      <ScrollReveal threshold={0.5}>
        <div className="p-6 bg-green-100">
          <p>Triggers at 50% visibility (middle trigger)</p>
        </div>
      </ScrollReveal>

      {/* Triggers when fully visible */}
      <ScrollReveal threshold={0.9}>
        <div className="p-6 bg-purple-100">
          <p>Triggers at 90% visibility (late trigger)</p>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ============================================
// EXAMPLE 8: Wrapping Entire Sections
// ============================================
export function FullPageExample() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <ScrollReveal>
        <section className="py-20 text-center">
          <h1 className="text-5xl font-bold mb-4">Hero Title</h1>
          <p className="text-xl text-gray-600">Subtitle text here</p>
        </section>
      </ScrollReveal>

      {/* Features Section */}
      <ScrollReveal delay={100}>
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-3 gap-6">
            {/* Feature cards here */}
          </div>
        </section>
      </ScrollReveal>

      {/* Testimonials Section */}
      <ScrollReveal delay={200}>
        <section className="py-12 bg-gray-50 rounded-xl">
          <h2 className="text-3xl font-bold mb-8">Testimonials</h2>
          {/* Testimonial content here */}
        </section>
      </ScrollReveal>
    </div>
  );
}

// ============================================
// EXAMPLE 9: Conditional Rendering with Animation
// ============================================
export function ConditionalExample({ showContent }) {
  return (
    <div>
      {showContent && (
        <ScrollReveal>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3>Conditionally Rendered Content</h3>
            <p>This content animates when it appears</p>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}

// ============================================
// EXAMPLE 10: With Additional Classes
// ============================================
export function WithCustomClasses() {
  return (
    <ScrollReveal className="max-w-4xl mx-auto" delay={150}>
      <article className="prose lg:prose-xl">
        <h2>Blog Post Title</h2>
        <p>You can add additional classes to the ScrollReveal wrapper</p>
        <p>This is useful for layout and spacing control</p>
      </article>
    </ScrollReveal>
  );
}
