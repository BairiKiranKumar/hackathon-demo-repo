import { useState } from 'react'

import BhCallSummaryTranscript from '@highLevelComp/BhCallSummaryTranscript/BhCallSummaryTranscript'
import AiPill from '@lowLevelComp/AiPill/AiPill'
import BhAccordion from '@lowLevelComp/BhAccordion/BhAccordion'
import BhButton from '@lowLevelComp/BhButton/BhButton'
import BhReviewPlanCard from '@lowLevelComp/BhReviewPlanCard/BhReviewPlanCard'
import PriorityBadge from '@lowLevelComp/PriorityBadge/PriorityBadge'
import { Box, Grid, Checkbox, Flex, Text, Title } from '@mantine/core'
import { IconCheck, IconCircleCheck } from '@tabler/icons-react'

import usePunchlistStore from 'src/store/punchlistStore'

import { PunchlistSummaryTransactions } from '../data'
const ReviewServicePlan = ({ servicePlans, handlePlanSelection }) => {
  const [isAgreed, setIsAgreed] = useState(false)
  const [startReview, setStartReview] = useState(false)
  const [viewTranscript, setViewTranscript] = useState(false)
  const { caseNote, clientCarePlan, transcript } = PunchlistSummaryTransactions
  const handleOpenPanel = usePunchlistStore((state) => state.handleOpenPanel)
  const handleReviewStart = () => {
    setStartReview(true)
  }

  const activitiesContent = [
    {
      id: 1,
      label: 'Initiated Frailty Pathway',
      icon: <IconCircleCheck size={20} color="green" />,
      children: null,
    },
    {
      id: 2,
      label: 'PHQ2',
      icon: <IconCircleCheck size={20} color="green" />,
      children: null,
    },
    {
      id: 3,
      label: 'PHQ9',
      icon: <IconCircleCheck size={20} color="green" />,
      children: null,
    },
    {
      id: 4,
      label: 'Updated person-centered service plan',
      icon: <IconCircleCheck size={20} color="green" />,
      children: null,
    },
  ]

  const recommendationsContent = [
    {
      id: 1,
      label:
        'Schedule home visit to complete home safety assessment in 2 weeks',
      icon: (
        <PriorityBadge priority={'High'}>
          {String('High').charAt(0)}
        </PriorityBadge>
      ),
      children: (
        <BhButton size="xs" variant="default" margin="8px 0px">
          Schedule
        </BhButton>
      ),
    },
    {
      id: 2,
      label: 'Request records from orthopaedic surgeon',
      icon: (
        <PriorityBadge priority={'Medium'}>
          {String('Medium').charAt(0)}
        </PriorityBadge>
      ),
      children: (
        <BhButton size="xs" variant="default" margin="8px 0px">
          Create a Task
        </BhButton>
      ),
    },
    {
      id: 3,
      label: 'Request records from orthopaedic surgeon',
      icon: (
        <PriorityBadge priority={'Medium'}>
          {String('Medium').charAt(0)}
        </PriorityBadge>
      ),
      children: (
        <BhButton size="xs" variant="default" margin="8px 0px">
          Create a Task
        </BhButton>
      ),
    },
    {
      id: 4,
      label: 'Call in 1 week to follow up on referral for home-based mods',
      icon: (
        <PriorityBadge priority={'Medium'}>
          {String('Medium').charAt(0)}
        </PriorityBadge>
      ),
      children: (
        <BhButton size="xs" variant="default" margin="8px 0px">
          Add to Calendar
        </BhButton>
      ),
    },
  ]
  const handleViewTranscript = () => {
    setViewTranscript(true)
  }
  const handleCardSelectionChange = (plan) => {
    const updatedPlans = servicePlans.map((p) => ({
      ...p,
      isSelected: p.name === plan.name,
    }))
    handlePlanSelection(updatedPlans)
    handleOpenPanel()
  }

  return (
    <>
      {startReview ? (
        <Box py="lg" px={12} mt={8} className="review-service-plan-main">
          <Flex align="flex-end" justify="space-between" gap={12}>
            <Box>
              <Text c="var(--primary-color)" fw={600} size="xs" mb={4}>
                Time to wrap-up
              </Text>
              <Flex gap={4}>
                <Title order={4} fw={600}>
                  {viewTranscript
                    ? "Highlights of Today's Encounter"
                    : 'Review Service Plan'}
                </Title>
                <AiPill>AI-Generated</AiPill>
              </Flex>
            </Box>
            {!viewTranscript && (
              <Flex align="center" gap={16}>
                <Checkbox
                  label="Agreed upon by member"
                  checked={isAgreed}
                  onChange={(event) => setIsAgreed(event.target.checked)}
                />
                <BhButton
                  variant="filled"
                  disabled={!isAgreed}
                  onClick={handleViewTranscript}
                >
                  Done
                </BhButton>
              </Flex>
            )}
          </Flex>
          {!viewTranscript ? (
            <Flex gap={10} direction="column" mt={20}>
              {servicePlans.map((plan) => (
                <BhReviewPlanCard
                  onCardClick={() => handleCardSelectionChange(plan)}
                  key={plan.id}
                  planName={plan.name}
                  isSelected={plan.isSelected}
                  isAiGenerated={plan.isAiGenerated}
                  description={plan.description}
                ></BhReviewPlanCard>
              ))}
            </Flex>
          ) : (
            <Flex gap={10} direction="column" mt={20}>
              <Grid style={{ display: 'flex' }}>
                <Grid.Col span={8}>
                  <BhCallSummaryTranscript
                    caseNote={caseNote}
                    clientCarePlan={clientCarePlan}
                    transcriptData={transcript}
                    editContent={true}
                  />
                </Grid.Col>
                <Grid.Col
                  span={4}
                  bg={'#fff'}
                  h={'calc(100vh - var(--memberProfileHeight) - 150px'}
                  style={{
                    borderRadius: 12,
                    boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.05)',
                    overflow: 'scroll',
                  }}
                >
                  <BhAccordion
                    title="Activities Completed"
                    data={activitiesContent}
                    chevronPosition="right"
                    divideContent={false}
                    defaultOpen={true}
                  />
                  <BhAccordion
                    title="Follow-up Recommendations"
                    data={recommendationsContent}
                    chevronPosition="right"
                    divideContent={true}
                    defaultOpen={true}
                  />
                </Grid.Col>
              </Grid>
            </Flex>
          )}
        </Box>
      ) : (
        <>
          <Flex
            p="lg"
            mt={8}
            align="center"
            justify="center"
            style={{ height: 'calc(100vh - var(--memberProfileHeight))' }}
          >
            <Flex
              p="lg"
              mt={8}
              align="center"
              justify="center"
              className="h-full"
            >
              <Flex align="center" justify="center">
                <Box ta="center">
                  <Flex
                    mb={4}
                    align="center"
                    justify="center"
                    mx="auto"
                    h={72}
                    w={72}
                    p="lg"
                    bg="linear-gradient(94deg, #FBF4ED -12%, #E4F3EE 116.29%)"
                    style={{ borderRadius: '50%' }}
                  >
                    <IconCheck />
                  </Flex>
                  <Title size={24} mb={4}>
                    Assessment Completed
                  </Title>
                  <Text mb={20} size="sm" c="var(--text-grey)">
                    Continue to review Action Plan
                  </Text>
                  <BhButton
                    onClick={() => handleReviewStart()}
                    variant={'filled'}
                  >
                    View Action Plan
                  </BhButton>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </>
      )}
    </>
  )
}

export default ReviewServicePlan
