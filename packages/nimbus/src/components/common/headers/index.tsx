import { Link } from '@tanstack/react-router'
import React from 'react'

const Header = () => {
	return (
		<div
			className='w-full bg-red-400 flex justify-between items-center flex-1 h-12 px-1'
			style={{
				border: 'var(--border-width) solid var(--color-border)',
				borderRadius: 'var(--border-radius)'
			}}>
			<div>
				<span>logo</span> <Link href='/test/123'>click</Link>
			</div>
			<div>profile</div>
		</div>
	)
}

export default Header
