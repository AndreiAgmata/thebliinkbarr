import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcrypt";
import prisma from "../../prisma";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.customer.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.id || !user.password) {
          throw new Error("Invalid credentials");
        }

        const correctPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!correctPassword) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    signOut: "/",
  },
};

export default nextAuthOptions;
