import PropTypes from 'prop-types'
import styles from './Pagination.module.scss'
import { Button, Text } from '@/shared/ui'
export const Pagination = ({
	totalPages,
	currentPage,
	onPageChange,
	pageRangeDisplayed = 3
}) => {
	const createPageNumbers = () => {
		const pages = []
		const startPage = Math.max(
			1,
			currentPage - Math.floor(pageRangeDisplayed / 2)
		)
		const endPage = Math.min(totalPages, startPage + pageRangeDisplayed - 1)

		for (let i = startPage; i <= endPage; i++) {
			const buttonClass =
				i === currentPage
					? `${styles.pageButton} ${styles.active}`
					: styles.pageButton

			pages.push(
				<Button
					simple
					key={i}
					className={buttonClass}
					onClick={() => onPageChange(i)}
				>
					{i}
				</Button>
			)
		}

		return pages
	}

	return (
		<div className={styles.paginationWrapper}>
			<Button
				simple
				onClick={() => onPageChange(1)}
				disabled={currentPage === 1}
				className={styles.pageButton}
			>
				First
			</Button>
			<Button
				simple
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className={styles.pageButton}
			>
				Prev
			</Button>
			{currentPage > pageRangeDisplayed && (
				<Text className={styles.ellipsis}>...</Text>
			)}
			{createPageNumbers()}
			{currentPage < totalPages - pageRangeDisplayed && (
				<Text className={styles.ellipsis}>...</Text>
			)}
			<Button
				simple
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className={styles.pageButton}
			>
				Next
			</Button>
			<Button
				simple
				onClick={() => onPageChange(totalPages)}
				disabled={currentPage === totalPages}
				className={styles.pageButton}
			>
				Last
			</Button>
		</div>
	)
}

Pagination.propTypes = {
	totalPages: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	pageRangeDisplayed: PropTypes.number
}
