import { useEffect, useRef, useState } from 'react'

import Sidebar from '@highLevelComp/Sidebar/Sidebar'
import BhToastNotification from '@lowLevelComp/BhToastNotification/BhToastNotification'
import CommandPalette from '@lowLevelComp/CommandPalette/CommandPalette'
import { Flex } from '@mantine/core'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isPaletteVisible, setIsPaletteVisible] = useState(false)
  const [commandType, setCommandType] = useState('pages')

  const containerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        event.key === 'P'
      ) {
        setCommandType('pages')
        event.preventDefault() // Prevent default browser behavior
        setIsPaletteVisible((prev) => !prev)
      }
      if (
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        event.key === 'M'
      ) {
        setCommandType('members')
        event.preventDefault() // Prevent default browser behavior
        setIsPaletteVisible((prev) => !prev)
      }
    }

    document.addEventListener('keydown', handleShortcut)
    return () => document.removeEventListener('keydown', handleShortcut)
  }, [])

  return (
    <>
      <BhToastNotification />
      <CommandPalette
        commandType={commandType}
        isVisible={isPaletteVisible}
        onClose={() => setIsPaletteVisible(false)}
      />
      <Flex
        className="main-layout"
        ref={containerRef}
        style={{ height: '100vh' }}
      >
        <Sidebar />
        {children}
      </Flex>
    </>
  )
}

export default MainLayout
