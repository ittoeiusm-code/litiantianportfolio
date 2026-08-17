const TOTAL_PAGES = 67;
const initialPageMatch = window.location.hash.match(/^#page-(\d{2})$/);
const initialPage = Number(initialPageMatch?.[1] || 1);
const shouldRestoreInitialPage = Boolean(initialPageMatch)
  && initialPage >= 1
  && initialPage <= TOTAL_PAGES;

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

if (shouldRestoreInitialPage) {
  history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
}

const chapters = [
  { id: 'poster', number: '01', title: 'KV / 海报', english: 'KV POSTER', start: 1, end: 12 },
  { id: 'wechat', number: '02', title: '微信推文长图', english: 'WECHAT EDITORIAL', start: 13, end: 39 },
  { id: 'ecommerce', number: '03', title: '电商首页 / 详情页', english: 'E-COMMERCE', start: 40, end: 47 },
  { id: 'illustration', number: '04', title: '插画 / 动画', english: 'ILLUSTRATION & MOTION', start: 48, end: 52 },
  { id: 'ui', number: '05', title: '小程序 / Web / UI', english: 'DIGITAL PRODUCT', start: 53, end: 67 },
];

const motionProjects = [
  {
    title: '友邦保险“PPR全程健康友保障”',
    src: './assets/donghua/1友邦保险“PPR全程健康友保障”.mp4',
    poster: './assets/donghua/posters/01.webp',
  },
  {
    title: '友邦保险“友如意·星享佳”',
    src: './assets/donghua/2友邦保险“友如意·星享佳”.mp4',
    poster: './assets/donghua/posters/02.webp',
  },
  {
    title: '5G医疗',
    src: './assets/donghua/35G医疗.mp4',
    poster: './assets/donghua/posters/03.webp',
  },
  {
    title: '联通智慧沃家',
    src: './assets/donghua/4联通智慧沃家.mp4',
    poster: './assets/donghua/posters/04.webp',
  },
  {
    title: '天猫鲁班之星',
    src: './assets/donghua/5天猫鲁班之星.mp4',
    poster: './assets/donghua/posters/05.webp',
  },
  {
    title: '利星行汽车',
    src: './assets/donghua/6利星行汽车.mp4',
    poster: './assets/donghua/posters/06.webp',
  },
  {
    title: '英菲尼迪',
    src: './assets/donghua/7英菲尼迪.mp4',
    poster: './assets/donghua/posters/07.webp',
  },
];

const pageSubjects = {
  1: '天猫家装节系列海报',
  2: '马自达汽车品牌海报',
  3: '长安深蓝品牌海报',
  4: '中国联通主题海报',
  5: '融创文旅主题海报',
  6: '奇瑞与德赛西威汽车海报',
  7: '中国联通东奥主题海报',
  8: '沃尔沃与英菲尼迪汽车海报',
  9: '问界与膳魔师品牌海报',
  10: '膳魔师母婴系列海报',
  11: '膳魔师 B.Duck 联名视觉',
  12: '公司年会主视觉',
  13: '长安深蓝微信推文长图',
  21: '中国联通微信推文长图',
  22: '奇瑞汽车微信推文长图',
  24: '雀巢益生菌微信推文长图',
  25: '雄克工业产品长图',
  27: '专家讲堂课程长图',
  28: '海克斯康产品长图',
  29: '母婴产品长图',
  30: '膳魔师品牌长图',
  31: '膳魔师产品传播长图',
  32: '膳魔师母婴礼盒视觉',
  33: '膳魔师儿童节传播视觉',
  34: '膳魔师教师节传播视觉',
  35: '膳魔师国潮系列视觉',
  36: '膳魔师直播活动视觉',
  37: '膳魔师开学季视觉',
  39: '膳魔师兔年礼盒视觉',
  40: '立顿电商首页与详情页',
  42: '王茅酒电商详情页',
  43: '膳魔师电商详情页',
  44: '膳魔师产品电商详情页',
  45: '膳魔师电商活动页面',
  46: '膳魔师双十一电商页面',
  47: '雀巢益生菌电商详情页',
  48: '插画与动画章节',
  49: '节日主题插画',
  50: '工业园区信息插画',
  51: '智慧制造场景插画',
  52: '5G 医疗动画项目',
  53: '亿生收纳小程序项目',
  54: '亿生收纳移动端界面',
  55: '亿生收纳后台与页面流程',
  56: '微课程移动端 2.0 体验设计',
  57: '微课程旧版痛点分析',
  58: '微课程改版方向与目标',
  59: '微课程 App 标志改版',
  60: '微课程引导页动效设计',
  61: '微课程首页改版',
  62: '微课程选课页改版',
  63: '微课程学习页改版',
  64: '微课程个人中心改版',
  65: '微课程登录注册改版',
  66: '微课程弹窗广告设计',
  67: '微课程色彩与字体规范',
};

const deck = document.querySelector('#case-deck');
const indexDialog = document.querySelector('#work-index');
const indexList = document.querySelector('#index-list');
const railList = document.querySelector('#chapter-rail-list');
const currentPageLabel = document.querySelector('#current-page');
const openIndexButton = document.querySelector('#open-index');
const closeIndexButton = document.querySelector('#close-index');
const fullscreenButton = document.querySelector('#toggle-fullscreen');
const returnToContentsButton = document.querySelector('#return-to-contents');
const indexPlaneFollower = document.querySelector('#index-plane-follower');

function isCaseDeckActive() {
  return document.body.classList.contains('case-deck-active');
}

function chapterForPage(pageNumber) {
  return chapters.find((chapter) => pageNumber >= chapter.start && pageNumber <= chapter.end);
}

function paddedPage(pageNumber) {
  return String(pageNumber).padStart(2, '0');
}

function setDeferredVideoSource(video, source) {
  video.dataset.src = source;
  video.preload = 'none';
}

function loadDeferredVideoSource(video, preload = 'auto') {
  if (!video.dataset.src || video.hasAttribute('src')) return;
  video.preload = preload;
  video.src = video.dataset.src;
  video.load();
}

function unloadDeferredVideoSource(video) {
  video.pause();
  if (!video.hasAttribute('src')) return;
  video.removeAttribute('src');
  video.load();
}

function setupDeferredImages() {
  const images = [...document.querySelectorAll('img[data-src]')];
  if (!images.length) return;

  const loadImage = (image) => {
    if (!image.dataset.src) return;
    image.src = image.dataset.src;
    image.removeAttribute('data-src');
  };

  if (!('IntersectionObserver' in window)) {
    images.forEach(loadImage);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      loadImage(entry.target);
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '320px 0px' });

  images.forEach((image) => observer.observe(image));
}

