/**
 * Filters component for searching and filtering events based on:
 * - Text search (title)
 * - Event type (category)
 * - Location
 * - Date range
 *
 * Filters are synced with the URL query parameters to allow deep linking and state persistence.
 */

import { Input } from "./ui/input";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { DateRange } from "react-day-picker";
import { useDebounce } from "@/hooks/useDebounce";
import { usePathname, useSearchParams } from "next/navigation";

export default function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get init value from url params
  const title = searchParams?.get("title") || "";
  const location = searchParams?.get("location") || "all";
  const type = searchParams?.get("type") || "all";
  const from = searchParams?.get("from");
  const to = searchParams?.get("to");

  const [searchValue, setSearchValue] = useState(title);
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Use debounced search term to track the actual value being used in URL updates
  const debouncedSearchTerm = useDebounce<string>(searchValue, 500);

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
    // Create URLSearchParams from current search parameters
    const params = new URLSearchParams(searchParams?.toString());

    // Update or remove the parameter
    if (!value || value === "all") {
      params.delete(paramName);
    } else {
      params.set(paramName, value);
    }

    // Create the new URL string
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    // Use router.replace to avoid adding to history stack
    router.replace(newUrl, undefined, { shallow: true });
  };

  // Update search on change (state only) and effect will handle url updates
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  // Update the date params (from & to) in url
  const handleUpdateDate = () => {
    if (!date?.from || !date?.to) return;

    // Create URLSearchParams from current search parameters
    const params = new URLSearchParams(searchParams?.toString());
    params.set("from", date.from.toISOString());
    params.set("to", date.to.toISOString());

    // Create the new URL
    const queryString = params.toString();
    const newUrl = `${pathname}?${queryString}`;

    // Replace route to avoid adding to history stack
    router.replace(newUrl, undefined, { shallow: true });
    setIsCalendarOpen(false);
  };

  const handleClearDate = () => {
    // Reset the date state
    setDate(undefined);

    // Create URLSearchParams from current search parameters
    const params = new URLSearchParams(searchParams?.toString());
    params.delete("from");
    params.delete("to");

    // Create the new URL
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    // Replace route to avoid adding to history stack
    router.replace(newUrl, undefined, { shallow: true });
    setIsCalendarOpen(false);
  };

  // Effect to update URL when debounced search term changes
  useEffect(() => {
    // Only update if the value has actually changed
    if (debouncedSearchTerm !== title) {
      updateParam("title", debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  // Sync initial state for date from url params
  useEffect(() => {
    if (from && to) {
      setDate({ from: new Date(from), to: new Date(to) });
    } else if (!from && !to && date) {
      // Clear date state if URL params were removed
      setDate(undefined);
    }
  }, [from, to]);

  // Sync the initial state for searchValue form url
  useEffect(() => {
    if (searchValue !== title) {
      setSearchValue(title);
    }
  }, [title]);

  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:justify-between">
      {/* Search Input */}
      <Input
        placeholder="Search Events"
        className="w-full xl:max-w-[400px] bg-white"
        value={searchValue}
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
            <SelectItem value="all">All Categories</SelectItem>
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
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
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
