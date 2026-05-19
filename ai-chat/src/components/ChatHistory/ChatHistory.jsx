export default function ChatHistory({ messages }) {
  return (
    <div className="flex flex-col gap-3 mb-6 max-h-[60vh] overflow-y-auto pr-1">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`px-4 py-3 rounded-3xl text-[16px] max-w-[75%] leading-relaxed shadow-sm ${
              msg.role === "user"
                ? "bg-[#52b788] text-white rounded-br-md"
                : "bg-white text-[#1b4332] border border-[#d8f3dc] rounded-bl-md"
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  )
}