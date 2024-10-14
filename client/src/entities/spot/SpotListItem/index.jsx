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
	address,
	geom
}) => {
	const { mapgl } = useContext(MapContext)

	const flyToHandler = () => {
		mapgl?.flyTo({
			essential: true,
			center: geom.coordinates,
			padding: { left: 400 },
			speed: 2,
			zoom: 16
		})
	}

	return (
		<article className={styles.spotListItem}>
			<img
				loading='lazy'
				src={image_url}
				className={styles.img}
				alt={name}
			/>

			<Title
				size='h3'
				className={styles.title}
				ellipsis
			>
				<NavLink
					to={`/spots/${id}`}
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
				<Icon name='location-crosshairs' />
			</Button>
			<Text
				type='secondary'
				className={styles.description}
			>
				{description}
			</Text>
			<Text
				type='secondary'
				className={styles.address}
			>
				{address}
			</Text>
		</article>
	)
}
