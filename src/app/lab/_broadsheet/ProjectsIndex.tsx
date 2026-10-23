import BroadsheetShell from "./BroadsheetShell";
import ProjectCard from "./ProjectCard";
import type { ProjectsIndexData } from "./projectsData";
import { hasDescender } from "./typography";
import styles from "./Broadsheet.module.scss";
import page from "./Projects.module.scss";

/**
 * The projects list as the Broadsheet sets it: the title and intro on the
 * drafting grid, then every project on the dark ground — the lead as a
 * spread, the rest two by two — and the footer below.
 */
export default function ProjectsIndex({ data }: { data: ProjectsIndexData }) {
  const [lead, ...rest] = data.projects;

  return (
    <BroadsheetShell shell={data.shell} current="portfolio">
      <header className={page.intro}>
        <div className={`container ${page.introInner}`}>
          <h1
            className={`${page.pageTitle} ${hasDescender(data.title) ? page.descends : ""}`}
          >
            {data.title}
          </h1>
          <p className={page.lede}>{data.intro}</p>
        </div>
      </header>

      <section
        className={`${styles.inverse} ${page.dark}`}
        aria-label={data.title}
      >
        <div className="container">
          {lead ? (
            <>
              <ProjectCard project={lead} variant="feature" />
              {rest.length > 0 && (
                <div className={styles.pair}>
                  {rest.map((project, i) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={i % 2}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className={page.empty}>{data.empty}</p>
          )}
        </div>
      </section>
    </BroadsheetShell>
  );
}
