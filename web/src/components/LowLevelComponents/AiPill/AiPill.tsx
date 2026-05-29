import IconLabel from '@lowLevelComp/IconLabel/IconLabel'
import { MantineSize, Pill } from '@mantine/core'

const AiPill = ({
  size = 'md',
  children,
  handleClick,
  gap = 4,
  cursor = false,
}: {
  size?: MantineSize
  children?
  handleClick?
  gap?: number
  cursor?: boolean
}) => {
  return (
    <Pill
      className={`ai-pill ${cursor ? 'cursor-pointer' : ''}`}
      size={size}
      onClick={handleClick}
    >
      <IconLabel
        fontWeight={600}
        gap={gap}
        label={children}
        iconClass={'bh-icon-ai'}
        className={'ai-pill-label'}
      />
    </Pill>
  )
}

export default AiPill
