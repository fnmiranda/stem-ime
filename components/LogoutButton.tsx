"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    router.refresh();
    router.push("/");
  }

  return (
    <button
      onClick={logout}
      disabled={loading}
      className="rounded-lg border border-white/10 px-3 py-2 text-sm disabled:opacity-60"
    >
      {loading ? "Saindo..." : "Sair"}
    </button>
  );
}
