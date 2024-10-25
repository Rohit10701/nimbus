import { Editor } from '@monaco-editor/react'
import React from 'react'

interface SchemaEditorProps {
    value : string | undefined
    updateHandler : (value : string | undefined) => void
}
const SchemaEditor = ({value, updateHandler} : SchemaEditorProps) => {
  return (
    <div className='h-[400px] w-full'> 
    <Editor options={{
        "automaticLayout" : true
    }} theme='vs-dark' language='json' height="100%" defaultValue={value}  onChange={(e)=>updateHandler(e)} />
    </div>
  )
}

export default SchemaEditor