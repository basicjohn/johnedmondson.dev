"use client";

import { emptyPost } from "@/lib/types";
import PostEditor from "@/components/organisms/PostEditor/PostEditor";

export default function NewPostPage() {
  return <PostEditor initial={emptyPost()} isNew />;
}
