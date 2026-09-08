import { getSiteData } from "@/lib/content";
import NotFoundPage from "@/components/organisms/NotFound/NotFound";

// Global 404, and the source of the static export's 404.html. It renders
// outside the locale layout, so it brings its own header and footer and
// picks the language from the path the visitor tried.
export default function NotFound() {
  return <NotFoundPage site={getSiteData()} />;
}

// One title for both languages: the template appends the site name.
export const metadata = { title: "404" };
