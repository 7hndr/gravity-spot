import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { GET, DELETE, POST, PUT } from '@/shared/api'
import { useNotification } from '@/shared/hooks/useNotify'
import { useNavigate } from 'react-router-dom'

export const useSpotItem = ({ id = null, setIsEditing } = {}) => {
	const queryClient = useQueryClient()
	const sendNotify = useNotification()
	const navigate = useNavigate()

	const addSpot = formData => POST('spots', formData)

	const { data, isLoading, error, isSuccess, refetch } = useQuery({
		queryKey: ['spot', id],
		queryFn: () => GET(`spots/${id}`),
		enabled: !!id
	})

	const returnToSpotList = () => navigate('/spots')

	const deleteMutation = useMutation({
		mutationFn: id => DELETE(`spots/${id}`),
		onSuccess: () => {
			queryClient.removeQueries(['spot', id])
			sendNotify({
				type: 'success',
				message: 'Spot successfully deleted',
				title: 'Success'
			})
			returnToSpotList()
		},
		onError: e => {
			sendNotify({
				type: 'error',
				message: `Error deleting spot: ${e.message}`,
				title: 'Error'
			})
		}
	})

	const addSpotMutation = useMutation({
		mutationFn: data => addSpot(data),
		onSuccess: data => {
			sendNotify({
				type: 'success',
				message: 'Spot added successfully',
				title: 'Success'
			})
			queryClient.invalidateQueries(['spots'])
			navigate(`/spots/${data.id}`)
		},
		onError: e => {
			sendNotify({
				type: 'error',
				message: e.message,
				title: 'Error'
			})
		}
	})

	const updateSpotMutation = useMutation({
		mutationFn: data => PUT(`spots/${data.id}`, data),
		onSuccess: ({ data, message }) => {
			sendNotify({
				type: 'success',
				message: message,
				title: 'Success'
			})
			queryClient.setQueryData(['spot', data.id], data)
			setIsEditing(false)
			navigate(`/spots/${id}`)
		},
		onError: e => {
			sendNotify({
				type: 'error',
				message: e.message,
				title: 'Error'
			})
		}
	})

	const deleteHandler = () => {
		if (window.confirm('Are you sure you want to delete this spot?')) {
			deleteMutation.mutate(id)
		}
	}

	return {
		data,
		isLoading,
		addSpotMutation,
		updateSpotMutation,
		error,
		isSuccess,
		refetch,
		deleteHandler
	}
}
