import { Flex, Text } from '@mantine/core'

import './index.css'
import { IconLabelProps } from 'src/interfaces/commonInterfaces'

const IconLabel = ({
  icon,
  label,
  gap = 4,
  color,
  alignItems = 'center',
  fontSize = 'sm',
  fontWeight = 400,
  iconClass,
  lineHeight,
  className = '',
}: IconLabelProps) => {
  return (
    <Flex
      gap={gap}
      className={`icon-label-text ${className}`}
      align={alignItems}
    >
      {icon && !iconClass ? <>{icon}</> : <span className={iconClass}></span>}
      {label && (
        <Text
          size={fontSize}
          fw={fontWeight}
          c={color || 'inherit'}
          lh={lineHeight}
        >
          {label}
        </Text>
      )}
    </Flex>
  )
}

export default IconLabel
