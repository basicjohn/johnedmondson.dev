"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Post, PostStatus, PostType } from "@/lib/types";
import Badge from "@/components/atoms/Badge/Badge";
import styles from "./dashboard.module.scss";

type TypeFilter = PostType | "all";
type StatusFilter = PostStatus | "all";

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  async function load() {
    try {
      const res = await fetch("/api/admin/posts");
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `HTTP ${res.status}`);
      }
      setPosts(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load posts.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(post: Post) {
    if (!confirm(`Delete "${post.title.en}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/posts/${post.id}`, { method: "DELETE" });
    if (res.ok) {
      setPosts((prev) => prev?.filter((p) => p.id !== post.id) ?? null);
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error ?? "Delete failed.");
    }
  }

  const visible = useMemo(() => {
    if (!posts) return [];
    const q = search.toLowerCase();
    return posts.filter((p) => {
      if (typeFilter !== "all" && p.type !== typeFilter) return false;
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (
        q &&
        ![p.title.en, p.title.de, p.slug, ...p.tags]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
        return false;
      return true;
    });
  }, [posts, search, typeFilter, statusFilter]);

  if (error) {
    return (
      <div>
        <h1 className={styles.title}>Posts</h1>
        <p className={styles.error}>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.toolbar}>
        <h1 className={styles.title}>
          Posts {posts && <span className={styles.count}>({visible.length})</span>}
        </h1>
        <div className={styles.filters}>
          <input
            type="search"
            placeholder="Search title, slug, tags…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.search}
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
            aria-label="Filter by type"
          >
            <option value="all">All types</option>
            <option value="portfolio">Portfolio</option>
            <option value="writing">Writing</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            aria-label="Filter by status"
          >
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {!posts ? (
        <p className={styles.loading}>Loading…</p>
      ) : visible.length === 0 ? (
        <p className={styles.loading}>No posts match.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {visible.map((post) => (
              <tr key={post.id}>
                <td>
                  <Link href={`/admin/edit/${post.id}`} className={styles.rowTitle}>
                    {post.title.en || "(untitled)"}
                  </Link>
                  <span className={styles.rowSlug}>/{post.slug}</span>
                  {post.featured && <Badge label="Featured" tone="accent" />}
                </td>
                <td>
                  <Badge
                    label={post.type === "portfolio" ? "Portfolio" : "Writing"}
                    tone="neutral"
                  />
                </td>
                <td>
                  <Badge
                    label={post.status === "published" ? "Published" : "Draft"}
                    tone={post.status === "published" ? "success" : "draft"}
                  />
                </td>
                <td className={styles.date}>{post.date}</td>
                <td className={styles.actions}>
                  <Link href={`/admin/edit/${post.id}`}>Edit</Link>
                  <button type="button" onClick={() => handleDelete(post)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
