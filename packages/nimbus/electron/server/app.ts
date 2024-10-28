import express from 'express'
import cors from 'cors'
import { mockApiRouter } from './routes/mockSchemaRoutes'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/mockSchemaApi', mockApiRouter)

export { app }
