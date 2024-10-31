import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import { fileURLToPath } from 'url';
import { startServer } from "./startServer.js"
import { connectToDb } from "./db.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const __path = path.join(__dirname,'dist/assignment/browser')

console.log(__path)

dotenv.config()

const PORT = process.env.SERVER_PORT
const URL = process.env.MONGO_URL

const app = express()
app.use(express.json())

app.use(cors())

connectToDb(URL)

app.use('/',express.static(__path));

startServer(app)

app.listen(PORT , ()=>{
    console.log(`Server running on the port ${PORT}`)
})
