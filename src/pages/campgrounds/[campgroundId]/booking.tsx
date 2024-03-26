// pages/bookings/add.tsx
import { useRouter } from "next/router";
import { useState } from "react";
import {
  eachDayOfInterval,
  format,
  isBefore,
  isEqual,
  isSameDay,
} from "date-fns";
import { api } from "~/utils/api";
import { string } from "zod";

const AddBookingPage = () => {
  const router = useRouter();
  const { campgroundId } = router.query;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: bookCampground } = api.user.bookCampground.useMutation({
    onSuccess: () => {
      setIsLoading(false);
      router.push("/your-bookings");
    },
  });

  const { data: availableDates } = api.user.getAvailableDates.useQuery({
    campgroundId: campgroundId as string,
    startDate: new Date(startDate),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    bookCampground({
      campgroundId: campgroundId as string,
      start: new Date(startDate),
      end: new Date(endDate),
    });
  };

  const isDateRangeAvailable = (startDate: Date, endDate: Date) => {
    if (!availableDates) return true;
    const selectedDates = eachDayOfInterval({ start: startDate, end: endDate });
    return selectedDates.every((date) =>
      availableDates.availableDates.some((availableDate) =>
        isSameDay(new Date(availableDate), date),
      ),
    );
  };

  const isSelectedRangeAvailable = isDateRangeAvailable(
    new Date(startDate),
    new Date(endDate),
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add Booking
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="startDate" className="sr-only">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate.toISOString().split("T")[0]}
                onChange={(e) => {
                  setStartDate(new Date(e.target.value));
                }}
                required
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="sr-only">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                min={startDate.toISOString().split("T")[0]}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading || !isSelectedRangeAvailable}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isLoading ? "Booking..." : "Book Campground"}
            </button>
          </div>
        </form>
        {!isSelectedRangeAvailable && (
          <p className="mt-4 text-center text-sm text-red-500">
            Selected date range is not available
          </p>
        )}
      </div>
    </div>
  );
};

export default AddBookingPage;
