import Image from "next/image";
import { Button } from "./ui/button";

type Props = {
  src?: string;
  title?: string;
  subtitle?: string;
  action?: () => void;
  actionTitle?: string;
  alt?: string;
};

export default function InfoView({
  src,
  alt,
  title,
  subtitle,
  action,
  actionTitle,
}: Props) {
  return (
    <div className="flex flex-col w-full justify-center items-center h-[50vh] text-center">
      <div className="relative size-40 mb-6">
        {src && alt && (
          <Image src={src} fill alt={alt} className="object-contain" />
        )}
      </div>

      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-primary-gray">{subtitle}</p>
      {action && actionTitle && <Button onClick={action}>{actionTitle}</Button>}
    </div>
  );
}
