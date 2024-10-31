import React from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { SchemaContainer } from './SchemaContainer'
import ApiVariableContainer from './ApiVariableContainer'
import InputContainer from './InputContainer'

const RequestContainer = () => {
	return (
		<div>
            <InputContainer />
			<PanelGroup
				autoSaveId='input-container-partation'
				direction='horizontal'>
				<Panel>
					<SchemaContainer />
				</Panel>
				<PanelResizeHandle />
				<Panel>
					<ApiVariableContainer />
				</Panel>
			</PanelGroup>
		</div>
	)
}

export default RequestContainer
