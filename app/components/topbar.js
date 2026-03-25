export function Topbar({
  activeSection,
  brand,
  headerRef,
  isCompactViewport,
  isNavOpen,
  isTopbarSticky,
  navLinks,
  navRef,
  navToggleRef,
  onNavLinkClick,
  onPrimaryAction,
  ownerProfile,
  onToggleNav,
}) {
  return (
    <header
      ref={headerRef}
      className={`topbar ${isTopbarSticky ? 'topbar-sticky topbar-compact' : ''}`}
    >
      <div className="topbar-main">
        <div className="brand-wrap">
          <div className="brand">
            {brand.topbarHeadline || (
              <>
                {brand.name}
                <span className="muted">{brand.domainSuffix}</span>
              </>
            )}
          </div>
          <div className="owner-linkline">
            {ownerProfile.fullName} - tech leadership and hands-on help for faster, safer
            delivery.{' '}
            <a href={ownerProfile.linkedinUrl} target="_blank" rel="noreferrer">
              {ownerProfile.linkedinLabel}
            </a>
          </div>
        </div>
        <button
          ref={navToggleRef}
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={isNavOpen}
          aria-controls="primary-nav"
          aria-haspopup="dialog"
          onClick={onToggleNav}
        >
          <span className="sr-only">{isNavOpen ? 'Close navigation' : 'Open navigation'}</span>
          <span className={`nav-toggle-icon ${isNavOpen ? 'is-open' : ''}`} aria-hidden="true" />
        </button>
      </div>
      <nav
        ref={navRef}
        id="primary-nav"
        className={`nav ${isNavOpen ? 'nav-open' : ''}`}
        aria-label="Primary"
        role={isCompactViewport ? 'dialog' : undefined}
        aria-modal={isCompactViewport && isNavOpen ? true : undefined}
      >
        {navLinks.map((link) => (
          <a
            href={link.href}
            key={link.href}
            onClick={() => onNavLinkClick(link.href)}
            className={activeSection === link.href.replace('#', '') ? 'is-active' : ''}
            aria-current={
              activeSection === link.href.replace('#', '') ? 'location' : undefined
            }
          >
            {link.label}
          </a>
        ))}
        <button type="button" className="nav-cta" onClick={onPrimaryAction}>
          Contact
        </button>
      </nav>
    </header>
  );
}
