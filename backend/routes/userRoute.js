// userRoute.js

import express from 'express'
import protectUser from '../middlewares/protectUser.js'
const router = express.Router()
import { getProfile, followAndUnfollow } from '../controllers/userController.js'

router.get('/profile/:username', protectUser, getProfile)
router.post('/follow/:id', protectUser, followAndUnfollow)

export default router