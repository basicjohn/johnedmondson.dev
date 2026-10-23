import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getHomeData } from "../../_shared/homeData";
import BroadsheetHome from "../../_broadsheet/BroadsheetHome";

type Props = { params: Promise<{ locale: string }> };

export default async function BroadsheetPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <BroadsheetHome data={getHomeData(locale, "broadsheet")} />;
}
