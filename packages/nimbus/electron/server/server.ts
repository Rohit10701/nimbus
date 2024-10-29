import express from 'express'
import cors from 'cors'
import { mockApiRouter } from './routes/mockSchemaRoutes'
import * as dotenv from "dotenv"
dotenv.config()

const PORT = 3001
function nodeServer() {
	const app = express()

	app.use(express.json())
	app.use(cors())

	app.use('/mockSchemaApi', mockApiRouter)
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

export default nodeServer
