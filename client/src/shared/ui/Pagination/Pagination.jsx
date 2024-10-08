import PropTypes from 'prop-types'
import styles from './Pagination.module.scss'

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
			// Определяем класс активной страницы
			const buttonClass =
				i === currentPage
					? `${styles.pageButton} ${styles.active}`
					: styles.pageButton

			pages.push(
				<button
					key={i}
					className={buttonClass}
					onClick={() => onPageChange(i)}
				>
					{i}
				</button>
			)
		}

		return pages
	}

	return (
		<div className={styles.paginationWrapper}>
			<button
				onClick={() => onPageChange(1)}
				disabled={currentPage === 1}
				className={styles.pageButton}
			>
				First
			</button>
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className={styles.pageButton}
			>
				Prev
			</button>
			{currentPage > pageRangeDisplayed && (
				<span className={styles.ellipsis}>...</span>
			)}
			{createPageNumbers()}
			{currentPage < totalPages - pageRangeDisplayed && (
				<span className={styles.ellipsis}>...</span>
			)}
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className={styles.pageButton}
			>
				Next
			</button>
			<button
				onClick={() => onPageChange(totalPages)}
				disabled={currentPage === totalPages}
				className={styles.pageButton}
			>
				Last
			</button>
		</div>
	)
}

Pagination.propTypes = {
	totalPages: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	pageRangeDisplayed: PropTypes.number
}
