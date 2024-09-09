import { useTheme } from '../../shared/hooks/useTheme'
import { Button, Text, Title, Block, Icon, Input } from '../../shared/ui'
import styles from './ServicePage.module.scss'

export const ServicePage = () => {
	const { isDark, toggleTheme } = useTheme()

	const colorVars = [
		'bg',
		'text',
		'secondary-text',
		'primary',
		'secondary',
		'accent',
		'field',
		'surface'
	]

	return (
		<div className={styles.wrapper}>
			<Block col>
				<Block>
					<Title>Buttons</Title>
					<Block
						aic
						col
						width={256}
					>
						<Button
							onClick={() => {}}
							loading
						/>{' '}
						<Text>Loading</Text>
					</Block>
					<Block
						aic
						col
						width={256}
					>
						<Button
							onClick={() => {}}
							disabled
						>
							Disabled
						</Button>{' '}
						<Text>Disabled</Text>
					</Block>
					<Block
						aic
						col
						width={256}
					>
						<Button
							onClick={() => {}}
							simple
						>
							Simple
						</Button>{' '}
						<Text>Simple</Text>
					</Block>
					<Block
						aic
						col
						width={256}
					>
						<Button
							onClick={() => {}}
							square
						>
							1
						</Button>{' '}
						<Text>Square</Text>
					</Block>
					<Block
						aic
						col
						width={256}
					>
						<Button
							onClick={() => {}}
							active
						>
							active
						</Button>{' '}
						<Text>Active</Text>
					</Block>
				</Block>
				<Block width={320}>
					<Title>Colors</Title>
					<div className={styles.colorList}>
						{colorVars.map((v, i) => (
							<div
								key={i}
								className={styles.colorItem}
							>
								<span
									className={styles.colorPrewiew}
									style={{
										backgroundColor: `var(--${v})`
									}}
								/>
								<Text>{`--${v}`}</Text>
							</div>
						))}
					</div>
					<Button onClick={toggleTheme}>
						{isDark
							? 'Switch to Light Mode'
							: 'Switch to Dark Mode'}
					</Button>
				</Block>
				<Block width={256}>
					<Title>Icons</Title>
					<Block col>
						<Icon name='map' />
						<Text>Regular</Text>
					</Block>
					<Block
						col
						aic
					>
						<Icon
							name='map'
							size={2}
						/>
						<Text>Big (2rem)</Text>
					</Block>
					<Block
						col
						aic
					>
						<Icon
							name='map'
							color='var(--accent)'
						/>
						<Text>Colored</Text>
					</Block>
				</Block>
				<Block width={256}>
					<Title>Inputs</Title>

					<Block>
						<Input label='Label' />
					</Block>
					<Block>
						<Input
							error='Some error'
							label='Wiht error'
						/>
					</Block>
				</Block>
			</Block>
		</div>
	)
}
