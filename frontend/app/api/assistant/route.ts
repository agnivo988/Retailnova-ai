import { NextResponse } from "next/server";

const AI_RESPONSES: Record<string, string> = {
  "where is milk": "🥛 Organic Milk is in **Aisle A2 (Dairy), Shelf 3**. The fastest route from your location takes about 45 seconds. Would you like me to navigate you there?",
  "busy areas": "📊 Currently, the **Checkout area** is the busiest at 85% capacity. I recommend using **Self-Checkout Lane 4** which has only a 2-minute wait. The Bakery section is also moderately busy at 62%.",
  "deals": "🏷️ Today's best deals:\n• **Buy 2 Get 1 Free** on all beverages\n• **30% off** organic produce\n• **$5 off** orders over $50\n• Flash sale on frozen items until 6 PM!",
  "help": "I can help you with:\n• 🔍 **Find products** — \"Where is [product]?\"\n• 🗺️ **Navigate** — \"Take me to [aisle]\"\n• 📊 **Check crowds** — \"Which areas are busy?\"\n• 🏷️ **Find deals** — \"Any deals today?\"\n• 📝 **Shopping list** — \"Create a list\"",
  default: "I understand your question! Based on our store's AI analysis, I can help you find products, navigate the store, check crowd levels, and discover deals. Could you be more specific about what you're looking for?",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("milk") || lower.includes("dairy")) return AI_RESPONSES["where is milk"];
  if (lower.includes("busy") || lower.includes("crowd") || lower.includes("queue")) return AI_RESPONSES["busy areas"];
  if (lower.includes("deal") || lower.includes("offer") || lower.includes("sale")) return AI_RESPONSES["deals"];
  if (lower.includes("help") || lower.includes("what can")) return AI_RESPONSES["help"];
  return AI_RESPONSES["default"];
}

export async function POST(request: Request) {
  try {
    const { query, language } = await request.json();
    
    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 800));
    
    const response = getAIResponse(query);
    
    return NextResponse.json({
      success: true,
      data: {
        text: response,
        language: language || "en"
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}
