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
import { ChevronsUpDown, LogOut, SlidersHorizontal as Settings, User as UserIcon } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
// import { PUBLIC_ROUTES } from "@/constants/app";
import Link from "next/link";

type UserDropdownProps = {
  user: Profile | null;
  email?: string | null;
};

export default function UserDropdown({ user, email }: UserDropdownProps) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const fullName = user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : null;
  const displayName = fullName || user?.display_name?.trim() || "User";
  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  return (
    <DropdownMenu >
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            className="group flex h-12 w-full items-center justify-between gap-2 rounded-md px-2 text-sm font-medium hover:bg-muted/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center"
          >
            <div className="flex items-center gap-2">
              <Avatar size="sm" className="size-7 shrink-0 ring-1 ring-border/60">
                {user?.avatar_url && (
                  <AvatarImage src={user.avatar_url} alt={displayName} />
                )}
                <AvatarFallback className="  text-[11px] font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start ">
                <span className="max-w-32.5 truncate text-sm font-medium text-foreground group-data-[collapsible=icon]:hidden">
                  {displayName}
                </span>
                <>
                  {email && (
                    <span className="text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
                      {email}
                    </span>
                  )}
                </>

              </div>

            </div>
            <ChevronsUpDown className="size-3.5  ml-auto text-muted-foreground transition-transform duration-250 group-data-[state=open]:rotate-180 group-data-popup-open:rotate-180 group-data-[collapsible=icon]:hidden" />

          </Button>
        }
      />

      <DropdownMenuContent
        side="right"
        align="end"
        sideOffset={32}
        className="w-56 p-1.5 shadow-lg"
      >
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
            <UserIcon className="size-4  " />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer gap-2"
            render={<Link href="/app/settings" />}
          >
            <Settings className="size-4 " />
            <span>Settings</span>
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

                  router.push("/auth/login");
                  router.refresh();
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
