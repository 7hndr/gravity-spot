import PropTypes from 'prop-types'
import { useState, useRef, forwardRef } from 'react'
import styles from './Input.module.scss'
import { Icon } from '..'

export const Input = forwardRef(
	(
		{
			label,
			className,
			error,
			onChange,
			setFocus,
			rightIcon,
			...otherProps
		},
		ref
	) => {
		const [inputValue, setInputValue] = useState(
			otherProps.defaultValue || ''
		)
		const internalRef = useRef()

		const clearHandler = () => {
			setInputValue('')

			if (ref && setFocus) setFocus(otherProps.name)

			if (internalRef.current) internalRef.current.focus()

			if (onChange) {
				onChange({
					target: { name: otherProps.name || null, value: '' }
				})
			}
		}

		const handleChange = event => {
			setInputValue(event.target.value)

			if (onChange) {
				onChange(event)
			}
		}

		return (
			<>
				<div className={`${styles.inputWrapper} ${className || ''}`}>
					{label && (
						<label
							htmlFor={otherProps.id}
							className={styles.label}
						>
							{label}
						</label>
					)}
					<input
						value={inputValue}
						ref={ref || internalRef}
						onChange={handleChange}
						className={styles.originInput}
						{...otherProps}
					/>
					{rightIcon && (
						<div className={styles.rightIcon}>
							<Icon name={rightIcon} />
						</div>
					)}
					{(!!inputValue || !!otherProps.value) && (
						<button
							onClick={clearHandler}
							className={styles.inputCleaner}
							tabIndex='-1'
						>
							<Icon name='xmark' />
						</button>
					)}
				</div>
				{error && <span className={styles.errorBlock}>{error}</span>}
			</>
		)
	}
)

Input.displayName = 'Input'

Input.propTypes = {
	label: PropTypes.string,
	className: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func,
	setFocus: PropTypes.func,
	rightIcon: PropTypes.string,
	otherProps: PropTypes.object
}
