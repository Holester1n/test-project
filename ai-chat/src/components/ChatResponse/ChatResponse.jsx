export default function ChatResponse({ isLoading }) {
  return (
    <div className="mt-4 flex items-center gap-2">
      <div className="w-2 h-2 bg-[#7eb3f5] rounded-full animate-bounce [animation-delay:0ms]" />
      <div className="w-2 h-2 bg-[#7eb3f5] rounded-full animate-bounce [animation-delay:150ms]" />
      <div className="w-2 h-2 bg-[#7eb3f5] rounded-full animate-bounce [animation-delay:300ms]" />
    </div>
  )
}