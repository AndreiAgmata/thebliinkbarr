import nextAuthOptions from "@/lib/AuthOptions";
import NextAuth from "next-auth/next";

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
