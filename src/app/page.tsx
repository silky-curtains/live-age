"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";

function calculateAge(birthDate: Date | undefined) {
  if (!birthDate) {
    return -1;
  }

  const today = new Date();
  const dob = new Date(birthDate);
  const ageMilliseconds = today.getTime() - dob.getTime();
  const ageYears = ageMilliseconds / (1000 * 60 * 60 * 24 * 365.25); // Consider leap years
  return ageYears.toFixed(9); 
}

const Home = () => {
  console.log("page.tsx");
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [hasBegun, setHasBegun] = useState<boolean>(false);
  const [age, setAge] = useState(calculateAge(date));

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(calculateAge(date));
    }, 10);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <>
      {!hasBegun && <div className="mb-12 text-lg">Watch Yourself Age!</div>}
      <div className="flex flex-col">
        {!hasBegun && (
          <>
            <div className="flex items-start">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="mt-4">
              <Button
                className="w-full"
                disabled={date ? false : true}
                onClick={() => {
                  setHasBegun(true);
                }}
              >
                Begin
              </Button>
            </div>
          </>
        )}
        {hasBegun && (
          <div className="text-center">
            <div className="text-4xl">{age}</div>
            <div className="mt-4 text-lg">Years</div>
            <Button
              className="mt-8 w-full"
              variant="outline"
              onClick={() => {
                setHasBegun(false);
              }}
            >
              Go Back
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
