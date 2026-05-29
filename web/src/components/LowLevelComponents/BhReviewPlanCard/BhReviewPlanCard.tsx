import AiPill from '@lowLevelComp/AiPill/AiPill'
import { Card, Flex, Title, Text } from '@mantine/core'

const BhReviewPlanCard = ({
  planName,
  isSelected = false,
  isAiGenerated = false,
  description,
  onCardClick,
}) => {
  return (
    <Card
      className="review-service-card cursor-pointer"
      onClick={onCardClick}
      radius={10}
      bg="#fff"
      py={12}
      px={20}
      style={{
        border: isSelected
          ? '2px solid var(--primary-color)'
          : '2px solid transparent',
      }}
    >
      <Flex gap={4} align="center">
        <Title order={5} fw={600}>
          {planName}
        </Title>
        {isAiGenerated && <AiPill size="sm">Ai Generated</AiPill>}
      </Flex>
      <Text size="sm" c="var(--text-grey)">
        {description}
      </Text>
    </Card>
  )
}

export default BhReviewPlanCard
