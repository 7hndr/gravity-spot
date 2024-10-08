import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Title, Text, Button, Icon } from '@/shared/ui'
import styles from './SpotPage.module.scss'
import { GET } from '@/shared/api'

// TODO: переместить в api
const getSpot = async id => {
	return GET(`spots/${id}`)
}

export const SpotPage = () => {
	const { id } = useParams()
	const { data, isLoading, error, isSuccess } = useQuery({
		queryKey: ['spot', id],
		queryFn: () => getSpot(id)
	})

	if (isLoading) {
		return <Text>Loading...</Text>
	} else if (isSuccess) {
		return (
			<article className={styles.spotPage}>
				<img
					src={data.image_url}
					className={styles.img}
					alt={data.name}
				/>
				<Title
					size='h2'
					className={styles.title}
				>
					{data.name}
				</Title>
				<Text
					type='secondary'
					className={styles.description}
				>
					{data.description}
				</Text>
				<Text
					type='secondary'
					className={styles.address}
				>
					{data.adress}
				</Text>
				<Button
					mini
					simple
					square
					className={styles.focus}
					onClick={() => {}}
				>
					<Icon name='arrows-to-dot' />
				</Button>
			</article>
		)
	} else if (error) {
		return <Text>Error: {error.message}</Text>
	}
}
