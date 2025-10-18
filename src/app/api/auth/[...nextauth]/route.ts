import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

// Extend the Session interface to include accessToken

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

export const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Optionally attach access token
      session.accessToken = token.access_token as string;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
