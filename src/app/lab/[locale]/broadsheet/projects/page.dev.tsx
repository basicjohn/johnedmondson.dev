import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getProjectsIndex } from "../../../_broadsheet/projectsData";
import ProjectsIndex from "../../../_broadsheet/ProjectsIndex";

type Props = { params: Promise<{ locale: string }> };

export default async function BroadsheetProjectsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ProjectsIndex data={getProjectsIndex(locale)} />;
}
