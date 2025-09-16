// auth controller.js

import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import generateToken from '../utils/token.js';

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
            generateToken(newUser.userId, res)
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
        res.status(500).json({ error: "internal server error" })
    }

}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ error: "Invalid Username" })
        }

        const ispasswordMatch = await bcrypt.compare(password, user.password)

        if (!ispasswordMatch) {
            return res.status(400).json({ error: "Invalid Password" })
        }

        generateToken(user._id, res)

        res.status(200).json({
            email: user.email,
            username: user.username,
            fullname: user.fullname,
            follower: user.follower,
            following: user.following,
            bio: user.bio,
            link: user.link,
            profileImg: user.profileImg,
            coverImg: user.coverImg
        })

    }
    catch (error) {
        console.log(`Error occured in Login field: ${error.message}`)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const logout = async (req, res) => {
    try {

        res.cookie('jwt', '', { maxAge: 0 })
        res.status(200).json({ message: " Logout Successful" })
    }
    catch (error) {
        console.log(`Error occured in logout field: ${error.message}`)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id }).select('-password')
        res.status(200).json(user)

    }
    catch (error) {
        console.log(`Error occured in getMe field: ${error.message}`)
        res.status(500).json({ error: "Internal server error" })
    }
}