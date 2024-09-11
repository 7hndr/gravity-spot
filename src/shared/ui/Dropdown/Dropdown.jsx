import { useState, useRef, useEffect } from 'react'
import styles from './Dropdown.module.scss'
import ReactDOM from 'react-dom'

export const Dropdown = ({ children, className, align = 'left' }) => {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef(null)
	const contentRef = useRef(null)

	const toggleDropdown = () => {
		setIsOpen(!isOpen)
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
		return {
			top:
				getDropdownDirection() === 'down'
					? dropdownRect.bottom + 16
					: 'auto',
			bottom:
				getDropdownDirection() === 'up'
					? window.innerHeight - dropdownRect.top + 16
					: 'auto',
			left: align === 'left' ? dropdownRect.left : 'auto', // Выравнивание слева
			right:
				align === 'right'
					? window.innerWidth - dropdownRect.right + 16
					: 'auto' // Выравнивание справа
		}
	}

	return (
		<div
			className={`dropdown ${className}`}
			ref={dropdownRef}
		>
			<div onClick={toggleDropdown}>{children[0]}</div>
			{isOpen &&
				ReactDOM.createPortal(
					<div
						className={`${
							styles.dropdownContent
						} ${getDropdownDirection()}`} // Используем styles.dropdownContent
						ref={contentRef}
						style={getContentStyle()}
					>
						{children.slice(1)}
					</div>,
					document.getElementById('App')
				)}
		</div>
	)
}
