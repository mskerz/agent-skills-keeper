"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "cn";

export interface ActionButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "render"> {
  /** ควบคุม pending state เอง (เช่น จาก useActionState) ถ้าไม่ระบุจะอ่านจาก useFormStatus อัตโนมัติ */
  pending?: boolean;
  /** ข้อความที่แสดงขณะ pending เช่น "Signing up..." หรือ "กำลังบันทึก..." */
  pendingText?: React.ReactNode;
  /** Icon หรือ Custom Element ที่จะ render ตอนสถานะปกติ เช่น render={<UserPlusIcon />} */
  render?: React.ReactNode;
  /** Icon ทางเลือกแบบมาตรฐาน */
  icon?: React.ReactNode;
  /** Alias สำหรับ render icon */
  renderIcon?: React.ReactNode;
  /** ตำแหน่งของ Icon / Spinner (default: "start") */
  iconPosition?: "start" | "end";
  /** Custom Spinner สำหรับกรณีต้องการเปลี่ยนตัวโหลด */
  spinner?: React.ReactNode;
}

function renderWithDataIcon(node: React.ReactNode, position: "start" | "end") {
  if (!node) return null;
  const dataIcon = position === "start" ? "inline-start" : "inline-end";

  if (React.isValidElement<{ "data-icon"?: string }>(node)) {
    return React.cloneElement(node, {
      "data-icon": node.props["data-icon"] ?? dataIcon,
    });
  }

  return (
    <span data-icon={dataIcon} className="inline-flex shrink-0 items-center">
      {node}
    </span>
  );
}

export function ActionButton({
  type = "submit",
  disabled,
  pending: controlledPending,
  pendingText,
  render,
  icon,
  renderIcon,
  iconPosition = "start",
  spinner,
  className,
  children,
  ...props
}: ActionButtonProps) {
  const formStatus = useFormStatus();
  // ถ้ามี controlled pending ส่งมา ให้ใช้ค่านั้น ถ้าไม่มีให้อ่านจาก formStatus.pending อัตโนมัติ
  const isPending = controlledPending ?? formStatus.pending;

  const currentIcon = render ?? renderIcon ?? icon;
  const loadingSpinner =
    spinner ?? (
      <Spinner
        data-icon={iconPosition === "end" ? "inline-end" : "inline-start"}
      />
    );

  return (
    <Button
      type={type}
      disabled={disabled || isPending}
      aria-busy={isPending}
      className={cn(className)}
      {...props}
    >
      {isPending ? (
        <>
          {iconPosition === "start" && loadingSpinner}
          {pendingText ?? children}
          {iconPosition === "end" && loadingSpinner}
        </>
      ) : (
        <>
          {iconPosition === "start" && renderWithDataIcon(currentIcon, "start")}
          {children}
          {iconPosition === "end" && renderWithDataIcon(currentIcon, "end")}
        </>
      )}
    </Button>
  );
}

// Export alias เพื่อให้เรียกใช้ได้สะดวกตามบริบท
export const SubmitButton = ActionButton;
export const ButtonSubmit = ActionButton;
export default ActionButton;
