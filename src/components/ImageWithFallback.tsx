/**
 * A wrapper around Next.js's <Image> component that provides
 * fallback image functionality in case the original image fails to load.
 *
 * @param {string} src - The primary image source.
 * @param {string} alt - Alternative text for the image.
 * @param {string} fallbackSrc - URL of the fallback image to display on error.
 * @param {ImageProps} props - Additional props passed to the Next.js <Image> component.
 *
 * @returns A Next.js <Image> element that switches to a fallback image on load error.
 */

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

type Props = ImageProps & {
  fallbackSrc: string;
};

export default function ImageWithFallback({
  src,
  alt = "",
  fallbackSrc,
  ...props
}: Props) {
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(false);
  }, [src]);
  return (
    <Image
      alt={alt}
      onError={() => setError(true)}
      src={error ? fallbackSrc : src}
      {...props}
    />
  );
}
