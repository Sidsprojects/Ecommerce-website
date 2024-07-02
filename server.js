const app = require("./app.js")
const dotenv = require("dotenv")
const connectDatabase = require("./config/database.js")

// The config for env
dotenv.config({path: "Backend/config/config.env"})
// Handling uncaught errors
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the server due to uncaught exception")

    process.exit(1)
})

// Connecting to the database
connectDatabase()
// console.log(youtube)


const server = app.listen(process.env.PORT,()=>{
    console.log(`The server is working on http://localhost:${process.env.PORT}`)
})

// Unhandled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the server due to Unhandled promise rejection")

    server.close(()=>{
        process.exit(1)
    })
})