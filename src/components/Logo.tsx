/**
 * Logo component for the application.
 *
 * Renders the application name "Eventify" alongside a favicon image.
 * Acts as a clickable link that navigates users back to the home page ("/").
 */

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <div className="relative flex items-center justify-center h-14 w-fit gap-1">
        <span className="font-bold text-3xl tracking-tighter">Eventify</span>
        <div className="relative size-8 overflow-hidden">
          <Image
            src="/favicon/favicon.ico"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </Link>
  );
}
