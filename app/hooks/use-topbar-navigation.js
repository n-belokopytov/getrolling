import { useEffect, useMemo, useState } from 'react';

const FALLBACK_COMPACT_BREAKPOINT = 1024;

function getCompactBreakpoint() {
  const rootStyles = getComputedStyle(document.documentElement);
  const rawValue = rootStyles.getPropertyValue('--topbar-compact-breakpoint').trim();
  const parsed = Number.parseInt(rawValue, 10);
  return Number.isFinite(parsed) ? parsed : FALLBACK_COMPACT_BREAKPOINT;
}

export function useTopbarNavigation({ navLinks, headerRef, navRef, navToggleRef }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isCompactViewport, setIsCompactViewport] = useState(false);
  const [isTopbarSticky, setIsTopbarSticky] = useState(false);
  const navSectionIds = useMemo(
    () => navLinks.map((link) => link.href.replace('#', '')).filter(Boolean),
    [navLinks],
  );
  const [activeSection, setActiveSection] = useState(navSectionIds[0] || '');

  useEffect(() => {
    if (!navSectionIds.length) return undefined;

    const visibleSections = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        if (visibleSections.size === 0) return;

        const [mostVisible] = [...visibleSections.entries()].sort(
          (a, b) => b[1] - a[1],
        );

        if (mostVisible?.[0]) {
          setActiveSection(mostVisible[0]);
        }
      },
      {
        threshold: [0.2, 0.4, 0.65],
        rootMargin: '-30% 0px -50% 0px',
      },
    );

    navSectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [navSectionIds]);

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
    function handleScroll() {
      setIsTopbarSticky(window.scrollY > 12);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
    isTopbarSticky,
    navSectionIds,
    setActiveSection,
    setIsNavOpen,
  };
}
