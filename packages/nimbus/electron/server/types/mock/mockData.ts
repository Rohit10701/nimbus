interface MockApiMetadata {
    limit?: number;
    delay?: number;
    errorRate?: number;
    errorCode?: string;
    authEnabled?: boolean;
    latencyDistribution?: 'constant' | 'normal' | 'exponential';
    version?: string;
    headers?: Record<string, string>;
    rateLimiting?: {
      enabled: boolean;
      requestsPerMinute: number;
    };
    caching?: {
      enabled: boolean;
      ttl: number;
    };
  }
  
  interface MockApiResponse<T> {
    data: T;
    metadata: {
      requestId: string;
      timestamp: string;
      processingTime: number;
      page?: number;
      totalPages?: number;
      totalRecords?: number;
    };
  }
  
  interface PaginationOptions {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }
  