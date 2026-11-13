/* eslint-disable @next/next/no-img-element */
import { cn } from "cn";

const src = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/cbs-news-logo.png`;

/**
 * The approved CBS News wordmark (navy). Pass `onDark` to render it white on
 * navy surfaces; the image file itself is never altered.
 */
export function CbsNewsLogo({
  onDark = false,
  className,
}: {
  onDark?: boolean;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt="CBS News"
      width={1533}
      height={206}
      className={cn("h-5 w-auto", onDark ? "logo-on-dark" : "", className)}
    />
  );
}
