import { useEffect, useState } from 'react'

import { Tooltip } from '@mantine/core'

const BhTooltip = ({
  children,
  label,
  direction = 'vertical',
  elementRef,
  bg = '#FFF',
  c = '#000',
}: {
  children: React.ReactNode
  label: string
  direction?: 'horizontal' | 'vertical'
  elementRef?: React.RefObject<HTMLElement>
  bg?: string
  c?: string
}) => {
  const [isOverflown, setIsOverflown] = useState(false)
  const checkOverflow = () => {
    if (elementRef?.current) {
      const element = elementRef.current
      const scrollDimension =
        direction === 'horizontal' ? 'scrollWidth' : 'scrollHeight'
      const clientDimension =
        direction === 'horizontal' ? element.clientWidth : element.clientHeight
      setIsOverflown(element[scrollDimension] > clientDimension)
    }
  }

  useEffect(() => {
    const element = elementRef?.current
    const handleMouseEnter = () => {
      checkOverflow()
    }

    if (element) {
      element.addEventListener('mouseenter', handleMouseEnter)
    }

    return () => {
      if (element) {
        element.removeEventListener('mouseenter', handleMouseEnter)
      }
    }
  })

  // If no elementRef is passed, tooltip will always show
  const isDisabled = elementRef ? !isOverflown : false

  return (
    <Tooltip
      style={{
        border: '1px solid  #DEE2E6',
        background: bg,
        color: c,
      }}
      label={label}
      withArrow
      arrowSize={6}
      disabled={isDisabled}
      multiline
      maw={600}
      className="bh-tooltip"
    >
      {children}
    </Tooltip>
  )
}

export default BhTooltip
