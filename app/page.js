'use client';

import { useMemo, useRef, useState } from 'react';
import { FloatingContactCta } from './components/floating-contact-cta';
import { Topbar } from './components/topbar';
import { CaseStudiesSection } from './components/sections/case-studies-section';
import { ContactSection } from './components/sections/contact-section';
import { DifferentiatorSection } from './components/sections/differentiator-section';
import { EngagementsSection } from './components/sections/engagements-section';
import { FitCheckSection } from './components/sections/fit-check-section';
import { HeroSection } from './components/sections/hero-section';
import { WhoSection } from './components/sections/who-section';
import {
  BOOKING_URL,
  BRAND,
  CASE_STUDIES,
  CASE_STUDIES_SECTION,
  CONTACT_SECTION,
  DIFFERENTIATOR_SECTION,
  ENGAGEMENTS,
  ENGAGEMENTS_SECTION,
  HERO,
  NAV_LINKS,
  PROOF_NOTE,
  PROOF_METRICS,
  QUALIFICATION_SECTION,
  TRUSTED_COMPANIES_SECTION,
  WHO_SECTION,
} from './constants';
import { useContactSectionVisibility } from './hooks/use-contact-section-visibility';
import { useTopbarNavigation } from './hooks/use-topbar-navigation';
import { trackEvent } from './lib/analytics';
import { INITIAL_CONTACT_FORM, validateContactForm } from './lib/contact-form';
import { getAnsweredCount, getRecommendedMode, getScore } from './lib/fit-check';

