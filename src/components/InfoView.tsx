/**
 * InfoView Component
 *
 * A centered informational UI component that optionally displays an image,
 * title, subtitle, and an action button.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.src] - Optional source URL for the image.
 * @param {string} [props.alt] - Alternative text for the image.
 * @param {string} [props.title] - Title text displayed prominently.
 * @param {string} [props.subtitle] - Subtitle or description text.
 * @param {() => void} [props.action] - Optional click handler for the button.
 * @param {string} [props.actionTitle] - Text to display on the action button.
 *
 * @returns {JSX.Element} Rendered InfoView component.
 */

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
