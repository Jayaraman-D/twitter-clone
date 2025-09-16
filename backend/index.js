// index.js 

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import connectDB from './database/connectDB.js'

app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.get('/', (req, res) => {
    res.send("This is an root file")
})

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)

app.listen(PORT, () => {
    console.log(`server is running on this port: ${process.env.PORT}`)
    connectDB()
})