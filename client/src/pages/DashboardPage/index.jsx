import { Block } from '@/shared/ui'
import styles from './DashboardPage.module.scss'
import { scaleBand, select, scaleLinear, max, axisBottom, axisLeft } from 'd3'
import { useRef, useEffect } from 'react'

const data = [
	{ name: 'aaa', stars: 11 },
	{ name: 'bbb', stars: 22 },
	{ name: 'ccc', stars: 33 }
]
export const DashboardPage = () => {
	const svgRef = useRef(null)

	useEffect(() => {
		const svg = select(svgRef.current)
		const [width, height] = [500, 400]
		const margin = { top: 20, right: 30, bottom: 30, left: 40 }

		svg.attr('width', width)
			.attr('height', height)
			.style('background', 'transparent')
			.style('overflow', 'visible')

		const xScale = scaleBand()
			.domain(data.map(d => d.name))
			.range([margin.left, width - margin.right])
			.padding(0.2)

		const yScale = scaleLinear()
			.domain([0, max(data, d => d.stars)])
			.range([height - margin.bottom, margin.top])

		// X axis
		svg.append('g')
			.attr('transform', `translate(0, ${height - margin.bottom})`)
			.call(axisBottom(xScale))

		// Y axis
		svg.append('g')
			.attr('transform', `translate(${margin.left}, 0)`)
			.call(axisLeft(yScale))

		// Bars
		svg.selectAll('.bar')
			.data(data)
			.enter()
			.append('rect')
			.attr('x', d => xScale(d.name))
			.attr('y', d => yScale(d.stars))
			.attr('width', xScale.bandwidth())
			.attr('height', d => height - margin.bottom - yScale(d.stars))
			.attr('fill', 'steelblue')
	}, [])

	return (
		<div className={styles.dashboard}>
			<Block>
				<svg ref={svgRef} />
			</Block>
		</div>
	)
}
