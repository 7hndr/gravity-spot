import PropTypes from 'prop-types'
import styles from './Title.module.scss'

export const Title = ({
	children,
	size = 'h1',
	type = 'primary',
	center = false,
	uppercase = false,
	letterSpacing = '0',
	weight = 300
}) => {
	const typeClass = styles[type] || ''
	const sizeClass = styles[size] || ''
	const centerClass = center ? styles.center : ''
	const uppercaseClass = uppercase ? styles.uppercase : ''

	return (
		<h1
			className={`${styles.title} ${typeClass} ${sizeClass} ${centerClass} ${uppercaseClass}`}
			style={{ letterSpacing, fontWeight: weight }}
		>
			{children}
		</h1>
	)
}

Title.propTypes = {
	children: PropTypes.node.isRequired,
	size: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
	type: PropTypes.oneOf(['primary', 'secondary', 'contrast']),
	weight: PropTypes.number,
	letterSpacing: PropTypes.string,
	uppercase: PropTypes.bool,
	center: PropTypes.bool
}
