/**
 * Utility functions for creating consistent Server Action / FormState responses
 */

export interface ActionResponseOptions<T = Record<string, unknown>> {
  success: boolean;
  message: string;
  errors?: FormState<T>["errors"];
  values?: FormState<T>["values"];
}

/**
 * สร้าง Action Response แบบกำหนดค่าเอง (ทั้ง success และ failure)
 */
export function actionResponse<T = Record<string, unknown>>({
  success,
  message,
  errors,
  values,
}: ActionResponseOptions<T>): FormState<T> {
  return {
    success,
    message,
    ...(errors ? { errors } : {}),
    ...(values ? { values } : {}),
  };
}

/**
 * Helper สำหรับ return กรณีสำเร็จ (success: true)
 */
export function actionSuccess<T = Record<string, unknown>>(
  message: string = "Success",
  extra?: Partial<Omit<FormState<T>, "success" | "message">>
): FormState<T> {
  return {
    success: true,
    message,
    ...extra,
  };
}

/**
 * Helper สำหรับ return กรณีเกิดข้อผิดพลาด (success: false)
 */
export function actionError<T = Record<string, unknown>>(
  message: string = "An error occurred",
  errors?: FormState<T>["errors"],
  values?: FormState<T>["values"]
): FormState<T> {
  return {
    success: false,
    message,
    ...(errors ? { errors } : {}),
    ...(values ? { values } : {}),
  };
}
