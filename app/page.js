'use client';

import { useRef } from 'react';
import { FloatingContactCta } from './components/floating-contact-cta';
import { Topbar } from './components/topbar';
import { CaseStudiesSection } from './components/sections/case-studies-section';
import { ContactSection } from './components/sections/contact-section';
import { DifferentiatorSection } from './components/sections/differentiator-section';
import { EngagementsSection } from './components/sections/engagements-section';
import { FitCheckSection } from './components/sections/fit-check-section';
import { HeroSection } from './components/sections/hero-section';
import { TestimonialsSection } from './components/sections/testimonials-section';
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
  OWNER_PROFILE,
  PROOF_NOTE,
  PROOF_METRICS,
  QUALIFICATION_SECTION,
  TESTIMONIALS,
  TESTIMONIALS_SECTION,
  TRUSTED_COMPANIES_SECTION,
  WHO_SECTION,
} from './constants';
import { useContactForm } from './hooks/use-contact-form';
import { useContactSectionVisibility } from './hooks/use-contact-section-visibility';
import { useFitCheck } from './hooks/use-fit-check';
import { useTopbarNavigation } from './hooks/use-topbar-navigation';
import { trackEvent } from './lib/analytics';

export default function HomePage() {
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const navToggleRef = useRef(null);

  const {
    activeSection,
    isCompactViewport,
    isNavOpen,
    scrollToSectionById,
    topbarMode,
    setActiveSection,
    setIsNavOpen,
  } = useTopbarNavigation({
    navLinks: NAV_LINKS,
    headerRef,
    navRef,
    navToggleRef,
  });

  const isContactSectionVisible = useContactSectionVisibility(CONTACT_SECTION.id);
  const {
    answers,
    answeredCount,
    hasMinimumAnswers,
    isFitCheckOpen,
    isSubmitted,
    onAnswerChange,
    onFitCheckSubmit,
    questionSelectRefs,
    recommendation,
    recommendedMode,
    remainingAnswers,
    score,
    setIsFitCheckOpen,
  } = useFitCheck(QUALIFICATION_SECTION);
  const {
    contactErrors,
    contactForm,
    contactFormStartedAt,
    contactHoneypotFieldName,
    contactHoneypotValue,
    contactStatus,
    onContactFieldChange,
    onContactHoneypotChange,
    onContactSubmit,
  } = useContactForm({
    answeredCount,
    hasMinimumAnswers,
    isSubmitted,
    minAnswers: QUALIFICATION_SECTION.minAnswers,
    recommendedMode,
    score,
  });
  const hasBookingCalendar = Boolean(BOOKING_URL);
  const shouldHideFloatingContact =
    !isCompactViewport || isContactSectionVisible || (isNavOpen && isCompactViewport);

  function handleNavLinkClick(event, targetHref) {
    event.preventDefault();
    trackEvent('nav_link_click', { target: targetHref });
    const sectionId = targetHref.replace('#', '');
    setActiveSection(sectionId);
    setIsNavOpen(false);
    scrollToSectionById(sectionId);
  }

  function scrollToContact() {
    scrollToSectionById(CONTACT_SECTION.id);
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
        topbarMode={topbarMode}
        navLinks={NAV_LINKS}
        navRef={navRef}
        navToggleRef={navToggleRef}
        onNavLinkClick={handleNavLinkClick}
        onPrimaryAction={() => {
          trackEvent('topbar_contact_click');
          scrollToContact();
          setIsNavOpen(false);
        }}
        ownerProfile={OWNER_PROFILE}
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
      />

      <CaseStudiesSection
        caseStudies={CASE_STUDIES}
        caseStudiesSection={CASE_STUDIES_SECTION}
      />

      <TestimonialsSection
        testimonials={TESTIMONIALS}
        testimonialsSection={TESTIMONIALS_SECTION}
        trustedCompaniesSection={TRUSTED_COMPANIES_SECTION}
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
        onAnswerChange={onAnswerChange}
        onFitCheckSubmit={onFitCheckSubmit}
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
        contactHoneypotFieldName={contactHoneypotFieldName}
        contactHoneypotValue={contactHoneypotValue}
        contactFormStartedAt={contactFormStartedAt}
        contactSection={CONTACT_SECTION}
        contactStatus={contactStatus}
        hasBookingCalendar={hasBookingCalendar}
        onContactFieldChange={onContactFieldChange}
        onContactHoneypotChange={onContactHoneypotChange}
        onContactSubmit={onContactSubmit}
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
