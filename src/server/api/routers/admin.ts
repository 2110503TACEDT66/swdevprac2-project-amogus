import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const adminRouter = createTRPCRouter({
  // Get all users
  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany();
    return { users };
  }),

  // Get a specific user by ID
  getUserById: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.userId },
      });
      return { user };
    }),

  // Create a new campground
  createCampground: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        location: z.string(),
        image: z.string(),
        description: z.string(),
        price: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const campground = await ctx.db.campground.create({
        data: {
          name: input.name,
          location: input.location,
          image: input.image,
          description: input.description,
          price: input.price,
        },
      });
      return { campground };
    }),

  // Get all campgrounds
  getAllCampgrounds: protectedProcedure.query(async ({ ctx }) => {
    const campgrounds = await ctx.db.campground.findMany();
    return { campgrounds };
  }),

  getCampgroundById: protectedProcedure
    .input(
      z.object({
        campgroundId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const campground = await ctx.db.campground.findUnique({
        where: { id: input.campgroundId },
      });
      return { campground };
    }),

  // Update a campground
  updateCampground: protectedProcedure
    .input(
      z.object({
        campgroundId: z.string(),
        name: z.string().optional(),
        location: z.string().optional(),
        image: z.string().optional(),
        description: z.string().optional(),
        price: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const campground = await ctx.db.campground.update({
        where: { id: input.campgroundId },
        data: input,
      });
      return { campground };
    }),

  // Delete a campground
  deleteCampground: protectedProcedure
    .input(
      z.object({
        campgroundId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const campground = await ctx.db.campground.delete({
        where: { id: input.campgroundId },
      });
      return { campground };
    }),

  // Create a new booking
  createBooking: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        campgroundId: z.string(),
        startDate: z.date(),
        endDate: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const booking = await ctx.db.booking.create({
        data: {
          startDate: input.startDate,
          endDate: input.endDate,
          createdBy: {
            connect: { id: input.userId },
          },
          campground: {
            connect: { id: input.campgroundId },
          },
        },
      });
      return { booking };
    }),

  // Get all bookings
  getAllBookings: protectedProcedure.query(async ({ ctx }) => {
    const bookings = await ctx.db.booking.findMany({
      include: {
        createdBy: true,
        campground: true,
      },
    });
    return bookings;
  }),

  // Get a specific booking by ID
  getBookingById: protectedProcedure
    .input(
      z.object({
        bookingId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const booking = await ctx.db.booking.findUnique({
        where: { id: input.bookingId },
        include: {
          createdBy: true,
          campground: true,
        },
      });
      return { booking };
    }),
});