function createMotionVideo(project, className) {
  const video = document.createElement('video');
  video.className = className;
  setDeferredVideoSource(video, project.src);
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  return video;
}

function createSplashScreenVideo() {
  const video = document.createElement('video');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let isVisible = false;

  video.className = 'splash-screen-video';
  setDeferredVideoSource(video, './assets/shanping.mp4');
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.controls = false;
  video.disablePictureInPicture = true;
  video.tabIndex = -1;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.setAttribute('aria-hidden', 'true');

  const updatePlayback = () => {
    if (isVisible && !reduceMotion.matches) {
      loadDeferredVideoSource(video);
      video.play().catch(() => {});
    } else {
      unloadDeferredVideoSource(video);
    }
  };

  const playbackObserver = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
    updatePlayback();
  }, { threshold: [0, 0.2] });

  reduceMotion.addEventListener?.('change', updatePlayback);
  playbackObserver.observe(video);
  return video;
}

function createMotionShowcase() {
  const showcase = document.createElement('div');
  const title = document.createElement('p');
  const mainFrame = document.createElement('div');
  const previewRail = document.createElement('div');
  const mainVideo = createMotionVideo(motionProjects[0], 'motion-showcase__main-video');
  let mainProjectIndex = 0;
  let showcaseIsVisible = false;

  showcase.className = 'motion-showcase';
  showcase.setAttribute('aria-label', '动画视频作品');
  title.className = 'motion-showcase__title';
  title.textContent = motionProjects[0].title;
  mainFrame.className = 'motion-showcase__main';
  mainVideo.controls = true;
  mainVideo.setAttribute('aria-label', motionProjects[0].title);
  previewRail.className = 'motion-showcase__previews';
  mainFrame.append(mainVideo);

  motionProjects.forEach((project, projectIndex) => {
    const previewButton = document.createElement('button');
    const previewImage = document.createElement('img');

    previewButton.className = 'motion-showcase__preview';
    previewButton.type = 'button';
    previewButton.setAttribute('aria-pressed', String(projectIndex === mainProjectIndex));
    previewButton.setAttribute('aria-label', `在主画面播放：${project.title}`);
    previewImage.className = 'motion-showcase__preview-video';
    previewImage.src = project.poster;
    previewImage.alt = '';
    previewImage.loading = 'lazy';
    previewImage.decoding = 'async';
    previewImage.setAttribute('aria-hidden', 'true');
    previewButton.append(previewImage);

    previewButton.addEventListener('click', () => {
      if (projectIndex === mainProjectIndex) return;

      unloadDeferredVideoSource(mainVideo);
      mainVideo.dataset.src = project.src;
      mainVideo.setAttribute('aria-label', project.title);
      title.textContent = project.title;
      mainProjectIndex = projectIndex;
      previewRail.querySelectorAll('.motion-showcase__preview').forEach((button, index) => {
        button.setAttribute('aria-pressed', String(index === mainProjectIndex));
      });

      if (showcaseIsVisible) {
        loadDeferredVideoSource(mainVideo);
        mainVideo.play().catch(() => {});
      }
    });

    previewRail.append(previewButton);
  });

  showcase.append(title, mainFrame, previewRail);

  const playbackObserver = new IntersectionObserver(([entry]) => {
    showcaseIsVisible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
    showcase.querySelectorAll('video').forEach((video) => {
      if (showcaseIsVisible) {
        loadDeferredVideoSource(
          video,
          video === mainVideo ? 'auto' : 'metadata',
        );
        video.play().catch(() => {});
      } else {
        unloadDeferredVideoSource(video);
      }
    });
  }, { threshold: [0, 0.2] });

  playbackObserver.observe(showcase);
  return showcase;
}

