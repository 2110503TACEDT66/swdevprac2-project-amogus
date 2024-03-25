import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
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
        where: { id: ctx.session.user.id },
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
        where: { createdById: ctx.session.user.id },
      });
      if (bookings.length >= 3) {
        throw new Error("You can't book more than 3 campgrounds");
      }

      const booking = await ctx.db.booking.create({
        data: {
          createdById: ctx.session.user.id,
          campgroundId: input.campgroundId,
          startDate: input.start,
          endDate: input.end,
        },
      });
      return { booking };
    }),

  getCurrentUserBookings: protectedProcedure.query(async ({ ctx }) => {
    const bookings = await ctx.db.booking.findMany({
      where: { createdById: ctx.session.user.id },
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
    return { campgrounds };
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
      return { campground };
    }),
});
