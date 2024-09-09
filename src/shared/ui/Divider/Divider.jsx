/* eslint-disable react/prop-types */
import styles from './Divider.module.scss' // Assuming the CSS module file is named Divider.module.css

export const Divider = ({ vertical = false }) => {
	const dividerClass = vertical
		? `${styles.Divider} ${styles.vertical}`
		: styles.Divider

	return <span className={dividerClass} />
}
