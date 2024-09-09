import styles from './Block.module.scss'

export const Block = ({ children, col, simple, aic, ais, width }) => {
	const classNames = [
		styles.Block,
		col ? styles.col : '',
		aic ? styles.aic : '',
		ais ? styles.ais : '',
		simple ? styles.simple : ''
	].join(' ')

	return (
		<div
			className={classNames}
			style={width ? { width } : {}}
		>
			{children}
		</div>
	)
}
