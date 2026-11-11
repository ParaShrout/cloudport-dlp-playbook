"use client";

import * as React from "react";
import { ImageIcon, MaximizeIcon } from "lucide-react";
import type { Screenshot as ScreenshotType } from "@/content/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "cn";

/**
 * Renders a guide screenshot. If the image file is not in /public yet, shows a
 * labelled placeholder with the expected path so the slot is obvious to
 * whoever is adding the real images.
 */
export function Screenshot({ shot, className }: { shot: ScreenshotType; className?: string }) {
  const [missing, setMissing] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  // The error event can fire before hydration attaches onError, so re-check
  // the image state once mounted.
  React.useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setMissing(true);
    }
  }, []);

  if (missing) {
    return (
      <figure className={cn("overflow-hidden rounded-lg border border-dashed bg-muted/40", className)}>
        <div className="flex flex-col items-center justify-center gap-2 px-4 py-10 text-center text-muted-foreground">
          <ImageIcon className="size-6" />
          <p className="text-sm font-medium text-foreground">Screenshot slot</p>
          <p className="text-xs">{shot.alt}</p>
          <code className="mt-1 rounded bg-background px-2 py-1 text-[11px]">public{shot.src}</code>
        </div>
        {shot.caption ? (
          <figcaption className="border-t bg-background px-3 py-2 text-xs text-muted-foreground">{shot.caption}</figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <>
      <figure className={cn("overflow-hidden rounded-lg border bg-card", className)}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block w-full cursor-zoom-in"
          aria-label={`Enlarge screenshot: ${shot.alt}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={shot.src}
            alt={shot.alt}
            className="block w-full"
            onError={() => setMissing(true)}
          />
          <span className="absolute right-2 top-2 rounded-md bg-background/90 p-1.5 opacity-0 shadow transition-opacity group-hover:opacity-100">
            <MaximizeIcon className="size-3.5" />
          </span>
        </button>
        {shot.caption ? (
          <figcaption className="border-t px-3 py-2 text-xs text-muted-foreground">{shot.caption}</figcaption>
        ) : null}
      </figure>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[min(96vw,1400px)] p-2 sm:max-w-[min(96vw,1400px)]">
          <DialogHeader className="sr-only">
            <DialogTitle>{shot.alt}</DialogTitle>
            <DialogDescription>{shot.caption ?? "Screenshot"}</DialogDescription>
          </DialogHeader>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shot.src} alt={shot.alt} className="max-h-[85vh] w-full rounded object-contain" />
        </DialogContent>
      </Dialog>
    </>
  );
}
