import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { JsonObjectType } from '../types/json'
import { generateTheMockDataFromSchema, parseJsonData } from '../utils/json'
import { db } from '../config/db'
import { handleError, simulateLatency, validateMetadata } from '../utils/contollers/mock'
import parseJson, { JSONError } from 'parse-json'


type ApiDataType = {
	id: string;
	schema: string;
	data: string;
	createdAt: string;
	updatedAt: string;
	version: string;
	metadata: string;
  };
  
// CREATE - Create new mock data
export const createMockApi = async (req: Request, res: Response): Promise<void> => {
	const startTime = Date.now()
	const requestId = uuidv4()

	try {
		if (!req.body?.schema || !req.body?.metadata) {
			res.status(400).json({
				error: "Request body must include 'schema' and 'metadata'.",
				requestId,
				timestamp: new Date().toISOString()
			})
			return
		}

		const metadata = req.body.metadata as MockApiMetadata
		validateMetadata(metadata)

		// if (metadata.errorRate && Math.random() * 100 < metadata.errorRate) {
		// 	const errorCode = parseInt(metadata.errorCode || '500', 10)
		// 	res.status(errorCode).json({
		// 		error: `Simulated error (${errorCode})`,
		// 		requestId,
		// 		timestamp: new Date().toISOString()
		// 	})
		// 	return
		// }
		let jsonSchema: JsonObjectType = {}
		try {
			jsonSchema = parseJson(req.body.schema) as JsonObjectType
		} catch (error) {
			if (error instanceof JSONError) {
				res.status(400).json({
					error: 'Format of Schema is incorrect!',
					requestId,
					timestamp: new Date().toISOString()
				})
			} else {
				res.status(500).json({
					error: 'Internal Server Error Caused by Schema!',
					requestId,
					timestamp: new Date().toISOString()
				})
			}
		}

		const limit = metadata.limit || 10
		const mockData: JsonObjectType[] = []
		Array.from({ length: limit }, () => {
			mockData.push(generateTheMockDataFromSchema(JSON.parse(JSON.stringify(jsonSchema))))
		})

		const mockApiId = uuidv4()
		const createdAt = new Date().toISOString()
		const updatedAt = createdAt

		try {
			await db('MockApiData').insert({
				id: String(mockApiId), // Ensure it's a string
				schema: JSON.stringify(jsonSchema), // Already handled
				data: JSON.stringify(mockData), // Already handled
				createdAt: createdAt, // Ensure it's a string
				updatedAt: updatedAt, // Ensure it's a string
				version: "v" + metadata.version,
				metadata: JSON.stringify(metadata) // Already handled
			})
		} catch (dbError) {
			handleError(dbError, requestId, res)
			return
		}

		// await simulateLatency(metadata)

		// if (metadata.headers) {
		// 	Object.entries(metadata.headers).forEach(([key, value]) => {
		// 		res.setHeader(key, value)
		// 	})
		// }

		const response: MockApiResponse<{ id: string; data: JsonObjectType[] }> = {
			data: {
				id: mockApiId,
				data: mockData
			},
			metadata: {
				requestId,
				timestamp: new Date().toISOString(),
				processingTime: Date.now() - startTime
			}
		}

		res.status(201).json(response)
	} catch (error) {
		handleError(error, requestId, res)
	}
}
// b56175ea-5413-46c1-bc84-7dc67370f85c
// READ - Get mock data with pagination and filtering
export const getMockApi = async (req: Request, res: Response): Promise<void> => {
	const startTime = Date.now()
	const requestId = uuidv4()
	console.log({requestId})
	try {
		const { id, version } = req.params
		const {
			page = 1,
			limit = 10,
			sortBy = 'createdAt',
			sortOrder = 'desc'
		} = req.query as unknown as PaginationOptions
		const metadata: MockApiMetadata = req.query as unknown as MockApiMetadata

		if (!id) throw new Error('Mock API ID is required')
		// validateMetadata(metadata)

		// Simulate errors if specified
		if (metadata.errorRate && Math.random() * 100 < metadata.errorRate) {
			const errorCode = parseInt(metadata.errorCode || '500')
			res
				.status(errorCode)
				.json({
					error: `Simulated error (${errorCode})`,
					requestId,
					timestamp: new Date().toISOString()
				})
			return
		}

		// Pagination calculations
		const startIndex = (Number(page) - 1) * Number(limit)
		const safeSortBy = getSafeSortField(sortBy)
		const safeSortOrder = getSafeSortOrder(sortOrder)

		const rawMockData : ApiDataType[] = await db.select("*").from('MockApiData').where("id", id)
		console.log({rawMockData})
		const {data : jsonMockData, error} = parseJsonData(rawMockData[0].data)
		console.log({jsonMockData})
		if (error){
			res.status(500).json({error})
		}


		if (!jsonMockData || jsonMockData.length === 0) {
			res
				.status(404)
				.json({ error: 'Mock API not found', requestId, timestamp: new Date().toISOString() })
			return
		}
		const paginatedData = startIndex ? jsonMockData.slice(startIndex, startIndex+Number(limit)) : jsonMockData
		await simulateLatency(metadata)

		const response: MockApiResponse<typeof jsonMockData> = {
			data:paginatedData ,
			metadata: {
				requestId,
				timestamp: new Date().toISOString(),
				processingTime: Date.now() - startTime,
				page: Number(page),
				totalPages: Math.ceil(jsonMockData.length / Number(limit)),
				totalRecords: jsonMockData.length
			}
		}

		res.status(200).json(response)
	} catch (error) {
		handleError(error, requestId, res)
	}
}

