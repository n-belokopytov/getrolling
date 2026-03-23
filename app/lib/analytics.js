export function trackEvent(eventName, payload = {}) {
  if (typeof window === 'undefined') return;

  const eventPayload = { event: eventName, ...payload };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventPayload);

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);
  }
}
