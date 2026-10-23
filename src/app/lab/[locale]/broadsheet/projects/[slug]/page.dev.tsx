import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getProjectPage } from "../../../../_broadsheet/projectsData";
import ProjectPage from "../../../../_broadsheet/ProjectPage";

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function BroadsheetProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const data = getProjectPage(locale, slug);
  if (!data) notFound();
  return <ProjectPage data={data} />;
}
