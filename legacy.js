const DESIGN_WIDTH = 1920;

const SHOWCASE_GROUPS = [
  {
    title: 'KV / 海报',
    eyebrow: 'Key Visual · Poster',
    book: './assets/03-contents/111.png',
    files: ['0.png', '0-1.png', '0-2.png', '0-3.png', '0-4.png', '0-5.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png'],
  },
  {
    title: '微信推文 / 长图',
    eyebrow: 'WeChat Tweet · Long Picture',
    book: './assets/03-contents/222.png',
    files: ['7.png', '8.png', '9.png', '10.png', '11.png', '12.png', '13.png'],
  },
  {
    title: '电商首页 / 详情页',
    eyebrow: 'E-commerce · Details Page',
    book: './assets/03-contents/333.png',
    files: ['14.png', '15.png', '16.png', '17.png', '18.png', '19.png', '20.png'],
  },
  {
    title: '插画 / 动画',
    eyebrow: 'Illustration · Animation',
    book: './assets/03-contents/444.png',
    files: ['21.png', '22.png', '23.png', '24.png', '26.png', '27.png'],
  },
  {
    title: '小程序 / PC / 移动端 UI',
    eyebrow: 'Web · Mobile UI · Mini Program',
    book: './assets/03-contents/555.png',
    files: ['28.png', '29.png', '30.png', '31.jpg', '32.jpg', '33.png', '34.jpg'],
  },
];

const SHOWCASE_LANDSCAPE_FILES = new Set([
  '1.png', '10.png', '12.png', '13.png', '14.png', '20.png', '21.png',
  '22.png', '26.png', '27.png', '28.png', '33.png', '34.jpg',
]);

const SHOWCASE_MEDIUM_FILES = new Set(['31.jpg', '32.jpg']);

const SHOWCASE_SLOTS = [
  { x: 13, y: 31, rotation: -6, z: 8 },
  { x: 31, y: 30, rotation: 3, z: 10 },
  { x: 50, y: 31, rotation: -2, z: 12 },
  { x: 69, y: 30, rotation: 5, z: 9 },
  { x: 87, y: 32, rotation: -4, z: 7 },
  { x: 14, y: 72, rotation: 5, z: 11 },
  { x: 33, y: 70, rotation: -4, z: 13 },
  { x: 52, y: 70, rotation: 2, z: 15 },
  { x: 71, y: 70, rotation: -3, z: 14 },
  { x: 88, y: 72, rotation: 6, z: 10 },
  { x: 42, y: 51, rotation: -3, z: 18 },
  { x: 62, y: 51, rotation: 3, z: 17 },
];

