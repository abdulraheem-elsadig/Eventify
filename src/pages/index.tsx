import { Poppins } from "next/font/google";

// Add Poppins font
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function Home() {
  return (
    <div
      className={`${poppins.className} min-h-screen font-[family-name:var(--font-poppins)]`}
    >
      <main className="container space-y-6 py-6">
        {/* Filters */}

        {/* Results */}
      </main>
    </div>
  );
}
