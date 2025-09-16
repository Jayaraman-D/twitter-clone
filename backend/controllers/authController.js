// auth controller.js

import User from '../models/userModel.js'
import bcrypt from 'bcrypt'

export const signup = async (req, res) => {
    try {
        const { email, password, username, fullname } = req.body
        const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegExp.test(email)) {
            return res.status(404).json({ error: "Invalid Email" })
        }
        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ error: "Email already exist" })
        }

        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.status(400).json({ error: "username already exist" })
        }

        if (password.length < 6) {
            return res.status(404).json({ error: "Password must have minimum 6 characters" })
        }

        const salt = await bcrypt.genSalt(10)
        const hassedpassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            email,
            password: hassedpassword,
            username,
            fullname
        })

        if (newUser) {
            await newUser.save()
            res.status(200).json({
                email: newUser.email,
                username: newUser.username,
                fullname: newUser.fullname,
                follower: newUser.follower,
                following: newUser.following,
                bio: newUser.bio,
                link: newUser.link,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg

            })
        }
    }
    catch (error) {
        console.log(error.message)
    }

}

export const login = async (req, res) => {
    try {
        await res.send("This ia a login page")
    }
    catch (error) {
        console.log(error.message)
    }
}