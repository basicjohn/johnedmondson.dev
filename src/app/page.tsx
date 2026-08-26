import { redirect } from "next/navigation";

// The middleware normally handles locale redirects;
// this is a safety net for direct hits on "/".
export default function RootPage() {
  redirect("/en");
}
