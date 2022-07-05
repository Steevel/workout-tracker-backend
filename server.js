
require('dotenv').config() // this method attaches the env variables to the process object

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT || 4000, () => {
            console.log(`connected to db and listening on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })


