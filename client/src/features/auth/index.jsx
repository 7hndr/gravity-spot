import { formModelByPurpouse, initialStateByPurpouse } from './config'
import { Switch, Input, Button, Title, Icon } from '@/shared/ui'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { setCookie, deleteCookie } from '@/shared/helpers'
import { useNotification } from '@/shared/hooks/useNotify'
import { isAuthenticatedAtom, userAtom } from './state'
import { useMutation } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import styles from './Auth.module.scss'
import { object, string } from 'yup'
import { POST } from '@/shared/api'
import { useSetAtom } from 'jotai'

export const Auth = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [isLoading, setIsLoading] = useState(false)
	const [formModel, setFormModel] = useState([])
	const [isLogin, setIsLogin] = useState(true)
	const [errors, setErrors] = useState({})

	const [formData, setFormData] = useState(initialStateByPurpouse(isLogin))

	const setIsAuthenticated = useSetAtom(isAuthenticatedAtom)
	const setUser = useSetAtom(userAtom)
	const navigate = useNavigate()

	const sendNotify = useNotification()

	//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

	useEffect(() => {
		if (searchParams.has('logout')) {
			POST('users/logout')
			deleteCookie('accessToken')
			setIsAuthenticated(false)
			setUser(null)
			searchParams.delete('logout')
			setSearchParams(searchParams)
		}
	})

	//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

	const handleReset = () => {
		setFormData(initialStateByPurpouse(isLogin))
	}

	const changeAuthType = () => {
		setIsLogin(!isLogin)
	}

	const handleChange = e => {
		const { name, value } = e.target

		setFormData({
			...formData,
			[name]: value
		})
	}

	const registerMutation = useMutation({
		mutationFn: async formData => {
			const { accessToken, user } = await POST(`users/register`, formData)
			setCookie('accessToken', accessToken, 1)
			setIsAuthenticated(true)
			setUser(user)
		},
		onSuccess: () => {
			navigate('/')
		},
		onError: e => {
			sendNotify({
				message: e.message,
				title: 'Error occurred',
				type: 'error'
			})
		}
	})

	const loginMutation = useMutation({
		mutationFn: async formData => {
			const { accessToken, refreshToken, user } = await POST(
				`users/login`,
				formData
			)
			setCookie('accessToken', accessToken, 1)
			setCookie('refreshToken', refreshToken, 7)
			setIsAuthenticated(true)
			setUser(user)
		},
		onSuccess: () => {
			navigate('/')
		},
		onError: e => {
			sendNotify({
				message: e.message,
				title: 'Error occurred',
				type: 'error'
			})
		}
	})

	const handleSubmit = async e => {
		e.preventDefault()
		setIsLoading(true)

		setErrors({})
		try {
			await schema(isLogin)
				.validate(formData)
				.catch(err => {
					if (err.errors) {
						const newErrors = {}

						err.errors.forEach(error => {
							newErrors[err.path] = error
						})
						setErrors(newErrors)
					}
				})
		} catch (e) {
			throw new Error(e)
		}

		try {
			if (isLogin) {
				loginMutation.mutate(formData)
			} else {
				registerMutation.mutate(formData)
			}
		} catch (e) {
			sendNotify({
				message: e.message,
				title: 'Error occured',
				type: 'error'
			})
			throw e
		} finally {
			setIsLoading(false)
		}
	}

	const schema = isLogin => {
		return object({
			firstName: isLogin
				? string().notRequired()
				: string().required('First name is required'),
			lastName: isLogin
				? string().notRequired()
				: string().required('Last name is required'),
			email: string()
				.email('Invalid email')
				.required('Email is required'),
			password: string()
				.min(6, 'Password must be at least 6 characters')
				.required('Password is required'),
			passwordRepeat: !isLogin
				? string()
						.oneOf([formData.password], 'Passwords must match')
						.required('Repeat password is required')
				: string().notRequired()
		})
	}

	useEffect(() => {
		setFormModel(formModelByPurpouse(isLogin))
		setFormData(initialStateByPurpouse(isLogin))
	}, [isLogin])

	return (
		<div className={styles.authContainer}>
			<Title>Hi there</Title>

			<form
				className={styles.form}
				onSubmit={handleSubmit}
			>
				{formModel.map(input => (
					<Input
						value={formData[input.name]}
						onChange={handleChange}
						key={input.name}
						error={errors[input.id]}
						{...input}
					/>
				))}
				<div className={styles.formButtons}>
					<Button
						type='submit'
						loading={isLoading}
					>
						{isLogin ? 'Enter' : 'Register'}
					</Button>
					<Button
						onClick={handleReset}
						type='button'
						title='Reset'
					>
						<Icon name='arrow-rotate-left' />
					</Button>
				</div>
			</form>
			<Switch
				checked={isLogin}
				onChange={changeAuthType}
				label="I'm already have an account"
			/>
		</div>
	)
}