function renderDeck() {
  const fragment = document.createDocumentFragment();

  for (let pageNumber = 1; pageNumber <= TOTAL_PAGES; pageNumber += 1) {
    const chapter = chapterForPage(pageNumber);
    const isLongPage = pageNumber === 55;
    const section = document.createElement('section');
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    const caption = document.createElement('figcaption');
    const pageLabel = paddedPage(pageNumber);
    const subject = pageNumber === 52
      ? '动画视频作品合集'
      : pageSubjects[pageNumber] || `${chapter.title}作品展示`;

    section.className = `case-page${isLongPage ? ' case-page--long' : ''}`;
    section.id = `page-${pageLabel}`;
    section.dataset.page = String(pageNumber);
    section.dataset.chapter = chapter.id;
    section.setAttribute('aria-label', `第 ${pageNumber} 页，${subject}`);

    figure.className = `case-page__frame${isLongPage ? ' case-page__frame--long' : ''}`;
    figure.dataset.pageLabel = `PAGE ${pageLabel}`;

    image.dataset.pageSrc = `./assets/case-pages/page-${pageLabel}.webp`;
    image.alt = `李添添作品集，第 ${pageNumber} 页：${subject}`;
    image.width = 1280;
    image.height = isLongPage ? 6160 : 800;
    image.decoding = 'async';
    image.loading = 'lazy';
    image.fetchPriority = 'low';

    caption.className = 'visually-hidden';
    caption.textContent = `${chapter.number} ${chapter.title}。${subject}。`;

    image.addEventListener('load', () => figure.classList.add('is-loaded'));
    image.addEventListener('error', () => figure.classList.add('is-error'));

    figure.append(image, caption);
    if (pageNumber === 52) {
      figure.append(createMotionShowcase());
    }
    if (pageNumber === 56) {
      const deviceVideo = document.createElement('video');
      deviceVideo.className = 'case-page__overlay-media microcourse-device-video';
      setDeferredVideoSource(deviceVideo, './assets/yuanship.mp4');
      deviceVideo.autoplay = true;
      deviceVideo.loop = true;
      deviceVideo.muted = true;
      deviceVideo.playsInline = true;
      deviceVideo.preload = 'metadata';
      deviceVideo.setAttribute('aria-hidden', 'true');

      const deviceOverlay = document.createElement('img');
      deviceOverlay.className = 'case-page__overlay-image microcourse-device-overlay';
      deviceOverlay.src = './assets/yangji.png';
      deviceOverlay.alt = '';
      deviceOverlay.decoding = 'async';
      deviceOverlay.loading = 'lazy';
      deviceOverlay.setAttribute('aria-hidden', 'true');
      figure.append(deviceVideo, deviceOverlay);

      const devicePlaybackObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          loadDeferredVideoSource(deviceVideo);
          deviceVideo.play().catch(() => {});
        } else {
          unloadDeferredVideoSource(deviceVideo);
        }
      }, { threshold: [0, 0.2] });

      devicePlaybackObserver.observe(deviceVideo);
    }
    if (pageNumber === 60) {
      figure.append(createSplashScreenVideo());
    }
    section.append(figure);
    fragment.append(section);
  }

  deck.append(fragment);

  deck.querySelectorAll('img').forEach((image) => {
    if (image.complete && image.naturalWidth > 0) {
      image.closest('.case-page__frame').classList.add('is-loaded');
    }
  });
}

