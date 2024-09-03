import {withAuth} from "next-auth/middleware";
import {NextResponse} from "next/server";
import roles from "@/core/roles";

export default withAuth(
    function middleware(req) {
        let isAdmin = req.nextauth.decoded?.role.some(role => role.authority === roles.ADMIN)
        let isUser = req.nextauth.decoded?.role.some(role => role.authority === roles.USER)
        if (req.nextUrl.pathname.startsWith("/user/list") && isAdmin)
            return NextResponse.rewrite(
                new URL("/api/auth/signin?message=You Are Not Authorized!", req.url)
            );
        if (req.nextUrl.pathname.startsWith("/recipe/create") && !(isAdmin || isUser)) {
            return NextResponse.rewrite(
                new URL("/api/auth/signin?message=You Are Not Authorized!", req.url)
            );
        }
    },
    {
        callbacks: {
            authorized: ({token}) => !!token,
        },
    }
);

export const config = {
    matcher: ["/user/:path*"],
};