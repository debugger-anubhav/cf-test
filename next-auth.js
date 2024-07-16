// next-auth.config.js

import NextAuth from "next-auth";
import FacebookProvider from "@next-auth/facebook";

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_ID,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET,
    }),
    // Other providers like Google, GitHub, etc., can be added here
  ],
  // Optional SQL or MongoDB database to persist users
  // database: process.env.DATABASE_URL,
});
