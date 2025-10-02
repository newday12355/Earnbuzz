import { type NextRequest, NextResponse } from "next/server"

const PAYSTACK_SECRET_KEY = "sk_test_8a0b1f199362d7acc9c390bff72c4e81f74e2ac3"

export async function POST(request: NextRequest) {
  try {
    const { account_number, bank_code } = await request.json()

    if (!account_number || !bank_code) {
      return NextResponse.json({ error: "Account number and bank code are required" }, { status: 400 })
    }

    // First, get the list of banks to find the bank code
    const banksResponse = await fetch("https://api.paystack.co/bank", {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!banksResponse.ok) {
      throw new Error("Failed to fetch banks")
    }

    // Verify the account
    const verifyResponse = await fetch(
      `https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    )

    if (!verifyResponse.ok) {
      const errorData = await verifyResponse.json()
      return NextResponse.json({ error: errorData.message || "Failed to verify account" }, { status: 400 })
    }

    const verifyData = await verifyResponse.json()

    return NextResponse.json({
      success: true,
      account_name: verifyData.data.account_name,
      account_number: verifyData.data.account_number,
    })
  } catch (error) {
    console.error("Account verification error:", error)
    return NextResponse.json({ error: "Failed to verify account" }, { status: 500 })
  }
}
