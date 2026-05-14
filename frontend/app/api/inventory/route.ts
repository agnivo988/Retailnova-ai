import { NextResponse } from "next/server";
import { INVENTORY } from "@/lib/mock-data";

export async function GET() {
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return NextResponse.json({ success: true, data: INVENTORY });
}
