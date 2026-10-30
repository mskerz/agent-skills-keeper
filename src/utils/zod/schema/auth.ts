import { z } from "@/utils/zod";

export const registerSchema = z
  .object({
    displayName: z
      .string()
      .trim()
      .min(1, "กรุณากรอกชื่อที่แสดง")
      .max(30, "ยาวเกิน 30 ตัวอักษร"),
    email: z
      .string()
      .trim()
      .min(1, "กรุณากรอกอีเมล")
      .email("รูปแบบอีเมลไม่ถูกต้อง")
      .transform((val) => val.toLowerCase()),
    password: z
      .string()
      .min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร")
      .max(72, "รหัสผ่านต้องไม่เกิน 72 ตัวอักษร"),
    confirmPassword: z
      .string()
      .min(1, "กรุณายืนยันรหัสผ่าน")
      .max(72, "รหัสผ่านต้องไม่เกิน 72 ตัวอักษร"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

export type RegisterFormInput = z.input<typeof registerSchema>;
export type RegisterFormData = z.output<typeof registerSchema>;
