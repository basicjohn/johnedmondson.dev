import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getNotFoundPage } from "../../../_broadsheet/notFoundData";
import NotFoundPage from "../../../_broadsheet/NotFoundPage";

type Props = { params: Promise<{ locale: string }> };

// A preview of the Broadsheet 404 at a normal address, so it can be looked
// at and reviewed; the real one is reached by a missing page.
export default async function BroadsheetNotFoundPreview({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <NotFoundPage data={getNotFoundPage(locale)} />;
}
