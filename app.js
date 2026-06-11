/* Nice Talent Asset Management Landing Page - Minimal Interactivity & Entry Scroll Animations */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Header Scroll Adaptation
  const header = document.querySelector('.main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. Intersection Observer for Smooth Entry Animations
  // Define elements to animate on entry
  const animTargets = [
    '.hero-headline',
    '.hero-subtitle',
    '.hero-intro-paragraph',
    '.executive-name',
    '.executive-role',
    '.editorial-divider',
    '.qa-item',
    '.premium-image-frame',
    '.editorial-callout-card'
  ];

  // Set up animation styles dynamically
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    .scroll-reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 1.0s cubic-bezier(0.16, 1, 0.3, 1), transform 1.0s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .scroll-reveal.reveal-active {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(styleEl);

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -8% 0px', // Trigger slightly before entering viewport
    threshold: 0.05
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        // Once animated, we can unobserve to prevent re-triggering
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply reveal class and observe elements
  animTargets.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.classList.add('scroll-reveal');
      revealObserver.observe(el);
    });
  });

});
