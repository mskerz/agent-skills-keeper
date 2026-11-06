import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "cn";

type LoginFormSkeletonProps = React.ComponentProps<"div">

export function LoginFormSkeleton({ className, ...props }: LoginFormSkeletonProps) {
  return (
    <div
      aria-label="Loading login form..."
      aria-busy="true"
      role="status"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      <div className="flex w-full flex-col gap-5">
        {/* Email field skeleton */}
        <div className="grid gap-2">
          <Skeleton className="h-4 w-12 rounded-xs" />
          <Skeleton className="h-8 w-full rounded-lg" />
        </div>

        {/* Password field skeleton */}
        <div className="grid gap-2">
          <Skeleton className="h-4 w-16 rounded-xs" />
          <Skeleton className="h-8 w-full rounded-lg" />
        </div>

        {/* Submit button skeleton */}
        <Skeleton className="mt-2 h-8 w-full rounded-lg" />
      </div>
      <span className="sr-only">Loading login form...</span>
    </div>
  );
}

export default LoginFormSkeleton;
