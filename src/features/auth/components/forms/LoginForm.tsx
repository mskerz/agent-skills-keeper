"use client";

import React, { useActionState, useEffect } from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { LoginFormInput } from "@/utils/zod/schema";
import { SubmitButton } from "@/components/common/button/ActionButton";

export const initialState: FormState<LoginFormInput> = {
  errors: {},
  message: "",
};

function LoginForm({ action }: FormProps<LoginFormInput>) {
  const [state, formAction, pending] = useActionState(action, initialState);

  useEffect(() => {
    if (!state?.message) return;

    if (state.success) {
      toast.add({
        type: "success",
        title: "เข้าสู่ระบบสำเร็จ",
        description: state.message,
      });
      // สั่งเปลี่ยนหน้าแบบ hard navigate เพื่อให้ session ใหม่โหลดเข้า Header ทันที
      window.location.href = "/";
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
          <Field className="grid gap-2">
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

          <Field className="grid gap-2">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {state.errors?.password?.[0] && (
              <FieldError>{state.errors.password[0]}</FieldError>
            )}
          </Field>

          <SubmitButton
            pending={pending}
            pendingText="Signing in..."
            className="mt-2 w-full"
          >
            Sign In
          </SubmitButton>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}

export default LoginForm;
