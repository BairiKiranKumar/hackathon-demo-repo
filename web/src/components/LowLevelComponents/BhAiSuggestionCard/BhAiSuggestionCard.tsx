import BhButton from '@lowLevelComp/BhButton/BhButton'
import { Card, Flex, Text } from '@mantine/core'
import { IconX } from '@tabler/icons-react'

const BhAiSuggestionCard = ({
  allowClose,
  title,
  description,
  actionButtonText,
  onActionButtonClick,
  duration,
}) => {
  return (
    <Card
      py="sm"
      className="ai-nudge-card"
      bd="1px solid var(--ai-bg-color)"
      bg="var(--gradients-ai)"
      shadow="none"
      radius={8}
      style={{
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 10,
      }}
    >
      <Flex className="w-full" align={'start'} justify="space-between" gap={10}>
        <Text
          size={title.styles?.fontSize || 'sm'}
          c={title.styles?.color || 'var(--mantine-color-black)'}
          fw={600}
        >
          {title.value}
        </Text>
        {allowClose && (
          <button className="bh-btn-transparent">
            <IconX size={16} />
          </button>
        )}
        {duration && (
          <Text size="sm" c="var(--text-grey)">
            {duration}
          </Text>
        )}
      </Flex>
      {description?.value && (
        <Text
          size={description.styles?.fontSize || 'xs'}
          c={description.styles?.color || 'var(--text-grey)'}
        >
          {description.value}
        </Text>
      )}
      {actionButtonText && (
        <BhButton size="xs" variant="outline" onClick={onActionButtonClick}>
          <Text
            component="span"
            size="xs"
            tt="capitalize"
            c="var(--primary-color)"
          >
            {actionButtonText}
          </Text>
        </BhButton>
      )}
    </Card>
  )
}

export default BhAiSuggestionCard
