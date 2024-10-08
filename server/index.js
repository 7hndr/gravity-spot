import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import spotRoutes from './routes/spots/index.js'
import schemasRoutes from './routes/schemas/index.js'

const app = express()
const PORT = 666
const allowedOrigins = [
  'http://212.67.12.167',
  'http://localhost:6666',
  'e-grom.com',
  'www.e-grom.com'
]

app.use(
  cors({
    origin: allowedOrigins,
    // methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/spots', spotRoutes)
app.use('/api/schemas', schemasRoutes)

mongoose
  .connect(
    'mongodb+srv://thndr:y3bPuX8TwPjxBWU@gravity-spot.u4dmz.mongodb.net/gravity-spot'
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`)
    })
  })
