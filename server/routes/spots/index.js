import { Router } from 'express'
import {
  getSpots,
  createSpot,
  updateSpot,
  deleteSpot,
  getOneSpot
} from './spotController.js'
import { authMiddleware } from '../middleware/index.js'

const router = Router()

router.get('/', getSpots)
router.post('/', authMiddleware, createSpot)
router.put('/:id', authMiddleware, updateSpot)
router.delete('/:id', authMiddleware, deleteSpot)

router.get('/:id', getOneSpot)

export default router
