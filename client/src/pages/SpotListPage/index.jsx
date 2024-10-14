import { useQuery } from '@tanstack/react-query'
import { SpotList } from '@/entities/spot/SpotList'
import { Divider, Title, Input } from '@/shared/ui'
import styles from './SpotListPage.module.scss'
import { GET } from '@/shared/api'
import { Loader } from '@/shared/components/Loader'
import { Error } from '@/shared/components/Error'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { useState, useEffect, useRef, useCallback } from 'react'
import { debounce } from '@/shared/helpers'

export const SpotListPage = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [searchQuery, setSearchQuery] = useState('')
	const [inputValue, setInputValue] = useState('')
	const inputRef = useRef(null)
	const itemsPerPage = 8

	const { data, isLoading, error, isSuccess, refetch } = useQuery({
		queryKey: ['spotList', currentPage, searchQuery],
		queryFn: () =>
			GET(
				`spots?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`
			)
	})

	useEffect(() => {
		setCurrentPage(1)
		refetch()
	}, [refetch, searchQuery])

	const handlePageChange = page => {
		setCurrentPage(page)
	}

	const debouncedSetSearchQuery = useCallback(
		debounce(value => {
			setSearchQuery(value)
		}, 1024),
		[]
	)

	const handleSearchChange = e => {
		const value = e.target.value
		setInputValue(value)
		debouncedSetSearchQuery(value)

		if (inputRef.current) {
			inputRef.current.focus()
		}
	}

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}, [isSuccess])

	if (isLoading) {
		return <Loader />
	} else if (isSuccess) {
		const totalPages = Math.ceil(data.total / itemsPerPage)

		return (
			<div className={styles.spotListPage}>
				<Title>Spot list</Title>
				<Divider />
				<Input
					placeholder='Search'
					onChange={handleSearchChange}
					value={inputValue}
					ref={inputRef}
				/>
				<SpotList spotList={data.spots} />
				<Pagination
					totalPages={totalPages}
					currentPage={currentPage}
					onPageChange={handlePageChange}
					pageRangeDisplayed={3}
				/>
			</div>
		)
	} else if (error) {
		return <Error error={error.message} />
	}
}
