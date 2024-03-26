import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "~/env.js";
import { db } from "~/server/db";
import { compare } from "bcrypt-ts";
import { Adapter } from "next-auth/adapters";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  jwt: {
    secret: env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials) {
          const user = await db.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
          console.log(user);
          if (!user) {
            return null;
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const isValid = await compare(credentials.password, user.password);
          if (!isValid) {
            console.log("invalid password");
            return null;
          }
          console.log(user);
          return user;
        }
        return null;
      },
    }),
  ],
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
