import { createFileRoute } from '@tanstack/react-router'
import MockApiView from '../../../components/views/MockApiView'

export const Route = createFileRoute('/(home)/_layout/')({
	component: () => {
		return <WorkspacePage />
	}
})

const WorkspacePage = () => {
	return (
		<div className=' w-full h-svh flex-1 my-1'>
			<MockApiView />
		</div>
	)
}

export default WorkspacePage
