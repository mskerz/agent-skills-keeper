import "server-only";

import { createClient } from "@/utils/supabase/server";
import { cache } from "react";


export const getUser = cache(async () => {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  return {
    user: error ? null : user,
    isLoggedIn: Boolean(user && !error),
  };
});