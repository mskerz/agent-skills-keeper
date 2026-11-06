"use client";

import React from "react";
import Image from "next/image";
import ThemeLogoExpanded from "@/components/common/theme/ThemeLogo";
import { LOGO_SYSTEM } from "@/constants/app";

export default function ThemeLogoWithCollapse() {
  return (
    <div className="flex h-9 w-full items-center justify-start overflow-hidden group-data-[collapsible=icon]:justify-center">
      {/* 1. ตอนกางเต็ม: แสดงโลโก้แนวนอน (และซ่อนอัตโนมัติตาม CSS ทันทีที่พับ) */}
      <div className="flex transition-opacity duration-200 group-data-[collapsible=icon]:hidden">
        <ThemeLogoExpanded />
      </div>
      {/* 2. ตอนพับเป็น Icon: แสดงเฉพาะ Favicon กึ่งกลางขนาด 20px นิ่งๆ ไม่กระตุก */}
      <div className="hidden items-center justify-center group-data-[collapsible=icon]:flex">
        <Image
          src={LOGO_SYSTEM.light.favicon}
          alt="Skills Keeper Favicon"
          width={20}
          height={20}
          priority
          className="size-5 shrink-0 object-contain dark:hidden"
        />
        <Image
          src={LOGO_SYSTEM.dark.favicon}
          alt="Skills Keeper Favicon"
          width={20}
          height={20}
          priority
          className="hidden size-5 shrink-0 object-contain dark:block"
        />
      </div>
    </div>
  );
}
