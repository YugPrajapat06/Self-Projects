const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// Routes
const AuthRouter = require("./routes/auth.routes")
const MovieRouter = require("./routes/movie.routes")

// Use Routes
app.use("/api/auth", AuthRouter)
app.use("/api/movies", MovieRouter)

module.exports = app