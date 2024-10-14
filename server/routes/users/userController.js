import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from './model.js'
dotenv.config({ path: '.env' })

const JWT_SECRET = process.env.JWT_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET
const PROD = process.env.NODE_ENV === 'production'

export const editUser = async (req, res) => {
  try {
    const userData = req.body

    const existingUser = await User.findById(req.params.id)
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (!userData || Object.keys(userData).length === 0) {
      return res.status(400).json({ message: 'Invalid update data' })
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userData },
      { new: true, runValidators: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found after update' })
    }

    res.status(200).json({ data: updatedUser, message: 'User updated' })
  } catch (error) {
    console.error(error)
    if (error.name === 'ValidationError') {
      return res
        .status(400)
        .json({ message: 'Validation error', errors: error.errors })
    }
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getOneUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })

    await newUser.save()

    const { accessToken, refreshToken } = generateTokens(newUser)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: PROD,
      sameSite: 'strict'
    })

    res.status(201).json({
      message: 'User created successfully',
      token: accessToken,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const logoutUser = async (req, res) => {
  console.log('logoutUser')
  try {
    res.clearCookie('refreshToken')
    res.status(200).json({ message: 'Logout successful' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res
        .status(400)
        .json({ message: 'User not found. Invalid email or password' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const { accessToken, refreshToken } = generateTokens(user)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: PROD,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({ message: 'Login successful', accessToken, user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

const generateTokens = user => {
  const accessToken = jwt.sign(
    { userId: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  )

  const refreshToken = jwt.sign(
    { userId: user._id, email: user.email },
    REFRESH_SECRET,
    { expiresIn: '7d' }
  )

  return { accessToken, refreshToken }
}

export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token not found' })
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET)

    const user = await User.findById(decoded.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({ accessToken, user })
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: 'Invalid refresh token' })
  }
}
