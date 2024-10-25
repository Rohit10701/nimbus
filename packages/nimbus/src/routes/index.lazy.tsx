import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
    const [data, setData ] = useState()
    useEffect(()=>{
        const fetchData = async () => {
            const res = await fetch('http://localhost:3001/')
            const ans = await res.json()
            console.log({ans})
            setData(ans)
        }
        fetchData()
    },[])
  return (
    <div className="p-2">
      <h3 className='text-red-700'>Welcome Home! { data} </h3>
    </div>
  )
}