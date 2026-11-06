import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { AUTH_ROUTES, DEFAULT_LOGIN_REDIRECT, PUBLIC_ROUTES } from '@/constants/app'


// Utility function สำหรับตรวจสอบว่า pathname ตรงกับ route ใด ๆ ใน array ของ routes หรือไม่
function matchesRoute(pathname: string, routes: readonly string[]) {
  return routes.some((route) =>
    route === '/' ? pathname === '/' : pathname === route || pathname.startsWith(`${route}/`)
  )
}

// Utility function สำหรับ redirect พร้อมส่ง cookies ของ Supabase ไปด้วย (เพื่อให้ session ใหม่ถูกส่งไปยังหน้า redirect)
function redirectWithCookies(url: URL, supabaseResponse: NextResponse) {
  const redirectResponse = NextResponse.redirect(url)
  supabaseResponse.cookies.getAll().forEach(({ name, value, ...options }) => {
    redirectResponse.cookies.set(name, value, options)
  })
  return redirectResponse
}

/**
 * ฟังก์ชัน updateSession จะถูกเรียกใช้ทุก Request ผ่าน proxy.ts
 * มีหน้าที่:
 * 1. ตรวจสอบและ Refresh Auth Token กับ Supabase (รักษาสถานะล็อกอิน)
 * 2. ทำ Auth Guard ป้องกันเส้นทางตามสถานะ Session
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 1. ดึง Claims และ Refresh Token (ห้ามเขียนโค้ดคั่นระหว่าง createServerClient กับ getClaims)
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims
  const { pathname, search } = request.nextUrl

  // 2. กรณี A: ล็อกอินแล้ว แต่เข้าหน้า Login / Register
  const isAuthRoute = matchesRoute(pathname, AUTH_ROUTES)
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = DEFAULT_LOGIN_REDIRECT // หรือ '/' ตามต้องการ
    url.search = ''
    return redirectWithCookies(url, supabaseResponse)
  }
  // กรณี B: ผู้ใช้ที่ยังไม่ได้ล็อกอิน พยายามเข้าหน้าที่ไม่ใช่ Public Route
  const isPublicRoute = matchesRoute(pathname, PUBLIC_ROUTES)
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.search = ''
    url.searchParams.set('next', `${pathname}${search}`)
    return redirectWithCookies(url, supabaseResponse)
  }

  return supabaseResponse
}
