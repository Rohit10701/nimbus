import React, { useState } from 'react'
import SchemaEditor from '../editors/SchemaEditor'
import axios from 'axios'

export const SchemaContainer = () => {
    const [jsonSchemaPayload, setJsonSchemaPayload] = useState<string>()
    const jsonPayloadHandler = (value : string | undefined) => {
        setJsonSchemaPayload(value)
    }
    const logger = async () => {
        const res = await axios.post("http://localhost:3000/", {
        data : jsonSchemaPayload
        })
        console.log({res})
    }
  return (
    <div>
        <button className='bg-red-500' onClick={logger}>click</button>
        <SchemaEditor value={jsonSchemaPayload} updateHandler={jsonPayloadHandler}/>
    </div>
  )
}
