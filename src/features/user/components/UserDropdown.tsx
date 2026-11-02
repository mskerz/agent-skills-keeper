"use client";

import { useTransition } from "react";
import { signOut } from "@/features/auth/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Profile } from "@/features/auth/types/auth";
import { ChevronDown, LogOut, User as UserIcon } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { usePathname } from "next/navigation";
import { PUBLIC_ROUTES } from "@/constants/app";
import Link from "next/link";

type UserDropdownProps = {
  user: Profile | null;
  email?: string | null;
};

export default function UserDropdown({ user, email }: UserDropdownProps) {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const displayName = user?.display_name?.trim() || "User";
  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            className="group flex h-9 items-center gap-2 rounded-full py-1 pr-3 pl-1 text-sm font-medium transition-all hover:bg-muted/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Avatar size="sm" className="size-7 ring-1 ring-border/60">
              {user?.avatar_url && (
                <AvatarImage src={user.avatar_url} alt={displayName} />
              )}
              <AvatarFallback className="bg-primary/10 text-primary text-[11px] font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="max-w-32.5 truncate text-sm font-medium text-foreground">
              {displayName}
            </span>
            <ChevronDown className="size-3.5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-popup-open:rotate-180" />
          </Button>
        }
      />

      <DropdownMenuContent align="end" className="w-56 p-1.5 shadow-lg">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal px-2.5 py-2">
            <div className="flex flex-col space-y-0.5">
              <p className="text-sm font-medium leading-none text-foreground truncate">
                {displayName}
              </p>
              {email && (
                <p className="text-xs text-muted-foreground truncate">
                  {email}
                </p>
              )}
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer gap-2"
            render={<Link href="/app/profile" />}
          >
            <UserIcon className="size-4 text-muted-foreground" />
            <span>Profile</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer gap-2"
            disabled={isPending}
            closeOnClick={false}
            onClick={() => {
              startTransition(async () => {
                const result = await signOut();
                if (result.success) {
                  toast.add({
                    type: "success",
                    title: "ออกจากระบบสำเร็จ",
                    description: result.message,
                  });

                  // ถ้าหน้าปัจจุบันเป็น Public Route (เช่น "/") ให้อยู่หน้าเดิมและรีเฟรชแค่ Header
                  // แต่ถ้าเป็น Protected Route ให้เตะไปหน้า login
                  const isPublic = PUBLIC_ROUTES.includes(pathname);
                  if (isPublic) {
                    window.location.reload();
                  } else {
                    window.location.href = "/auth/login";
                  }
                } else {
                  toast.add({
                    type: "error",
                    title: "เกิดข้อผิดพลาด",
                    description: result.message,
                  });
                }
              });
            }}
          >
            <LogOut className="size-4" />
            <span>{isPending ? "Signing out..." : "Sign out"}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
