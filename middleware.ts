// middleware.ts
import { withAuth } from "next-auth/middleware";

export const middleware = withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/repos/:path*", "/profile/:path*"],
};
