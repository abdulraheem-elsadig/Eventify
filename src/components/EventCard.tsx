import { Event } from "@/types";
import { Card } from "./ui/card";
import dayjs from "dayjs";
import ImageWithFallback from "./ImageWithFallback";
import { MapPinCheckIcon, MapPinIcon } from "lucide-react";

export default function EventCard({ data }: { data: Event }) {
  const upcomingEvent = dayjs().isBefore(data.starts_at);
  const activeEvent =
    dayjs().isAfter(data.starts_at) && dayjs().isBefore(data.expires_at);
  const expiredEvent = dayjs().isAfter(data.expires_at);

  return (
    <Card className="p-3 mb-3 rounded-2xl border-hidden bg-white h-full">
      <div className="relative aspect-video rounded-[8px] overflow-hidden">
        <span className="rounded-full absolute top-3 start-3 z-10 bg-white px-2 py-1 shadow-lg text-[12px]">
          {data.type}
        </span>

        <div className="rounded-full absolute top-3 end-3 z-10 bg-white px-2 py-[4px] flex items-center gap-1 shadow-lg">
          <span className="text-[12px]">
            {activeEvent ? "Active" : upcomingEvent ? "Upcoming" : "Expired"}
          </span>
          <div className="relative flex size-3">
            {/* Blink Effect For Active Events */}
            {activeEvent && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            )}
            <span
              className={`relative inline-flex size-3 rounded-full ${
                activeEvent
                  ? "bg-green-500"
                  : upcomingEvent
                  ? "bg-yellow-400"
                  : "bg-gray-500"
              }`}
            />
          </div>
        </div>
        <ImageWithFallback
          src={data.image_url}
          fallbackSrc="/images/empty-image.png"
          fill
          alt={data.title}
          className="object-cover"
        />
      </div>
      <div className="">
        <span className="text-sm text-primary-gray">{`${dayjs(
          data.starts_at
        ).format("MMM DD, YYYY")} - ${dayjs(data.expires_at).format(
          "MMM DD, YYYY"
        )}`}</span>
        <h1 className="text-lg font-medium">{data.title}</h1>
        <span className="text-sm text-primary-gray flex items-center gap-1">
          <MapPinIcon className="size-4" />
          {data.location}
        </span>
      </div>
    </Card>
  );
}
