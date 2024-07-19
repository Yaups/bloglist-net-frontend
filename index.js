import express from 'express'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(express.static(__dirname + '/dist'))

app.get('*', (_req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

const port = process.env.PORT || 4000
app.listen(port)
