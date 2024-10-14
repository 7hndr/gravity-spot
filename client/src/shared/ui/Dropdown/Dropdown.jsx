import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './Dropdown.module.scss'
import { createPortal } from 'react-dom'

export const Dropdown = ({
	children,
	className,
	align = 'left',
	closeOnSelect = false,
	stretch = false
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef(null)
	const contentRef = useRef(null)
	const location = useLocation()

	const toggleDropdown = () => {
		setIsOpen(!isOpen)
	}

	const handleItemClick = () => {
		if (closeOnSelect) {
			setTimeout(() => {
				setIsOpen(false)
			}, 16)
		}
	}

	useEffect(() => {
		const handleClickOutside = event => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target) &&
				contentRef.current &&
				!contentRef.current.contains(event.target)
			) {
				setIsOpen(false)
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	useEffect(() => {
		setIsOpen(false)
	}, [location])

	const getDropdownDirection = () => {
		if (!dropdownRef.current) return 'down'
		const dropdownRect = dropdownRef.current.getBoundingClientRect()
		const windowHeight = window.innerHeight

		if (dropdownRect.bottom + 200 > windowHeight) {
			return 'up'
		} else {
			return 'down'
		}
	}

	const getContentStyle = () => {
		if (!dropdownRef.current) return {}
		const dropdownRect = dropdownRef.current.getBoundingClientRect()

		const style = {
			top:
				getDropdownDirection() === 'down'
					? dropdownRect.bottom + 16
					: 'auto',
			bottom:
				getDropdownDirection() === 'up'
					? window.innerHeight - dropdownRect.top + 16
					: 'auto',
			left: align === 'left' ? dropdownRect.left : 'auto',
			right:
				align === 'right'
					? window.innerWidth - dropdownRect.right + 16
					: 'auto'
		}

		if (stretch) {
			style.width = dropdownRect.width
		}

		return style
	}

	const DropdownPortal = ({ children }) => {
		return createPortal(children, document.getElementById('App'))
	}

	return (
		<div
			className={`dropdown ${className || ''}`}
			ref={dropdownRef}
		>
			<div onClick={toggleDropdown}>{children[0]}</div>
			{isOpen && (
				<DropdownPortal>
					<div
						className={`${
							styles.dropdownContent
						} ${getDropdownDirection()}`}
						ref={contentRef}
						style={getContentStyle()}
						onClick={handleItemClick}
					>
						{children.slice(1)}
					</div>
				</DropdownPortal>
			)}
		</div>
	)
}
