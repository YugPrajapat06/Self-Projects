const jwt = require("jsonwebtoken")
const redis = require("../config/cache")


async function IdentifyUser(req, res, next) {
    const token = req.cookies.token

    try {
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        isTokenBlacklisted = await redis.get(token)

        if (isTokenBlacklisted) {
            return res.status(401).json({
                message: "Invalid token"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        req.user = decoded
        next()

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    IdentifyUser
}