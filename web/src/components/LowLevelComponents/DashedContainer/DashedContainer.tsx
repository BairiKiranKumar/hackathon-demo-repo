import { ReactNode } from 'react'

import { Box, Text } from '@mantine/core'

interface DashedContainerProps {
  label: string
  content: ReactNode
}

const DashedContainer = ({ label, content }: DashedContainerProps) => {
  return (
    <Box
      bd={'1px dashed #DEE2E6'}
      p={10}
      pos="relative"
      style={{ overflow: 'visible', borderRadius: 8 }}
    >
      <Text
        fz="xs"
        lh="md"
        pos="absolute"
        top={-12}
        left={10}
        bg="#f4f8f6"
        px={8}
      >
        {label}
      </Text>
      {/* Render normally if content is not a string, else wrap in quotes if label is Script */}
      {typeof content === 'string' ? (
        <Text fz="sm">{label === 'Script' ? `“${content}”` : content}</Text>
      ) : (
        content
      )}{' '}
    </Box>
  )
}

export default DashedContainer