function buildShowcasePanels() {
  const container = document.querySelector('.showcase-panels');
  if (!container || container.children.length) return;

  SHOWCASE_GROUPS.forEach((group, groupIndex) => {
    const panel = document.createElement('article');
    panel.className = 'showcase-panel';
    panel.dataset.showcaseIndex = groupIndex;
    panel.setAttribute('aria-label', `${String(groupIndex + 1).padStart(2, '0')} ${group.title}`);

    const meta = document.createElement('header');
    meta.className = 'showcase-meta';
    meta.innerHTML = `
      <span class="showcase-meta-index">${String(groupIndex + 1).padStart(2, '0')}</span>
      <p class="showcase-meta-eyebrow">${group.eyebrow}</p>
      <h2>${group.title}</h2>
    `;

    const gallery = document.createElement('div');
    gallery.className = 'showcase-gallery';

    group.files.forEach((file, imageIndex) => {
      const slotIndex = groupIndex % 2 === 0
        ? imageIndex
        : (SHOWCASE_SLOTS.length - 1 - imageIndex + SHOWCASE_SLOTS.length) % SHOWCASE_SLOTS.length;
      const slot = SHOWCASE_SLOTS[slotIndex];
      const figure = document.createElement('figure');
      const isLandscape = SHOWCASE_LANDSCAPE_FILES.has(file);
      const isMedium = SHOWCASE_MEDIUM_FILES.has(file);
      const shapeClass = isLandscape
        ? ' is-landscape'
        : isMedium
          ? ' is-medium'
          : '';
      const finalX = isLandscape
        ? Math.min(70, Math.max(30, slot.x))
        : isMedium
          ? Math.min(75, Math.max(25, slot.x))
          : Math.min(80, Math.max(20, slot.x));
      const finalY = Math.min(68, Math.max(32, slot.y));

      figure.className = `showcase-piece${shapeClass}`;
      figure.tabIndex = 0;
      figure.dataset.finalX = `${finalX}%`;
      figure.dataset.finalY = `${finalY}%`;
      figure.dataset.finalRotation = slot.rotation;
      figure.style.setProperty('--piece-x', `${finalX}%`);
      figure.style.setProperty('--piece-y', `${finalY}%`);
      figure.style.setProperty('--piece-z', slot.z + imageIndex);

      const frame = document.createElement('div');
      frame.className = 'showcase-piece-frame';

      const image = document.createElement('img');
      image.src = `./assets/pic/1haibao/${file}`;
      image.alt = `${group.title}作品 ${file.replace(/\.[^.]+$/, '')}`;
      image.loading = groupIndex === 0 ? 'eager' : 'lazy';
      image.decoding = 'async';

      const caption = document.createElement('figcaption');
      caption.textContent = `${String(imageIndex + 1).padStart(2, '0')} / ${file.replace(/\.[^.]+$/, '')}`;

      frame.append(image, caption);
      figure.append(frame);
      gallery.append(figure);
    });

    const bookStage = document.createElement('div');
    bookStage.className = 'showcase-book-stage';
    bookStage.innerHTML = `
      <div class="showcase-book-static"><img src="${group.book}" alt="" /></div>
      <div class="showcase-book-leaf showcase-book-leaf-left"><img src="${group.book}" alt="" /></div>
      <div class="showcase-book-leaf showcase-book-leaf-right"><img src="${group.book}" alt="" /></div>
      <span class="showcase-book-spine"></span>
    `;

    const sectionMark = document.createElement('span');
    sectionMark.className = 'showcase-section-mark';
    sectionMark.setAttribute('aria-hidden', 'true');
    sectionMark.textContent = String(groupIndex + 1).padStart(2, '0');

    panel.append(meta, gallery, bookStage, sectionMark);
    container.append(panel);
  });

  media.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set('.experience-card .card-copy', { clearProps: 'opacity,visibility,transform' });
    return () => {};
  });
}

function fitDesignCanvases() {
  const scale = Math.min(window.innerWidth / DESIGN_WIDTH, 1);
  document.documentElement.style.setProperty('--design-scale', scale);

  document.querySelectorAll('.design-section').forEach((section) => {
    const designHeight = Number(section.dataset.designHeight);
    section.style.height = `${Math.ceil(designHeight * scale)}px`;
  });
}

fitDesignCanvases();

let refreshFrame;
window.addEventListener('resize', () => {
  fitDesignCanvases();
  if (!window.ScrollTrigger) return;

  cancelAnimationFrame(refreshFrame);
  refreshFrame = requestAnimationFrame(() => window.ScrollTrigger.refresh());
}, { passive: true });

function addMotionListener(removers, element, eventName, handler) {
  element.addEventListener(eventName, handler);
  removers.push(() => element.removeEventListener(eventName, handler));
}

