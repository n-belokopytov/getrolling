import Image from 'next/image';

export function Topbar({
  activeSection,
  brand,
  headerRef,
  isCompactViewport,
  isNavOpen,
  topbarMode,
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
      className={`topbar ${topbarMode === 'minimized' ? 'topbar-minimized' : 'topbar-expanded'}`}
    >
      <div className="topbar-identity-row">
        <div className="brand-wrap">
          <div className="brand">
            <Image
              src="/site-mark-inverted-tight.png"
              alt=""
              aria-hidden="true"
              width={247}
              height={161}
              className="brand-icon"
              priority
            />
            <span className="brand-text">
              <span className="brand-headline">
                {brand.topbarHeadline || (
                  <>
                    {brand.name}
                    <span className="muted">{brand.domainSuffix}</span>
                  </>
                )}
              </span>
              <span className="brand-subline">
                {brand.name}
                <span className="muted">{brand.domainSuffix}</span> - {brand.tagline}
              </span>
            </span>
          </div>
        </div>
        <div className="owner-linkline owner-linkline-desktop">
          <span>{ownerProfile.fullName} - delivery leadership, hands-on execution.</span>{' '}
          <a href={ownerProfile.linkedinUrl} target="_blank" rel="noreferrer">
            {ownerProfile.linkedinLabel}
          </a>
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
      <div className="topbar-author-row owner-linkline">
        <span>{ownerProfile.fullName} - delivery leadership, hands-on execution.</span>{' '}
        <a href={ownerProfile.linkedinUrl} target="_blank" rel="noreferrer">
          {ownerProfile.linkedinLabel}
        </a>
      </div>
      <div className="topbar-action-row">
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
      </div>
    </header>
  );
}
