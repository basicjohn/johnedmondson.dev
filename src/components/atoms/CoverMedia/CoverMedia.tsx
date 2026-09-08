"use client";

import { useEffect, useState } from "react";
import { imageAttrs } from "@/lib/images";

type Props = {
  cover: string;
  /** Muted, looping MP4; the cover is its poster */
  video?: string;
  alt: string;
  sizes: string;
  className?: string;
  loading?: "lazy" | "eager";
};

/**
 * A project's cover: the still image, or — for the projects that move, and
 * only for visitors who have not asked for reduced motion — a short silent
 * loop with the still as its poster. Server-rendered as the image, so the
 * first paint and every crawler see the still; the video swaps in on the
 * client once the motion preference is known.
 */
export default function CoverMedia({
  cover,
  video,
  alt,
  sizes,
  className,
  loading = "lazy",
}: Props) {
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    if (!video) return;
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setMotionOk(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [video]);

  if (video && motionOk) {
    return (
      <video
        className={className}
        src={video}
        poster={cover}
        autoPlay
        muted
        loop
        playsInline
        aria-label={alt}
      />
    );
  }

  const attrs = imageAttrs(cover, sizes);
  return <img className={className} alt={alt} loading={loading} {...attrs} />;
}
