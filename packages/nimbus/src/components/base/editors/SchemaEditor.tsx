import { Editor, Monaco, OnMount } from '@monaco-editor/react'
import React, { useRef } from 'react'

interface SchemaEditorProps {
	value: string | undefined
	updateHandler: (value: string | undefined) => void
}

const SchemaEditor = ({ value, updateHandler }: SchemaEditorProps) => {
	const monacoRef = useRef<Monaco | null>(null)

	const handleEditorDidMount: OnMount = (editor, monaco) => {
		monacoRef.current = monaco
	}

	const handleEditorWillMount = (monaco: Monaco) => {
		// Disable default JSON autocompletions by not registering the JSON language completion provider
		monaco.languages.json.jsonDefaults.setModeConfiguration({
			completionItems: false
		})

		// Register a custom completion provider for '$'
		monaco.languages.registerCompletionItemProvider('json', {
			triggerCharacters: ['$'],
			provideCompletionItems: (model, position) => {
				// Get the text up to the current cursor position
				const word = model.getWordUntilPosition(position)
				const range = {
					startLineNumber: position.lineNumber,
					endLineNumber: position.lineNumber,
					startColumn: word.startColumn,
					endColumn: word.endColumn
				}

				// Define custom suggestions when typing '$'
				return {
					suggestions: [
						{
							label: '$firstName',
							kind: monaco.languages.CompletionItemKind.Function,
							insertText: '$firstName',
							range: range,
							detail: 'Custom option 1'
						},
						{
							label: '$lastName',
							kind: monaco.languages.CompletionItemKind.Function,
							insertText: '$lastName',
							range: range,
							detail: 'Custom option 2'
						}
					]
				}
			}
		})
	}

	return (
		<div className="h-[400px] w-full">
			<Editor
				options={{
					automaticLayout: true
				}}
				theme="vs-dark"
				language="json"
				height="100%"
				defaultValue={value}
				beforeMount={handleEditorWillMount}
				onChange={(newValue) => updateHandler(newValue)}
				onMount={handleEditorDidMount}
			/>
		</div>
	)
}

export default SchemaEditor
