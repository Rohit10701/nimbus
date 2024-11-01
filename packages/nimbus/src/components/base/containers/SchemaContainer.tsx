import React, { useEffect, useState, version } from 'react'
import SchemaEditor from '../editors/SchemaEditor'
import axios from 'axios'
import { useAppDispatch } from '../../../libs/redux/hooks'
import { saveMockApiRequestData } from '../../../libs/redux/slices/mockApiSlice'
import { useSelector } from 'react-redux'
import { selectMockApiJsonSchema } from '../../../libs/redux/selectors'

export const SchemaContainer = () => {
	// hooks
	const disptach = useAppDispatch()
	const jsonSchemaPayload = useSelector(selectMockApiJsonSchema)

	// handler
	const jsonPayloadHandler = (value: string | undefined) => {
		disptach(saveMockApiRequestData(value))
	}

	useEffect(() => {
		const fetchSuggestion = async () => {
			console.log('electronAPI:', window.electronAPI)
			const suggestions = await window.electronAPI?.getSuggestions()
			console.log({ suggestions })
		}
		fetchSuggestion()
	}, [])

	return (
		<div
			style={{
				border: 'var(--border-width) solid var(--color-border)',
				borderRadius: 'var(--border-radius)'
			}}
			className='h-full'>
			{/* <button
				className='bg-red-500'
				onClick={logger}>
				click
			</button> */}
			<SchemaEditor
				value={jsonSchemaPayload}
				updateHandler={jsonPayloadHandler}
			/>
		</div>
	)
}

/*

	{
		"first_name" : "$firstName",
		"last_name" :  "$lastName",
		"product_details" : {
			"product_id" : "$uuid",
			"product_name" : "$productName"
		}
	}

*/