function preloadNearbyPageImages(pageNumber) {
  if (!Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber > TOTAL_PAGES) return;

  const firstPage = Math.max(1, pageNumber - 1);
  const lastPage = Math.min(TOTAL_PAGES, pageNumber + 2);

  for (let nearbyPage = firstPage; nearbyPage <= lastPage; nearbyPage += 1) {
    const image = document.querySelector(
      `#page-${paddedPage(nearbyPage)} .case-page__frame > img`,
    );
    if (!image) continue;

    image.loading = 'eager';
    image.fetchPriority = nearbyPage === pageNumber ? 'high' : 'auto';
    if (!image.getAttribute('src') && image.dataset.pageSrc) {
      image.src = image.dataset.pageSrc;
      delete image.dataset.pageSrc;
    }
    image.decode?.().catch(() => {});
  }
}

function renderNavigation() {
  chapters.forEach((chapter) => {
    const indexItem = document.createElement('li');
    const indexButton = document.createElement('button');
    const pageCount = chapter.end - chapter.start + 1;

    indexButton.className = 'index-jump';
    indexButton.type = 'button';
    indexButton.dataset.targetPage = String(chapter.start);
    indexButton.innerHTML = `
      <span class="index-number">${chapter.number}</span>
      <span class="index-title">${chapter.title}</span>
      <span class="index-meta">${chapter.english} · ${pageCount} PAGES</span>
    `;
    indexItem.append(indexButton);
    indexList.append(indexItem);

    const railItem = document.createElement('li');
    const railButton = document.createElement('button');
    railButton.className = 'chapter-link';
    railButton.type = 'button';
    railButton.dataset.targetPage = String(chapter.start);
    railButton.dataset.chapter = chapter.id;
    railButton.setAttribute('aria-label', `跳到 ${chapter.title}`);
    railButton.innerHTML = `<span>${chapter.number} · ${chapter.title}</span>`;
    const railProgress = document.createElement('span');
    railProgress.className = 'chapter-progress';
    railProgress.setAttribute('aria-hidden', 'true');
    railProgress.innerHTML = '<span class="chapter-progress-value"></span>';
    railItem.append(railButton, railProgress);
    railList.append(railItem);
  });
}

function scrollToPage(pageNumber, behavior = 'smooth') {
  const target = document.querySelector(`#page-${paddedPage(pageNumber)}`);
  if (!target) return;
  preloadNearbyPageImages(pageNumber);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const resolvedBehavior = behavior === 'auto' || reduceMotion ? 'auto' : behavior;
  const block = window.innerWidth < 900 || target.classList.contains('case-page--long') ? 'start' : 'center';
  target.scrollIntoView({ behavior: resolvedBehavior, block });
}

function pageScrollPosition(pageNumber) {
  const target = document.querySelector(`#page-${paddedPage(pageNumber)}`);
  if (!target) return undefined;

  const targetTop = window.scrollY + target.getBoundingClientRect().top;
  const documentHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
  );
  const maxScroll = Math.max(0, documentHeight - window.innerHeight);
  const alignToStart = window.innerWidth < 900 || target.classList.contains('case-page--long');
  const centeredTop = targetTop - Math.max(0, (window.innerHeight - target.offsetHeight) / 2);

  return Math.min(maxScroll, Math.max(0, alignToStart ? targetTop : centeredTop));
}

let cachedSnapPositions = [];

function calculateSnapScrollPositions() {
  const documentHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
  );
  const maxScroll = Math.max(0, documentHeight - window.innerHeight);
  const viewportHeight = window.innerHeight;
  const candidates = [maxScroll];

  document.querySelectorAll('.case-page').forEach((page) => {
    const pageTop = page.offsetTop;

    if (page.classList.contains('case-page--long')) {
      const pageEnd = Math.max(pageTop, pageTop + page.offsetHeight - viewportHeight);
      const segmentSize = Math.max(Math.round(viewportHeight * 0.88), 360);

      for (let position = pageTop; position < pageEnd - 4; position += segmentSize) {
        candidates.push(position);
      }

      candidates.push(pageEnd);
      return;
    }

    const isShorterThanViewport = page.offsetHeight < viewportHeight * 0.9;
    const position = isShorterThanViewport
      ? pageTop
      : pageTop + (page.offsetHeight - viewportHeight) / 2;
    candidates.push(position);
  });

  return [...new Set(
    candidates.map((position) => Math.round(gsap.utils.clamp(0, maxScroll, position))),
  )].sort((first, second) => first - second);
}

