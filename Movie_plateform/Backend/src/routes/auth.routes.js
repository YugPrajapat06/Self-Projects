const userModel = require('../models/user.model');
const AuthRouter = require('express').Router()
const AuthController = require("../controllers/auth.controller")
const AuthMiddleware = require("../middleware/auth.middleware")



AuthRouter.post("/register",AuthController.RegisterController)
AuthRouter.post("/login",AuthController.LoginController)
AuthRouter.get("/get-me",AuthMiddleware.IdentifyUser,AuthController.GetMeController)
AuthRouter.post("/logout",AuthMiddleware.IdentifyUser,AuthController.LogoutController)

module.exports = AuthRouter