function setupShowcaseMotion({ gsap, ScrollTrigger, ease, removers }) {
  const story = document.querySelector('.showcase-story');
  const pin = document.querySelector('.showcase-pin');
  const panels = gsap.utils.toArray('.showcase-panel');
  const cards = gsap.utils.toArray('.work-card');
  const closeButton = document.querySelector('.showcase-close');
  const countNumber = document.querySelector('.showcase-navigation-count b');
  const progressBar = document.querySelector('.showcase-navigation-track i');
  const hintLine = document.querySelector('.showcase-scroll-hint span');

  if (!story || !pin || !panels.length || !closeButton || !countNumber || !progressBar) {
    return () => {};
  }

  gsap.set(panels, { autoAlpha: 0 });
  gsap.set('.showcase-piece', { autoAlpha: 0, xPercent: -50, yPercent: -50 });
  gsap.set(progressBar, { scaleX: .2, transformOrigin: 'left center' });

  const labels = [];
  const storyTimeline = gsap.timeline({
    defaults: { ease: 'power3.inOut' },
    scrollTrigger: {
      id: 'showcase-story',
      trigger: story,
      start: 'top top',
      end: () => `+=${Math.max(window.innerHeight * 22, 13640)}`,
      pin,
      pinSpacing: true,
      scrub: .75,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: () => {
        pin.setAttribute('aria-hidden', 'false');
        pin.setAttribute('aria-modal', 'false');
      },
      onEnterBack: () => {
        pin.setAttribute('aria-hidden', 'false');
        pin.setAttribute('aria-modal', 'false');
      },
      onLeave: () => pin.setAttribute('aria-hidden', 'true'),
      onLeaveBack: () => pin.setAttribute('aria-hidden', 'true'),
      onUpdate: (self) => {
        const sectionIndex = Math.min(SHOWCASE_GROUPS.length - 1, Math.floor(self.progress * SHOWCASE_GROUPS.length));
        countNumber.textContent = String(sectionIndex + 1).padStart(2, '0');
        gsap.set(progressBar, { scaleX: (sectionIndex + 1) / SHOWCASE_GROUPS.length });
      },
    },
  });

  panels.forEach((panel, groupIndex) => {
    const meta = panel.querySelector('.showcase-meta');
    const metaIndex = panel.querySelector('.showcase-meta-index');
    const sectionMark = panel.querySelector('.showcase-section-mark');
    const gallery = panel.querySelector('.showcase-gallery');
    const pieces = gsap.utils.toArray('.showcase-piece', panel);
    const book = panel.querySelector('.showcase-book-stage');
    const bookStatic = panel.querySelector('.showcase-book-static');
    const leftLeaf = panel.querySelector('.showcase-book-leaf-left');
    const rightLeaf = panel.querySelector('.showcase-book-leaf-right');
    const spine = panel.querySelector('.showcase-book-spine');
    const startLabel = `showcase-${groupIndex}-start`;
    const browseLabel = `showcase-${groupIndex}-browse`;
    const closeLabel = `showcase-${groupIndex}-close`;
    const endLabel = `showcase-${groupIndex}-end`;
    labels.push({ start: startLabel, browse: browseLabel, close: closeLabel, end: endLabel });

    storyTimeline
      .addLabel(startLabel)
      .set(panel, { autoAlpha: 1, zIndex: 5 })
      .set(gallery, { xPercent: 0, yPercent: 0 })
      .set(bookStatic, { autoAlpha: 1 })
      .set([leftLeaf, rightLeaf], { rotationY: 0, x: 0, autoAlpha: 1 })
      .set(spine, { autoAlpha: 1, scaleY: 1 })
      .fromTo(book, {
        autoAlpha: 0,
        xPercent: -50,
        yPercent: -42,
        scale: .46,
        rotation: groupIndex % 2 === 0 ? -7 : 7,
      }, {
        autoAlpha: 1,
        xPercent: -50,
        yPercent: -50,
        scale: 1,
        rotation: 0,
        duration: .78,
      }, startLabel)
      .fromTo(meta, {
        autoAlpha: 0,
        x: -34,
      }, {
        autoAlpha: 1,
        x: 0,
        duration: .54,
      }, `${startLabel}+=.12`)
      .fromTo(metaIndex, {
        scale: .74,
      }, {
        scale: 1,
        duration: .66,
        ease: 'back.out(1.45)',
      }, `${startLabel}+=.16`)
      .fromTo(sectionMark, {
        autoAlpha: 0,
        x: 45,
      }, {
        autoAlpha: 1,
        x: 0,
        duration: .7,
      }, `${startLabel}+=.24`)
      .to(bookStatic, {
        autoAlpha: 0,
        duration: .22,
      }, `${startLabel}+=.64`)
      .to(leftLeaf, {
        rotationY: -116,
        x: -18,
        duration: .76,
        ease: 'power3.inOut',
      }, `${startLabel}+=.64`)
      .to(rightLeaf, {
        rotationY: 116,
        x: 18,
        duration: .76,
        ease: 'power3.inOut',
      }, `${startLabel}+=.64`)
      .to(spine, {
        autoAlpha: 0,
        scaleY: 1.45,
        duration: .42,
      }, `${startLabel}+=.72`)
      .fromTo(pieces, {
        autoAlpha: 0,
        left: '50%',
        top: '50%',
        x: 0,
        y: 0,
        xPercent: -50,
        yPercent: -50,
        z: -420,
        scale: .08,
        rotation: (imageIndex) => (imageIndex % 2 ? -14 : 14),
      }, {
        autoAlpha: 1,
        left: (imageIndex, element) => element.dataset.finalX,
        top: (imageIndex, element) => element.dataset.finalY,
        x: 0,
        y: 0,
        xPercent: -50,
        yPercent: -50,
        z: 0,
        scale: 1,
        rotation: (imageIndex, element) => Number(element.dataset.finalRotation),
        duration: .88,
        stagger: {
          each: .065,
          from: groupIndex % 2 === 0 ? 'start' : 'end',
        },
        ease: 'power4.out',
      }, `${startLabel}+=.87`)
      .to(book, {
        autoAlpha: 0,
        scale: .82,
        duration: .28,
      }, `${startLabel}+=1.2`)
      .addLabel(browseLabel, `${startLabel}+=2.55`)
      .to(gallery, {
        xPercent: groupIndex % 2 === 0 ? -2.4 : 2.4,
        yPercent: -1,
        duration: 1.12,
        ease: 'sine.inOut',
      }, browseLabel)
      .to(pieces, {
        x: (imageIndex) => ((imageIndex % 3) - 1) * 14,
        y: (imageIndex) => (imageIndex % 2 ? -12 : 10),
        rotation: (imageIndex, element) => Number(element.dataset.finalRotation) * .55,
        duration: 1.12,
        ease: 'sine.inOut',
      }, '<')
      .to(gallery, {
        xPercent: groupIndex % 2 === 0 ? 2.2 : -2.2,
        yPercent: .8,
        duration: 1.08,
        ease: 'sine.inOut',
      })
      .to(pieces, {
        x: (imageIndex) => ((imageIndex % 4) - 1.5) * -11,
        y: (imageIndex) => (imageIndex % 2 ? 8 : -9),
        rotation: (imageIndex, element) => Number(element.dataset.finalRotation) * 1.08,
        duration: 1.08,
        ease: 'sine.inOut',
      }, '<')
      .addLabel(closeLabel)
      .to(meta, {
        autoAlpha: 0,
        x: 28,
        duration: .42,
      })
      .to(sectionMark, {
        autoAlpha: 0,
        x: -42,
        duration: .42,
      }, '<')
      .to(pieces, {
        autoAlpha: 0,
        left: '50%',
        top: '50%',
        x: 0,
        y: 0,
        z: -380,
        scale: .075,
        rotation: (imageIndex) => (imageIndex % 2 ? -13 : 13),
        duration: .72,
        stagger: {
          each: .04,
          from: groupIndex % 2 === 0 ? 'end' : 'start',
        },
        ease: 'power3.in',
      }, '<.05')
      .set(book, {
        autoAlpha: 1,
        xPercent: -50,
        yPercent: -50,
        scale: .92,
        rotation: 0,
      })
      .to([leftLeaf, rightLeaf], {
        rotationY: 0,
        x: 0,
        duration: .62,
        ease: 'power3.inOut',
      })
      .to(bookStatic, {
        autoAlpha: 1,
        duration: .26,
      }, '<.27')
      .to(spine, {
        autoAlpha: 1,
        scaleY: 1,
        duration: .26,
      }, '<')
      .to(book, {
        autoAlpha: 0,
        yPercent: -58,
        scale: .58,
        duration: .48,
        ease: 'power3.in',
      })
      .set(panel, { autoAlpha: 0 })
      .addLabel(endLabel);
  });

  let manualMode = false;
  let manualTransitioning = false;
  let activeManualIndex = 0;
  let manualTween;
  let invoker;
  const storyTrigger = storyTimeline.scrollTrigger;

  const preloadGroup = (groupIndex) => {
    const panel = panels[groupIndex];
    panel?.querySelectorAll('.showcase-piece img').forEach((image) => {
      image.loading = 'eager';
    });
  };

  const updateManualNavigation = (groupIndex) => {
    countNumber.textContent = String(groupIndex + 1).padStart(2, '0');
    gsap.to(progressBar, {
      scaleX: (groupIndex + 1) / SHOWCASE_GROUPS.length,
      duration: .42,
      ease,
      overwrite: true,
    });
    cards.forEach((card, cardIndex) => card.setAttribute('aria-expanded', String(cardIndex === groupIndex)));
  };

  const openManual = (groupIndex, source) => {
    if (manualMode || storyTrigger.isActive) return;
    manualMode = true;
    manualTransitioning = true;
    activeManualIndex = groupIndex;
    invoker = source;
    preloadGroup(groupIndex);
    manualTween?.kill();
    storyTrigger.disable(false);
    storyTimeline.pause();
    pin.classList.add('is-manual');
    pin.setAttribute('aria-hidden', 'false');
    pin.setAttribute('aria-modal', 'true');
    document.body.classList.add('showcase-manual-open');
    updateManualNavigation(groupIndex);
    manualTween = storyTimeline.tweenFromTo(labels[groupIndex].start, labels[groupIndex].browse, {
      duration: 1.55,
      ease,
      overwrite: true,
      onComplete: () => {
        manualTransitioning = false;
        closeButton.focus({ preventScroll: true });
      },
    });
  };

  const finishManualClose = () => {
    manualMode = false;
    manualTransitioning = false;
    pin.classList.remove('is-manual');
    pin.setAttribute('aria-hidden', 'true');
    pin.setAttribute('aria-modal', 'false');
    document.body.classList.remove('showcase-manual-open');
    cards.forEach((card) => card.setAttribute('aria-expanded', 'false'));
    gsap.set(panels, { autoAlpha: 0 });
    storyTrigger.enable();
    ScrollTrigger.refresh();
    invoker?.focus({ preventScroll: true });
    invoker = null;
  };

  const closeManual = () => {
    if (!manualMode) return;
    manualTransitioning = true;
    manualTween?.kill();
    manualTween = storyTimeline.tweenTo(labels[activeManualIndex].end, {
      duration: 1.05,
      ease: 'power3.inOut',
      overwrite: true,
      onComplete: finishManualClose,
    });
  };

  const changeManualGroup = (direction) => {
    if (!manualMode || manualTransitioning) return;
    const nextIndex = activeManualIndex + direction;
    if (nextIndex < 0) return;
    if (nextIndex >= SHOWCASE_GROUPS.length) {
      closeManual();
      return;
    }

    manualTransitioning = true;
    preloadGroup(nextIndex);
    manualTween?.kill();
    manualTween = storyTimeline.tweenTo(labels[activeManualIndex].end, {
      duration: .84,
      ease: 'power3.inOut',
      overwrite: true,
      onComplete: () => {
        activeManualIndex = nextIndex;
        updateManualNavigation(nextIndex);
        manualTween = storyTimeline.tweenFromTo(labels[nextIndex].start, labels[nextIndex].browse, {
          duration: 1.28,
          ease,
          overwrite: true,
          onComplete: () => {
            manualTransitioning = false;
            closeButton.focus({ preventScroll: true });
          },
        });
      },
    });
  };

  addMotionListener(removers, closeButton, 'click', closeManual);
  addMotionListener(removers, window, 'keydown', (event) => {
    if (event.key === 'Escape') closeManual();
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') changeManualGroup(1);
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') changeManualGroup(-1);
  });

  const manualWheel = (event) => {
    if (!manualMode) return;
    event.preventDefault();
    if (Math.abs(event.deltaY) < 12) return;
    changeManualGroup(event.deltaY > 0 ? 1 : -1);
  };
  pin.addEventListener('wheel', manualWheel, { passive: false });
  removers.push(() => pin.removeEventListener('wheel', manualWheel));

  panels.forEach((panel) => {
    panel.querySelectorAll('.showcase-piece').forEach((piece) => {
      const frame = piece.querySelector('.showcase-piece-frame');
      const enter = () => gsap.to(frame, {
        y: -11,
        scale: 1.045,
        rotation: 0,
        duration: .34,
        ease,
        overwrite: 'auto',
      });
      const leave = () => gsap.to(frame, {
        y: 0,
        scale: 1,
        rotation: 0,
        duration: .3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      addMotionListener(removers, piece, 'mouseenter', enter);
      addMotionListener(removers, piece, 'mouseleave', leave);
      addMotionListener(removers, piece, 'focus', enter);
      addMotionListener(removers, piece, 'blur', leave);
    });
  });

  const hintTween = gsap.to(hintLine, {
    scaleX: 1.65,
    duration: 1.05,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });

  return () => {
    manualTween?.kill();
    hintTween.kill();
    storyTimeline.kill();
    storyTrigger.kill();
    pin.classList.remove('is-manual');
    document.body.classList.remove('showcase-manual-open');
  };
}

function startMotion() {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) return;
  const startsInCaseDeck = /^#page-\d{2}$/.test(window.location.hash);

  gsap.registerPlugin(ScrollTrigger);
  buildShowcasePanels();
  // Scroll-triggered content must remain readable if a page is refreshed mid-scroll.
  gsap.set('.experience-card .card-copy', { clearProps: 'opacity,visibility' });

  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    const removers = [];
    const atmosphereTweens = [];
    const ease = 'power3.out';

    const intro = gsap.timeline({ defaults: { ease, overwrite: 'auto' } });
    intro
      .from('.hero-background', { autoAlpha: 0, scale: 1.045, duration: 1.05 }, 0)
      .from('.hero-title', { autoAlpha: 0, x: -46, y: 18, duration: 1.08 }, 0.1)
      .from('.hero-years', { autoAlpha: 0, y: 28, scale: 0.97, duration: 0.72 }, 0.3)
      .from('.hero-name', { autoAlpha: 0, y: 24, scale: 0.97, duration: 0.7 }, 0.44)
      .from('.hero-portrait', { autoAlpha: 0, x: 28, y: 16, scale: 0.94, duration: 0.86 }, 0.48)
      .from('.hero-cover', { autoAlpha: 0, scale: 0.92, duration: 0.56 }, 0.62)
      .from('.hero-divider', { autoAlpha: 0, scaleX: 0.35, duration: 0.7 }, 0.72)
      .from('.contact', { autoAlpha: 0, y: 16, duration: 0.54, stagger: 0.12 }, 0.9)
      .from('.hero-star', {
        autoAlpha: 0,
        scale: 0.28,
        rotation: (index, star) => star.matches('.star-five, .star-six') ? 0 : -18,
        duration: 0.44,
        stagger: { each: 0.09, from: 'random' },
      }, 0.22)
      .call(startAtmosphere);

    const heroStarScrollSpin = gsap.to('.star-five, .star-six', {
      rotateZ: 900,
      transformOrigin: '50% 50%',
      ease: 'none',
      scrollTrigger: {
        id: 'hero-star-scroll-spin',
        trigger: '.hero-background',
        start: 0,
        end: () => Math.max(1, document.querySelector('.hero-background')?.getBoundingClientRect().height || 1),
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
    atmosphereTweens.push(heroStarScrollSpin);

    const paperFlight = document.querySelector('.paper-flight');
    const paperFlightRoute = paperFlight?.querySelector('.paper-flight__guide');
    const paperPlane = paperFlight?.querySelector('.paper-flight__plane');
    const paperTrails = paperFlight ? [...paperFlight.querySelectorAll('.paper-flight__trail')] : [];

    if (paperFlight && paperFlightRoute && paperPlane && paperTrails.length) {
      const flightState = { progress: 0 };
      const trailSettings = [{ length: 250, gap: 70 }];
      let routeLength = 1;

      const measurePaperFlight = () => {
        routeLength = Math.max(1, paperFlightRoute.getTotalLength());
        paperTrails.forEach((trail, index) => {
          const segment = Math.min(trailSettings[index].length, routeLength * 0.28);
          trail.style.strokeDasharray = `${segment} ${Math.max(1, routeLength - segment)}`;
        });
      };

      const renderPaperFlight = () => {
        const progress = gsap.utils.clamp(0, 1, flightState.progress);
        const distance = progress * routeLength;
        const sample = Math.min(8, routeLength * 0.006);
        const point = paperFlightRoute.getPointAtLength(distance);
        const before = paperFlightRoute.getPointAtLength(Math.max(0, distance - sample));
        const after = paperFlightRoute.getPointAtLength(Math.min(routeLength, distance + sample));
        const angle = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI;
        const visibility = Math.min(1, progress / 0.045, (1 - progress) / 0.055);

        gsap.set(paperPlane, {
          x: point.x,
          y: point.y,
          xPercent: -50,
          yPercent: -50,
          rotation: angle,
          autoAlpha: Math.max(0, visibility),
        });

        paperTrails.forEach((trail, index) => {
          const { length: segment, gap } = trailSettings[index];
          const trailEnd = Math.max(0, distance - gap);
          trail.style.strokeDashoffset = `${segment - trailEnd}`;
          trail.style.visibility = progress > 0.018 && progress < 0.995 ? 'visible' : 'hidden';
        });
      };

      measurePaperFlight();
      gsap.set(paperPlane, { xPercent: -50, yPercent: -50, transformOrigin: '50% 50%' });
      renderPaperFlight();

      const flightTween = gsap.to(flightState, {
        progress: 1,
        ease: 'none',
        onUpdate: renderPaperFlight,
        scrollTrigger: {
          id: 'paper-flight-scroll',
          trigger: paperFlight,
          start: 'top bottom',
          end: 'bottom 28%',
          scrub: 0.62,
          invalidateOnRefresh: true,
          onRefresh: () => {
            measurePaperFlight();
            renderPaperFlight();
          },
        },
      });

      const upperWingFlutter = gsap.to('.paper-flight__wing--top', {
        rotation: -0.65,
        scaleY: 0.99,
        duration: 0.66,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
      const lowerWingFlutter = gsap.to('.paper-flight__wing--bottom', {
        rotation: 0.55,
        scaleY: 1.01,
        duration: 0.66,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      atmosphereTweens.push(flightTween, upperWingFlutter, lowerWingFlutter);
    }

    function startAtmosphere() {
      const starPaths = [
        ['.star-one', { x: 23, y: -42, rotation: 20, duration: 2.05 }],
        ['.star-two', { x: -20, y: 31, rotation: -28, duration: 1.65 }],
        ['.star-three', { x: 18, y: -29, rotation: 32, duration: 1.85 }],
        ['.star-four', { x: -29, y: 37, rotation: -23, duration: 2.15 }],
        ['.star-five', { x: 27, y: -34, duration: 2.55 }],
        ['.star-six', { x: -32, y: 42, duration: 2.75 }],
      ];

      starPaths.forEach(([selector, vars]) => {
        atmosphereTweens.push(gsap.to(selector, { ...vars, ease: 'sine.inOut', repeat: -1, yoyo: true }));
      });

      atmosphereTweens.push(gsap.to('.star-seven', {
        x: 36,
        y: -44,
        rotation: 8,
        scale: 1.085,
        duration: 3.45,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      }));

      atmosphereTweens.push(gsap.to('.star-jm', { x: 9, y: -16, rotation: 8, duration: 3.7, ease: 'sine.inOut', repeat: -1, yoyo: true }));
      atmosphereTweens.push(gsap.to('.star-mms', { x: -13, y: 19, rotation: -5, duration: 4.4, ease: 'sine.inOut', repeat: -1, yoyo: true }));
      atmosphereTweens.push(gsap.to('.star-ys', { x: 11, y: -18, rotation: 6, duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true }));
    }

    const experienceIntro = gsap.timeline({
      defaults: { ease, duration: 0.68, overwrite: 'auto', immediateRender: false },
      scrollTrigger: {
        trigger: '.experience-heading',
        start: 'top 84%',
        once: true,
      },
    });

    experienceIntro
      .from('.experience-heading', { autoAlpha: 0, x: -34 })
      .from('.experience-portrait', { autoAlpha: 0, scale: 0.9, duration: 0.74 }, '<0.14')
      .from('.experience-name', { autoAlpha: 0, x: -24 }, '<0.1')
      .from('.profile-list li', { autoAlpha: 0, x: -16, duration: 0.42, stagger: 0.09 }, '<0.16');

    const cardDirections = [
      ['.card-first', 28],
      ['.card-second', -32],
      ['.card-third', 28],
    ];

    cardDirections.forEach(([selector, x]) => {
      const card = document.querySelector(selector);
      if (!card) return;

      const art = card.querySelector('.card-art');
      const copy = card.querySelector('.card-copy');
      const cardTimeline = gsap.timeline({
        defaults: { ease, overwrite: 'auto', immediateRender: false },
        scrollTrigger: { trigger: card, start: 'top 82%', once: true },
      });

      cardTimeline
        .from(art, { autoAlpha: 0, x, scale: 0.965, duration: 0.78 })
        .from(copy, { y: 26, duration: 0.58 }, '<0.2');
    });

    const skillsTimeline = gsap.timeline({
      defaults: { ease, overwrite: 'auto', immediateRender: false },
      scrollTrigger: { trigger: '.skills-block', start: 'top 83%', once: true },
    });
    skillsTimeline
      .from('.skills-heading', { autoAlpha: 0, x: -24, duration: 0.62 })
      .from('.skills-chart', { autoAlpha: 0, scale: 0.9, rotation: -5, duration: 0.84 }, '<0.1');

    const workCards = Array.from(document.querySelectorAll('.work-card'));
    if ('IntersectionObserver' in window && workCards.length) {
      const workCardObserver = new IntersectionObserver((entries) => {
        const visibleCards = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target);

        if (!visibleCards.length) return;

        visibleCards.forEach((card) => workCardObserver.unobserve(card));
        gsap.from(visibleCards, {
          autoAlpha: 0,
          y: 30,
          scale: 0.975,
          duration: 0.62,
          ease,
          stagger: { each: 0.11, from: 'start' },
          overwrite: 'auto',
        });
      }, { rootMargin: '0px 0px -13% 0px' });

      workCards.forEach((card) => workCardObserver.observe(card));
      removers.push(() => workCardObserver.disconnect());
    }

    const cleanupShowcase = setupShowcaseMotion({ gsap, ScrollTrigger, ease, removers });

    document.querySelectorAll('.work-card').forEach((card) => {
      const booklet = card.querySelector('.work-card-booklet');
      const cover = card.querySelector('.work-card-cover');
      if (!booklet || !cover) return;

      const enter = () => {
        if (card.dataset.activating === 'true') return;
        gsap.set(card, { zIndex: 5 });
        gsap.to(booklet, {
          y: -8,
          duration: 0.26,
          ease: 'power3.out',
          overwrite: 'auto',
        });
        gsap.to(cover, {
          scaleX: 0.94,
          skewY: -7,
          transformOrigin: 'left center',
          duration: 0.3,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      };
      const leave = () => {
        if (card.dataset.activating === 'true') return;
        gsap.to(booklet, {
          y: 0,
          duration: 0.22,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to(cover, {
          scaleX: 1,
          skewY: 0,
          duration: 0.22,
          ease: 'power2.out',
          overwrite: 'auto',
          onComplete: () => gsap.set(card, { zIndex: 4 }),
        });
      };

      addMotionListener(removers, booklet, 'mouseenter', enter);
      addMotionListener(removers, booklet, 'mouseleave', leave);
      addMotionListener(removers, card, 'focus', enter);
      addMotionListener(removers, card, 'blur', leave);
    });

    const hoverEnabled = window.matchMedia('(hover: hover)').matches;
    if (hoverEnabled) {

      document.querySelectorAll('.contact').forEach((contact) => {
        const icon = contact.querySelector('img');
        const enter = () => {
          gsap.to(contact, { x: 6, y: -3, scale: 1.018, duration: 0.24, ease, overwrite: 'auto' });
          gsap.to(icon, { rotation: -8, scale: 1.15, duration: 0.3, ease, overwrite: 'auto' });
        };
        const leave = () => {
          gsap.to(contact, { x: 0, y: 0, scale: 1, duration: 0.24, ease: 'power2.out', overwrite: 'auto' });
          gsap.to(icon, { rotation: 0, scale: 1, duration: 0.24, ease: 'power2.out', overwrite: 'auto' });
        };

        addMotionListener(removers, contact, 'mouseenter', enter);
        addMotionListener(removers, contact, 'mouseleave', leave);
      });

      document.querySelectorAll('.experience-card').forEach((card) => {
        const art = card.querySelector('.card-art');
        const copy = card.querySelector('.card-copy');
        const enter = () => {
          gsap.to(art, { scale: 1.012, duration: 0.42, ease, overwrite: 'auto' });
          gsap.to(copy, { y: -4, duration: 0.36, ease, overwrite: 'auto' });
        };
        const leave = () => {
          gsap.to(art, { scale: 1, duration: 0.32, ease: 'power2.out', overwrite: 'auto' });
          gsap.to(copy, { y: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
        };

        addMotionListener(removers, card, 'mouseenter', enter);
        addMotionListener(removers, card, 'mouseleave', leave);
      });

      const portrait = document.querySelector('.hero-portrait');
      if (portrait) {
        const enter = () => gsap.to(portrait, { x: -4, y: -6, scale: 1.055, rotation: 1.5, duration: 0.34, ease, overwrite: 'auto' });
        const leave = () => gsap.to(portrait, { x: 0, y: 0, scale: 1, rotation: 0, duration: 0.28, ease: 'power2.out', overwrite: 'auto' });
        addMotionListener(removers, portrait, 'mouseenter', enter);
        addMotionListener(removers, portrait, 'mouseleave', leave);
      }
    }

    if (startsInCaseDeck) {
      intro.kill();
      atmosphereTweens.forEach((tween) => tween.kill());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.set([
        '.hero-background',
        '.hero-title',
        '.hero-years',
        '.hero-name',
        '.hero-portrait',
        '.hero-cover',
        '.hero-divider',
        '.contact',
        '.hero-star',
      ], { clearProps: 'opacity,visibility,transform' });
    }

    return () => {
      removers.forEach((remove) => remove());
      atmosphereTweens.forEach((tween) => tween.kill());
      intro.kill();
      cleanupShowcase();
    };
  });
}

startMotion();
