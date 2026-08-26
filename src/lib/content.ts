// Server-only content store. Posts live as JSON files in /content/posts —
// the CMS admin writes them via API routes, the site reads them at
// build/request time. Deploys are just git commits.
import fs from "fs";
import path from "path";
import type { Post, PostType, SiteData } from "./types";

export const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const SITE_FILE = path.join(process.cwd(), "content", "site.json");

export function getAllPosts(opts: { includeDrafts?: boolean } = {}): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".json"));
  const posts = files.map(
    (f) => JSON.parse(fs.readFileSync(path.join(POSTS_DIR, f), "utf8")) as Post
  );
  return posts
    .filter((p) => opts.includeDrafts || p.status === "published")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsByType(type: PostType): Post[] {
  return getAllPosts().filter((p) => p.type === type);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts({ includeDrafts: true }).find((p) => p.slug === slug);
}

export function getPostById(id: string): Post | undefined {
  return getAllPosts({ includeDrafts: true }).find((p) => p.id === id);
}

export function getFeaturedPosts(type: PostType, limit = 3): Post[] {
  const all = getPostsByType(type);
  const featured = all.filter((p) => p.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

/** Same type, ranked by shared tags */
export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return getPostsByType(post.type)
    .filter((p) => p.id !== post.id)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post: p }) => p);
}

export function getAllTags(type?: PostType): string[] {
  const posts = type ? getPostsByType(type) : getAllPosts();
  return [...new Set(posts.flatMap((p) => p.tags))].sort();
}

export function getSiteData(): SiteData {
  return JSON.parse(fs.readFileSync(SITE_FILE, "utf8")) as SiteData;
}

// ---------- Write operations (used by the admin API, dev only) ----------

export function savePost(post: Post): void {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
  const file = path.join(POSTS_DIR, `${post.id}.json`);
  fs.writeFileSync(file, JSON.stringify(post, null, 2) + "\n", "utf8");
}

export function deletePost(id: string): boolean {
  const file = path.join(POSTS_DIR, `${id}.json`);
  if (!fs.existsSync(file)) return false;
  fs.unlinkSync(file);
  return true;
}
