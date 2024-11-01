import React from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { SchemaContainer } from '../base/containers/SchemaContainer'
import ApiVariableContainer from '../base/containers/ApiVariableContainer'
import InputContainer from '../base/containers/InputContainer'
import RequestContainer from '../base/containers/RequestContainer'
import ResponseContainer from '../base/containers/ResponseContainer'

const MockApiView = () => {
	return (
		<>
			<PanelGroup
				autoSaveId='main-container'
				direction='horizontal'>
				<Panel
					className='bg-red-300 mr-1'
					style={{
						border: 'var(--border-width) solid var(--color-border)',
						borderRadius: 'var(--border-radius)'
					}}
					collapsedSize={5}
					collapsible
					maxSize={50}
					minSize={20}>
					left
				</Panel>
				<PanelResizeHandle />
				<Panel className=''>
					<PanelGroup
						autoSaveId='input-container'
						direction='vertical'>
						<Panel className='mb-2'>
							<PanelGroup
								direction='vertical'
								autoSaveId='request-body-container'>
								<Panel className='max-h-fit mb-2'>
									<InputContainer />
								</Panel>
								<PanelResizeHandle />
								<Panel>
									<PanelGroup
										className='h-full '
										autoSaveId='input-container-partation'
										direction='horizontal'>
										<Panel className='mr-1'>
											<SchemaContainer />
										</Panel>
										<PanelResizeHandle />
										<Panel className=''>
											<ApiVariableContainer />
										</Panel>
									</PanelGroup>
								</Panel>
							</PanelGroup>
						</Panel>
						<PanelResizeHandle />
						<Panel>
							<ResponseContainer />
						</Panel>
					</PanelGroup>
				</Panel>
			</PanelGroup>
		</>
	)
}

export default MockApiView
