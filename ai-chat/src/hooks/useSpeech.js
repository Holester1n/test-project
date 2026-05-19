import { useState, useEffect } from "react"

export default function useSpeech(onResult) {
  const [isListening, setIsListening] = useState(false)

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition

  if (!SpeechRecognition) {
    console.warn("Web Speech API не поддерживается в этом браузере")
    return { isListening, startListening: () => {} }
  }

  const recognition = new SpeechRecognition()
  recognition.lang = "ru-RU"
  recognition.interimResults = false

  const startListening = () => {
    if (isListening) {
      recognition.stop()
      setIsListening(false)
      return
    }

    recognition.start()
    setIsListening(true)

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript
      onResult(text)
      setIsListening(false)
    }

    recognition.onerror = () => setIsListening(false)
    recognition.onend = () => setIsListening(false)
  }

  return { isListening, startListening }
}