function refreshSnapScrollPositions() {
  cachedSnapPositions = calculateSnapScrollPositions();
  return cachedSnapPositions;
}

function snapScrollPositions() {
  return cachedSnapPositions.length ? cachedSnapPositions : refreshSnapScrollPositions();
}

function enableGsapSnap() {
  if (!window.gsap) {
    document.documentElement.dataset.gsapSnap = 'unavailable';
    return;
  }

  const media = gsap.matchMedia();

  media.add('(prefers-reduced-motion: no-preference)', () => {
    document.documentElement.dataset.gsapSnap = 'enabled';
    let wheelTween;
    let wheelUnlockTimer;
    let cacheRefreshFrame;
    let wheelGestureLocked = false;
    const scrollState = { y: window.scrollY };

    const scheduleCacheRefresh = () => {
      if (cacheRefreshFrame) return;
      cacheRefreshFrame = requestAnimationFrame(() => {
        cacheRefreshFrame = undefined;
        refreshSnapScrollPositions();
      });
    };

    refreshSnapScrollPositions();

    const adjacentSnapPosition = (currentPosition, direction) => {
      const positions = snapScrollPositions();
      const tolerance = 4;

      if (direction > 0) {
        return positions.find((position) => position > currentPosition + tolerance)
          ?? positions[positions.length - 1];
      }

      return [...positions]
        .reverse()
        .find((position) => position < currentPosition - tolerance)
        ?? positions[0];
    };

    const handleWheel = (event) => {
      if (
        event.ctrlKey
        || Math.abs(event.deltaY) < 2
        || indexDialog.open
        || !isCaseDeckActive()
      ) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const positions = snapScrollPositions();
      const firstPosition = positions[0];
      const lastPosition = positions[positions.length - 1];
      const currentPosition = window.scrollY;
      const tolerance = 4;

      if (
        (direction > 0 && currentPosition < firstPosition - tolerance)
        || (direction < 0 && currentPosition <= firstPosition + tolerance)
        || (direction > 0 && currentPosition >= lastPosition - tolerance)
      ) {
        return;
      }

      event.preventDefault();
      window.clearTimeout(wheelUnlockTimer);
      wheelUnlockTimer = window.setTimeout(() => {
        wheelGestureLocked = false;
      }, 100);

      if (wheelGestureLocked || wheelTween?.isActive()) return;
      wheelGestureLocked = true;

      const targetPosition = adjacentSnapPosition(window.scrollY, direction);
      if (Math.abs(targetPosition - window.scrollY) <= 4) return;

      scrollState.y = window.scrollY;
      wheelTween = gsap.to(scrollState, {
        y: targetPosition,
        duration: 0.22,
        ease: 'power3.out',
        overwrite: true,
        onUpdate: () => window.scrollTo(0, scrollState.y),
        onComplete: () => {
          window.scrollTo(0, targetPosition);
          updateActivePage(pageAtViewportReadingLine());
          wheelTween = undefined;
        },
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('load', scheduleCacheRefresh, { once: true });
    window.addEventListener('resize', scheduleCacheRefresh, { passive: true });
    window.ScrollTrigger?.addEventListener('refresh', scheduleCacheRefresh);
    document.fonts?.ready.then(scheduleCacheRefresh);

    return () => {
      window.removeEventListener('load', scheduleCacheRefresh);
      window.removeEventListener('resize', scheduleCacheRefresh);
      window.removeEventListener('wheel', handleWheel);
      window.ScrollTrigger?.removeEventListener('refresh', scheduleCacheRefresh);
      window.clearTimeout(wheelUnlockTimer);
      cancelAnimationFrame(cacheRefreshFrame);
      wheelTween?.kill();
      document.documentElement.dataset.gsapSnap = 'reduced-motion';
    };
  });
}

function pageAtViewportReadingLine() {
  const readingLine = Math.min(80, window.innerHeight * 0.15);
  let nearestPage = activePage;
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const page of document.querySelectorAll('.case-page')) {
    const bounds = page.getBoundingClientRect();
    if (bounds.top <= readingLine && bounds.bottom > readingLine) {
      return Number(page.dataset.page);
    }

    const distance = Math.abs(bounds.top - readingLine);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestPage = Number(page.dataset.page);
    }
  }

  return nearestPage;
}

let activePage = 1;

function updateActivePage(pageNumber, updateHash = true) {
  if (pageNumber < 1 || pageNumber > TOTAL_PAGES) return;
  activePage = pageNumber;
  if (isCaseDeckActive() || shouldRestoreInitialPage) {
    preloadNearbyPageImages(pageNumber);
  }
  const chapter = chapterForPage(pageNumber);
  const chapterPageCount = chapter.end - chapter.start + 1;
  const chapterPagePosition = pageNumber - chapter.start + 1;
  const chapterProgress = chapterPagePosition / chapterPageCount;

  currentPageLabel.textContent = paddedPage(pageNumber);

  document.querySelectorAll('.chapter-link').forEach((link) => {
    const localProgressValue = link.nextElementSibling?.querySelector('.chapter-progress-value');
    if (link.dataset.chapter === chapter.id) {
      link.setAttribute('aria-current', 'true');
      if (localProgressValue) localProgressValue.style.transform = `scaleY(${chapterProgress})`;
    } else {
      link.removeAttribute('aria-current');
      if (localProgressValue) localProgressValue.style.transform = 'scaleY(0)';
    }
  });

  if (updateHash) {
    history.replaceState(null, '', `#page-${paddedPage(pageNumber)}`);
  }
}

function trackActivePage() {
  let trackingFrame;
  let resizeTimer;
  let resizeTargetPage;
  const sync = () => {
    trackingFrame = undefined;
    if (
      resizeTimer
      || !isCaseDeckActive()
      || document.documentElement.dataset.workCardTransition === 'true'
    ) return;
    updateActivePage(pageAtViewportReadingLine());
  };
  const requestSync = () => {
    if (trackingFrame) return;
    trackingFrame = requestAnimationFrame(sync);
  };

  const preservePageOnResize = () => {
    if (!isCaseDeckActive()) return;
    if (!resizeTimer) resizeTargetPage = activePage;
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      scrollToPage(resizeTargetPage, 'auto');
      updateActivePage(resizeTargetPage);
      resizeTimer = undefined;
    }, 120);
  };

  window.addEventListener('scroll', requestSync, { passive: true });
  window.addEventListener('resize', preservePageOnResize, { passive: true });
  requestSync();
}

