import { MantineSize, Pill } from '@mantine/core'

const PriorityBadge = ({
  children,
  priority,
  size = 'md', // Default to 'md', which is a valid MantineSize
}: {
  children
  priority: string
  size?: MantineSize
}) => {
  const getBadgeProperties = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'urgent':
        return {
          bg: 'var(--high-impact-bg)',
          c: 'var(--high-impact-color)',
        }
      case 'high':
        return {
          bg: 'var(--high-impact-bg)',
          c: 'var(--mantine-color-black)',
        }
      case 'medium':
        return {
          bg: 'var(--medium-impact-bg)',
          c: 'var(--mantine-color-black)',
        }
      case 'low':
        return {
          bg: 'var(--low-badge-bg)',
          c: 'var(--mantine-color-black)',
        }
      default:
        return {
          bg: 'var(--mantine-color-gray-1);',
          c: 'var(--mantine-color-black)',
        }
    }
  }

  const { bg, c } = getBadgeProperties(priority)
  return (
    <Pill tt="capitalize" bg={bg} c={c} size={size}>
      <span
        style={{
          fontWeight: 500,
        }}
      >
        {children.toLowerCase()}
      </span>
    </Pill>
  )
}

export default PriorityBadge
