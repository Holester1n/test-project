import { Mic, Send } from "lucide-react"

export default function ChatInput({ message, setMessage, onSend, onMicClick, isListening }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-3xl px-5 py-4 shadow-md border border-[#d8f3dc]">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        placeholder="Какой-то текст..."
        className="flex-1 bg-transparent text-[#1b4332] placeholder-[#b7e4c7] outline-none text-[16px]"
      />
      <button
        onClick={onMicClick}
        className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
          isListening
            ? "bg-red-100 text-red-400 scale-110"
            : "bg-[#d8f3dc] text-[#2d6a4f] hover:bg-[#b7e4c7]"
        }`}
      >
        <Mic className="w-4 h-4" />
      </button>
      <button
        onClick={onSend}
        className="bg-[#52b788] hover:bg-[#40916c] text-white w-9 h-9 rounded-2xl flex items-center justify-center transition-colors shadow-sm"
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  )
}