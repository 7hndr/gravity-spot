import express from 'express'
import {
  registerUser,
  refreshToken,
  getOneUser,
  logoutUser,
  loginUser,
  editUser
} from './userController.js'

const router = express.Router()
router.get('/:id', getOneUser)
router.put('/:id', editUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/refresh', refreshToken)

export default router
