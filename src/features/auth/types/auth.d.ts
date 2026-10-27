import type { Tables, TablesInsert,TablesUpdate } from "@/utils/supabase/types/database"


// type Profile = {
//     avatar_url: string | null;
//     bio: string | null;
//     birth_date: string | null;
//     created_at: string;
//     display_name: string | null;
//     first_name: string | null;
//     id: string;
//     last_name: string | null;
//     locale: string | null;
//     phone: string | null;
//     updated_at: string;
// }
export type Profile = Tables<'profiles'>;
export type NewProfile = TablesInsert<'profiles'>;
export type UpdateProfile = TablesUpdate<'profiles'>;