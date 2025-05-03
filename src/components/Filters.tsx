import { Input } from "./ui/input";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { debounce } from "@/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function Filters() {
  const router = useRouter();

  const [title, setTitle] = useState(
    () => (router.query.title as string) || ""
  );
  const [location, setLocation] = useState<string>(() =>
    typeof router.query.location === "string" ? router.query.location : "all"
  );

  const [type, setType] = useState<string>(() =>
    typeof router.query.type === "string" ? router.query.type : "all"
  );

  const debouncedSearch = useRef(
    debounce((value: string) => {
      const query = { ...router.query };
      if (value.trim()) query.title = value;
      else delete query.q;
      router.push({ pathname: router.pathname, query }, undefined, {
        shallow: true,
      });
    }, 500)
  ).current;

  useEffect(() => {
    debouncedSearch(title);
    return () => debouncedSearch.cancel?.();
  }, [title]);

  useEffect(() => {
    const query: any = { ...router.query };

    // location
    if (location && location !== "all") query.location = location;
    else delete query.location;

    // type
    if (type && type !== "all") query.type = type;
    else delete query.type;

    router.push({ pathname: router.pathname, query }, undefined, {
      shallow: true,
    });
  }, [location, type]);

  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:justify-between">
      <Input
        placeholder="Search Events"
        className="w-full xl:max-w-[400px] bg-white"
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex gap-3 flex-wrap">
        {/* Type Select */}
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {eventTypeList.map((item, index) => (
              <SelectItem value={item} key={index}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Location Select */}
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Location</SelectItem>
            {eventLocationsList.map((item, index) => (
              <SelectItem value={item} key={index}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

const eventLocationsList = [
  "San Francisco",
  "New York",
  "Berlin",
  "Singapore",
  "Dubai",
  "Vienna",
  "London",
  "Tokyo",
  "Sydney",
  "Paris",
  "Seoul",
  "Geneva",
  "New Orleans",
  "Rome",
  "Houston",
  "Rishikesh",
  "Hong Kong",
  "Copenhagen",
  "Los Angeles",
  "Melbourne",
  "Toronto",
  "Cannes",
  "Amsterdam",
  "Nairobi",
  "Stockholm",
  "Prague",
  "Brussels",
  "Istanbul",
  "Chicago",
  "Zurich",
  "Bordeaux",
  "Helsinki",
  "Venice",
  "Bangalore",
  "Montreal",
  "Las Vegas",
  "Boston",
  "Bangkok",
];

const eventTypeList = [
  "Conference",
  "Exhibition",
  "Seminar",
  "Festival",
  "Expo",
  "Concert",
  "Competition",
  "Workshop",
  "Show",
  "Forum",
  "Parade",
  "Wellness",
  "Summit",
  "Sports",
  "Tasting",
  "Symposium",
  "Food Festival",
];
