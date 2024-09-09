import PropTypes from 'prop-types'
import styles from './Icon.module.scss'

const IconContainer = ({ name, className = '', color, size, ...props }) => {
	const customStyle = {
		'--icon-size': size ? `${size}rem` : '1rem',
		'--icon-color': color || 'var(--text)'
	}

	return (
		<i
			className={`fa fa-${name} ${styles.icon} ${className}`}
			style={customStyle}
			{...props}
		/>
	)
}

export const Icon = IconContainer

IconContainer.propTypes = {
	name: PropTypes.string.isRequired,
	className: PropTypes.string,
	color: PropTypes.string,
	size: PropTypes.number
}
