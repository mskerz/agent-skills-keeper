import { isAuthError, type AuthError } from "@supabase/supabase-js";

export function getAuthErrorMessage(error: unknown): string {
  if (!isAuthError(error)) {
    return "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
  }

  const authError = error as AuthError;

  switch (authError.code) {
    case "email_address_invalid":
      return "รูปแบบอีเมลไม่ถูกต้อง หรืออีเมลนี้ไม่สามารถใช้งานได้";

    case "email_exists":
    case "user_already_exists":
      return "อีเมลนี้ถูกใช้งานแล้ว";

    case "email_address_not_authorized":
      return "อีเมลนี้ไม่ได้รับอนุญาตให้สมัครสมาชิก";

    case "email_provider_disabled":
      return "ระบบสมัครสมาชิกด้วยอีเมลยังไม่เปิดใช้งาน";

    case "signup_disabled":
      return "ขณะนี้ระบบปิดรับสมัครสมาชิกชั่วคราว";

    case "weak_password":
      return "รหัสผ่านไม่ปลอดภัยเพียงพอ";

    case "over_email_send_rate_limit":
      return "ส่งอีเมลบ่อยเกินไป กรุณารอสักครู่แล้วลองใหม่";

    case "validation_failed":
      return "ข้อมูลที่กรอกไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง";

    default:
      return "ไม่สามารถสมัครสมาชิกได้ กรุณาลองใหม่อีกครั้ง";
  }
}
