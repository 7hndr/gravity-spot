import { useContext } from 'react'
import styles from './SpotListItem.module.scss'
import { Title, Text, Button, Icon } from '@/shared/ui'
import { MapContext } from '@/pages/MainPage/index'
import { NavLink } from 'react-router-dom'

export const SpotListItem = ({
	_id: id,
	name,
	description,
	image_url,
	adress,
	geom
}) => {
	const { mapgl } = useContext(MapContext)

	const flyToHandler = () => {
		mapgl?.flyTo({ essential: true, center: geom.coordinates })
	}

	return (
		<article className={styles.spotListItem}>
			<img
				src={image_url}
				className={styles.img}
				alt={name}
			/>

			<Title size='h3'>
				<NavLink
					to={`/spots/${id}`}
					className={styles.title}
					title={name}
				>
					{name}
				</NavLink>
			</Title>

			<Button
				mini
				simple
				square
				className={styles.focus}
				onClick={flyToHandler}
			>
				<Icon name='arrows-to-dot' />
			</Button>
			<Text
				type='secondary'
				className={styles.description}
			>
				{description}
			</Text>
			<Text
				type='secondary'
				className={styles.adress}
			>
				{adress}
			</Text>
		</article>
	)
}
