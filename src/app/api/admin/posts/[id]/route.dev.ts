import { NextRequest, NextResponse } from "next/server";
import { deletePost, getAllPosts, getPostById, savePost } from "@/lib/content";
import { slugify } from "@/lib/utils";
import { cmsDisabledError, validatePost } from "@/lib/validate";
import type { Post } from "@/lib/types";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Ctx) {
  const blocked = cmsDisabledError();
  if (blocked) return NextResponse.json(blocked, { status: 403 });

  const { id } = await params;
  const post = getPostById(id);
  if (!post)
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(request: NextRequest, { params }: Ctx) {
  const blocked = cmsDisabledError();
  if (blocked) return NextResponse.json(blocked, { status: 403 });

  const { id } = await params;
  const existing = getPostById(id);
  if (!existing)
    return NextResponse.json({ error: "Post not found." }, { status: 404 });

  const body = (await request.json()) as Post;
  body.id = id; // id is immutable
  body.slug = slugify(body.slug || body.title?.en || "");

  const invalid = validatePost(body);
  if (invalid) return NextResponse.json({ error: invalid }, { status: 400 });

  const slugTaken = getAllPosts({ includeDrafts: true }).some(
    (p) => p.slug === body.slug && p.id !== id,
  );
  if (slugTaken) {
    return NextResponse.json(
      { error: `A post with slug "${body.slug}" already exists.` },
      { status: 409 },
    );
  }

  savePost(body);
  return NextResponse.json(body);
}

export async function DELETE(_request: NextRequest, { params }: Ctx) {
  const blocked = cmsDisabledError();
  if (blocked) return NextResponse.json(blocked, { status: 403 });

  const { id } = await params;
  const ok = deletePost(id);
  if (!ok)
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  return NextResponse.json({ deleted: id });
}
