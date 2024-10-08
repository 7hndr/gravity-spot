import styles from './SpotList.module.scss'
import { SpotListItem } from '../SpotListItem'

export const SpotList = ({ spotList }) => {
	return (
		<div className={styles.spotListContainer}>
			{spotList.map(spot => (
				<SpotListItem
					key={spot._id}
					{...spot}
				/>
			))}
		</div>
	)
}
