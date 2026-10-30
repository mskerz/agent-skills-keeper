import { z } from "@/utils/zod"
import type { UpdateProfile } from "@/features/auth/types/auth"

// ฟอร์มส่งช่องว่างมาเป็น "" แต่คอลัมน์ใน DB เป็น null
export const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `ยาวเกิน ${max} ตัวอักษร`)
    .optional()
    .transform((v) => v || null)

export const profileSchema = z.object({
  first_name: optionalText(50),
  last_name: optionalText(50),
  display_name: optionalText(30),
  bio: optionalText(160),
  phone: optionalText(20),
  locale: optionalText(10),
  birth_date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "รูปแบบต้องเป็น YYYY-MM-DD")
    .optional()
    .or(z.literal(""))
    .transform((v) => v || null),
})

// input = สิ่งที่ฟอร์มส่งเข้ามา, output = ผลหลัง validate/transform
export type ProfileFormInput = z.input<typeof profileSchema>
export type ProfileFormData = z.output<typeof profileSchema>

// ตัวตรวจ type: ถ้า schema ไม่ตรงกับคอลัมน์ใน DB บรรทัดนี้จะขึ้นแดง
const _check = (d: ProfileFormData): UpdateProfile => d
void _check
