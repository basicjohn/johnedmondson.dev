import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, getPostBySlug, savePost } from "@/lib/content";
import { slugify } from "@/lib/utils";
import { cmsDisabledError, validatePost } from "@/lib/validate";
import type { Post } from "@/lib/types";

// The CMS writes to the local filesystem — it only runs in `next dev`.
// Content ships to production as committed JSON files.

export async function GET() {
  const blocked = cmsDisabledError();
  if (blocked) return NextResponse.json(blocked, { status: 403 });

  return NextResponse.json(getAllPosts({ includeDrafts: true }));
}

export async function POST(request: NextRequest) {
  const blocked = cmsDisabledError();
  if (blocked) return NextResponse.json(blocked, { status: 403 });

  const body = (await request.json()) as Post;
  body.slug = slugify(body.slug || body.title?.en || "");

  const invalid = validatePost(body);
  if (invalid) return NextResponse.json({ error: invalid }, { status: 400 });

  if (getPostBySlug(body.slug)) {
    return NextResponse.json(
      { error: `A post with slug "${body.slug}" already exists.` },
      { status: 409 },
    );
  }

  body.id = `${body.date}-${body.slug}`;
  savePost(body);
  return NextResponse.json(body, { status: 201 });
}
