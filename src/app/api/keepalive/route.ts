export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return Response.json(
      { ok: false, error: "Missing env vars" },
      { status: 500 }
    );
  }

  const res = await fetch(
    `${supabaseUrl}/rest/v1/keep_alive?select=id&limit=1`,
    {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const text = await res.text();

    return Response.json(
      {
        ok: false,
        status: res.status,
        supabaseError: text,
      },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
}