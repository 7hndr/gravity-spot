import styles from './Divider.module.scss' // Assuming the CSS module file is named Divider.module.css

export const Divider = ({ vertical = false, className }) => {
	const dividerClass = vertical
		? `${styles.Divider} ${styles.vertical}`
		: styles.Divider

	return <span className={[className, dividerClass].join(' ')} />
}
