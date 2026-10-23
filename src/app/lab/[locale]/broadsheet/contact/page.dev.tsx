import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getContactPage } from "../../../_broadsheet/contactData";
import ContactPage from "../../../_broadsheet/ContactPage";

type Props = { params: Promise<{ locale: string }> };

export default async function BroadsheetContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ContactPage data={getContactPage(locale)} />;
}
