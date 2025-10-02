import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params
    const supabase = await createClient()

    // Get all users referred by this user
    const { data: referrals, error } = await supabase
      .from("users")
      .select("id, name, email, created_at")
      .eq("referred_by", userId)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      referrals: referrals || [],
    })
  } catch (error) {
    console.error("[v0] Get referrals error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
