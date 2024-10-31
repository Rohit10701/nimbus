import { createFileRoute, Link } from '@tanstack/react-router'
import MockApiView from '../../../components/views/MockApiView'

export const Route = createFileRoute('/(home)/_layout/')({
	component: () => {
		return <WorkspacePage />
	}
})

const WorkspacePage = () => {
	return (
		<div className=' w-full h-screen flex-1 my-2'>
			<MockApiView />
		</div>
	)
}

export default WorkspacePage
