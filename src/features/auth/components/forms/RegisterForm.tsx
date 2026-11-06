"use client";

import React, { useActionState, useEffect } from "react";
import { SubmitButton } from "@/components/common/button/ActionButton";
import { Input } from "@/components/ui/input";
import {
  FieldSet,
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { RegisterFormInput } from "@/utils/zod/schema";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";

export const initialState: FormState<RegisterFormInput> = {
  errors: {},
  message: "",
};

function RegisterForm({ action }: FormProps<RegisterFormInput>) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const router = useRouter(); // 👈 เพิ่มบรรทัดนี้
  useEffect(() => {
    if (!state?.message) return;

    if (state.success) {
      toast.add({
        type: "success",
        title: "ลงทะเบียนสำเร็จ",
        description: state.message,
      });
      router.push("/app"); // 👈 หรือ "/" ตาม flow ที่ต้องการ
      router.refresh();
    } else {
      toast.add({
        type: "error",
        title: "เกิดข้อผิดพลาด",
        description: state.message,
      });
    }
  }, [state]);

  return (
    <form action={formAction}>
      <FieldSet disabled={pending}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="displayName">Display Name</FieldLabel>
            <Input
              key={state.values?.displayName}
              id="displayName"
              name="displayName"
              defaultValue={state.values?.displayName ?? ""}
              placeholder="e.g. Alex Doe"
              autoComplete="name"

            />
            {state.errors?.displayName?.[0] && (
              <FieldError>{state.errors.displayName[0]}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              key={state.values?.email}
              id="email"
              name="email"
              type="email"
              defaultValue={state.values?.email ?? ""}
              placeholder="name@example.com"
              autoComplete="email"

            />
            {state.errors?.email?.[0] && (
              <FieldError>{state.errors.email[0]}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input

              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              minLength={6}

            />
            {state.errors?.password?.[0] && (
              <FieldError>{state.errors.password[0]}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"

            />
            {state.errors?.confirmPassword?.[0] &&
              <FieldError>{state.errors.confirmPassword[0]}</FieldError>}
          </Field>

          <SubmitButton
            pending={pending}
            pendingText="Signing up..."
            className="mt-2 w-full"
          >
            Sign Up
          </SubmitButton>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}

export default RegisterForm;
