import React, { useEffect, useState } from 'react'
import SchemaEditor from '../editors/SchemaEditor'
import axios from 'axios'

export const SchemaContainer = () => {
	const [jsonSchemaPayload, setJsonSchemaPayload] = useState<string>()
	const jsonPayloadHandler = (value: string | undefined) => {
		setJsonSchemaPayload(value)
	}
	const logger = async () => {
		const res = await axios.post('http://localhost:3000/', {
			data: jsonSchemaPayload
		})
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
