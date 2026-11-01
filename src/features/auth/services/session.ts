import "server-only";

import { createClient } from "@/utils/supabase/server";
import { cache } from "react";
import type { UserState } from "../types/auth";

export const getUser = cache(async (): Promise<UserState> => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      isLoggedIn: false,
      user: null,
      profile: null,
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return {
    isLoggedIn: true,
    user,
    profile: profile ?? null,
  };
});
