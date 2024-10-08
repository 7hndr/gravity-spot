import PropTypes from 'prop-types'
import styles from './Button.module.scss'

export const Button = ({
	disabled = false,
	loading = false,
	type = 'button',
	simple = false,
	mini = false,
	active = false,
	square = false,
	className = '',
	children,
	onClick,
	title,
	_ref
}) => {
	const inert = disabled || loading

	return (
		<button
			ref={_ref}
			type={type}
			className={`${styles.button} ${simple ? styles.simple : ''} ${
				mini ? styles.mini : ''
			} ${square ? styles.square : ''} ${
				disabled ? styles.disabled : ''
			} ${loading ? styles.loading : ''} ${
				active ? styles.active : ''
			} ${className}`}
			onClick={onClick}
			title={title}
			disabled={disabled}
			inert={inert ? String(inert) : null}
		>
			{!loading && children}
		</button>
	)
}

Button.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	loading: PropTypes.bool,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	simple: PropTypes.bool,
	square: PropTypes.bool,
	active: PropTypes.bool,
	title: PropTypes.string,
	type: PropTypes.oneOf(['button', 'submit', 'reset']),
	_ref: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.instanceOf(Element) })
	])
}
