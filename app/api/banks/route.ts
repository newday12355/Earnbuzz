import { NextResponse } from "next/server"

const PAYSTACK_SECRET_KEY = "sk_test_8a0b1f199362d7acc9c390bff72c4e81f74e2ac3"

export async function GET() {
  try {
    const response = await fetch("https://api.paystack.co/bank", {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch banks")
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      banks: data.data,
    })
  } catch (error) {
    console.error("Banks fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch banks" }, { status: 500 })
  }
}
