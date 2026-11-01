"use server";

import { actionError, actionSuccess, getAuthErrorMessage } from "@/utils";
import { createServerClient } from "@/utils/supabase";
import { z } from "@/utils/zod";
import { LoginFormInput, loginSchema } from "@/utils/zod/schema";

export async function signInWithEmail(
  prevStateOrFormData: FormState<LoginFormInput>,
  maybeFormData?: FormData
): Promise<FormState<LoginFormInput>> {
  // รองรับทั้งแบบส่ง formData มาตรงๆ และแบบเรียกผ่าน useActionState (prevState, formData)
  const formData =
    maybeFormData instanceof FormData
      ? maybeFormData
      : prevStateOrFormData instanceof FormData
        ? prevStateOrFormData
        : null;

  if (!formData) {
    return actionError("Form data is required");
  }

  // 1. ดึงข้อมูลจากฟอร์ม
  const emailRaw = (formData.get("email") as string) || "";
  const rawData = {
    email: emailRaw,
    password: (formData.get("password") as string) || "",
  };

  const preservedValues = {
    email: emailRaw,
  };

  // 2. Validate ข้อมูลด้วย Zod schema
  const validationResult = loginSchema.safeParse(rawData);
  if (!validationResult.success) {
    const fieldErrors = z.flattenError(validationResult.error).fieldErrors;
    return actionError("", fieldErrors, preservedValues);
  }

  const { email, password } = validationResult.data;

  // 3. เรียกใช้งาน Supabase Server Client
  const supabase = await createServerClient();

  // 4. เข้าสู่ระบบด้วย signInWithPassword ของ Supabase
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return actionError(getAuthErrorMessage(error), undefined, preservedValues);
  }

  
  return actionSuccess("เข้าสู่ระบบเรียบร้อยแล้ว");
}
