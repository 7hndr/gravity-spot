import PropTypes from 'prop-types'
import styles from './Text.module.scss'

export const Text = ({
	children,
	size = 1,
	type = 'primary',
	className = '',
	weight = 400
}) => {
	const classNames = [styles.text, styles[type], className].join(' ')

	return (
		<span
			className={classNames}
			style={{ fontSize: `${size}rem`, fontWeight: weight }}
			title={children}
		>
			{children}
		</span>
	)
}

Text.propTypes = {
	children: PropTypes.node.isRequired,
	size: PropTypes.number,
	type: PropTypes.oneOf(['primary', 'secondary', 'contrast']),
	weight: PropTypes.number
}
