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

	const getFormDataFromJson = (data, parentKey) => {
		const formData = new FormData()

		for (let key in data) {
			if (Object.prototype.hasOwnProperty.call(data, key)) {
				const fullKey = parentKey ? `${parentKey}[${key}]` : key
				const value = data[key]

				if (typeof value === 'object' && !(value instanceof File)) {
					getFormDataFromJson(value, fullKey)
				} else {
					formData.append(fullKey, value)
				}
			}
		}

		return formData
	}

	const handleSubmit = (e, { formObject, imageFile }) => {
		e.preventDefault()

		const formData = getFormDataFromJson({
			...formObject,
			user_id: user.id,
			geom: JSON.stringify(pickedPoint)
		})

		if (!user.id) {
			console.error('User not logged in')
		}

		formData.append('image', imageFile)

		if (isEditing) {
			updateSpotMutation.mutate(formData)
		} else {
			addSpotMutation.mutate(formData)
		}
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
