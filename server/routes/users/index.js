import express from 'express'
import {
  registerUser,
  loginUser,
  refreshToken,
  getOneUser,
  editUser
} from './userController.js'

const router = express.Router()

router.get('/:id', getOneUser)
router.put('/:id', editUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/refresh', refreshToken)

export default router
