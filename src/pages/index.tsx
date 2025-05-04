/**
 * Home Page
 *
 * This is the main page of the application that displays a list of events based on various filters such as:
 * - Event title
 * - Event location
 * - Event type
 * - Date range (if provided in URL)
 *
 * The page consists of two main sections:
 * 1. `Filters`: Provides UI to filter events based on different criteria.
 * 2. `Results`: Displays the filtered list of events fetched from the API.
 *
 * @returns {JSX.Element} The Home page JSX containing the Filters and Results components
 */

import Filters from "@/components/Filters";
import InfoView from "@/components/InfoView";
import Results from "@/components/Results";
import { Event } from "@/types";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function Home() {
  const router = useRouter();
  const {
    title = "",
    location = "",
    type = "",
    from = "",
    to = "",
  } = router.query;
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!router.isReady) return;
      setIsLoading(true);
      setError(null); // Clear previous errors before starting new fetch

      try {
        let query = `https://68148b33225ff1af16292eee.mockapi.io/api/v1/events/?`;
        if (title) query += `title=${title}&`;
        if (location && location !== "all") query += `location=${location}&`;
        if (type && type !== "all") query += `type=${type}&`;

        const res = await fetch(query);

        if (!res.ok) {
          if (res.status === 404) {
            setEvents([]); // Handle 404 by setting empty list
            return;
          }
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(errorMessage); // Only set for non-404 errors
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [title, location, type, from, to, router.isReady]);

  return (
    <div
      className={`${poppins.className} min-h-screen font-[family-name:var(--font-poppins)]`}
    >
      <main className="space-y-6 py-6">
        <Filters />
        {isLoading ? (
          <InfoView title="Loading..." />
        ) : error ? (
          <InfoView title="Error" subtitle={error} />
        ) : (
          <Results data={events} />
        )}
      </main>
    </div>
  );
}
