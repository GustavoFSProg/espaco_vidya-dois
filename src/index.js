import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import route from './routes'

config()

const { PORT } = process.env

const app = express()

app.use(express.json())
app.use(cors())
app.use(route)

app.listen(PORT, () => {
  console.log(` 🧑 API running: ${PORT} `)
})

export default app
