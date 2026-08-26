import type { Post } from "./types";

export function validatePost(post: Partial<Post>): string | null {
  if (!post.title?.en?.trim()) return "An English title is required.";
  if (!post.slug?.trim()) return "A slug is required.";
  if (!["portfolio", "writing"].includes(post.type ?? "")) return "Invalid post type.";
  if (!["draft", "published"].includes(post.status ?? "")) return "Invalid status.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date ?? "")) return "Date must be yyyy-mm-dd.";
  return null;
}

/** Route handlers may only export HTTP methods — shared guard lives here. */
export function cmsDisabledError(): { error: string } | null {
  if (process.env.NODE_ENV === "production") {
    return { error: "The CMS is only available in local development." };
  }
  return null;
}
