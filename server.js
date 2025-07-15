// server.js
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const stateAges = require('./data/state_age.json') 

const app = express()
const PORT = process.env.PORT || 8080

app.use(
  cors({
    origin: [
      'https://special-lazyness.vercel.app',
      'http://localhost:3000', 
    ],
    methods: ['GET'],
  })
)


app.get('/sse', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  })

  res.flushHeaders() // Penting agar header langsung dikirim ke client

  const send = () => {
    const data = JSON.stringify(stateAges)
    res.write(`data: ${data}\n\n`)
    res.write(`: keep-alive\n\n`) // heartbeat
  }

  send()

  const interval = setInterval(send, 30000)

  req.on('close', () => {
    clearInterval(interval)
  })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ SSE server running at http://0.0.0.0:${PORT}`)
})
