import { useParams } from 'react-router-dom'
import { SpotItem } from '@/entities/spot/SpotItem'

export const SpotPage = () => {
	const { id } = useParams()

	return <SpotItem id={id} />
}
