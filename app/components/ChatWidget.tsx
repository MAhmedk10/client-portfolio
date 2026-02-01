"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Zap, Loader2, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "bot";
  content: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Welcome to the MA | Agency,How can we assist you to grow your buisness?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState<string>("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
    let savedId = localStorage.getItem("chat_thread_id");
    
    if (!savedId) {
      // Generate a new unique ID if one doesn't exist
      savedId = crypto.randomUUID(); 
      localStorage.setItem("chat_thread_id", savedId);
    }
    
    setThreadId(savedId);
  }, []);

  // Auto-scroll to bottom when messages change or loading starts
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    
    // 1. Add User Message immediately
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsLoading(true);

    try {
      // 2. Make API Call to your Backend
      const response = await fetch("https://Astrik10-client-portfolio.hf.space/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg,thread_id:threadId}),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // 3. Add Bot Response
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: data.response || "No response received." },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Connection error. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="
  fixed
  bottom-4 right-4
  sm:bottom-6 sm:right-6
  z-[60]
">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, y: 40, filter: "blur(10px)" }}
            className="mb-4 w-[90vw] sm:w-[380px] overflow-hidden rounded-[2.5rem] border border-white/20 bg-black/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
          >
            {/* Liquid Header */}
            <div className="relative p-6 pb-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-violet-600 to-cyan-400 p-[1px]">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-black">
                    <Zap size={18} className="text-white fill-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">EESA's AI</h3>
                  <div className="flex items-center gap-1">
                     <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-amber-400 animate-pulse' : 'bg-green-400'}`}></span>
                     <p className="text-[10px] uppercase tracking-widest text-cyan-400">
                        {isLoading ? "Thinking..." : "Online Now"}
                     </p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="absolute right-6 top-7 text-white/50 hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="h-80 overflow-y-auto px-6 py-2 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] rounded-[1.5rem] px-5 py-3 text-sm leading-relaxed ${
                    msg.role === "user" 
                    ? "bg-violet-600 text-white rounded-tr-none shadow-lg shadow-violet-600/20" 
                    : "bg-white/10 text-neutral-200 rounded-tl-none border border-white/5"
                  }`}>
                    {msg.role === "bot" && (
                        <div className="flex items-center gap-2 mb-1 opacity-50">
                             <Bot size={12} /> <span className="text-[10px]">AI Assistant</span>
                        </div>
                    )}
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Loading Indicator Style Match */}
              {isLoading && (
                 <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-start"
                 >
                    <div className="bg-white/10 text-neutral-200 rounded-[1.5rem] rounded-tl-none border border-white/5 px-5 py-3 flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin text-violet-400" />
                        <span className="text-xs text-white/50">Processing...</span>
                    </div>
                 </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-6 pt-2">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isLoading ? "Please wait..." : "Type your message..."}
                  disabled={isLoading}
                  className="w-full rounded-full border border-white/10 bg-white/5 py-4 pl-6 pr-14 text-sm text-white placeholder-neutral-500 outline-none ring-violet-500/50 transition focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 h-10 w-10 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </div>
              <div className="text-center mt-2">
                 <span className="text-[10px] text-white/20">Powered by MA Agency AI</span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-2xl transition-all"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <MessageSquare size={28} fill="currentColor" />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && messages.length > 1 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white ring-4 ring-[#030014]">
            1
          </span>
        )}
      </motion.button>
    </div>
  );
}