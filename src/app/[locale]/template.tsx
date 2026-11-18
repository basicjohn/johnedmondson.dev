import Motion from "@/components/atoms/Motion/Motion";

// A template, not the layout: it remounts on every navigation, so the
// scroll reveals start fresh on each page instead of only the first.
export default function LocaleTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Motion />
      {children}
    </>
  );
}
