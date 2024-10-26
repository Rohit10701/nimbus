import React, { useEffect, useState } from 'react'
import SchemaEditor from '../editors/SchemaEditor'
import axios from 'axios'
import { ipcRenderer } from 'electron'

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
    const message = "adsdasd";
    window.electron.sendMessage(message);

    const handleResponse = (event, response) => {
        console.log({ response });
    };

    window.electron.onMessageResponse(handleResponse);

    return () => {
        ipcRenderer.removeListener('response-message', handleResponse);
    };
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
