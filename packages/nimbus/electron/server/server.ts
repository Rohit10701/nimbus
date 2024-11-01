import express from 'express'
import cors from 'cors'
import { mockApiRouter } from './routes/mockSchemaRoutes'
import * as dotenv from "dotenv"
import { db } from './config/db'
dotenv.config()

const PORT = 3001
function nodeServer() {
	const app = express()

	app.use(express.json())
	app.use(cors())

	app.use('/mockSchemaApi', mockApiRouter)
	app.get('/mockSchema/:id', async (req, res) => {
		const { id } = req.params;
		// const {page, limit}  = req.query
		try {
			const row = await db('MockApiData').where({ id }).first();
	
			if (row) {
				res.status(200).json({
					id : row.id,
					data : JSON.parse(row.data)
				});
			} else {
				res.status(404).json({ error: 'Data not found' });
			}
		} catch (error) {
			console.error('Database error:', error);
			res.status(500).json({ error: 'Database error' });
		}
	});
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

export default nodeServer
