import { useState, useEffect } from 'react'
import { Switch, Input, Button, Title, Icon } from '@/shared/ui'
import styles from './Auth.module.scss'
import { object, string } from 'yup'
import { formModelByPurpouse, initialStateByPurpouse } from './config'
import { useNotification } from '@/shared/hooks/useNotify'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { setCookie, deleteCookie } from '@/shared/helpers'
const BASE_URL = 'http://localhost:3004'

const GET = async (url, body) => {
	// console.log('GET request:', url, body)
	if (url) {
		return await new Promise(r => setTimeout(() => r(), 1000))
	}

	return fetch(`${BASE_URL}/users`, {})
		.then(res => res.json())
		.then(users => users?.find(u => u.email === body.email))
		.then(user => {
			if (user) {
				return user
			} else {
				throw new Error('There is no user with this E-mail')
			}
		})
}

export const Auth = () => {
	const navigate = useNavigate()
	const [searchParams, setSearchParams] = useSearchParams()

	const [isLogin, setIsLogin] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState({})
	const [formData, setFormData] = useState(initialStateByPurpouse(isLogin))

	const sendNotify = useNotification()

	//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

	useEffect(() => {
		if (searchParams.has('logout')) {
			deleteCookie('token')
			searchParams.delete('logout')
			setSearchParams(searchParams)
		}
	})

	//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

	const handleReset = () => {
		setFormData(initialStateByPurpouse(isLogin))
	}

	const handleChange = e => {
		const { name, value } = e.target

		setFormData({
			...formData,
			[name]: value
		})
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setIsLoading(true)

		setErrors({})

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

		try {
			await GET(`api/${isLogin ? 'login' : 'register'}`, formData)
			setCookie('token', 'test_token', 30)
			navigate('/')
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

	const schema = isLogin =>
		object({
			firstName: string().when(isLogin ? 'isLogin' : '', {
				is: true,
				then: schema => schema.required('First name is required'),
				otherwise: schema => schema.notRequired()
			}),
			secondName: string().when(isLogin ? 'isLogin' : '', {
				is: true,
				then: schema => schema.required('Second name is required'),
				otherwise: schema => schema.notRequired()
			}),
			email: string()
				.email('Invalid email')
				.required('Email is required'),
			password: string()
				.min(6, 'Password must be at least 6 characters')
				.required('Password is required')
		})

	return (
		<div className={styles.authContainer}>
			<Title>Hi there</Title>

			<form
				className={styles.form}
				onSubmit={handleSubmit}
			>
				{formModelByPurpouse(isLogin).map(input => (
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
				onChange={() => setIsLogin(!isLogin)}
				label="I'm already have an account"
			/>
		</div>
	)
}
