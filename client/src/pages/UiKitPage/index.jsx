import { useAtom } from 'jotai'
import { themeAtom } from '@/shared/theme/store'
import { Button, Text, Title, Block, Icon, Input } from '@/shared/ui'
import styles from './UiKitPage.module.scss'
import { useNotification } from '@/shared/hooks/useNotify'

export const UiKitPage = () => {
	const [theme, setTheme] = useAtom(themeAtom)
	const sendNotify = useNotification()

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

	const toggleTheme = () => {
		setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
	}

	const isDark = theme === 'dark'

	return (
		<div className={styles.wrapper}>
			<div
				style={{
					display: 'grid',
					gridGap: '1rem',
					padding: '1rem',
					gridTemplateColumns: '1fr 1fr',
					overflow: 'auto',
					height: '100%'
				}}
			>
				<Block>
					<Title>Buttons</Title>
					<Block
						aic
						col
						width={256}
					>
						<Button
							onClick={() => {
								console.log(1)
							}}
							loading
						/>
						<Text>Loading</Text>
					</Block>
					<Block
						aic
						col
						width={256}
					>
						<Button
							onClick={() => {
								console.log(1)
							}}
							disabled
						>
							Disabled
						</Button>
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
						</Button>
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
						</Button>
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
						</Button>
						<Text>Active</Text>
					</Block>
					<Block
						aic
						col
						type='error'
						width={256}
					>
						<Button
							onClick={() => {
								sendNotify({
									message: 'This is a notify!',
									title: 'Warning',
									type: 'warning',
									duration: 2048
								})
							}}
						>
							notify
						</Button>
						<Text>notify</Text>
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
							label='With error'
						/>
					</Block>
				</Block>
				<Block width={256}>
					<Title>Titles</Title>

					<Block>
						<Title size='h1'>H1 title</Title>
						<Title size='h2'>H2 title</Title>
						<Title size='h3'>H3 title</Title>
						<Title size='h4'>H4 title</Title>
						<Title size='h5'>H5 title</Title>
						<Title size='h6'>H6 title</Title>
					</Block>
				</Block>
			</div>
		</div>
	)
}
