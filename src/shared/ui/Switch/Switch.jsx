import { useState } from 'react'
import styles from './Switch.module.scss'

// eslint-disable-next-line react/prop-types
export const Switch = ({ onChange, checked, label }) => {
	const [isChecked, setIsChecked] = useState(checked || false)

	const handleChange = () => {
		const newValue = !isChecked
		setIsChecked(newValue)

		onChange(newValue)
	}

	return (
		<div className={styles.switchWrapper}>
			<label className={styles.switch}>
				<input
					type='checkbox'
					checked={isChecked}
					onChange={handleChange}
				/>
				<span className={`${styles.slider} ${styles.round}`} />
			</label>
			{label && (
				<span
					className={styles.label}
					onClick={handleChange}
				>
					{label}
				</span>
			)}
		</div>
	)
}
