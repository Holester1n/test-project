import { Mic, Send } from "lucide-react"

export default function ChatInput({ message, setMessage, onSend, onMicClick, isListening }) {
  return (
    <div className="flex items-center gap-3 bg-[#1a3a7c] rounded-3xl px-5 py-4 shadow-lg">
      <button
        onClick={onMicClick}
        className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
          isListening
            ? "bg-red-500/20 text-red-400 scale-110"
            : "bg-[#2952a3]/50 text-[#7eb3f5] hover:bg-[#2952a3]"
        }`}
      >
        <Mic className="w-4 h-4" />
      </button>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        placeholder="Ask whatever you want"
        className="flex-1 bg-transparent text-white placeholder-[#5a8fd4] outline-none text-[16px]"
      />
      <button
        onClick={onSend}
        className="bg-[#2952a3] hover:bg-[#3a63b8] text-white w-9 h-9 rounded-2xl flex items-center justify-center transition-colors shadow-sm"
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  )
}