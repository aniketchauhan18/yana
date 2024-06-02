import express , { Express, Request, Response } from 'express';
import cors from 'cors'
import connectDB from '../db/dbConnection'
import { PORT } from './config'
import userRouter from '../routes/v1/user.routes'
const app: Express = express();


app.use(cors());
app.use(express.json());
connectDB()
console.log('hiiii')
app.use('/users', userRouter)
console.log('hiiii')

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
