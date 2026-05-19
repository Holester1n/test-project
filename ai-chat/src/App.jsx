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
    <div className="min-h-screen bg-[#f0faf4] flex flex-col justify-between p-10">
      <div>
        {messages.length === 0 && !isLoading && (
          <div>
            <h1 className="text-[#1b4332] text-4xl font-bold mb-4 leading-snug">
              О чём хочешь<br />поговорить?
            </h1>
          </div>
        )}

        {messages.length > 0 && <ChatHistory messages={messages} />}

        {isLoading && <ChatResponse isLoading={true} />}

        {error && (
          <div className="mt-3 px-4 py-3 bg-red-50 border border-red-200 rounded-2xl text-red-500 text-sm">
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