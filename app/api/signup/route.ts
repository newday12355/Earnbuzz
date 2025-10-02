import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generateReferralCode } from "@/lib/utils/referral"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, referralCode } = body

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    // Generate unique referral code for new user
    let newReferralCode = generateReferralCode()

    // Ensure referral code is unique
    let isUnique = false
    while (!isUnique) {
      const { data: existing } = await supabase
        .from("users")
        .select("id")
        .eq("referral_code", newReferralCode)
        .maybeSingle()

      if (!existing) {
        isUnique = true
      } else {
        newReferralCode = generateReferralCode()
      }
    }

    // Check if referral code was provided and find referrer
    let referrerId = null
    if (referralCode) {
      const { data: referrer } = await supabase
        .from("users")
        .select("id")
        .eq("referral_code", referralCode)
        .maybeSingle()

      if (referrer) {
        referrerId = referrer.id
      }
    }

    // Create new user
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert({
        name,
        email,
        password, // In production, hash this password!
        referral_code: newReferralCode,
        referred_by: referrerId,
      })
      .select("id, name, email, referral_code")
      .single()

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    // If user was referred, create referral record
    if (referrerId) {
      await supabase.from("referrals").insert({
        referrer_id: referrerId,
        referred_id: newUser.id,
        amount: 500,
      })
    }

    return NextResponse.json({
      success: true,
      user: newUser,
    })
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
