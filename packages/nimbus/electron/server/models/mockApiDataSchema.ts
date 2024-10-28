const MockApiDataSchema = {
	name: 'MockApiData',
	primaryKey: '_id',
	properties: {
		_id: 'uuid', // _id ll be uuid
		schema: 'string', // JSON.stringfy Schema
		data: 'string[]', // JSON.stringfy created Response
		createdAt: 'date', // timestamp
		metadata: 'RequestMetadata', // one to one mapping with RequestMetadata
	}
}


export { MockApiDataSchema }

