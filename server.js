import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import tourRouter from './routes/tours.js'
import authRouter from './routes/auth.js'

dotenv.config()


const app = express()

mongoose.set("strictQuery",false);
const connect = async () =>{
    try { 
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true

        })
        console.log("connection sucesss")
    } catch (error) {
        console.log("connect failed",error)
        
    }
}


app.get("/",(req,res)=>{
    res.send("api is working")
})


app.use(express.json())
app.use(cors({
    origin: 'http://localhost:4200*',
    credentials: true,
}))
app.use(cookieParser())
app.use('/tours',tourRouter)
app.use('/auth',authRouter)
const port = process.env.PORT || 8000

app.listen(port,()=>{
    connect();
    console.log('server listening to port ',port)
})