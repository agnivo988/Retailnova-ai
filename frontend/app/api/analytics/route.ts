import { NextResponse } from "next/server";
import { REVENUE_DATA, DEMAND_FORECAST } from "@/lib/mock-data";

export async function GET() {
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return NextResponse.json({
    success: true,
    data: {
      revenue: REVENUE_DATA,
      forecast: DEMAND_FORECAST,
    },
  });
}
