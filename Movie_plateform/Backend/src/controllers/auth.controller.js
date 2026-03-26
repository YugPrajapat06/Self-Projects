const userModel = require("../models/user.model")
const bcypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const redis = require("../config/cache")


async function RegisterController(req, res) {
    const { username, email, password } = req.body
    const hash = await bcypt.hash(password, 10)
 
    const isUserExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (isUserExist) {
        return res.status(400).json({
            success: false,
            message: "User with same username or email already exists"
        })
    }

    try {
        const user = await userModel.create({
            username,
            email,
            password: hash
        })


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
        res.cookie("token", token)


        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User registration failed",
            error: error.message
            
        })
    }
}

async function LoginController(req,res) {
    const {username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        })
    }

    const isMatch = await bcypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
    res.cookie("token", token)

    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user
    })
}

async function GetMeController(req,res) {
    const userId = req.user.id
    try {
        const user = await userModel.findById(userId).select("-password")
        res.status(200).json({
            success: true,
            message: "User data retrieved successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve user data",
            error: error.message
        })
    }
}

async function LogoutController(req,res) {
    const token = req.cookies.token

    res.clearCookie("token")

    await redis.set(token, Date.now(), "EX", 60 * 60 * 24) // Set token in Redis with an expiration time of 24 hours

    res.status(200).json({
        success: true,
        message: "User logged out successfully"
    })
}


module.exports = {
    RegisterController,
    LoginController,
    GetMeController,
    LogoutController
}
