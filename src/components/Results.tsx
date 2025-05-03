import { Event } from "@/types";
import Link from "next/link";
import EventCard from "./EventCard";
import { useRouter } from "next/router";
import dayjs from "dayjs";

export default function Results({ data }: { data: Event[] }) {
  const router = useRouter();

  const { from, to } = router.query;

  const filterData =
    from && to
      ? data.filter(
          (event) =>
            dayjs(event.starts_at).isAfter(dayjs(from as string)) &&
            dayjs(event.expires_at).isBefore(dayjs(to as string))
        )
      : data;

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
