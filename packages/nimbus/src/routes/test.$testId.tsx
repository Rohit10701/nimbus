import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/test/$testId')({
  component: Test,
})

export default function Test() {
  const { testId } = Route.useParams()
  return <div>Test : {testId}</div>
}
