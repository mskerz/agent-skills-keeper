import type { Tables, TablesInsert, TablesUpdate } from "@/utils/supabase/types/database";
import type { User } from "@supabase/supabase-js";

export type Profile = Tables<"profiles">;
export type NewProfile = TablesInsert<"profiles">;
export type UpdateProfile = TablesUpdate<"profiles">;

export type UserState =
  | {
      isLoggedIn: true;
      user: User;
      profile: Profile | null;
    }
  | {
      isLoggedIn: false;
      user: null;
      profile: null;
    };
