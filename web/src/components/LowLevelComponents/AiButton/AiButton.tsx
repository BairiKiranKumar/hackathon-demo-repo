import { Button, ButtonProps } from '@mantine/core'
import { IconPhoneCall } from '@tabler/icons-react'

interface AIButtonProps extends ButtonProps {
  iconSize?: number
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
}

const AiButton: React.FC<AIButtonProps> = ({
  iconSize = 12,
  variant = 'outline',
  children = 'AI Call',
  onClick,
  size = 'xs',
  ...props
}) => {
  return (
    <Button
      className="ai-call-btn"
      style={{
        color: 'var(--ai-call-color)',
        borderColor: 'var(--ai-call-color)',
      }}
      size={size}
      variant={variant}
      onClick={onClick}
      leftSection={<IconPhoneCall size={iconSize} />}
      {...props}
    >
      {children}
    </Button>
  )
}

export default AiButton
