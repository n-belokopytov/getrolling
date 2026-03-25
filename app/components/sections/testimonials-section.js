'use client';

import { useMemo, useState } from 'react';

export function TestimonialsSection({ testimonials, testimonialsSection }) {
  const orderedTestimonials = useMemo(() => {
    return [...testimonials].sort((a, b) => a.importance - b.importance);
  }, [testimonials]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const total = orderedTestimonials.length;
  const leadingCount = Math.min(testimonialsSection.leadingCount, total);

  const current = orderedTestimonials[currentIndex];

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
      <div className="testimonial-leading-list" aria-label="Leading recommendations">
        {orderedTestimonials.slice(0, leadingCount).map((testimonial, index) => (
          <button
            key={testimonial.id}
            type="button"
            className={`testimonial-leading-pill ${index === currentIndex ? 'is-active' : ''}`}
            onClick={() => goTo(index)}
          >
            {index + 1}. {testimonial.author}
          </button>
        ))}
      </div>

      <div className="card testimonial-carousel">
        <article className="testimonial-card">
          {currentIndex < leadingCount ? (
            <div className="testimonial-badge">Leading recommendation</div>
          ) : null}
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
    </section>
  );
}
