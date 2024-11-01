import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/test/$testId')({
  component: Test,
})

export default function Test() {
  const { testId } = Route.useParams()
  return <div>Test : {testId}
  <Link href='/'>link</Link></div>
}
