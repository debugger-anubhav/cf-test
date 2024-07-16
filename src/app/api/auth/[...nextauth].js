// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Facebook({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_ID,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET,
    }),
    // Other providers like Google, GitHub, etc., can be added here
  ],
  // Optional SQL or MongoDB database to persist users
  // database: process.env.DATABASE_URL,
});
