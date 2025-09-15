// authRoute.js

import express from 'express'
import { signup, login} from '../controllers/authController.js'
const router = express.Router()


router.get('/signup', (req,res)=>{
    res.send("this is a sign")
    console.log("executed")
})
router.get('/login', login)


export default router