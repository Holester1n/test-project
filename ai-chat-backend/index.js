import express from "express"
import cors from "cors"
import Groq from "groq-sdk"
import "dotenv/config"

const app = express()
const client = new Groq({ apiKey: process.env.GROQ_API_KEY })

app.use(cors())
app.use(express.json())

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Сообщения не могут быть пустыми" })
  }

  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      max_tokens: 1024,
    })

    res.json({ reply: response.choices[0].message.content })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Ошибка при обращении к AI" })
  }
})

app.listen(3000, () => console.log("Сервер запущен на порту 3000"))