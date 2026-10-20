import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'


// อธิบาย: ฟังก์ชัน middleware จะถูกเรียกใช้ทุกครั้งที่มีการร้องขอ (request) เข้ามาในแอปพลิเคชัน Next.js ของคุณ โดยฟังก์ชันนี้จะทำหน้าที่ตรวจสอบสถานะการเข้าสู่ระบบของผู้ใช้ผ่าน Supabase และจัดการกับคุกกี้ที่เกี่ยวข้องกับเซสชันของผู้ใช้
// ฟังก์ชันนี้จะทำงานคร่าวๆ ดังนี้:
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
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

  // Do not run code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  await supabase.auth.getClaims()



  // ปิดไฟล์นี้เพื่อป้องกันไม่ให้ผู้ใช้ที่ไม่ได้เข้าสู่ระบบเข้าถึงหน้าเว็บที่ต้องการการยืนยันตัวตน (authentication) โดยจะตรวจสอบว่า user มีอยู่หรือไม่ และถ้าไม่มี จะทำการเปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ (login page) แต่ในขณะนี้ การตรวจสอบการยืนยันตัวตนถูกปิดใช้งานเพื่อให้สามารถสร้าง UI พื้นฐานได้
  //   const { data } = await supabase.auth.getClaims()
  // const user = data?.claims

  // if (
  //   !user &&
  //   !request.nextUrl.pathname.startsWith('/login') &&
  //   !request.nextUrl.pathname.startsWith('/auth') &&
  //   // the OAuth consent route sends unauthenticated visitors to the login page
  //   // itself, so that it can preserve the authorization in the `next` parameter
  //   request.nextUrl.pathname !== '/oauth/consent'
  // ) {
  //   // no user, potentially respond by redirecting the user to the login page
  //   const url = request.nextUrl.clone()
  //   url.pathname = '/auth/login'
  //   return NextResponse.redirect(url)
  // }


  // Authentication guards are intentionally disabled while the basic UI is built.
  // Keep getClaims() above so Supabase can still refresh an existing session.

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}
