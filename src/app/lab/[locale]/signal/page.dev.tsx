import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getHomeData } from "../../_shared/homeData";
import SignalHome from "../../_signal/SignalHome";

type Props = { params: Promise<{ locale: string }> };

export default async function SignalPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <SignalHome data={getHomeData(locale, "signal")} />;
}
