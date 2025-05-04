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
