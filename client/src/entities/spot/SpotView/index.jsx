import { Title, Text, Button, Icon, Divider } from '@/shared/ui'
import styles from './SpotView.module.scss'
import { useSpotSchema } from '../useSpotSchema'
export const SpotView = ({ data, onEdit, onDelete, onFlyTo, onReturn }) => {
	const { schema, isSchemaLoaded } = useSpotSchema()

	return (
		isSchemaLoaded && (
			<article className={styles.spotView}>
				<div className={styles.header}>
					<Button
						simple
						square
						mini
						className={styles.back}
						onClick={onReturn}
					>
						<Icon name='arrow-left' />
					</Button>
					<Title
						size='h2'
						ellipsis
						className={styles.title}
					>
						{data.name}
					</Title>
					<div className={styles.actions}>
						<Button
							mini
							simple
							square
							onClick={onEdit}
						>
							<Icon name='pen-to-square' />
						</Button>
						<Button
							mini
							simple
							square
							onClick={onDelete}
						>
							<Icon
								color='var(--error-text)'
								name='trash-can'
							/>
						</Button>
						<Button
							mini
							simple
							square
							onClick={onFlyTo}
						>
							<Icon name='location-crosshairs' />
						</Button>
					</div>
				</div>
				<Divider />
				<img
					loading='lazy'
					src={data.image_url}
					className={styles.img}
					alt={data.name}
				/>
				<Text
					type='secondary'
					className={styles.description}
				>
					{schema?.description?.name || 'description'}
				</Text>
				<Text className={styles.description}>{data.description}</Text>
				<Text
					type='secondary'
					className={styles.address}
				>
					{schema?.address?.name || 'address'}
				</Text>
				<Text className={styles.address}>{data.address}</Text>
			</article>
		)
	)
}
