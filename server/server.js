require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const workoutRoutes = require('./routes/workouts')
const userRoutes = require("./routes/userRoute")

// express app
const app = express()

// middleware
app.use(express.json())

app.use(cors({
   origin: "http://localhost:3000",
   withCredentials: true
}))

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

mongoose.set('strictQuery', false);


// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })

