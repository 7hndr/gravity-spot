import { Router } from 'express'
import {
  getSpots,
  createSpot,
  updateSpot,
  deleteSpot,
  getOneSpot
  // getSpotSchema
} from './spotController.js'

const router = Router()

router.get('/', getSpots)
router.put('/', updateSpot)
router.post('/', createSpot)
router.delete('/', deleteSpot)

router.get('/:id', getOneSpot)

export default router
