import { Router } from 'express'
import { getSpotSchema } from '../spots/spotController.js'

const router = Router()

router.get('/spots', getSpotSchema)
// router.get('/user', getUserSchema)

export default router
