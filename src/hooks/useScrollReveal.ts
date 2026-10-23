import { useEffect, useRef } from 'react';

const revealSelector = 'h2, .eyebrow, .section-copy, .media-frame, .space-caption, .amenities-heading, .amenity-group, .destination-copy > p:not(.eyebrow), .location-copy, .location-map, .faq details, .contact-inner > p, .contact-inner > a';

export function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = ref.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!container || preference.matches || typeof IntersectionObserver === 'undefined') return;

    // Avoid nested filters, which multiply blur and create competing transforms.
    const candidates = Array.from(container.querySelectorAll<HTMLElement>(revealSelector));
    const targets = candidates.filter(element => !element.closest('[data-editorial-gallery]') && !candidates.some(parent => parent !== element && parent.contains(element)));
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

    const show = (element: HTMLElement) => {
      element.classList.add('is-revealed');
      observer.unobserve(element);
    };
    const onFocus = (event: FocusEvent) => {
      for (const element of targets) {
        if (event.target instanceof Node && element.contains(event.target)) show(element);
      }
    };
    const onPreference = () => {
      if (preference.matches) {
        observer.disconnect();
        targets.forEach(element => element.classList.remove('scroll-reveal', 'is-revealed'));
      }
    };
    for (const element of targets) {
      element.classList.add('scroll-reveal');
      const bounds = element.getBoundingClientRect();
      if (bounds.top < window.innerHeight && bounds.bottom > 0) show(element);
      else observer.observe(element);
    }
    container.addEventListener('focusin', onFocus);
    preference.addEventListener('change', onPreference);
    return () => {
      observer.disconnect();
      container.removeEventListener('focusin', onFocus);
      preference.removeEventListener('change', onPreference);
      targets.forEach(element => element.classList.remove('scroll-reveal', 'is-revealed'));
    };
  }, []);

  return ref;
}
