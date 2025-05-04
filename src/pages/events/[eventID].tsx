/**
 * Event Page
 *
 * Displays detailed information about a single event, including:
 * - Title, location, type, image
 * - Countdown timer to start/end using a `Counter` component
 * - SEO meta tags for social sharing
 *
 * @param {Object} props
 * @param {Event} props.event - The event data to be displayed
 */

import Counter from "@/components/Counter";
import ImageWithFallback from "@/components/ImageWithFallback";
import { checkContentUpdate } from "@/lib/checkContentUpdate";
import { Event } from "@/types";
import { MapPinIcon } from "lucide-react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

type PageProps = {
  data: Event;
  id: string;
};

export default function EventPage({ data, id }: PageProps) {
  const [event, setEvent] = useState(data);

  useEffect(() => {
    checkContentUpdate({
      path: `/events/${id}`,
      id: id,
      originalData: event,
      onRevalidated: (newEvent) => {
        setEvent(newEvent);
      },
    });
  }, []);

  return (
    <>
      <Head>
        <title>{event.title} | Eventify</title>
        <meta name="description" content={event.description} />
        <meta property="og:title" content={event.title} />
        <meta property="og:description" content={event.description} />
        <meta property="og:image" content={event.image_url} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={event.title} />
        <meta name="twitter:description" content={event.title} />
        <meta name="twitter:image" content={event.image_url} />
      </Head>
      <main>
        <div className="relative aspect-video mt-6 mb-8 rounded-[12px] overflow-hidden w-full max-h-[400px] border">
          <ImageWithFallback
            src={event.image_url}
            alt={event.title}
            fill
            fallbackSrc="/images/empty-image.png"
            className="object-cover"
          />
          <span className="rounded-full absolute bottom-3 start-3 z-10 bg-white px-2 py-1 shadow-lg text-sm">
            {event.type}
          </span>
        </div>
        <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
          <div>
            <span className="text-primary-gray font-medium flex items-center gap-1 mb-2">
              <MapPinIcon className="size-4" />
              {event.location}
            </span>

            <h1 className="text-2xl font-bold">{event.title}</h1>
          </div>
          <Counter startAt={event.starts_at} expiresAt={event.expires_at} />
        </div>
        <p className="mt-10">{event.description}</p>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    "https://681743db26a599ae7c39cff0.mockapi.io/api/v1/events"
  );
  const data = await res.json();

  const paths = data.map((event: Event) => ({
    params: { eventID: event.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.eventID;
  const res = await fetch(
    `https://681743db26a599ae7c39cff0.mockapi.io/api/v1/events/?id=${id}`
  );
  const events: Event[] = await res.json();

  // Filter to the exact match
  const event = events.find((event) => Number(event.id) === Number(id));

  if (!event) {
    return { notFound: true };
  }

  return {
    props: { data: event, id },
  };
};
