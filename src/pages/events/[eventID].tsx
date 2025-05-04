import Counter from "@/components/Counter";
import { Event } from "@/types";
import { MapPinIcon } from "lucide-react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";

type PageProps = {
  event: Event;
};

export default function EventPage({ event }: PageProps) {
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
        <div className="relative aspect-video mt-6 mb-8 rounded-[12px] overflow-hidden">
          <Image src={event.image_url} alt={event.title} fill />
          <span className="rounded-full absolute bottom-3 start-3 z-10 bg-white px-2 py-1 shadow-lg text-sm">
            {event.type}
          </span>
        </div>
        <div className="flex flex-col gap-5">
          <div className="">
            <div className="flex items-center gap-1 mb-2">
              <MapPinIcon className="size-4" />
              <span>{event.location}</span>
            </div>
            <h1 className="text-2xl font-bold">{event.title}</h1>
          </div>
          {/* Counter */}
          <Counter startAt={event.starts_at} expiresAt={event.expires_at} />
        </div>
        <p className="mt-10">{event.description}</p>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    "https://68148b33225ff1af16292eee.mockapi.io/api/v1/events"
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
    `https://68148b33225ff1af16292eee.mockapi.io/api/v1/events/?id=${id}`
  );
  const data: Event[] = await res.json();

  // Filter to the exact match
  const event = data.find((event) => event.id === Number(id));

  if (!event) {
    return { notFound: true };
  }

  return {
    props: { event },
  };
};
