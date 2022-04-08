import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import route from './route'

config()

const app = express()

const { PORT } = process.env

app.use(express.json())
app.use(cors())
app.use(route)

app.listen(PORT, () => {
  console.log(` 🧑 API running: ${PORT}`)
})

export default app
