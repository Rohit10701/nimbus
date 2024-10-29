import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { JsonObjectType } from '../types/json'
import { generateTheMockDataFromSchema } from '../utils/json'
import { db } from '../config/db'
import { handleError, simulateLatency, validateMetadata } from '../utils/contollers/mock'

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

		const metadata: MockApiMetadata = req.body.metadata
		validateMetadata(metadata)

		// Simulate errors if specified
		if (metadata.errorRate && Math.random() * 100 < metadata.errorRate) {
			const errorCode = parseInt(metadata.errorCode || '500')
			res.status(errorCode).json({
				error: `Simulated error (${errorCode})`,
				requestId,
				timestamp: new Date().toISOString()
			})
			return
		}

		const jsonSchema: JsonObjectType = req.body.schema
		const limit = metadata.limit || 10
		const mockData: JsonObjectType[] = Array.from({ length: limit }, () =>
			generateTheMockDataFromSchema(jsonSchema)
		)

		// Store in database

		// MockData Table : [_id, schema, data, createAt, updatedAt, metaData]
		const mockApiId = uuidv4()
		const createdAt = new Date().toISOString()
		const updatedAt = createdAt

		const insert = db.prepare(`
      INSERT INTO MockApiData (id, schema, data, createdAt, updatedAt, metadata)
      VALUES (?, ?, ?, ?, ?, ?)
    `)

		insert.run(
			mockApiId,
			JSON.stringify(jsonSchema),
			JSON.stringify(mockData),
			createdAt,
			updatedAt,
			JSON.stringify({
				version: metadata.version,
				limit: metadata.limit
			})
		)

		// realm
		/*    
        realm().write(() => {
          realm().create('MockApiData', {
            _id: mockApiId,
            schema: jsonSchema,
            data: mockData,
            createdAt: new Date(),
            metadata: {
              version: metadata.version,
              limit
            }
          });
        });
    */
		// Removed old constant delay simulation
		await simulateLatency(metadata)

		// Add custom headers if specified
		if (metadata.headers) {
			Object.entries(metadata.headers).forEach(([key, value]) => {
				res.setHeader(key, value)
			})
		}

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

// READ - Get mock data with pagination and filtering
export const getMockApi = async (req: Request, res: Response): Promise<void> => {
	const startTime = Date.now();
	const requestId = uuidv4();

	try {
		const { id } = req.params;
		const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query as unknown as PaginationOptions;
		const metadata: MockApiMetadata = req.query as unknown as MockApiMetadata;

		if (!id) throw new Error('Mock API ID is required');
		validateMetadata(metadata);

		// Simulate errors if specified
		if (metadata.errorRate && Math.random() * 100 < metadata.errorRate) {
			const errorCode = parseInt(metadata.errorCode || '500');
			res.status(errorCode).json({ error: `Simulated error (${errorCode})`, requestId, timestamp: new Date().toISOString() });
			return;
		}

		const statement = db.prepare(`
			SELECT * FROM MockApiData WHERE id = ? ORDER BY ${sortBy} ${sortOrder} LIMIT ? OFFSET ?
		`);
		const startIndex = (Number(page) - 1) * Number(limit);
		const paginatedData = statement.all(id, limit, startIndex);

		if (paginatedData.length === 0) {
			res.status(404).json({ error: 'Mock API not found', requestId, timestamp: new Date().toISOString() });
			return;
		}

		await simulateLatency(metadata);

		const response: MockApiResponse<typeof paginatedData> = {
			data: paginatedData,
			metadata: {
				requestId,
				timestamp: new Date().toISOString(),
				processingTime: Date.now() - startTime,
				page: Number(page),
				totalPages: Math.ceil(paginatedData.length / Number(limit)),
				totalRecords: paginatedData.length
			}
		};

		res.status(200).json(response);
	} catch (error) {
		handleError(error, requestId, res);
	}
};

// DELETE - Delete mock data
export const deleteMockApi = async (req: Request, res: Response): Promise<void> => {
	const startTime = Date.now();
	const requestId = uuidv4();

	try {
		const { id } = req.params;
		const metadata: MockApiMetadata = req.query as unknown as MockApiMetadata;

		if (!id) throw new Error('Mock API ID is required');
		validateMetadata(metadata);

		// Simulate errors if specified
		if (metadata.errorRate && Math.random() * 100 < metadata.errorRate) {
			const errorCode = parseInt(metadata.errorCode || '500');
			res.status(errorCode).json({ error: `Simulated error (${errorCode})`, requestId, timestamp: new Date().toISOString() });
			return;
		}

		const deleteStmt = db.prepare('DELETE FROM MockApiData WHERE id = ?');
		const result = deleteStmt.run(id);

		if (result.changes === 0) {
			res.status(404).json({ error: 'Mock API not found', requestId, timestamp: new Date().toISOString() });
			return;
		}

		await simulateLatency(metadata);

		const response: MockApiResponse<null> = {
			data: null,
			metadata: {
				requestId,
				timestamp: new Date().toISOString(),
				processingTime: Date.now() - startTime
			}
		};

		res.status(204).json(response);
	} catch (error) {
		handleError(error, requestId, res);
	}
};


// LIST - Get all mock APIs with pagination
export const listMockApis = async (req: Request, res: Response): Promise<void> => {
	const startTime = Date.now();
	const requestId = uuidv4();

	try {
		const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query as unknown as PaginationOptions;
		const metadata: MockApiMetadata = req.query as unknown as MockApiMetadata;

		validateMetadata(metadata);

		// Simulate errors if specified
		if (metadata.errorRate && Math.random() * 100 < metadata.errorRate) {
			const errorCode = parseInt(metadata.errorCode || '500');
			res.status(errorCode).json({ error: `Simulated error (${errorCode})`, requestId, timestamp: new Date().toISOString() });
			return;
		}

		const totalStmt = db.prepare('SELECT COUNT(*) as count FROM MockApiData');
		const { count: totalRecords } = totalStmt.get();

		const startIndex = (Number(page) - 1) * Number(limit);
		const paginatedStmt = db.prepare(`
			SELECT * FROM MockApiData ORDER BY ${sortBy} ${sortOrder} LIMIT ? OFFSET ?
		`);
		const paginatedData = paginatedStmt.all(limit, startIndex);

		await simulateLatency(metadata);

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
		};

		res.status(200).json(response);
	} catch (error) {
		handleError(error, requestId, res);
	}
};


// Note - check the commit `07fee67c` in ipc-test branch for 1st iteration
