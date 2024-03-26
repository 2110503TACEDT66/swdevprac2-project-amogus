import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { format } from "date-fns";
import { type Booking } from "@prisma/client";

const BookingCard: React.FC<{ booking: Booking; campgroundname: string }> = ({
  booking,
  campgroundname,
}) => {
  return (
    <div className="mb-4 rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{campgroundname}</h2>
      </div>
      <div className="mb-4 text-gray-600">
        <p>
          <span className="font-semibold">Check-in:</span>{" "}
          {format(booking.startDate, "MMM d, yyyy")}
        </p>
        <p>
          <span className="font-semibold">Check-out:</span>{" "}
          {format(booking.endDate, "MMM d, yyyy")}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <button className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700">
          Cancel Booking
        </button>
      </div>
    </div>
  );
};

const UserBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const { data: userBookings, isLoading } =
    api.user.getCurrentUserBookings.useQuery();

  useEffect(() => {
    if (userBookings) {
      setBookings(userBookings.bookings);
    }
  }, [userBookings]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Your Bookings</h1>
      {bookings.length === 0 ? (
        <p>You have no bookings.</p>
      ) : (
        bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            campgroundname={booking.campground.name}
          />
        ))
      )}
    </div>
  );
};

export default UserBookingsPage;
