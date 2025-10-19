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
    maxAge: 30 * 24 * 60 * 60, // 30 days
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
    async jwt({ token, account, user }) {
      console.log("JWT ACCOUNT:", account);
      // Initial sign in
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      // Add token data to session
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      if (token.user) {
        session.user = token.user as any;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
