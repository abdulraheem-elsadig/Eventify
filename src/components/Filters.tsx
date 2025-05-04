/**
 * Filters component for searching and filtering events based on:
 * - Text search (title)
 * - Event type
 * - Location
 * - Date range
 *
 * Filters are synced with the URL query parameters to allow deep linking and state persistence.
 */

import { Input } from "./ui/input";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { debounce } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { DateRange } from "react-day-picker";

export default function Filters() {
  const router = useRouter();
  const { title, location, type, from, to } = router.query;
  const [searchValue, setSearchValue] = useState((title as string) || "");
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  // String to display in the calendar button
  const formattedDateRange =
    date?.from && date?.to
      ? `${dayjs(date.from).format("MMM D, YYYY")} - ${dayjs(date.to).format(
          "MMM D, YYYY"
        )}`
      : date?.from
      ? `${dayjs(date.from).format("MMM D, YYYY")} - ...`
      : "All Dates";

  // Function to update url params
  const updateParam = (
    paramName: "location" | "type" | "title" | "from" | "to",
    value: string
  ) => {
    const currentQuery = { ...router.query };
    currentQuery[paramName] = value;
    if (!value || value === "all") delete currentQuery[paramName];
    router.push(
      {
        pathname: router.pathname,
        query: currentQuery,
      },
      undefined,
      { shallow: true }
    );
  };

  // Debounced to update search after delay
  const debouncedUpdateQuery = useCallback(
    debounce((value: string) => {
      updateParam("title", value);
    }, 500),
    [router]
  );

  // Update search on change (state & params)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedUpdateQuery(value);
  };

  // Update the date params (from & to) in url
  const handleUpdateDate = () => {
    if (!date?.from || !date?.to) return;
    const currentQuery = { ...router.query };
    currentQuery.from = date.from.toISOString();
    currentQuery.to = date.to.toISOString();

    router.push(
      {
        pathname: router.pathname,
        query: currentQuery,
      },
      undefined,
      { shallow: true }
    );
  };

  const handleClearDate = () => {
    // Reset the date state
    setDate(undefined);

    // Remove date parameters from URL
    const currentQuery = { ...router.query };
    delete currentQuery.from;
    delete currentQuery.to;

    router.push(
      {
        pathname: router.pathname,
        query: currentQuery,
      },
      undefined,
      { shallow: true }
    );
  };

  // Set the initial state for date from url
  useEffect(() => {
    if (from && to) {
      setDate({ from: new Date(from as string), to: new Date(to as string) });
    }
  }, [from, to]);

  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:justify-between">
      {/* Search Input */}
      <Input
        placeholder="Search Events"
        className="w-full xl:max-w-[400px] bg-white"
        value={searchValue || title}
        onChange={handleSearchChange}
      />
      <div className="flex gap-3 flex-wrap">
        {/* Type Select */}
        <Select
          value={(type as string) || "all"}
          onValueChange={(value) => updateParam("type", value)}
        >
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
        <Select
          value={(location as string) || "all"}
          onValueChange={(value) => updateParam("location", value)}
        >
          <SelectTrigger className="bg-white">
            <MapPinIcon className="mr-2 h-4 w-4" />
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

        {/* Date Select */}
        <Popover>
          <PopoverTrigger asChild className="bg-white">
            <Button
              variant="outline"
              className="w-[300px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formattedDateRange}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4 flex flex-col items-end space-y-2">
            <Calendar
              mode="range"
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />

            <div className="flex gap-2">
              <Button onClick={handleUpdateDate} size="sm">
                Search
              </Button>
              <Button onClick={handleClearDate} size="sm" variant="outline">
                clear
              </Button>
            </div>
          </PopoverContent>
        </Popover>
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
