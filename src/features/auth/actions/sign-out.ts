"use server";


import { createClient } from "@/utils/supabase/server";
import { actionError, actionSuccess } from "@/utils/response";

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return actionError("ออกจากระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
  }
  return actionSuccess("ออกจากระบบเรียบร้อยแล้ว");
}