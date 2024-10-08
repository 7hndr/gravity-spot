import { useState } from 'react'
import styles from './Switch.module.scss'
import { Text } from '..'

export const Switch = ({ onChange, checked, label }) => {
	const [isChecked, setIsChecked] = useState(checked || false)

	const handleChange = () => {
		const newValue = !isChecked
		setIsChecked(newValue)

		onChange(newValue)
	}

	return (
		<label className={styles.switch}>
			<input
				type='checkbox'
				checked={isChecked}
				onChange={handleChange}
			/>
			<span className={`${styles.slider} ${styles.round}`} />
			{label && (
				<Text
					className={styles.label}
					onClick={handleChange}
				>
					{label}
				</Text>
			)}
		</label>
	)
}
