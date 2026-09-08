import { NotFoundBody } from "@/components/organisms/NotFound/NotFound";

// Reached by notFound() inside a locale: an unknown slug, or a draft in
// production. The locale layout already wraps this in header and footer.
export default function LocaleNotFound() {
  return <NotFoundBody />;
}

export const metadata = { title: "404" };
