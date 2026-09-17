import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ridotto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (ridotto) {
  document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
} else {
  // Hero: entrata in cascata
  const hero = gsap.utils.toArray('[data-reveal-hero]');
  if (hero.length) {
    gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } })
      .to(hero, { opacity: 1, y: 0, stagger: 0.12, delay: 0.15 });
  }

  // Hero: parallasse del video + scrim che si scurisce
  const video = document.querySelector('.hero__video');
  if (video) {
    gsap.to(video, {
      yPercent: 12,
      scale: 1.08,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.fromTo('.hero__scrim', { opacity: 1 }, {
      opacity: 0.55,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  // Sezioni: rivelazione a gruppi
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%',
    batchMax: 3,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.12,
        overwrite: true,
      }),
  });

  // Titoli di sezione: leggera deriva verticale in scrub
  gsap.utils.toArray('section h2').forEach((h) => {
    gsap.fromTo(h, { y: 18 }, {
      y: -18,
      ease: 'none',
      scrollTrigger: { trigger: h, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // Card dei servizi: colore al passaggio del mouse gestito in CSS,
  // qui solo il micro-movimento della freccia
  gsap.utils.toArray('.card').forEach((card) => {
    const cta = card.querySelector('.card__cta');
    if (!cta) return;
    const dentro = () => gsap.to(cta, { x: 6, duration: 0.24, ease: 'power2.out' });
    const fuori = () => gsap.to(cta, { x: 0, duration: 0.24, ease: 'power2.out' });
    card.addEventListener('mouseenter', dentro);
    card.addEventListener('mouseleave', fuori);
  });
}
