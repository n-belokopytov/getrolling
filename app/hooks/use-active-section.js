import { useEffect, useState } from 'react';

export function useActiveSection({ headerRef, navSectionIds }) {
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
  }, [headerRef, navSectionIds]);

  return { activeSection, setActiveSection };
}
