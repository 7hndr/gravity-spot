import { useQuery } from '@tanstack/react-query'
import { SpotList } from '@/entities/spot/SpotList'
import { Divider, Title, Text } from '@/shared/ui'
import styles from './SpotListPage.module.scss'
import { GET } from '@/shared/api'

// TODO: move to api
const getSpotList = async () => {
	return GET('spots')
}

export const SpotListPage = () => {
	const { data, isLoading, error, isSuccess } = useQuery({
		queryKey: ['spotList'],
		queryFn: getSpotList
	})

	if (isLoading) {
		return <Text>Loading...</Text>
	} else if (isSuccess) {
		return (
			<div className={styles.spotListPage}>
				<Title>Spot list</Title>
				<Divider />
				<SpotList spotList={data} />
			</div>
		)
	} else if (error) {
		return <Text>Error: {error.message}</Text>
	}
}
