// 1. นำเข้าฟังก์ชันสร้าง Client จากไฟล์แยกที่คุณทำไว้
import { createClient as createServerSupabase } from "./server";
import { createClient as createClientSupabase } from "./client";

/**
 * 2. ฟังก์ชันแยกทำงานตามสภาพแวดล้อม (Environment)
 * ดึงข้อมูลบน Server เช่น page.tsx, actions.ts ใช้ createServerClient()
 * ดึงข้อมูลบน Client เช่น components ที่มี 'use client' ใช้ createClientClient()
 */
export async function createServerClient() {
  return await createServerSupabase();
}

export function createClientClient() {
  return createClientSupabase();
}

// ⚠️ หมายเหตุ: การประกาศ const supabase = createServerClient() ไว้ที่ด้านบนสุดของไฟล์ตรงๆ แบบ Global 
// ไม่แนะนำบนฝั่ง Server ของ Next.js เนื่องจากฟังก์ชันนี้จำเป็นต้องดึงค่าคุกกี้ (Cookies) ใหม่ของแต่ละ Request เสมอ
// ดังนั้นเวลาจะใช้งาน ให้เรียกใช้ผ่านการครอบฟังก์ชันแบบ asynchronous ด้านบนแทนครับ
