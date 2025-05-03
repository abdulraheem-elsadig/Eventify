import { Input } from "./ui/input";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { debounce } from "@/lib/utils";

export default function Filters() {
  const router = useRouter();
  const { title, location, type } = router.query;
  const [searchValue, setSearchValue] = useState((title as string) || "");

  // Function to update url params
  const updateParam = (
    paramName: "location" | "type" | "title",
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

  // Debounced update of the title query parameter after delay
  const debouncedUpdateQuery = useCallback(
    debounce((value: string) => {
      updateParam("title", value);
    }, 500),
    [router]
  );

  // Update the sate and the url
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedUpdateQuery(value);
  };

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
