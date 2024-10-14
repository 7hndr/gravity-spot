export const REGISTRATION = 'REGISTRATION'
export const AUTHORIZATION = 'AUTHORIZATION'

export const formModelByPurpouse = isLogin =>
	[
		{
			label: 'E-Mail',
			type: 'email',
			name: 'email',
			id: 'email',
			purpouse: [REGISTRATION, AUTHORIZATION]
		},
		{
			label: 'Password',
			type: 'password',
			name: 'password',
			id: 'password',
			purpouse: [REGISTRATION, AUTHORIZATION]
		},
		{
			label: 'Repeat password',
			name: 'passwordRepeat',
			type: 'password',
			id: 'passwordRepeat',
			purpouse: [REGISTRATION]
		},
		{
			label: 'First name',
			type: 'firstName',
			name: 'firstName',
			id: 'firstName',
			purpouse: [REGISTRATION]
		},
		{
			label: 'Last name',
			type: 'lastName',
			name: 'lastName',
			id: 'lastName',
			purpouse: [REGISTRATION]
		}
	].filter(input =>
		input.purpouse.includes(isLogin ? AUTHORIZATION : REGISTRATION)
	)

export const initialStateByPurpouse = isLogin => {
	return formModelByPurpouse(isLogin).reduce(
		(a, c) => ({ ...a, [c.id]: '' }),
		{}
	)
}
