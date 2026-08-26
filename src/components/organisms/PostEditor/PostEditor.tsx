"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Locale, Post, PostStatus, PostType } from "@/lib/types";
import { markdownToHtml } from "@/lib/markdown";
import { slugify } from "@/lib/utils";
import FormField from "@/components/molecules/FormField/FormField";
import Button from "@/components/atoms/Button/Button";
import styles from "./PostEditor.module.scss";

type Props = {
  initial: Post;
  isNew: boolean;
};

export default function PostEditor({ initial, isNew }: Props) {
  const router = useRouter();
  const [post, setPost] = useState<Post>(initial);
  const [lang, setLang] = useState<Locale>("en");
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof Post>(key: K, value: Post[K]) =>
    setPost((p) => ({ ...p, [key]: value }));

  const setLocalized = (key: "title" | "excerpt" | "body", value: string) =>
    setPost((p) => ({ ...p, [key]: { ...p[key], [lang]: value } }));

  function handleTitleChange(value: string) {
    setPost((p) => {
      const next = { ...p, title: { ...p.title, [lang]: value } };
      if (lang === "en" && !slugTouched) next.slug = slugify(value);
      return next;
    });
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(
        isNew ? "/api/admin/posts" : `/api/admin/posts/${post.id}`,
        {
          method: isNew ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(post),
        }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      router.push("/admin");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed.");
      setSaving(false);
    }
  }

  const isPortfolio = post.type === "portfolio";

  return (
    <div className={styles.editor}>
      <div className={styles.toolbar}>
        <h1 className={styles.heading}>{isNew ? "New post" : "Edit post"}</h1>
        <div className={styles.toolbarActions}>
          <label className={styles.statusToggle}>
            <span>Status</span>
            <select
              value={post.status}
              onChange={(e) => set("status", e.target.value as PostStatus)}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : isNew ? "Create post" : "Save changes"}
          </Button>
        </div>
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <div className={styles.grid}>
        {/* ---------- Settings column ---------- */}
        <aside className={styles.settings}>
          <FormField
            as="select"
            label="Type"
            name="type"
            value={post.type}
            onChange={(e) => set("type", e.target.value as PostType)}
          >
            <option value="writing">Writing</option>
            <option value="portfolio">Portfolio</option>
          </FormField>

          <FormField
            label="Slug"
            name="slug"
            value={post.slug}
            hint={isNew ? "Auto-generated from the English title" : undefined}
            onChange={(e) => {
              setSlugTouched(true);
              set("slug", slugify(e.target.value));
            }}
          />

          <FormField
            label="Date"
            name="date"
            type="date"
            value={post.date}
            onChange={(e) => set("date", e.target.value)}
          />

          <FormField
            label="Tags (comma separated)"
            name="tags"
            value={post.tags.join(", ")}
            onChange={(e) =>
              set(
                "tags",
                e.target.value
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
              )
            }
          />

          <FormField
            label="Cover image URL"
            name="cover"
            value={post.cover ?? ""}
            hint="Optional — cards use a generated gradient if empty"
            onChange={(e) => set("cover", e.target.value || undefined)}
          />

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={post.featured}
              onChange={(e) => set("featured", e.target.checked)}
            />
            <span>Featured on home page</span>
          </label>

          {isPortfolio && (
            <fieldset className={styles.fieldset}>
              <legend>Project details</legend>
              <FormField
                label="Client"
                name="client"
                value={post.client ?? ""}
                onChange={(e) => set("client", e.target.value || undefined)}
              />
              <FormField
                label="Role"
                name="role"
                value={post.role ?? ""}
                onChange={(e) => set("role", e.target.value || undefined)}
              />
              <FormField
                label="Year"
                name="year"
                value={post.year ?? ""}
                onChange={(e) => set("year", e.target.value || undefined)}
              />
              <FormField
                label="Live URL"
                name="link"
                value={post.link ?? ""}
                onChange={(e) => set("link", e.target.value || undefined)}
              />
              <FormField
                label="Repository URL"
                name="repo"
                value={post.repo ?? ""}
                onChange={(e) => set("repo", e.target.value || undefined)}
              />
              <FormField
                label="Stack (comma separated)"
                name="stack"
                value={(post.stack ?? []).join(", ")}
                onChange={(e) =>
                  set(
                    "stack",
                    e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)
                  )
                }
              />
            </fieldset>
          )}
        </aside>

        {/* ---------- Content column ---------- */}
        <div className={styles.content}>
          <div className={styles.langTabs} role="tablist" aria-label="Content language">
            {(["en", "de"] as Locale[]).map((l) => (
              <button
                key={l}
                type="button"
                role="tab"
                aria-selected={lang === l}
                className={lang === l ? styles.langTabActive : styles.langTab}
                onClick={() => setLang(l)}
              >
                {l === "en" ? "English" : "Deutsch"}
              </button>
            ))}
          </div>

          <FormField
            label={`Title (${lang.toUpperCase()})`}
            name={`title-${lang}`}
            value={post.title[lang]}
            onChange={(e) => handleTitleChange(e.target.value)}
          />

          <FormField
            as="textarea"
            label={`Excerpt (${lang.toUpperCase()})`}
            name={`excerpt-${lang}`}
            rows={3}
            value={post.excerpt[lang]}
            onChange={(e) => setLocalized("excerpt", e.target.value)}
          />

          <div className={styles.bodyHeader}>
            <span className={styles.bodyLabel}>Body (Markdown, {lang.toUpperCase()})</span>
            <button
              type="button"
              className={styles.previewToggle}
              onClick={() => setShowPreview((v) => !v)}
              aria-pressed={showPreview}
            >
              {showPreview ? "Hide preview" : "Show preview"}
            </button>
          </div>

          <div className={showPreview ? styles.bodySplit : undefined}>
            <textarea
              className={styles.bodyInput}
              value={post.body[lang]}
              rows={22}
              onChange={(e) => setLocalized("body", e.target.value)}
              aria-label={`Body markdown ${lang}`}
            />
            {showPreview && (
              <div
                className={`prose ${styles.preview}`}
                dangerouslySetInnerHTML={{
                  __html: markdownToHtml(post.body[lang]),
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
