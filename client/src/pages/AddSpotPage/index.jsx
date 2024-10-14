import { Title, Divider } from '@/shared/ui'
import styles from './AddSpotPage.module.scss'
import { useMapPin } from '@/shared/hooks/useMapPin'
import { useSpotForm } from '@/entities/spot/SpotForm/useSpotForm'
import { SpotForm } from '@/entities/spot/SpotForm'
import { useSpotItem } from '@/entities/spot/useSpotItem'

export const AddSpotPage = () => {
	const { pickedPoint, isPickingPoint, pickPointHandler } = useMapPin()
	const { addSpotMutation, updateSpotMutation } = useSpotItem()
	const { schema, formData, handleChange, isLoading, handleSubmit } =
		useSpotForm({ initialData: {}, addSpotMutation, updateSpotMutation })

	if (!schema) return <div>Loading...</div>

	return (
		<div className={styles.formWrapper}>
			<Title size='h1'>Add a new spot</Title>
			<Divider />
			<SpotForm
				schema={schema}
				formData={formData}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				isPickingPoint={isPickingPoint}
				pickedPoint={pickedPoint}
				pickPointHandler={pickPointHandler}
				isLoading={isLoading}
				addSpotMutation={addSpotMutation}
				updateSpotMutation={updateSpotMutation}
			/>
		</div>
	)
}
