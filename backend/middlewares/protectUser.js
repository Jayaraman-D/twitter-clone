// protectUser.js

import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const protectUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(404).json({ error: "Unauthorized user" })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if (!decoded) {
            return res.status(404).json({ error: "Invalid token" })
        }

        const user = await User.findOne({ _id: decoded.userId }).select('-password')
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        req.user = user
        next()
    }
    catch (error) {
        console.log(`Error occured in Protect user middleware: ${error.message}`)
        res.status(500).json({ error: "Internal server error" })
    }
}

export default protectUser