export default function HomePage() {
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFitCheckOpen, setIsFitCheckOpen] = useState(false);
  const [contactForm, setContactForm] = useState(INITIAL_CONTACT_FORM);
  const [contactErrors, setContactErrors] = useState({});
  const [contactStatus, setContactStatus] = useState({
    type: 'idle',
    message: '',
  });

  const headerRef = useRef(null);
  const navRef = useRef(null);
  const navToggleRef = useRef(null);
  const questionSelectRefs = useRef({});
  const hasTrackedStep1StartRef = useRef(false);

  const {
    activeSection,
    isCompactViewport,
    isNavOpen,
    isTopbarSticky,
    setActiveSection,
    setIsNavOpen,
  } = useTopbarNavigation({
    navLinks: NAV_LINKS,
    headerRef,
    navRef,
    navToggleRef,
  });

  const isContactSectionVisible = useContactSectionVisibility(CONTACT_SECTION.id);

  const answeredCount = useMemo(
    () => getAnsweredCount(answers, QUALIFICATION_SECTION.questions),
    [answers],
  );
  const score = useMemo(
    () => getScore(answers, QUALIFICATION_SECTION.questions),
    [answers],
  );
  const hasMinimumAnswers = answeredCount >= QUALIFICATION_SECTION.minAnswers;
  const recommendedMode = useMemo(
    () => getRecommendedMode({ answers, hasMinimumAnswers }),
    [answers, hasMinimumAnswers],
  );
  const recommendation = recommendedMode
    ? QUALIFICATION_SECTION.recommendations[recommendedMode]
    : null;
  const remainingAnswers = Math.max(
    QUALIFICATION_SECTION.minAnswers - answeredCount,
    0,
  );
  const hasBookingCalendar = Boolean(BOOKING_URL);
  const shouldHideFloatingContact =
    !isCompactViewport || isContactSectionVisible || (isNavOpen && isCompactViewport);

  function handleAnswerChange(questionId, value) {
    if (!hasTrackedStep1StartRef.current) {
      trackEvent('fitcheck_start');
      hasTrackedStep1StartRef.current = true;
    }

    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function handleFitCheckSubmit(event) {
    event.preventDefault();
    const unansweredQuestion = QUALIFICATION_SECTION.questions.find(
      (question) => !answers[question.id],
    );

    trackEvent('fitcheck_submit', {
      answeredCount,
      minimumRequired: QUALIFICATION_SECTION.minAnswers,
      score,
      recommendedMode,
    });
    setIsSubmitted(true);

    if (!hasMinimumAnswers && unansweredQuestion) {
      questionSelectRefs.current[unansweredQuestion.id]?.focus();
    }
  }

  function handleNavLinkClick(targetHref) {
    trackEvent('nav_link_click', { target: targetHref });
    setActiveSection(targetHref.replace('#', ''));
    setIsNavOpen(false);
  }

  function scrollToContact() {
    const contactSection = document.getElementById(CONTACT_SECTION.id);
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function handleContactFieldChange(field, value) {
    setContactForm((prev) => ({ ...prev, [field]: value }));
    setContactErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function handleContactSubmit(event) {
    event.preventDefault();

    const nextErrors = validateContactForm(contactForm);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidFieldName = Object.keys(nextErrors)[0];
      const firstInvalidField = event.currentTarget.querySelector(
        `[name="${firstInvalidFieldName}"]`,
      );

      setContactErrors(nextErrors);
      setContactStatus({
        type: 'error',
        message: 'Please fix the highlighted fields and try again.',
      });
      trackEvent('contact_submit_validation_error', {
        missingFields: Object.keys(nextErrors),
      });
      firstInvalidField?.focus();
      return;
    }

    setContactStatus({ type: 'submitting', message: '' });
    trackEvent('contact_submit_attempt');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contactForm,
          fitCheck: {
            isSubmitted,
            answeredCount,
            minAnswers: QUALIFICATION_SECTION.minAnswers,
            score,
            recommendedMode: isSubmitted && hasMinimumAnswers ? recommendedMode : null,
          },
        }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to submit contact request.');
      }

      setContactStatus({
        type: 'success',
        message: payload?.message || 'Thanks. You will get a direct reply shortly.',
      });
      setContactErrors({});
      setContactForm(INITIAL_CONTACT_FORM);
      trackEvent('contact_submit_success');
    } catch (error) {
      setContactStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.',
      });
      trackEvent('contact_submit_failure', {
        reason: error.message || 'unknown',
      });
    }
  }

  return (
    <main className="page-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <Topbar
        activeSection={activeSection}
        brand={BRAND}
        headerRef={headerRef}
        isCompactViewport={isCompactViewport}
        isNavOpen={isNavOpen}
        isTopbarSticky={isTopbarSticky}
        navLinks={NAV_LINKS}
        navRef={navRef}
        navToggleRef={navToggleRef}
        onNavLinkClick={handleNavLinkClick}
        onPrimaryAction={() => {
          trackEvent('topbar_contact_click');
          scrollToContact();
          setIsNavOpen(false);
        }}
        onToggleNav={() => setIsNavOpen((prev) => !prev)}
      />

      <HeroSection
        hero={HERO}
        proofMetrics={PROOF_METRICS}
        proofNote={PROOF_NOTE}
        onPrimaryClick={() => trackEvent('hero_primary_click')}
      />

      <DifferentiatorSection
        differentiatorSection={DIFFERENTIATOR_SECTION}
        trustedCompaniesSection={TRUSTED_COMPANIES_SECTION}
      />

      <CaseStudiesSection
        caseStudies={CASE_STUDIES}
        caseStudiesSection={CASE_STUDIES_SECTION}
      />

      <WhoSection whoSection={WHO_SECTION} />

      <EngagementsSection
        engagements={ENGAGEMENTS}
        engagementsSection={ENGAGEMENTS_SECTION}
      />

      <FitCheckSection
        answers={answers}
        answeredCount={answeredCount}
        hasMinimumAnswers={hasMinimumAnswers}
        isFitCheckOpen={isFitCheckOpen}
        isSubmitted={isSubmitted}
        onAnswerChange={handleAnswerChange}
        onFitCheckSubmit={handleFitCheckSubmit}
        onRecommendationClick={scrollToContact}
        onToggleOpen={() => setIsFitCheckOpen((prev) => !prev)}
        qualificationSection={QUALIFICATION_SECTION}
        questionSelectRefs={questionSelectRefs}
        recommendation={recommendation}
        recommendedMode={recommendedMode}
        remainingAnswers={remainingAnswers}
        trackEvent={trackEvent}
      />

      <ContactSection
        contactErrors={contactErrors}
        contactForm={contactForm}
        contactSection={CONTACT_SECTION}
        contactStatus={contactStatus}
        hasBookingCalendar={hasBookingCalendar}
        onContactFieldChange={handleContactFieldChange}
        onContactSubmit={handleContactSubmit}
        trackEvent={trackEvent}
      />

      <FloatingContactCta
        hidden={shouldHideFloatingContact}
        onClick={() => {
          trackEvent('floating_contact_click');
          scrollToContact();
        }}
      />
    </main>
  );
}
