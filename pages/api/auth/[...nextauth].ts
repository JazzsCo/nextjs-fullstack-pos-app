import { config } from "@/config/config";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/admin/auth/login",
  },
};

export default NextAuth(authOptions);
