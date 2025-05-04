/**
 * A countdown timer component that displays the time remaining
 * until a given start time and expiration time.
 *
 * It shows:
 * - "Starting in" if the current time is before the `startAt` timestamp.
 * - "Ending in" if the current time is between `startAt` and `expiresAt`.
 * - "Expired" if the current time is after `expiresAt`.
 *
 * @param {string} startAt - ISO string indicating when the event starts.
 * @param {string} expiresAt - ISO string indicating when the event ends.
 *
 * @returns A visual countdown showing days, hours, and minutes.
 */

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ClockIcon } from "lucide-react";

export default function Counter({
  startAt,
  expiresAt,
}: {
  startAt: string;
  expiresAt: string;
}) {
  const [status, setStatus] = useState("");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  const calculateTime = () => {
    const now = dayjs();
    const start = dayjs(startAt);
    const end = dayjs(expiresAt);

    if (now.isBefore(start)) {
      setStatus("Starting in");
      setTimeLeft(getTimeDiff(start.diff(now)));
    } else if (now.isBefore(end)) {
      setStatus("Ending in");
      setTimeLeft(getTimeDiff(end.diff(now)));
    } else {
      setStatus("Expired");
      setTimeLeft({ days: 0, hours: 0, minutes: 0 });
    }
  };

  const getTimeDiff = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return { days, hours, minutes };
  };

  useEffect(() => {
    calculateTime();
    const interval = setInterval(() => {
      calculateTime();
    }, 60000); // update ui every 1 min

    return () => clearInterval(interval);
  }, [startAt, expiresAt]);

  return (
    <div>
      <h3 className="flex items-center gap-1 text-primary-gray font-medium mb-3">
        <ClockIcon className="size-4" />
        {status}
      </h3>
      {status !== "Expired" && (
        <div className="flex items-center gap-3 w-full lg:w-[400px]">
          <TimeBox label="Days" value={timeLeft.days} />
          <TimeBox label="Hours" value={timeLeft.hours} />
          <TimeBox label="Minutes" value={timeLeft.minutes} />
        </div>
      )}
    </div>
  );
}

const TimeBox = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className="bg-white flex flex-col items-center w-full p-4 rounded-lg shadow-lg">
      <span className="font-bold text-xl">{value}</span>
      <span>{label}</span>
    </div>
  );
};
