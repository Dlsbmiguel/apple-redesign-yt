import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
// Import the adapter directly: the package index also loads the credentials
// provider, which needs the native argon2 module this app doesn't use
import { SanityAdapter } from "next-auth-sanity/adapter";
import { sanityClient } from "../../../sanity";

/** @type {import("next-auth").AuthOptions} */
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "placeholder",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder",
    }),
    // ...add more providers here
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "placeholder-secret",
  adapter: SanityAdapter(sanityClient),
};

export default NextAuth(authOptions);
