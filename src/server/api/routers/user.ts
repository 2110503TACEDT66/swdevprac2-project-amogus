import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { addDays, isWithinInterval, startOfDay } from "date-fns";
import { hash } from "bcrypt-ts";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        name: z.string(),
        tel: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hashPassword = await hash(input.password, 10);
      const user = await ctx.db.user.create({
        data: {
          email: input.email,
          password: hashPassword,
          name: input.name,
          tel: input.tel,
        },
      });
      return { user };
    }),

  getCurrentUser: protectedProcedure
    .input(z.object({}))
    .query(async ({ ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: { email: ctx.session.user.email! },
      });
      return { user };
    }),

  updateCurrentUser: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        tel: z.string().optional(),
        image: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.update({
        where: { email: ctx.session.user.email! },
        data: input,
      });
      return { user };
    }),

  bookCampground: protectedProcedure
    .input(
      z.object({
        campgroundId: z.string(),
        start: z.date(),
        end: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // check if user is not already booked more than 3 campgrounds
      const bookings = await ctx.db.booking.findMany({
        where: { createdByEmail: ctx.session.user.email! },
      });
      if (bookings.length >= 3) {
        throw new Error("You can't book more than 3 campgrounds");
      }

      const booking = await ctx.db.booking.create({
        data: {
          createdByEmail: ctx.session.user.email!,
          campgroundId: input.campgroundId,
          startDate: input.start,
          endDate: input.end,
        },
      });
      return { booking };
    }),

  getCurrentUserBookings: protectedProcedure.query(async ({ ctx }) => {
    const bookings = await ctx.db.booking.findMany({
      where: { createdByEmail: ctx.session.user.email! },
      include: {
        campground: true,
      },
    });
    return { bookings };
  }),

  cancelBooking: protectedProcedure
    .input(
      z.object({
        bookingId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const booking = await ctx.db.booking.delete({
        where: { id: input.bookingId },
        include: {
          campground: true,
        },
      });
      return { booking };
    }),

  updateBooking: protectedProcedure
    .input(
      z.object({
        bookingId: z.string(),
        start: z.date().optional(),
        end: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const booking = await ctx.db.booking.update({
        where: { id: input.bookingId },
        data: {
          startDate: input.start,
          endDate: input.end,
        },
      });
      return { booking };
    }),

  getAllCampgrounds: publicProcedure.query(async ({ ctx }) => {
    const campgrounds = await ctx.db.campground.findMany();
    return campgrounds;
  }),

  getOneCampground: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const campground = await ctx.db.campground.findUnique({
        where: { id: input.id },
      });
      return campground;
    }),

  getAvailableDates: publicProcedure
    .input(
      z.object({
        campgroundId: z.string(),
        startDate: z.coerce.date(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { campgroundId, startDate } = input;
      const endDate = addDays(startDate, 7);

      const bookings = await ctx.db.booking.findMany({
        where: {
          campgroundId,
          OR: [
            {
              startDate: {
                gte: startDate,
                lt: endDate,
              },
            },
            {
              endDate: {
                gt: startDate,
                lte: endDate,
              },
            },
          ],
        },
      });

      const availableDates: Date[] = [];
      let currentDate = startOfDay(startDate);

      while (currentDate < endDate) {
        const isBooked = bookings.some((booking) =>
          isWithinInterval(currentDate, {
            start: booking.startDate,
            end: booking.endDate,
          }),
        );

        if (!isBooked) {
          availableDates.push(currentDate);
        }

        currentDate = addDays(currentDate, 1);
      }

      return { availableDates };
    }),
});
