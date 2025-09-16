// user model.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true,
    },
    follower: [{
        type: mongoose.Schema.Types.ObjectId,
        default: "",
        ref: "User"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        default: "",
        ref: "User"
    }],
    profileImg: {
        type: String,
        default: ""
    },
    coverImg: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    link: {
        type: String,
        default: ""
    }
}, { timestamps: true })

const User = mongoose.model("user", userSchema)
export default User