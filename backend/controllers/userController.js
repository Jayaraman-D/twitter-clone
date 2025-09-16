// userController.js

import User from "../models/userModel.js";

export const getProfile = async (req, res) => {
    try {
        const { username } = req.params
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        res.status(200).json(user)

    }
    catch (error) {
        console.log(`Error occured in getProfile field: ${error.message}`)
        res.status(500).json({ error: "Internal server Error" })

    }
}

// export const followAndUnfollow = async (req, res) => {
//     try {
//         const { id } = req.params
//         const userToModify = await User.findOne({ _id: id })
//         const currentUser = await User.findOne({ _id: req.user._id })

//         if (id === req.user._id) {
//             return res.status(400).json({ error: "Cannot modify yourself" })
//         }

//         if (!userToModify || !currentUser) {
//             return res.status(400).json({ error: "user not found" })
//         }

//         const isFollowing = currentUser.following.includes(id)

//         if (isFollowing) {
//             // unfollow

//             await User.findByIdAndUpdate({ _id: id }, { $pull: { followers: req.user._id } })
//             await User.findByIdAndUpdate({ id: req.user._id }, { $pull: { following: id } })
//             res.status(200).json({ message: "Unfollowed the user successfully" })
//         }
//         else {
//             //follow

//             await User.findByIdAndUpdate({ _id: id }, { $push: { followers: req.user._id } })
//             await User.findByIdAndUpdate({ id: req.user._id }, { $push: { followers: id } })
//             res.status(200).json({ message: "Followed the user successfully" })
//         }

//         res.status(200).json(user)

//     }
//     catch (error) {
//         console.log(`Error occured in follow and Unfollow field: ${error.message}`)
//         res.status(500).json({ error: "Internal server Error" })
//     }
// }

export const followAndUnfollow = async (req, res) => {
    try {
        const { id } = req.params; // user to follow/unfollow
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        // Cannot follow yourself
        if (id === String(req.user._id)) {
            return res.status(400).json({ error: "Cannot modify yourself" });
        }

        if (!userToModify || !currentUser) {
            return res.status(400).json({ error: "User not found" });
        }

        const isFollowing = currentUser.following.includes(id);

        if (isFollowing) {
            // Unfollow
            await User.findByIdAndUpdate(id, {
                $pull: { followers: req.user._id },
            });
            await User.findByIdAndUpdate(req.user._id, {
                $pull: { following: id },
            });
            return res.status(200).json({ message: "Unfollowed the user successfully" });
        } else {
            // Follow
            await User.findByIdAndUpdate(id, {
                $push: { followers: req.user._id },
            });
            await User.findByIdAndUpdate(req.user._id, {
                $push: { following: id },
            });
            return res.status(200).json({ message: "Followed the user successfully" });
        }
    } catch (error) {
        console.log(`Error occurred in followAndUnfollow: ${error.message}`);
        res.status(500).json({ error: "Internal server error" });
    }
};
