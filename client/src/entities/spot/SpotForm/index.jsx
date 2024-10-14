import { useContext } from 'react'
import { Block, Button, Icon, Text } from '@/shared/ui'
import { FormField } from '@/shared/components/FormField'
import styles from './SpotForm.module.scss'
import { MapContext } from '@/pages/MainPage/index'
import { useSpotForm } from './useSpotForm'
import { Loader } from '@/shared/components/Loader'
import { useMapPin } from '@/shared/hooks/useMapPin'

export const SpotForm = ({
	initialData,
	isEditing,
	handleCancel,
	initialPoint,
	addSpotMutation,
	updateSpotMutation
}) => {
	const { pickedPoint, isPickingPoint, pickPointHandler } =
		useMapPin(initialPoint)
	const { schema, formData, handleChange, handleSubmit, isLoading } =
		useSpotForm({
			initialData,
			isEditing,
			pickedPoint,
			addSpotMutation,
			updateSpotMutation
		})

	const { mapgl } = useContext(MapContext)

	const handleSubmitWrapper = e => {
		handleSubmit(e, () => {})
	}

	const flyToHandler = () => {
		mapgl?.flyTo({
			essential: true,
			padding: { left: 400 },
			center: pickedPoint.coordinates,
			speed: 2
		})
	}

	if (isLoading) return <Loader />

	return (
		<form
			onSubmit={handleSubmitWrapper}
			className={styles.form}
		>
			{Object.entries(schema).map(([key, field]) => {
				if (field.hidden || key === 'id' || field.type === 'Embedded')
					return null

				return (
					<FormField
						key={key}
						label={`${field.name || key}${
							field.required ? '*' : ''
						}`}
						field={field}
						disabled={isPickingPoint}
						value={formData[key] || ''}
						onChange={handleChange(key)}
					/>
				)
			})}
			<Button
				simple
				onClick={pickPointHandler}
			>
				<Icon name='map-pin' />
				{isPickingPoint
					? 'Picking...'
					: pickedPoint
					? 'Change location'
					: 'Pick a point on the map'}
			</Button>
			{pickedPoint && (
				<Block
					aic
					col
					sb
				>
					<Text>
						Picked point:
						{pickedPoint.coordinates
							.map(c => c.toFixed(6))
							.join(', ')}
					</Text>
					<Button
						mini
						simple
						square
						onClick={flyToHandler}
					>
						<Icon name='location-crosshairs' />
					</Button>
				</Block>
			)}
			<div className={styles.formActions}>
				{handleCancel && (
					<Button
						type='button'
						onClick={handleCancel}
						simple
					>
						Cancel
					</Button>
				)}
				<Button
					type='submit'
					disabled={isLoading || !pickedPoint}
				>
					<Icon name='plus' />
					{isEditing
						? isLoading
							? 'Updating...'
							: 'Update spot'
						: isLoading
						? 'Adding...'
						: 'Add a new spot'}
				</Button>
			</div>
		</form>
	)
}
