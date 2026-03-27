import { useEffect, useRef, useState } from 'react';

const TOPBAR_MINIMIZE_SCROLL_Y = 24;
const TOPBAR_EXPAND_SCROLL_Y = 0;
const FALLBACK_TOPBAR_TRANSITION_MS = 220;

function getTopbarTransitionMs() {
  const rootStyles = getComputedStyle(document.documentElement);
  const rawValue = rootStyles.getPropertyValue('--topbar-transition-ms').trim();
  const parsed = Number.parseInt(rawValue, 10);
  return Number.isFinite(parsed) ? parsed : FALLBACK_TOPBAR_TRANSITION_MS;
}

function getTopbarOffsetPx() {
  const rootStyles = getComputedStyle(document.documentElement);
  const rawValue = rootStyles.getPropertyValue('--topbar-offset').trim();
  if (!rawValue) return 0;

  // Resolve CSS length functions (for example clamp()) into a px value.
  const probe = document.createElement('div');
  probe.style.position = 'absolute';
  probe.style.visibility = 'hidden';
  probe.style.pointerEvents = 'none';
  probe.style.height = '0';
  probe.style.top = rawValue;
  document.body.appendChild(probe);

  try {
    const resolvedTop = getComputedStyle(probe).top;
    const parsed = Number.parseFloat(resolvedTop);
    return Number.isFinite(parsed) ? parsed : 0;
  } finally {
    document.body.removeChild(probe);
  }
}

export function useTopbarMode() {
  const [topbarMode, setTopbarMode] = useState('expanded');
  const topbarModeRef = useRef('expanded');
  const isTopbarAnimatingRef = useRef(false);
  const animationUnlockTimeoutRef = useRef(null);

  useEffect(() => {
    let frameId = null;
    let latestScrollY = 0;
    const transitionMs = getTopbarTransitionMs();

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

  return topbarMode;
}
