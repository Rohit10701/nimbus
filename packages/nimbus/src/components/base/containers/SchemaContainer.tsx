import React, { useEffect, useState, version } from 'react'
import SchemaEditor from '../editors/SchemaEditor'
import axios from 'axios'

export const SchemaContainer = () => {
	const [jsonSchemaPayload, setJsonSchemaPayload] = useState<string>()
	const jsonPayloadHandler = (value: string | undefined) => {
		setJsonSchemaPayload(value)
	}
	const logger = async () => {
		const res = await axios.post('http://localhost:5000/mockSchemaApi', 
			{
				schema : jsonSchemaPayload,
				metadata : {
					limit : 20,
					version  : 1,
					delay: 200, // min would be 50ms
					errorRate : 10, // 10% max is 100
					errorCode : 500,
					authEnabled : true
				}
			}
		)
		console.log({ res })
	}
  useEffect(() => {
	const fetchSuggestion = async () => {
		console.log('electronAPI:', window.electronAPI);
		const suggestions = await window.electronAPI?.getSuggestions();
		console.log({suggestions})
	}
	fetchSuggestion()
}, []);



	return (
		<div>
			<button
				className='bg-red-500'
				onClick={logger}>
				click
			</button>
			<SchemaEditor
				value={jsonSchemaPayload}
				updateHandler={jsonPayloadHandler}
			/>
		</div>
	)
}

// {
// 	first_name : "$firstName",
// 	last_name :  "$lastName",
// 	product_details : {
// 		product_id : "$uuid",
// 		product_name : "$productName"
// 	}
// }