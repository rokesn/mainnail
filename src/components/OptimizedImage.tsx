import React from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

const getKwcdnUrl = (url: string, w: number, q: number = 75) =>
  `${url}?imageView2/2/w/${w}/q/${q}/format/webp`;

const getKwcdnSrcSet = (url: string): string =>
  [
    `${getKwcdnUrl(url, 400, 70)} 400w`,
    `${getKwcdnUrl(url, 800, 75)} 800w`,
    `${getKwcdnUrl(url, 1200, 80)} 1200w`,
  ].join(", ");

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  ...props
}: OptimizedImageProps) => {
  const isKwcdn = src && src.includes("img.kwcdn.com") && !src.includes("?");

  const optimizedSrc = isKwcdn
    ? getKwcdnUrl(src, width || (priority ? 800 : 400), priority ? 80 : 70)
    : src;

  const srcSet = isKwcdn ? getKwcdnSrcSet(src) : undefined;

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet}
      sizes={srcSet ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={cn("transition-opacity duration-300", className)}
      {...props}
    />
  );
};

export default OptimizedImage;
