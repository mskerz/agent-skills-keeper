import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { PUBLIC_ROUTES } from '@/constants/app'

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

  // 1. ดึง Claims/Session และ Refresh Token
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims
  const pathname = request.nextUrl.pathname

  // 2. Auth Guard Logic:
  // กรณี A: ผู้ใช้ที่ล็อกอินแล้ว พยายามเข้าหน้า Login หรือ Register ให้ส่งกลับหน้าแรก
  const isAuthRoute = pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register')
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // กรณี B: ผู้ใช้ที่ยังไม่ได้ล็อกอิน พยายามเข้าหน้าที่ไม่ใช่ Public Route
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    // เก็บเส้นทางเดิมไว้เพื่อ redirect กลับมาได้หลังล็อกอินสำเร็จ
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
