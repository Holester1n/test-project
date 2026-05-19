export default function ChatResponse({ response, isLoading }) {
  return (
    <div className="mt-6">
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#74c69d] rounded-full animate-bounce [animation-delay:0ms]" />
          <div className="w-2 h-2 bg-[#74c69d] rounded-full animate-bounce [animation-delay:150ms]" />
          <div className="w-2 h-2 bg-[#74c69d] rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#d8f3dc]">
          <p className="text-[#1b4332] text-base leading-relaxed">{response}</p>
        </div>
      )}
    </div>
  )
}