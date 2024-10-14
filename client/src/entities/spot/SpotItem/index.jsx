import { useContext, useState, useEffect } from 'react'
import { MapContext } from '@/pages/MainPage/index'
import { useNavigate } from 'react-router-dom'
import { SpotForm } from '@/entities/spot/SpotForm'
import { Loader } from '@/shared/components/Loader'
import { Error } from '@/shared/components/Error'
import { Title, Divider } from '@/shared/ui'
import { SpotView } from '../SpotView'
import { useSpotItem } from '../useSpotItem'
import styles from './SpotItem.module.scss'

export const SpotItem = ({ id }) => {
	const [isEditing, setIsEditing] = useState(false)
	const { mapgl } = useContext(MapContext)
	const navigate = useNavigate()

	const {
		data,
		isLoading,
		error,
		isSuccess,
		schema,
		deleteHandler,
		addSpotMutation,
		updateSpotMutation
	} = useSpotItem({ id, setIsEditing })

	const flyToHandler = ({ geom, mapgl }) => {
		if (!geom) return

		mapgl?.flyTo({
			essential: true,
			padding: { left: 400 },
			center: geom.coordinates,
			speed: 2,
			zoom: 16
		})
	}

	useEffect(() => {
		if (!isSuccess) return

		flyToHandler({ geom: data?.geom, mapgl })
	}, [data, id, isSuccess, mapgl])

	const handleEdit = () => setIsEditing(true)
	const handleCancelEdit = () => setIsEditing(false)

	if (isLoading) return <Loader />

	if (error) return <Error error={error} />

	if (isSuccess) {
		if (isEditing) {
			return (
				<div className={styles.editorWrapper}>
					<Title size='h1'>Edit spot</Title>
					<Divider />
					<SpotForm
						addSpotMutation={addSpotMutation}
						updateSpotMutation={updateSpotMutation}
						isEditing
						initialData={data}
						initialPoint={data?.geom || null}
						handleCancel={handleCancelEdit}
					/>
				</div>
			)
		}

		return (
			<SpotView
				schema={schema}
				data={data}
				onEdit={handleEdit}
				onDelete={deleteHandler}
				onFlyTo={() => flyToHandler({ geom: data?.geom, mapgl })}
				onReturn={() => navigate('/spots')}
			/>
		)
	}
}
