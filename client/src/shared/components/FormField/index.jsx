import { Input, Select } from '@/shared/ui'

export const FormField = ({
	field,
	value,
	onChange,
	label,
	disabled,
	options = []
}) => {
	switch (field.type) {
		case 'String':
			return (
				<Input
					type='text'
					label={label}
					value={value}
					disabled={disabled}
					onChange={onChange}
					required={field.required}
				/>
			)
		case 'ObjectId':
		case 'Array':
			return (
				<Select
					label={label}
					value={value}
					disabled={disabled}
					onChange={onChange}
					multiple={field.type === 'Array'}
					options={options}
					required={field.required}
				/>
			)
		default:
			return null
	}
}