// DELETE - Delete mock data
export const deleteMockApi = async (req: Request, res: Response): Promise<void> => {
	const startTime = Date.now()
	const requestId = uuidv4()

	try {
		const { id } = req.params
		const metadata: MockApiMetadata = req.query as unknown as MockApiMetadata

		if (!id) throw new Error('Mock API ID is required')
		validateMetadata(metadata)

		// Simulate errors if specified
		if (metadata.errorRate && Math.random() * 100 < metadata.errorRate) {
			const errorCode = parseInt(metadata.errorCode || '500')
			res
				.status(errorCode)
				.json({
					error: `Simulated error (${errorCode})`,
					requestId,
					timestamp: new Date().toISOString()
				})
			return
		}

		const result = await db('MockApiData').where({ id }).del()

		if (!result) {
			res
				.status(404)
				.json({ error: 'Mock API not found', requestId, timestamp: new Date().toISOString() })
			return
		}

		await simulateLatency(metadata)

		const response: MockApiResponse<null> = {
			data: null,
			metadata: {
				requestId,
				timestamp: new Date().toISOString(),
				processingTime: Date.now() - startTime
			}
		}

		res.status(204).json(response)
	} catch (error) {
		handleError(error, requestId, res)
	}
}

// LIST - Get all mock APIs with pagination
export const listMockApis = async (req: Request, res: Response): Promise<void> => {
	const startTime = Date.now()
	const requestId = uuidv4()

	try {
		const {
			page = 1,
			limit = 10,
			sortBy = 'createdAt',
			sortOrder = 'desc'
		} = req.query as unknown as PaginationOptions
		const metadata: MockApiMetadata = req.query as unknown as MockApiMetadata

		validateMetadata(metadata)

		// Simulate errors if specified
		if (metadata.errorRate && Math.random() * 100 < metadata.errorRate) {
			const errorCode = parseInt(metadata.errorCode || '500')
			res
				.status(errorCode)
				.json({
					error: `Simulated error (${errorCode})`,
					requestId,
					timestamp: new Date().toISOString()
				})
			return
		}

		const totalRecords = await db('MockApiData')
			.count('id as count')
			.first()
			.then((row) => row?.count || 0)

		// Pagination calculations
		const startIndex = (Number(page) - 1) * Number(limit)
		const safeSortBy = getSafeSortField(sortBy)
		const safeSortOrder = getSafeSortOrder(sortOrder)

		const paginatedData = await db('MockApiData')
			.orderBy(safeSortBy, safeSortOrder)
			.limit(Number(limit))
			.offset(startIndex)

		await simulateLatency(metadata)

		const response: MockApiResponse<typeof paginatedData> = {
			data: paginatedData,
			metadata: {
				requestId,
				timestamp: new Date().toISOString(),
				processingTime: Date.now() - startTime,
				page: Number(page),
				totalPages: Math.ceil(totalRecords / Number(limit)),
				totalRecords
			}
		}

		res.status(200).json(response)
	} catch (error) {
		handleError(error, requestId, res)
	}
}

// Note - check the commit `07fee67c` in ipc-test branch for 1st iteration




const allowedSortFields = ['createdAt', 'updatedAt', 'id']
const getSafeSortField = (field: string) =>
	allowedSortFields.includes(field) ? field : 'createdAt'

const allowedSortOrder = ['asc', 'desc']
const getSafeSortOrder = (order: string) => (allowedSortOrder.includes(order) ? order : 'desc')
