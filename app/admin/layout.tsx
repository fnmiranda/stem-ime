"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { isCurrentUserAdmin } from "@/lib/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;

    async function guard() {
      // 1) tem sessão?
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/");
        router.refresh();
        return;
      }

      // 2) é admin?
      const ok = await isCurrentUserAdmin();
      if (!ok) {
        router.replace("/login");
        router.refresh();
        return;
      }

      if (alive) setReady(true);
    }

    guard();

    // ✅ se deslogar em qualquer lugar, expulsa do admin na hora
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/");
        router.refresh();
      }
    });

    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#040607] text-white flex items-center justify-center">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
          Verificando permissão...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
