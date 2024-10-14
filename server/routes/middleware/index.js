import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config({ path: '.env' })

const JWT_SECRET = process.env.JWT_SECRET

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] // Берем токен из заголовка

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    req.user = decoded

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}
