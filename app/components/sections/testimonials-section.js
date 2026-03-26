'use client';

import { useEffect, useMemo, useState } from 'react';

export function TestimonialsSection({
  testimonials,
  testimonialsSection,
  trustedCompaniesSection,
}) {
  const orderedTestimonials = useMemo(() => {
    return [...testimonials].sort((a, b) => a.importance - b.importance);
  }, [testimonials]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const total = orderedTestimonials.length;
  const slideshowDelayMs = testimonialsSection.slideshowDelayMs ?? 7000;

  const current = orderedTestimonials[currentIndex];

  useEffect(() => {
    if (total <= 1) return undefined;

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, slideshowDelayMs);

    return () => clearTimeout(timer);
  }, [currentIndex, slideshowDelayMs, total]);

  function goTo(index) {
    setCurrentIndex(index);
  }

  function goPrev() {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }

  function goNext() {
    setCurrentIndex((prev) => (prev + 1) % total);
  }

  if (total === 0) return null;

  return (
    <section id={testimonialsSection.id} className="section">
      <div className="section-head">
        <div className="eyebrow">{testimonialsSection.eyebrow}</div>
        <h2>{testimonialsSection.title}</h2>
      </div>
      <div className="card testimonial-carousel">
        <article key={current.id} className="testimonial-card testimonial-card-fade">
          <p className="testimonial-quote">"{current.quote}"</p>
          <p className="testimonial-author">{current.author}</p>
          <p className="testimonial-role">{current.role}</p>
          <a
            className="testimonial-source"
            href={current.sourceUrl}
            target="_blank"
            rel="noreferrer"
          >
            {current.sourceLabel}
          </a>
        </article>

        <div className="testimonial-controls">
          <button type="button" className="testimonial-nav-button" onClick={goPrev}>
            Previous
          </button>
          <div className="testimonial-pagination" aria-label="Testimonial pages">
            {orderedTestimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                className={`testimonial-dot ${index === currentIndex ? 'is-active' : ''}`}
                aria-label={`Show testimonial ${index + 1}`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
          <button type="button" className="testimonial-nav-button" onClick={goNext}>
            Next
          </button>
        </div>
      </div>
      <div className="trusted-proof" aria-label="Trusted companies">
        <div className="eyebrow">{trustedCompaniesSection.eyebrow}</div>
        <ul className="trusted-companies-list">
          {trustedCompaniesSection.companies.map((company) => (
            <li className="trusted-company-item" key={company.name}>
              <div className="trusted-company-head">
                <h4>{company.name}</h4>
                <a
                  className="trusted-company-link"
                  href={company.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit
                </a>
              </div>
              <p className="trusted-company-description">{company.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
