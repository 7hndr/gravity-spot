import { Auth } from '@/features/auth'
import { Block } from '@/shared/ui'

export const EntryPage = () => {
	return (
		<div
			style={{
				justifyContent: 'center',
				alignContent: 'center',
				display: 'grid'
			}}
		>
			<Block>
				<Auth />
			</Block>
		</div>
	)
}
