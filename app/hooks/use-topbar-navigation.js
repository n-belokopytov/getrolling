import { useEffect, useMemo, useRef, useState } from 'react';

const FALLBACK_COMPACT_BREAKPOINT = 1024;
const TOPBAR_MINIMIZE_SCROLL_Y = 24;
const TOPBAR_EXPAND_SCROLL_Y = 0;
const FALLBACK_TOPBAR_TRANSITION_MS = 220;

function getCompactBreakpoint() {
  const rootStyles = getComputedStyle(document.documentElement);
  const rawValue = rootStyles.getPropertyValue('--topbar-compact-breakpoint').trim();
  const parsed = Number.parseInt(rawValue, 10);
  return Number.isFinite(parsed) ? parsed : FALLBACK_COMPACT_BREAKPOINT;
}

function getTopbarTransitionMs() {
  const rootStyles = getComputedStyle(document.documentElement);
  const rawValue = rootStyles.getPropertyValue('--topbar-transition-ms').trim();
  const parsed = Number.parseInt(rawValue, 10);
  return Number.isFinite(parsed) ? parsed : FALLBACK_TOPBAR_TRANSITION_MS;
}

function getTopbarOffsetPx() {
  const rootStyles = getComputedStyle(document.documentElement);
  const rawValue = rootStyles.getPropertyValue('--topbar-offset').trim();
  const parsed = Number.parseFloat(rawValue);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function useTopbarNavigation({ navLinks, headerRef, navRef, navToggleRef }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isCompactViewport, setIsCompactViewport] = useState(false);
  const [topbarMode, setTopbarMode] = useState('expanded');
  const topbarModeRef = useRef('expanded');
  const isTopbarAnimatingRef = useRef(false);
  const animationUnlockTimeoutRef = useRef(null);
  const navSectionIds = useMemo(
    () => navLinks.map((link) => link.href.replace('#', '')).filter(Boolean),
    [navLinks],
  );
  const [activeSection, setActiveSection] = useState(navSectionIds[0] || '');

  useEffect(() => {
    if (!navSectionIds.length) return undefined;

    function syncActiveSectionFromScroll() {
      const activationOffset = (headerRef.current?.offsetHeight || 0) + 24;
      const activationY = window.scrollY + activationOffset;
      let nextActiveSection = navSectionIds[0];

      navSectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;
        if (section.offsetTop <= activationY) {
          nextActiveSection = id;
        }
      });

      setActiveSection((previousSection) =>
        previousSection === nextActiveSection ? previousSection : nextActiveSection,
      );
    }

    syncActiveSectionFromScroll();
    window.addEventListener('scroll', syncActiveSectionFromScroll, { passive: true });
    window.addEventListener('resize', syncActiveSectionFromScroll);
    return () => {
      window.removeEventListener('scroll', syncActiveSectionFromScroll);
      window.removeEventListener('resize', syncActiveSectionFromScroll);
    };
  }, [navSectionIds, headerRef]);

  useEffect(() => {
    if (!isNavOpen) return undefined;

    function handleEscape(event) {
      if (event.key === 'Escape') setIsNavOpen(false);
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isNavOpen]);

  useEffect(() => {
    const compactBreakpoint = getCompactBreakpoint();
    const mediaQuery = window.matchMedia(`(max-width: ${compactBreakpoint}px)`);
    const syncViewport = () => {
      const isCompact = mediaQuery.matches;
      setIsCompactViewport(isCompact);

      if (!isCompact) {
        setIsNavOpen(false);
      }
    };

    syncViewport();
    mediaQuery.addEventListener('change', syncViewport);
    return () => mediaQuery.removeEventListener('change', syncViewport);
  }, []);

  useEffect(() => {
    if (!isNavOpen) return undefined;

    function handleOutsidePointerDown(event) {
      if (!isCompactViewport) return;

      const target = event.target;
      const clickedInsideNav = navRef.current?.contains(target);
      const clickedToggle = navToggleRef.current?.contains(target);

      if (!clickedInsideNav && !clickedToggle) {
        setIsNavOpen(false);
      }
    }

    window.addEventListener('pointerdown', handleOutsidePointerDown);
    return () =>
      window.removeEventListener('pointerdown', handleOutsidePointerDown);
  }, [isCompactViewport, isNavOpen, navRef, navToggleRef]);

  useEffect(() => {
    if (!isNavOpen || !isCompactViewport) return undefined;

    const navFocusableElements = Array.from(
      navRef.current?.querySelectorAll('a[href], button') || [],
    );
    const focusTargets = [navToggleRef.current, ...navFocusableElements].filter(Boolean);
    const firstFocusable = focusTargets[0];
    const lastFocusable = focusTargets[focusTargets.length - 1];

    if (navFocusableElements[0]) {
      navFocusableElements[0].focus({ preventScroll: true });
    }

    function handleTabTrap(event) {
      if (event.key !== 'Tab' || focusTargets.length < 2) return;

      const activeElement = document.activeElement;
      if (!focusTargets.includes(activeElement)) return;

      if (event.shiftKey && activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }

    window.addEventListener('keydown', handleTabTrap);
    return () => window.removeEventListener('keydown', handleTabTrap);
  }, [isNavOpen, isCompactViewport, navRef, navToggleRef]);

  useEffect(() => {
    let frameId = null;
    let latestScrollY = 0;
    const transitionMs = getTopbarTransitionMs();

    function scheduleUnlock() {
      if (animationUnlockTimeoutRef.current) {
        window.clearTimeout(animationUnlockTimeoutRef.current);
      }
      animationUnlockTimeoutRef.current = window.setTimeout(() => {
        isTopbarAnimatingRef.current = false;
        latestScrollY = window.scrollY;
        if (frameId === null) {
          frameId = window.requestAnimationFrame(syncTopbarMode);
        }
      }, transitionMs);
    }

    function switchTopbarMode(nextMode) {
      if (nextMode === 'minimized') {
        const offset = getTopbarOffsetPx();
        if (offset > 0) {
          window.scrollTo({
            top: window.scrollY + offset,
            behavior: 'auto',
          });
          latestScrollY = window.scrollY;
        }
      }
      topbarModeRef.current = nextMode;
      setTopbarMode(nextMode);
      isTopbarAnimatingRef.current = true;
      scheduleUnlock();
    }

    function syncTopbarMode() {
      frameId = null;
      if (isTopbarAnimatingRef.current) return;
      if (
        topbarModeRef.current === 'expanded' &&
        latestScrollY >= TOPBAR_MINIMIZE_SCROLL_Y
      ) {
        switchTopbarMode('minimized');
        return;
      }
      if (
        topbarModeRef.current === 'minimized' &&
        latestScrollY <= TOPBAR_EXPAND_SCROLL_Y
      ) {
        switchTopbarMode('expanded');
      }
    }

    function handleScroll() {
      latestScrollY = window.scrollY;
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(syncTopbarMode);
    }

    latestScrollY = window.scrollY;
    const initialMode =
      latestScrollY >= TOPBAR_MINIMIZE_SCROLL_Y ? 'minimized' : 'expanded';
    topbarModeRef.current = initialMode;
    setTopbarMode(initialMode);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      if (animationUnlockTimeoutRef.current) {
        window.clearTimeout(animationUnlockTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    function syncTopbarHeight() {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      document.documentElement.style.setProperty(
        '--topbar-height',
        `${headerHeight}px`,
      );
    }

    syncTopbarHeight();
    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(syncTopbarHeight);
      if (headerRef.current) {
        resizeObserver.observe(headerRef.current);
      }
    }

    window.addEventListener('resize', syncTopbarHeight);
    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', syncTopbarHeight);
      document.documentElement.style.removeProperty('--topbar-height');
    };
  }, [headerRef, isNavOpen, isCompactViewport]);

  return {
    activeSection,
    isCompactViewport,
    isNavOpen,
    topbarMode,
    setActiveSection,
    setIsNavOpen,
  };
}
