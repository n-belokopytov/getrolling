import { useEffect, useState } from 'react';

export function useContactSectionVisibility(sectionId) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionId]);

  return isVisible;
}
