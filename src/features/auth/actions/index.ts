"use server";

import { createServerClient } from "@/utils/supabase";

export async function signUpWithEmail( ) {

}

export async function signInWithEmail(formData: FormData) {
    // 1. ดึงข้อมูลจากฟอร์มหน้าบ้าน
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    // 2. เรียกใช้งาน Supabase Server Client
    const supabase = await createServerClient();

    // 3. ใช้ฟังก์ชัน signInWithPassword ของ Supabase
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        throw new Error(error.message);
    }

    return { message: "Sign-in successful", success: true };
}