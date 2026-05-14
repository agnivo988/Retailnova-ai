"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Send, Bot, User, Globe, Volume2, Sparkles } from "lucide-react";

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", flag: "🇧🇩" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
];

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

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

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", text: "👋 Hello! I'm **Nova**, your AI shopping assistant. I speak 6 languages and can help you find products, navigate the store, check crowds, and discover deals. How can I help?", timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState("en");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1000));
    const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", text: getAIResponse(text), timestamp: new Date() };
    setMessages((prev) => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        sendMessage("Where can I find organic milk?");
      }, 2500);
    }
  };

  return (
    <div className="page-enter space-y-6 h-[calc(100vh-7rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-white flex items-center gap-2">
            <Mic className="w-6 h-6 text-pink-400" />
            AI Voice Assistant
          </h1>
          <p className="text-sm text-slate-500 mt-1">Multilingual • NLP-powered • Speech-to-Text</p>
        </div>
        {/* Language Selector */}
        <div className="flex gap-1.5">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                language === lang.code
                  ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-500 border border-white/5 hover:border-white/10"
              }`}
              title={lang.name}
            >
              {lang.flag}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 glass-card flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center ${
                msg.role === "assistant"
                  ? "bg-gradient-to-br from-cyan-500 to-purple-500"
                  : "bg-white/10"
              }`}>
                {msg.role === "assistant" ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
              </div>
              <div className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === "assistant"
                  ? "bg-white/[0.04] border border-white/5 text-slate-300"
                  : "bg-cyan-500/15 border border-cyan-500/20 text-white"
              }`}>
                {msg.text.split("\n").map((line, i) => (
                  <p key={i} className={i > 0 ? "mt-1" : ""}>{line.replace(/\*\*(.*?)\*\*/g, "$1")}</p>
                ))}
                <span className="block text-[10px] text-slate-500 mt-2">
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/5">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-2 h-2 rounded-full bg-cyan-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-white/5">
          <div className="flex gap-2">
            <button
              onClick={toggleListening}
              className={`p-3 rounded-xl transition-all shrink-0 ${
                isListening
                  ? "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:text-cyan-400 hover:border-cyan-500/20"
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <div className="flex-1 relative">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder={isListening ? "Listening..." : "Ask Nova anything..."}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/30"
              />
            </div>
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white shrink-0 disabled:opacity-30 hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          {/* Quick Prompts */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {["Where is milk?", "Busy areas?", "Today's deals", "Help me"].map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="px-3 py-1.5 rounded-lg text-xs text-slate-400 border border-white/5 hover:border-cyan-500/20 hover:text-cyan-400 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
