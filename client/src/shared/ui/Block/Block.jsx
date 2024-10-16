import styles from './Block.module.scss'

export const Block = ({
	children,
	col,
	simple,
	aic,
	ais,
	sb,
	width,
	noPadding,
	className = ''
}) => {
	const classNames = [
		styles.Block,
		col ? styles.col : '',
		aic ? styles.aic : '',
		ais ? styles.ais : '',
		sb ? styles.sb : '',
		simple ? styles.simple : '',
		noPadding ? styles.noPadding : '',
		className
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
