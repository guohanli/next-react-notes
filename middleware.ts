import { NextResponse, NextRequest } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages } from "@/app/i18n/settings";

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
  ],
};

// 静态资源文件
const publicFile = /\.(.*)$/;
// 多语言有区别的静态资源文件
const excludeFile = ["logo.svg"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const browserLanguage = acceptLanguage.get(
    req.headers.get("Accept-Language")
  );

  const pathnameHasLocale = languages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  // 如果请求路径中已存在语言
  if (pathnameHasLocale) {
    // 如果语言等于浏览器默认语言，去掉语言前缀
    if (
      browserLanguage &&
      pathname.startsWith(`/${browserLanguage}`) &&
      !excludeFile.some((file) => pathname.endsWith(file))
    ) {
      req.nextUrl.pathname = pathname.replace(`/${browserLanguage}`, "");
      return NextResponse.redirect(req.nextUrl);
    } else {
      // 如果语言不等于浏览器默认语言，不做处理, 直接返回
      return;
    }
  }

  // 如果是 public 文件，不重定向
  if (publicFile.test(pathname)) return;

  // 协商语言
  let lng = browserLanguage || fallbackLng;

  req.nextUrl.pathname = `/${lng}${pathname}`;
  // 浏览器默认语言不重定向
  if (lng === browserLanguage) {
    return NextResponse.rewrite(req.nextUrl);
  } else {
    // 其他语言重定向，如 /products 重定向到 /en/products
    return NextResponse.redirect(req.nextUrl);
  }
}
