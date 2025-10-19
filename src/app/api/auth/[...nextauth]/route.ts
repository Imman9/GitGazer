import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

// Extend the Session interface to include accessToken

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

export const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: { scope: "read:user repo" },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      console.log("JWT ACCOUNT:", account);
      // Initial sign in
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Optionally attach access token
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
