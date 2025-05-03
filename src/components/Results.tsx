import { Event } from "@/types";
import Link from "next/link";
import EventCard from "./EventCard";

export default function Results({ data }: { data: Event[] }) {
  return (
    <div className="grid grid-cols-12 mt-12 gap-5 ">
      {data.map((item) => (
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
