"use server";

import { z } from "@/utils/zod";
import { createServerClient } from "@/utils/supabase";
import { RegisterFormInput, registerSchema } from "@/utils/zod/schema/auth";
import { actionError, actionSuccess } from "@/utils/response";
import { getAuthErrorMessage } from "@/utils/auth-error";

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

export async function signUp(
    prevStateOrFormData: FormState<RegisterFormInput>,
    maybeFormData?: FormData
): Promise<FormState<RegisterFormInput>> {
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

    // 1. ดึงข้อมูลจากฟอร์มหน้าบ้าน
    const displayNameRaw = (formData.get("displayName") as string) || (formData.get("display_name") as string) || "";
    const emailRaw = (formData.get("email") as string) || "";
    const rawData = {
        displayName: displayNameRaw,
        email: emailRaw,
        password: (formData.get("password") as string) || "",
        confirmPassword: (formData.get("confirmPassword") || formData.get("confirm_password")) as string || "",
    };

    const preservedValues = {
        displayName: displayNameRaw,
        email: emailRaw,
    };

    // 2. Validate ข้อมูลด้วย Zod schema (ส่งเฉพาะ fieldErrors ใต้ input ไม่ส่ง message เพื่อไม่ให้ Toast เด้งซ้ำซ้อน)
    const validationResult = registerSchema.safeParse(rawData);
    if (!validationResult.success) {
        const fieldErrors = z.flattenError(validationResult.error).fieldErrors;
        return actionError("", fieldErrors, preservedValues);
    }

    const { email, password, displayName } = validationResult.data;

    // 3. เรียกใช้งาน Supabase Server Client
    const supabase = await createServerClient();

    // 4. ใช้ฟังก์ชัน signUp ของ Supabase (ข้อมูล profile จะถูกสร้างผ่าน Database Trigger บน auth.users)
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                display_name: displayName,
            },
        },
    });

    if (error) {
        return actionError(getAuthErrorMessage(error), undefined, preservedValues);
    }

    if (data.user && (!data.user.identities || data.user.identities.length === 0)) {
        return actionError("อีเมลนี้ถูกใช้งานแล้ว", undefined, preservedValues);
    }

    return actionSuccess("สร้างบัญชีผู้ใช้งานเรียบร้อยแล้ว");
}
