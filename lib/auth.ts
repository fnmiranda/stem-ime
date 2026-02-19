import { supabase } from "@/lib/supabaseClient";

export async function getSessionUser() {
  const { data } = await supabase.auth.getSession();
  return data.session?.user ?? null;
}

export async function isCurrentUserAdmin(): Promise<boolean> {
  const user = await getSessionUser();
  if (!user) return false;

  const { data, error } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (error) return false;
  return !!data?.is_admin;
}
