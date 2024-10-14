import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import styles from './UserPage.module.scss'
import { useState } from 'react'

import { useAtomValue } from 'jotai'

import { GET, PUT } from '@/shared/api'

import { userAtom } from '@/features/auth/state'
import { Text, Button, Block, Title, Divider } from '@/shared/ui'
import { FormField } from '@/shared/components/FormField'
import { Loader } from '@/shared/components/Loader'
import { Error } from '@/shared/components/Error'

const fetchUser = async id => {
	return GET(`users/${id}`)
}

const updateUser = async ({ id, userData }) => {
	return PUT(`users/${id}`, userData)
}

export const UserPage = () => {
	const currentUser = useAtomValue(userAtom)
	const id = currentUser?._id
	const [isEditing, setIsEditing] = useState(false)
	const [editedUser, setEditedUser] = useState({})

	const queryClient = useQueryClient()

	const {
		data: user,
		isLoading,
		isError,
		isSuccess
	} = useQuery({
		queryKey: ['user', id],
		queryFn: () => fetchUser(id),
		enabled: !!id
	})

	const mutation = useMutation({
		mutationFn: updateUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user', id] })
			setIsEditing(false)
		}
	})

	const handleEdit = () => {
		setIsEditing(true)
		setEditedUser(user)
	}

	const handleSave = e => {
		e.preventDefault()
		mutation.mutate({ id, userData: editedUser })
	}

	const handleChange = field => e => {
		console.log(field, e)
		setEditedUser({ ...editedUser, [field]: e.target.value })
	}

	if (isLoading) return <Loader />

	if (isError) return <Error error={'Error loading user data'} />

	return (
		<div className={styles.container}>
			<Block className={styles.userInfoBlock}>
				<Title>User Information</Title>
				<Divider />
				{isEditing ? (
					<form>
						<FormField
							field={{ type: 'String', required: true }}
							label='First Name'
							value={editedUser.firstName}
							onChange={handleChange('firstName')}
						/>
						<FormField
							field={{ type: 'String' }}
							label='Last Name'
							value={editedUser.lastName}
							onChange={handleChange('lastName')}
						/>
						<FormField
							field={{ type: 'String', required: true }}
							label='Email'
							value={editedUser.email}
							onChange={handleChange('email')}
						/>
						<Button
							type='submit'
							onClick={handleSave}
							disabled={mutation.isPending}
						>
							{mutation.isPending ? 'Saving...' : 'Save'}
						</Button>
					</form>
				) : (
					isSuccess && (
						<>
							<Text type='secondary'>ID:</Text>
							<Text>{user.id}</Text>
							<Text type='secondary'>First Name:</Text>
							<Text>{user.firstName}</Text>
							<Text type='secondary'>Last Name:</Text>
							<Text>{user.lastName}</Text>
							<Text type='secondary'>Email:</Text>
							<Text>{user.email}</Text>
							<Text type='secondary'>Created At:</Text>
							<Text>
								{new Date(user.created_at)
									.toLocaleString('ru-RU', {
										day: '2-digit',
										month: '2-digit',
										year: 'numeric',
										hour: '2-digit',
										minute: '2-digit',
										hour12: false
									})
									.replace(',', '')}
							</Text>
							{currentUser && currentUser.id === user.id && (
								<Button onClick={handleEdit}>Edit</Button>
							)}
						</>
					)
				)}
			</Block>
		</div>
	)
}
