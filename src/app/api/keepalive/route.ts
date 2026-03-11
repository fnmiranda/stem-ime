import { createClient } from '@supabase/supabase-js'

export async function GET() {

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )

  await supabase.from("heartbeat").select("*").limit(1)

  return Response.json({ status: "ok" })
}