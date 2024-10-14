import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

import spotRoutes from './routes/spots/index.js'
import userRoutes from './routes/users/index.js'
import schemasRoutes from './routes/schemas/index.js'

//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

dotenv.config({ path: '.env.local' })
const MONGO_DB_URL = process.env.MONGO_DB_URL
const PORT = process.env.PORT

//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

const app = express()
const allowedOrigins = [
  'http://212.67.12.167',
  'http://localhost:6666',
  'http://localhost:5173',
  'e-grom.com',
  'www.e-grom.com'
]

//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

app.use(cookieParser())
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/spots', spotRoutes)
app.use('/api/schemas', schemasRoutes)
app.use('/api/users', userRoutes)

//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

mongoose.connect(MONGO_DB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`)
  })
})
