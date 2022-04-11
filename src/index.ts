import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './routes'

dotenv.config()

const app = express()

const { PORT } = process.env

app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(PORT, () => {
  console.log(` 🧑 API running: ${PORT}`)
})

export default app
