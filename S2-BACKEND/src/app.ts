import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import { handleErrors } from './error'
import { userRoutes } from './routes/user.routes'
import { loginRoute } from './routes/login.routes'
import { contactRoutes } from './routes/contact.routes'
import cors from 'cors'

export const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}))

app.use("/login", loginRoute)
app.use("/user", userRoutes)
app.use("/contacts", contactRoutes)


app.use(handleErrors)