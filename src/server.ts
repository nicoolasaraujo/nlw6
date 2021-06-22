import "reflect-metadata"
import express, { request, response } from "express"
import './database'

const app = express()

app.get("/test", (request, response) => {
    return response.send("Ola nlw!");
})

app.post("/test", (request, response) => {
    return response.send("Ola nlw, post!")
})

app.listen(3000, () => console.log("server is running"))