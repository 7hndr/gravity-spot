import { useState } from 'react'
import { Switch, Input, Button, Title } from '@/shared/ui'
import styles from './Auth.module.scss'
import { object, string } from 'yup'

const GET = (url, body) => {
	console.log('GET request:', url, body)
}

export const Auth = () => {
	const [isLogin, setIsLogin] = useState(true)
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		firstName: '',
		secondName: ''
	})
	const [errors, setErrors] = useState({})

	const handleChange = event => {
		setFormData({ ...formData, [event.target.name]: event.target.value })
	}

	const handleSubmit = async event => {
		event.preventDefault()
		setErrors({})
		try {
			await schema(isLogin).validate(formData)

			// В зависимости от состояния логина или регистрации, выполняем запрос
			if (isLogin) {
				GET('/api/login', formData)
			} else {
				GET('/api/register', formData)
			}
		} catch (err) {
			console.log({ ...err }, 123, err.errors)
			if (err.errors) {
				const newErrors = {}
				err.errors.forEach(error => {
					newErrors[err.path] = error
				})
				console.log(newErrors)
				setErrors(newErrors)
			}
		}
	}

	// Схема валидации на основе состояния isLogin
	const schema = isLogin =>
		object({
			firstName: string().when(isLogin ? 'isLogin' : '', {
				is: true, // Для регистрации поле "First name" обязательно
				then: schema => schema.required('First name is required'),
				otherwise: schema => schema.notRequired()
			}),
			secondName: string().when(isLogin ? 'isLogin' : '', {
				is: true, // Для регистрации поле "Second name" обязательно
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
			<Title>Welcome</Title>
			<form
				onSubmit={handleSubmit}
				className={styles.form}
			>
				{!isLogin && (
					<>
						<Input
							label='First name'
							name='firstName'
							onChange={handleChange}
							error={errors.firstName}
						/>
						<Input
							label='Second name'
							name='secondName'
							onChange={handleChange}
							error={errors.secondName}
						/>
					</>
				)}
				<Input
					label='E-mail'
					name='email'
					type='email'
					onChange={handleChange}
					error={errors.email}
				/>
				<Input
					label='Password'
					name='password'
					type='password'
					onChange={handleChange}
					error={errors.password}
				/>
				<Button type='submit'>{isLogin ? 'Login' : 'Register'}</Button>
			</form>
			<div className={styles.switchContainer}>
				<Switch
					checked={isLogin}
					onChange={() => setIsLogin(!isLogin)}
					label="I'm already have an account"
				/>
			</div>
		</div>
	)
}
