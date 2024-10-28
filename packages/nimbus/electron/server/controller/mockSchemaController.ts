import parseJson, { JSONError } from 'parse-json'
import { Request, Response } from 'express'
import { JsonObjectType } from '../types/json'
import { generateTheMockDataFromSchema } from '../utils/json'
import { v4 as uuidv4 } from 'uuid'
import { realm } from '../config/realm'
import { sleep } from '../utils'

const validateMetadata = (metadata: any) => {
	const { limit, delay, errorRate, errorCode, authEnabled } = metadata

	if (typeof limit !== 'number' || limit <= 0) {
		throw new Error('Limit must be a positive number.')
	}
	if (typeof delay !== 'number' || delay < 0) {
		throw new Error('Delay must be a non-negative number.')
	}
	if (typeof errorRate !== 'number' || errorRate < 0 || errorRate > 100) {
		throw new Error('Error rate must be between 0 and 100.')
	}
	if (typeof errorCode !== 'string' || !errorCode.trim()) {
		throw new Error('Error code must be a non-empty string.')
	}
	if (typeof authEnabled !== 'boolean') {
		throw new Error('Auth enabled must be a boolean value.')
	}
}

//  Checks if this error is custom Error created by validateMetadata()
const isErrorWithMessage = (error: unknown): error is { message: string } => {
	return (
		typeof error === 'object' &&
		error !== null &&
		'message' in error &&
		typeof (error as any).message === 'string'
	)
}

const createMockApi = async (req: Request, res: Response) => {
	if (!req.body || !req.body.schema || !req.body.metadata) {
		return res.status(400).json({ error: "Request body must include 'schema' and 'metadata'." })
	}

	try {
		const jsonData: JsonObjectType = parseJson(req.body.schema) as JsonObjectType

		validateMetadata(req.body.metadata)

		const { limitFromRequest, delay, errorRate, errorCode, authEnabled } = req.body.metadata
		const limit = limitFromRequest || 20
		const mockData: JsonObjectType[] = Array.from({ length: limit }, () =>
			generateTheMockDataFromSchema(jsonData)
		)
		// TODO : start time
		const startTime = Date.now()

		realm().write(() => {
			const requestMetadata = realm().create('RequestMetadata', {
				_id: uuidv4(),
				version: req.body.metadata.version,
				limit
			})

			realm().create('MockApiData', {
				_id: uuidv4(),
				schema: JSON.stringify(jsonData),
				data: JSON.stringify(mockData),
				createdAt: new Date(),
				metadata: requestMetadata
			})
		})

		//  TODO : end time
		/*
            totalTime = endTime - startTime
            responseTime = 5ms ( res.status(201).json({ message: "Mock data created successfully.", mockData }); )
            delay = 100ms // req.body.metadata.delay
            sleepTime = delay - totalTime  - responseTime
            sleepTime > 0 ? sleep(sleepTime) :
        */
		const endTime = Date.now()
		const totalTime = endTime - startTime

		const responseTime = 5 // Assuming System takes 5ms to deliver the response res.status(201)
		const sleepTime = delay - totalTime - responseTime

		if (sleepTime > 0) {
			await sleep(sleepTime)
		}

		res.status(201).json({ message: 'Mock data created successfully.', mockData })
	} catch (error) {
		console.error({ error })

		if (error instanceof JSONError) {
			return res.status(400).json({ error: 'Invalid JSON format.' })
		} else if (
			isErrorWithMessage(error) &&
			(error.message.startsWith('Limit') ||
				error.message.startsWith('Delay') ||
				error.message.startsWith('Error rate'))
		) {
			return res.status(400).json({ error: error.message })
		} else {
			return res.status(500).json({ error: 'Internal Server Error.' })
		}
	}
}

const getSingleMockApi = async (req: Request, res: Response) => {
	// Extract page, limit, ...
	const { mockDataId, page, limit, delay, errorRate, errorCode, authEnabled, noLimit } = req.query;

	// Validate the presence of mockDataId
	if (!mockDataId || typeof mockDataId !== 'string') {
		return res
			.status(400)
			.json({ error: "Query parameter 'mockDataId' is required and must be a string." });
	}

	// Start time for performance measurement
	const startTime = Date.now();

	try {
		const mockApiData = realm().objects('MockApiData').filtered('id == $0', mockDataId).toJSON();

		// If no data found, respond with 404
		if (mockApiData.length === 0) {
			return res.status(404).json({ error: 'No mock data found with the provided ID.' });
		}

		// Simulate an error based on errorRate
		if (errorRate) {
			const randomValue = Math.random() * 100; // Generate a number between 0 and 100
			if (randomValue < parseFloat(errorRate as string)) {
				return res.status(500).json({ error: 'Simulated internal server error based on error rate.' });
			}
		}

		if (errorCode) {
			switch (errorCode) {
				case '400':
					return res.status(400).json({ error: 'Simulated bad request error.' });
				case '401':
					return res.status(401).json({ error: 'Simulated unauthorized error.' });
				case '404':
					return res.status(404).json({ error: 'Simulated not found error.' });
				case '500':
					return res.status(500).json({ error: 'Simulated internal server error.' });
				default:
					return res.status(400).json({ error: 'Invalid error code provided.' });
			}
		}

		const pageNum = parseInt(page as string, 10) || 1; // Default to page 1
		const limitNum = parseInt(limit as string, 10) || 10; // Default to 10 items
		const startIndex = (pageNum - 1) * limitNum;
		const endIndex = startIndex + limitNum;

		const responseData = noLimit ? mockApiData : mockApiData.slice(startIndex, endIndex);
		
		const endTime = Date.now();
		const totalTime = endTime - startTime;

		const responseTime = 5;
		const sleepTime = (delay ? parseInt(delay as string, 10) : 0) - totalTime - responseTime; // Remaining time to sleep

		if (sleepTime > 0) {
		    await sleep(sleepTime); // Delay before sending the response
		}

		res.status(200).json({ mockData: responseData });
	} catch (error) {
		console.error({ error });
		return res.status(500).json({ error: 'Internal Server Error.' });
	}
};



export {createMockApi, getSingleMockApi}
