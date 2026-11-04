/**
 * A template (unlike a layout) remounts on every navigation, so the CSS
 * animation in .page-enter replays for free. No transition library, and the
 * new page is rendered immediately — the animation only affects paint.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
