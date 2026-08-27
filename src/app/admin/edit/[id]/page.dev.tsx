"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Post } from "@/lib/types";
import PostEditor from "@/components/organisms/PostEditor/PostEditor";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/posts/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? `HTTP ${res.status}`);
        }
        setPost(await res.json());
      })
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load."),
      );
  }, [id]);

  if (error) return <p style={{ color: "var(--color-danger)" }}>{error}</p>;
  if (!post) return <p style={{ color: "var(--color-ink-soft)" }}>Loading…</p>;

  return <PostEditor initial={post} isNew={false} />;
}
