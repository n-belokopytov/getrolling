export function FloatingContactCta({ hidden, onClick }) {
  return (
    <button
      type="button"
      className={`floating-contact-cta ${hidden ? 'is-hidden' : ''}`}
      onClick={onClick}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
    >
      Contact me
    </button>
  );
}
