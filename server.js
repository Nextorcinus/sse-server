// server.js
const express = require('express')
const cors = require('cors')
const stateAges = require('./data/state_age.json') // letakkan file JSON ini di folder `data/`

const app = express()
const PORT = process.env.PORT || 8080

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ SSE server running at http://0.0.0.0:${PORT}`)
})

app.use(
  cors({
    origin: 'https://special-lazyness.vercel.app', // Ganti dengan domain Next.js kamu
    methods: ['GET'],
  })
)

app.get('/sse', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  })

  const send = () => {
    const data = JSON.stringify(stateAges)
    res.write(`data: ${data}\n\n`)
  }

  send()
  const interval = setInterval(send, 30000)

  req.on('close', () => {
    clearInterval(interval)
  })
})

app.listen(PORT, () => {
  console.log(`SSE server running at http://localhost:${PORT}`)
})
