import { api } from "~/utils/api";
import { format } from "date-fns";
import { Prisma, type Booking } from "@prisma/client";
import { useSession } from "next-auth/react";
import React from "react";

const BookingCard: React.FC<{ booking: Booking; campgroundname: string }> = ({
  booking,
  campgroundname,
}) => {
  const deleteBooking = api.user.cancelBooking.useMutation();
  return (
    <div className="mb-4 rounded-lg bg-white p-6  shadow-md">
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
        <button
          className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          onClick={() =>
            deleteBooking.mutate(
              { bookingId: booking.id },
              {
                onSuccess: () => {
                  window.location.reload();
                },
              },
            )
          }
        >
          Cancel Booking
        </button>
      </div>
    </div>
  );
};

const AdminBookingsPage: React.FC = () => {
  const { data: allBookings, isLoading } = api.admin.getAllBookings.useQuery();

  return (
    <div className="container mx-auto px-12 pt-24">
      <h1 className="mb-8 text-3xl font-bold">All Bookings</h1>
      {!allBookings || allBookings.length === 0 ? (
        <p>There are no bookings.</p>
      ) : (
        allBookings.map((booking) => (
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

type BookingProps = Prisma.BookingGetPayload<{
  include: { campground: true };
}>;

const UserBookingsPage: React.FC = () => {
  const { data: session } = useSession();

  const { data: userBookings, isLoading } =
    api.user.getCurrentUserBookings.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-12 pt-24">
      <h1 className="mb-8 text-3xl font-bold">Your Bookings</h1>
      {!userBookings || userBookings.length === 0 ? (
        <p>You have no bookings.</p>
      ) : (
        userBookings.map((booking) => (
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

const BookingsPage: React.FC = () => {
  const { data: session } = useSession();
  const { data: user } = api.user.getCurrentUser.useQuery({});

  if (user?.user?.role == "ADMIN") {
    return (
      <div>
        <AdminBookingsPage />
      </div>
    );
  }

  return (
    <div>
      <UserBookingsPage />
    </div>
  );
};

export default BookingsPage;