function setupCaseDeckState() {
  let stateFrame;
  let wasActive = false;

  const syncState = () => {
    stateFrame = undefined;
    const bounds = deck.getBoundingClientRect();
    const active = bounds.top <= 4 && bounds.bottom > Math.min(80, window.innerHeight * 0.15);

    document.body.classList.toggle('case-deck-active', active);
    document.documentElement.classList.toggle('case-deck-active', active);

    if (wasActive && !active && /^#page-\d{2}$/.test(window.location.hash)) {
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }

    wasActive = active;
  };

  const requestStateSync = () => {
    if (stateFrame) return;
    stateFrame = requestAnimationFrame(syncState);
  };

  window.addEventListener('scroll', requestStateSync, { passive: true });
  window.addEventListener('resize', requestStateSync, { passive: true });
  syncState();
}

function setupIndexPlaneFollower() {
  if (!window.gsap || !indexPlaneFollower) return;

  const finePointer = window.matchMedia('(pointer: fine)');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const xTo = gsap.quickTo(indexPlaneFollower, 'x', {
    duration: 0.24,
    ease: 'power3.out',
  });
  const yTo = gsap.quickTo(indexPlaneFollower, 'y', {
    duration: 0.24,
    ease: 'power3.out',
  });
  const rotationTo = gsap.quickTo(indexPlaneFollower, 'rotation', {
    duration: 0.3,
    ease: 'power3.out',
  });
  let hasPosition = false;
  let isVisible = false;

  const hidePlane = (immediate = false) => {
    isVisible = false;
    gsap.to(indexPlaneFollower, {
      autoAlpha: 0,
      duration: immediate ? 0 : 0.14,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  indexDialog.addEventListener('pointermove', (event) => {
    if (!indexDialog.open || !finePointer.matches || reduceMotion.matches) return;

    const x = event.clientX + 12;
    const y = event.clientY + 10;

    if (!hasPosition) {
      gsap.set(indexPlaneFollower, { x, y, rotation: 0 });
      hasPosition = true;
    } else {
      xTo(x);
      yTo(y);
      rotationTo(gsap.utils.clamp(-14, 14, event.movementY * 0.7));
    }

    if (!isVisible) {
      isVisible = true;
      gsap.to(indexPlaneFollower, {
        autoAlpha: 0.9,
        duration: 0.16,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  }, { passive: true });

  indexDialog.addEventListener('pointerleave', () => hidePlane());
  indexDialog.addEventListener('close', () => {
    hasPosition = false;
    hidePlane(true);
  });
}

function openIndex() {
  if (typeof indexDialog.showModal !== 'function') return;
  indexDialog.showModal();
  document.body.classList.add('index-open');
}

function closeIndex() {
  if (indexDialog.open) indexDialog.close();
  document.body.classList.remove('index-open');
}

let returnToContentsTween;

function returnToContents() {
  const target = document.querySelector('.contents-heading')
    || document.querySelector('.contents-stage');
  if (!target) return;

  const targetPosition = Math.max(
    0,
    window.scrollY + target.getBoundingClientRect().top - Math.min(64, window.innerHeight * 0.07),
  );
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!window.gsap || reduceMotion) {
    window.scrollTo(0, targetPosition);
    return;
  }

  const scrollState = { y: window.scrollY };
  returnToContentsTween?.kill();
  returnToContentsTween = gsap.to(scrollState, {
    y: targetPosition,
    duration: 0.48,
    ease: 'power3.inOut',
    overwrite: true,
    onUpdate: () => window.scrollTo(0, scrollState.y),
    onComplete: () => {
      window.scrollTo(0, targetPosition);
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
      returnToContentsTween = undefined;
    },
  });
}

let workCardTransitionTimeline;

function createWorkCardFlightCue(booklet) {
  const bounds = booklet.getBoundingClientRect();
  const startX = bounds.left + bounds.width * 0.62;
  const startY = bounds.top + bounds.height * 0.34;
  const direction = startX < window.innerWidth * 0.5 ? 1 : -1;
  const endX = window.innerWidth * (direction > 0 ? 0.7 : 0.3);
  const endY = Math.max(76, window.innerHeight * 0.14);
  const cue = document.createElement('span');

  cue.className = 'work-card-flight-cue';
  cue.setAttribute('aria-hidden', 'true');
  cue.innerHTML = `
    <svg viewBox="0 0 86 44" focusable="false">
      <defs>
        <linearGradient id="work-card-flight-fill" x1="12" y1="12" x2="70" y2="36" gradientUnits="userSpaceOnUse">
          <stop stop-color="#dff6fe" />
          <stop offset="1" stop-color="#ffffff" />
        </linearGradient>
      </defs>
      <path class="work-card-flight-cue__trail" d="M3 36 C15 35 25 31 35 25" />
      <path class="work-card-flight-cue__plane" d="M41 24 L80 6 L57 38 L49 25 Z" />
      <path class="work-card-flight-cue__fold" d="M41 24 L49 25 L80 6 M49 25 L57 38" />
    </svg>
  `;
  document.body.append(cue);

  gsap.set(cue, {
    x: startX,
    y: startY,
    xPercent: -50,
    yPercent: -50,
    scale: 0.72,
    rotation: direction > 0 ? -8 : 8,
    autoAlpha: 0,
  });
  gsap.set(cue.querySelector('svg'), {
    scaleX: direction,
    transformOrigin: 'center center',
  });

  return { cue, direction, startX, startY, endX, endY };
}

function activateWorkCardLink(card) {
  if (card.dataset.activating === 'true' || workCardTransitionTimeline?.isActive()) return;

  const pageNumber = Number(card.dataset.targetPage);
  if (!Number.isInteger(pageNumber)) return;

  const booklet = card.querySelector('.work-card-booklet');
  const cover = card.querySelector('.work-card-cover');
  const target = document.querySelector(`#page-${paddedPage(pageNumber)}`);
  const targetPosition = pageScrollPosition(pageNumber);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finishNavigation = (cue) => {
    if (typeof targetPosition === 'number') window.scrollTo(0, targetPosition);
    cue?.remove();
    if (window.gsap && booklet && cover) {
      gsap.set([booklet, cover], { clearProps: 'transform' });
      gsap.set(card, { clearProps: 'zIndex' });
    }
    delete card.dataset.activating;
    card.removeAttribute('aria-busy');
    delete document.documentElement.dataset.workCardTransition;
    updateActivePage(pageNumber);
    workCardTransitionTimeline = undefined;
  };

  card.dataset.activating = 'true';
  card.setAttribute('aria-busy', 'true');
  document.documentElement.dataset.workCardTransition = 'true';

  const targetImage = target?.querySelector('img');
  if (targetImage) {
    targetImage.loading = 'eager';
    targetImage.fetchPriority = 'high';
    targetImage.decode?.().catch(() => {});
  }

  if (!window.gsap || !booklet || !cover || reduceMotion || typeof targetPosition !== 'number') {
    finishNavigation();
    return;
  }

  const flight = createWorkCardFlightCue(booklet);
  const scrollState = { y: window.scrollY };

  gsap.killTweensOf([card, booklet, cover]);
  gsap.set(card, { zIndex: 8 });
  workCardTransitionTimeline = gsap.timeline({
    defaults: { overwrite: 'auto' },
    onComplete: () => finishNavigation(flight.cue),
  });

  workCardTransitionTimeline
    .to(booklet, {
      y: -18,
      scale: 1.035,
      duration: 0.22,
      ease: 'power4.out',
    }, 0)
    .to(cover, {
      x: -3,
      scaleX: 0.76,
      skewY: -14,
      transformOrigin: 'left center',
      duration: 0.22,
      ease: 'power4.out',
    }, 0)
    .to(flight.cue, {
      x: flight.startX + flight.direction * 24,
      y: flight.startY - 18,
      scale: 1,
      rotation: flight.direction > 0 ? -12 : 12,
      autoAlpha: 1,
      duration: 0.16,
      ease: 'power3.out',
    }, 0.04)
    .to(flight.cue, {
      x: flight.endX,
      y: flight.endY,
      scale: 0.82,
      rotation: flight.direction > 0 ? -18 : 18,
      autoAlpha: 0,
      duration: 0.62,
      ease: 'power2.in',
    }, 0.18)
    .to(scrollState, {
      y: targetPosition,
      duration: 0.70,
      ease: 'expo.inOut',
      onUpdate: () => window.scrollTo(0, scrollState.y),
    }, 0.16);
}

function bindInteractions() {
  setupIndexPlaneFollower();
  openIndexButton.addEventListener('click', openIndex);
  closeIndexButton.addEventListener('click', closeIndex);
  returnToContentsButton.addEventListener('click', returnToContents);

  indexDialog.addEventListener('click', (event) => {
    if (event.target === indexDialog) closeIndex();
  });

  indexDialog.addEventListener('close', () => document.body.classList.remove('index-open'));

  document.querySelectorAll('[data-target-page]:not(.work-card)').forEach((button) => {
    button.addEventListener('click', () => {
      const pageNumber = Number(button.dataset.targetPage);
      closeIndex();
      requestAnimationFrame(() => scrollToPage(pageNumber));
    });
  });

  document.querySelectorAll('.work-card[data-target-page]').forEach((card) => {
    card.addEventListener('click', () => activateWorkCardLink(card));
  });

  if (!document.documentElement.requestFullscreen) {
    fullscreenButton.hidden = true;
  } else {
    fullscreenButton.addEventListener('click', async () => {
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        } else {
          await document.documentElement.requestFullscreen();
        }
      } catch (error) {
        console.warn('无法切换全屏模式。', error);
      }
    });

    document.addEventListener('fullscreenchange', () => {
      const label = fullscreenButton.querySelector('.fullscreen-label');
      label.textContent = document.fullscreenElement ? '退出全屏' : '全屏浏览';
      fullscreenButton.setAttribute('aria-pressed', String(Boolean(document.fullscreenElement)));
    });
  }

  document.addEventListener('keydown', (event) => {
    if (indexDialog.open || event.altKey || event.ctrlKey || event.metaKey) return;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
    if (!isCaseDeckActive()) return;

    const nextKeys = ['ArrowDown', 'ArrowRight', 'PageDown'];
    const previousKeys = ['ArrowUp', 'ArrowLeft', 'PageUp'];

    if (nextKeys.includes(event.key)) {
      event.preventDefault();
      scrollToPage(Math.min(pageAtViewportReadingLine() + 1, TOTAL_PAGES));
    } else if (previousKeys.includes(event.key)) {
      event.preventDefault();
      scrollToPage(Math.max(pageAtViewportReadingLine() - 1, 1));
    } else if (event.key === 'Home') {
      event.preventDefault();
      scrollToPage(1);
    } else if (event.key === 'End') {
      event.preventDefault();
      scrollToPage(TOTAL_PAGES);
    }
  });

  window.addEventListener('hashchange', () => {
    const match = window.location.hash.match(/^#page-(\d{2})$/);
    if (match) scrollToPage(Number(match[1]), 'auto');
  });
}

setupDeferredImages();
renderDeck();
renderNavigation();
refreshSnapScrollPositions();
bindInteractions();
setupCaseDeckState();
trackActivePage();
enableGsapSnap();

updateActivePage(initialPage, false);

if (shouldRestoreInitialPage) {
  requestAnimationFrame(() => {
    refreshSnapScrollPositions();
    requestAnimationFrame(() => {
      scrollToPage(initialPage, 'auto');
      updateActivePage(initialPage);
    });
  });
}
