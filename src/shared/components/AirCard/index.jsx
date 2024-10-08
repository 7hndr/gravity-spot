import styles from './AirCard.module.scss'

export const AirCard = ({ children }) => {
	return <div className={styles.card}>{children}</div>
}
