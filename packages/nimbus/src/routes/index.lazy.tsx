import { createLazyFileRoute } from '@tanstack/react-router'
import { SchemaContainer } from '../components/base/containers/SchemaContainer'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2 w-full h-[100vh] flex-1">
      <SchemaContainer />
    </div>
  )
}