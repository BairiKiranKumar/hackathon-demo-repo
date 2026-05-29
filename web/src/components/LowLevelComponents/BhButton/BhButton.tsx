import { Button, ButtonProps } from '@mantine/core'
import './index.css'

interface BhButtonProps extends ButtonProps {
  onClick?: () => void
  variant: 'filled' | 'outline' | 'light' | 'default' | 'transparent'
  bc?: string
  margin?: number | string
  lineHeight?: number | string
  buttonType?: 'button' | 'reset' | 'submit'
  bg?: string
}

const BhButton = ({
  children,
  onClick,
  variant = 'filled',
  size = 'sm',
  disabled = false,
  bc,
  color,
  margin,
  lineHeight,
  fullWidth = false,
  buttonType,
  bg,
}: BhButtonProps) => {
  return (
    <>
      <Button
        type={buttonType}
        onClick={onClick}
        size={size}
        disabled={disabled}
        variant={variant}
        className={`btn btn-${variant}`}
        m={margin}
        fullWidth={fullWidth}
        bg={bg}
        style={{ borderColor: bc, color: color, lineHeight: lineHeight }}
      >
        {children}
      </Button>
    </>
  )
}

export default BhButton
