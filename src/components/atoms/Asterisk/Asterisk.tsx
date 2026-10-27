// One spoke, pointing up from the centre: narrow at the hub, widening to a
// round tip — the teardrop arms of a printer's ✺, drawn rather than typed so
// it looks the same on every system instead of whichever font has the glyph.
const SPOKE = "M-2,-6 L-6.5,-38 A6.5,6.5 0 0 1 6.5,-38 L2,-6 Z";

/** The site's asterisk mark. Decorative; takes its colour from the text. */
export default function Asterisk({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="-50 -50 100 100"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <circle r="9" />
      {Array.from({ length: 12 }, (_, i) => (
        <path key={i} d={SPOKE} transform={`rotate(${i * 30})`} />
      ))}
    </svg>
  );
}
