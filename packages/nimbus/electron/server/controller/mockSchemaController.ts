import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { JsonObjectType } from '../types/json';
import { generateTheMockDataFromSchema } from '../utils/json';
import { realm } from '../config/realm';
import { handleError, simulateLatency, validateMetadata } from '../utils/contollers/mock';



// CREATE - Create new mock data
export const createMockApi = async (req: Request, res: Response): Promise<void> => {
  const startTime = Date.now();
  const requestId = uuidv4();

  try {
    if (!req.body?.schema || !req.body?.metadata) {
      res.status(400).json({
        error: "Request body must include 'schema' and 'metadata'.",
        requestId,
        timestamp: new Date().toISOString()
      });
      return;
    }

    const metadata: MockApiMetadata = req.body.metadata;
    validateMetadata(metadata);

    // Simulate errors if specified
    if (metadata.errorRate && Math.random() * 100 < metadata.errorRate) {
      const errorCode = parseInt(metadata.errorCode || '500');
      res.status(errorCode).json({
        error: `Simulated error (${errorCode})`,
        requestId,
        timestamp: new Date().toISOString()
      });
      return;
    }

    const jsonSchema: JsonObjectType = req.body.schema;
    const limit = metadata.limit || 10;
    const mockData: JsonObjectType[] = Array.from(
      { length: limit },
      () => generateTheMockDataFromSchema(jsonSchema)
    );

    // Store in database
    const mockApiId = uuidv4();
    realm().write(() => {
      realm().create('MockApiData', {
        _id: mockApiId,
        schema: JSON.stringify(jsonSchema),
        data: JSON.stringify(mockData),
        createdAt: new Date(),
        metadata: {
          version: metadata.version,
          limit
        }
      });
    });

    // Removed old constant delay simulation
    await simulateLatency(metadata);

    // Add custom headers if specified
    if (metadata.headers) {
      Object.entries(metadata.headers).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
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
    };

    res.status(201).json(response);
  } catch (error) {
    handleError(error, requestId, res);
  }
};

// READ - Get mock data with pagination and filtering
export const getMockApi = async (req: Request, res: Response): Promise<void> => {
  const startTime = Date.now();
  const requestId = uuidv4();

  try {
    const { id } = req.params;
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query as unknown as PaginationOptions;
    const metadata: MockApiMetadata = req.query as unknown as MockApiMetadata;

    if (!id) {
      throw new Error('Mock API ID is required');
    }

    validateMetadata(metadata);

    // Simulate errors if specified
    if (metadata.errorRate && Math.random() * 100 < metadata.errorRate) {
      const errorCode = parseInt(metadata.errorCode || '500');
      res.status(errorCode).json({
        error: `Simulated error (${errorCode})`,
        requestId,
        timestamp: new Date().toISOString()
      });
      return;
    }

    /*

        It checks if _id provided in realm object is equal to first params which is id ( $0 represent first params)

    */
    const mockApiData = realm()
      .objects('MockApiData')
      .filtered('_id == $0', id)
      .sorted(sortBy, sortOrder === 'desc');

    if (mockApiData.length === 0) {
      res.status(404).json({
        error: 'Mock API not found',
        requestId,
        timestamp: new Date().toISOString()
      });
      return;
    }

    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedData = mockApiData.slice(startIndex, endIndex);

    await simulateLatency(metadata);

    const response: MockApiResponse<typeof paginatedData> = {
      data: paginatedData,
      metadata: {
        requestId,
        timestamp: new Date().toISOString(),
        processingTime: Date.now() - startTime,
        page: Number(page),
        totalPages: Math.ceil(mockApiData.length / Number(limit)),
        totalRecords: mockApiData.length
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

    if (!id) {
      throw new Error('Mock API ID is required');
    }

    validateMetadata(metadata);

    // Simulate errors if specified
    if (metadata.errorRate && Math.random() * 100 < metadata.errorRate) {
      const errorCode = parseInt(metadata.errorCode || '500');
      res.status(errorCode).json({
        error: `Simulated error (${errorCode})`,
        requestId,
        timestamp: new Date().toISOString()
      });
      return;
    }

    const mockApiData = realm()
      .objects('MockApiData')
      .filtered('_id == $0', id);

    if (mockApiData.length === 0) {
      res.status(404).json({
        error: 'Mock API not found',
        requestId,
        timestamp: new Date().toISOString()
      });
      return;
    }

    realm().write(() => {
      realm().delete(mockApiData);
    });

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
      res.status(errorCode).json({
        error: `Simulated error (${errorCode})`,
        requestId,
        timestamp: new Date().toISOString()
      });
      return;
    }

    const allMockApis = realm()
      .objects('MockApiData')
      .sorted(sortBy, sortOrder === 'desc');

    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedData = allMockApis.slice(startIndex, endIndex);

    await simulateLatency(metadata);

    const response: MockApiResponse<typeof paginatedData> = {
      data: paginatedData,
      metadata: {
        requestId,
        timestamp: new Date().toISOString(),
        processingTime: Date.now() - startTime,
        page: Number(page),
        totalPages: Math.ceil(allMockApis.length / Number(limit)),
        totalRecords: allMockApis.length
      }
    };

    res.status(200).json(response);
  } catch (error) {
    handleError(error, requestId, res);
  }
};

// Note - check the commit `07fee67c` in ipc-test branch for 1st iteration