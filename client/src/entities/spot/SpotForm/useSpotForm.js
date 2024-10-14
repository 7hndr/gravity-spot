import { useState } from 'react'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/features/auth/state'
import { useSpotSchema } from '../useSpotSchema'

export const useSpotForm = ({
	initialData = {},
	isEditing = false,
	addSpotMutation,
	updateSpotMutation,
	pickedPoint
}) => {
	const [formData, setFormData] = useState(initialData)
	const user = useAtomValue(userAtom)

	const { schema, isSchemaLoading } = useSpotSchema()

	const handleChange = field => e => {
		setFormData({ ...formData, [field]: e.target.value })
	}

	const handleSubmit = (e, callback) => {
		e.preventDefault()

		const spotData = {
			...formData,
			geom: pickedPoint,
			user_id: user.id,
			tag_ids: []
		}

		if (isEditing) {
			updateSpotMutation.mutate(spotData)
		} else {
			addSpotMutation.mutate(spotData)
		}

		callback()
	}

	return {
		schema,
		formData,
		handleChange,
		handleSubmit,
		isLoading:
			isSchemaLoading ||
			addSpotMutation.isLoading ||
			updateSpotMutation.isLoading,
		user
	}
}
