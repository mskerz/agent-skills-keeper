"use client";

import React from "react";
import Image from "next/image";
import ThemeLogoExpanded from "@/components/common/theme/ThemeLogo";


export default function ThemeLogoWithCollapse() {
  return (
    <div className="flex h-9 w-full items-center justify-start overflow-hidden">
      {/* 1. ตอนกางเต็ม: แสดงโลโก้แนวนอน (และซ่อนอัตโนมัติตาม CSS ทันทีที่พับ) */}
      <div className="flex   transition-opacity duration-200 group-data-[collapsible=icon]:hidden">
        <ThemeLogoExpanded />
      </div>
      {/* 2. ตอนพับเป็น Icon: แสดงเฉพาะ Favicon กึ่งกลางขนาด 24px นิ่งๆ ไม่กระตุก */}
      <div className="hidden items-center justify-center group-data-[collapsible=icon]:flex">
        <Image
          src="/skill-keeper-favicon.svg"
          alt="Skills Keeper Favicon"
          width={24}
          height={24}
          priority
          className="size-6 shrink-0 object-contain"
        />
      </div>
    </div>
  );
}