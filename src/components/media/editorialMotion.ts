import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function mountEditorialMotion(root: HTMLElement): () => void {
  const context = gsap.context(() => {
    const responsive = gsap.matchMedia();
    responsive.add({
      desktop: '(min-width: 1024px)',
      tablet: '(min-width: 768px) and (max-width: 1023px)',
      mobile: '(max-width: 767px)',
      reduced: '(prefers-reduced-motion: reduce)',
    }, mediaContext => {
      const conditions = mediaContext.conditions;
      if (!conditions || conditions.reduced) return;
      const distance = conditions.desktop ? 190 : conditions.tablet ? 110 : 24;
      const photos = root.querySelectorAll<HTMLElement>('[data-editorial-photo]');
      const timeline = gsap.timeline({
        defaults: { ease: 'none', force3D: true },
        scrollTrigger: {
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      photos.forEach(photo => {
        const depth = Number(photo.dataset.depth) || 1;
        timeline.fromTo(photo,
          { y: () => distance * depth * .5 },
          { y: () => -distance * depth, duration: 1 }, 0);
      });
      timeline.fromTo(root.querySelector('.editorial-gallery-copy'),
        { y: conditions.mobile ? 0 : 18 },
        { y: conditions.mobile ? -8 : -42, duration: 1 }, 0);
    });
    return () => responsive.revert();
  }, root);
  return () => context.revert();
}
