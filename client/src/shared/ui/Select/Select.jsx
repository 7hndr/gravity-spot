import { useState, useRef, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Input } from '../Input/Input'
import { Text } from '../Text/Text'
import { Dropdown } from '../Dropdown/Dropdown'
import styles from './Select.module.scss'

export const Select = forwardRef(
	({ options, onChange, ...otherProps }, ref) => {
		const [selectedOption, setSelectedOption] = useState(null)
		const [isOpen, setIsOpen] = useState(false)
		const selectRef = useRef(null)

		const handleOptionClick = option => {
			setSelectedOption(option)
			setIsOpen(false)

			if (onChange) {
				onChange({
					target: {
						name: otherProps.name || null,
						value: option.value
					}
				})
			}
		}

		const toggleDropdown = () => {
			setIsOpen(!isOpen)
		}

		return (
			<div
				className={styles.selectWrapper}
				ref={selectRef}
			>
				<Dropdown
					closeOnSelect
					stretch
					isOpen={isOpen}
					onToggle={toggleDropdown}
				>
					<Input
						style={{ cursor: 'pointer' }}
						{...otherProps}
						ref={ref}
						value={selectedOption ? selectedOption.label : ''}
						readOnly
						onClick={toggleDropdown}
						rightIcon={isOpen ? 'chevron-up' : 'chevron-down'}
					/>
					{options?.map(option => (
						<div
							key={option.value}
							onClick={() => handleOptionClick(option)}
						>
							<Text className={styles.option}>
								{option.label}
							</Text>
						</div>
					))}
				</Dropdown>
			</div>
		)
	}
)

Select.displayName = 'Select'

Select.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired
		})
	).isRequired,
	onChange: PropTypes.func
}
