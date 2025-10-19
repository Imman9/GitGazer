import NextAuth, { type DefaultSession, type User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

// Extend the Session interface
declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    error?: string;
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }
  
  interface JWT {
    accessToken?: string;
    error?: string;
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

// Extend the User type to include id
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    error?: string;
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const handler = NextAuth({
  debug: process.env.NODE_ENV === 'development',
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
        params: { 
          scope: "read:user repo",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        console.log("JWT - New sign in:", { 
          provider: account.provider,
          userId: user.id,
          accessToken: account.access_token ? '***' + String(account.access_token).slice(-4) : 'none'
        });
        
        return {
          ...token,
          accessToken: account.access_token,
          user: {
            id: user.id,
            name: user.name || null,
            email: user.email || null,
            image: user.image || null,
          },
        };
      }
      return token;
    },
    async session({ session, token }) {
      try {
        // Create a new session object to avoid type issues
        const newSession = { ...session };
        
        // Add token data to session
        if (token.error) {
          newSession.error = String(token.error);
        }
        
        if (token.accessToken) {
          newSession.accessToken = String(token.accessToken);
        }
        
        if (token.user) {
          newSession.user = {
            ...newSession.user,
            id: token.user.id || undefined,
            name: token.user.name || null,
            email: token.user.email || null,
            image: token.user.image || null,
          };
        }
        
        return newSession;
      } catch (error) {
        console.error("Session callback error:", error);
        return {
          ...session,
          error: error instanceof Error ? error.message : "Error in session callback"
        };
      }
    },
  },
  // Remove events since it's not in the correct type
  // You can handle errors in the callbacks instead
});

export { handler as GET, handler as POST };
