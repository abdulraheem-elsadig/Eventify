import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="w-full h-[calc(100vh-60px)] flex flex-col items-center justify-center text-center">
      <div className="relative aspect-video w-1/2 max-w-100">
        <Image
          src="/images/not-found.png"
          alt="404 illustration"
          fill
          className="object-contain"
        />
      </div>
      <h1 className="font-bold text-xl mb-2">Page Not Found</h1>
      <p>Try adjusting your search to find what you’re looking for</p>

      <Link
        href="/"
        className="h-10 bg-primary text-white flex text-center items-center justify-center px-3 rounded-[8px] mt-7"
      >
        Back to home
      </Link>
    </div>
  );
}
