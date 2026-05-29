import { useState } from 'react'

import BhAiSuggestionCard from '@lowLevelComp/BhAiSuggestionCard/BhAiSuggestionCard'
import BhButton from '@lowLevelComp/BhButton/BhButton'
import { Box, Card, Flex, Title, Text } from '@mantine/core'
import { IconX } from '@tabler/icons-react'

const BhAiSuggestedNudges = ({
  hasJoinedCall,
  activePunchList,
  addPHQFormToPunchlist,
  aiSuggestions,
}) => {
  const [phq2Added, setPhq2Added] = useState(false)
  const [phq9Added, setPhq9Added] = useState(false)
  const handlePhq2Click = () => {
    setPhq2Added(true)
    addPHQFormToPunchlist(2)
  }
  const handlePhq9Click = () => {
    setPhq9Added(true)
    addPHQFormToPunchlist(9)
  }

  return (
    <Card
      h="calc(100vh - var(--memberProfileHeight) - 90px"
      mt={20}
      radius={10}
      shadow="0px 4px 10px 0px rgba(0, 0, 0, 0.05)"
    >
      <Title order={5} fw={600} mb={8}>
        AI Suggested Nudges
      </Title>
      {hasJoinedCall && aiSuggestions ? (
        <Box className="ai-suggestions-wrap overflow-y-auto h-full">
          <Flex direction="column" gap={12}>
            {activePunchList.name === 'Person Centered Discovery' &&
              !phq2Added && (
                <Card
                  py="sm"
                  className="ai-nudge-card"
                  bd="1px solid var(--ai-bg-color)"
                  bg="var(--gradients-ai)"
                  shadow="none"
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 4,
                  }}
                >
                  <Flex
                    align={'start'}
                    gap={10}
                    style={{ marginBottom: '6px' }}
                  >
                    <Text size="sm" c="var(--mantine-color-black)" fw={600}>
                      Member mentions being “down” and “low energy”
                    </Text>
                    <button className="bh-btn-transparent">
                      <IconX size={16} />
                    </button>
                  </Flex>
                  <Text size="xs" c="var(--text-color)">
                    For Depression
                  </Text>
                  <BhButton
                    size="xs"
                    variant="outline"
                    onClick={handlePhq2Click}
                  >
                    Add PHQ2 to Punchlist
                  </BhButton>
                </Card>
              )}
            {activePunchList.name === 'PHQ2 Assessment' && !phq9Added && (
              <Card
                py="sm"
                className="ai-nudge-card"
                bd="1px solid var(--ai-bg-color)"
                bg="var(--gradients-ai)"
                shadow="none"
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 4,
                }}
              >
                <Flex
                  align={'start'}
                  justify={'space-between'}
                  gap={10}
                  style={{ marginBottom: '6px', width: '100%' }}
                >
                  <Text size="sm" c="var(--mantine-color-black)" fw={600}>
                    PHQ9 Assessment
                  </Text>
                  <Text size="sm" c="var(--text-grey)">
                    10 min
                  </Text>
                </Flex>
                <Text size="sm" c="var(--text-color)">
                  Based on the score obtained at the PHQ-2, the PHQ-9 assessment
                  should be completed as well
                </Text>
                <BhButton size="xs" variant="outline" onClick={handlePhq9Click}>
                  Start
                </BhButton>
              </Card>
            )}
            {aiSuggestions.map((suggestion, index) => (
              <BhAiSuggestionCard
                key={index}
                allowClose={suggestion.allowClose}
                title={suggestion.title}
                description={suggestion.description}
                actionButtonText={suggestion.actionButtonText}
                onActionButtonClick={suggestion.onActionButtonClick}
                duration={suggestion.duration}
              />
            ))}
          </Flex>
        </Box>
      ) : (
        <Flex h="100%" direction="column" justify="center" align="center">
          <Box c="dimmed" className="text-center">
            <span
              className="bh-icon-AI-outlined"
              style={{ fontSize: '32px' }}
            ></span>
            <Text c="dimmed" w={183} className="text-center" mt={4}>
              No AI-suggested nudges available.
            </Text>
          </Box>
        </Flex>
      )}
    </Card>
  )
}

export default BhAiSuggestedNudges
