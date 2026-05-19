import { useState, useRef, useEffect } from "react"
import ChatInput from "./components/ChatInput/ChatInput"
import ChatResponse from "./components/ChatResponse/ChatResponse"
import ChatHistory from "./components/ChatHistory/ChatHistory"
import useSpeech from "./hooks/useSpeech"

export default function App() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const bottomRef = useRef(null)
  const { isListening, startListening } = useSpeech((text) => setMessage(text))

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const handleSend = async () => {
    if (!message.trim()) return

    const newMessages = [...messages, { role: "user", content: message }]
    setMessages(newMessages)
    setMessage("")
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Неизвестная ошибка")
      setMessages([...newMessages, { role: "assistant", content: data.reply }])
    } catch (err) {
      setError(err.message || "Ошибка при получении ответа. Попробуйте снова.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0d2a5e] flex flex-col justify-between p-10">
      <div>
        <div className="bg-[#1a3a7c] w-12 h-12 rounded-2xl flex items-center justify-center mb-10 shadow-sm">
          <span className="text-white text-xl">💬</span>
        </div>

        {messages.length === 0 && !isLoading && (
          <div>
            <h2 className="text-white text-2xl font-bold mb-4 leading-snug">Hi there!</h2>
            <h1 className="text-white text-4xl font-bold mb-4 leading-snug">
              What would you like<br />to know?
            </h1>
            <p className="text-[#5a8fd4] text-base leading-relaxed">
              Use one of the most common prompts below<br />
              or ask your own question
            </p>
          </div>
        )}

        {messages.length > 0 && <ChatHistory messages={messages} />}
        {isLoading && <ChatResponse isLoading={true} />}

        {error && (
          <div className="mt-3 px-4 py-3 bg-red-900/30 border border-red-500/30 rounded-2xl text-red-300 text-sm">
            {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <ChatInput
        message={message}
        setMessage={setMessage}
        onSend={handleSend}
        onMicClick={startListening}
        isListening={isListening}
      />
    </div>
  )
}