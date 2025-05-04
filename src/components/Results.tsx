/**
 * Results Component
 *
 * Displays a grid of event cards based on provided `data`.
 * Optionally filters events by a date range specified in the URL query (`from` and `to`).
 * If no events match the filters, it shows a fallback "No Results Found" message with an image.
 *
 * @param {Object} props
 * @param {Event[]} props.data - Array of event objects to display
 */

import { Event } from "@/types";
import Link from "next/link";
import EventCard from "./EventCard";
import dayjs from "dayjs";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function Results({ data }: { data: Event[] }) {
  const searchParams = useSearchParams();

  const from = searchParams?.get("from") || "";
  const to = searchParams?.get("to") || "";

  const filterData =
    from && to
      ? data.filter(
          (event) =>
            dayjs(event.starts_at).isAfter(dayjs(from as string)) &&
            dayjs(event.expires_at).isBefore(dayjs(to as string))
        )
      : data;

  if (filterData.length === 0) {
    return (
      <div className="flex flex-col w-full justify-center items-center h-[50vh] text-center">
        <div className="relative size-40 mb-6">
          <Image
            src="/images/empty.png"
            fill
            alt="empty box"
            className="object-contain"
          />
        </div>

        <h3 className="font-bold text-xl mb-2">No Results Found</h3>
        <p>Try adjusting your search to find what you’re looking for</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 mt-12 gap-5 ">
      {filterData.map((item) => (
        <Link
          href={`/events/${item.id}`}
          key={item.id}
          className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
        >
          <EventCard data={item} />
        </Link>
      ))}
    </div>
  );
}
