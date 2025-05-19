import { NextRequest, NextResponse } from "next/server";
import { cookieKeys } from "./config/cookies.config";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  try {
    const session = (await cookies()).get(cookieKeys.USER_TOKEN)?.value;
    let isSessionValid = false;
    const url = request.nextUrl.pathname;

    const secret = new TextEncoder().encode(process?.env?.JWT_SECRET!);

    if (session) {
      const payload = (await jwtVerify(session, secret)).payload;
      isSessionValid = payload ? true : false;
      console.log({ payload });
    }
    const onlyPublicRoutes = [
      "/register",
      "/login",
      "forgot-password",
      "reset-password",
    ];

    if (!isSessionValid && !onlyPublicRoutes.includes(url)) {
      let url = "/login";
      url += `?redirect_to=${url}`;

      return NextResponse.redirect(new URL(url, request.url));
    }

    if (isSessionValid && onlyPublicRoutes.includes(url)) {
      let url = "/";

      return NextResponse.redirect(new URL(url, request.url));
    }

    if (isSessionValid && !onlyPublicRoutes.includes(url)) {
      return NextResponse.next();
    }
  } catch (error) {
    (await cookies()).delete(cookieKeys.USER_TOKEN);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
export const config = {
  matcher: ["/admin/:paths*", "/register/:paths*", "/login/:paths*"],
};
