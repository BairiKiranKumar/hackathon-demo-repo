import React, { useState, useEffect, useRef } from 'react'

import '../../index.css'
import BhCallSummaryTranscript from '@highLevelComp/BhCallSummaryTranscript/BhCallSummaryTranscript'
import BhAccordion from '@lowLevelComp/BhAccordion/BhAccordion'
import BhButton from '@lowLevelComp/BhButton/BhButton'
import PriorityBadge from '@lowLevelComp/PriorityBadge/PriorityBadge'
import SkeletonLoader from '@lowLevelComp/SkeletonLoader/SkeletonLoader'
import { Flex, Text, Grid, Card } from '@mantine/core'
import { IconCircleCheck } from '@tabler/icons-react'
import moment from 'moment'

import { TimelineData } from '../../types'

export interface TimelineProps {
  TimelineData: TimelineData[]
}

const TimelineContent: React.FC<TimelineProps> = ({ TimelineData }) => {
  const [loading, setLoading] = useState(true)
  const panelRef = useRef(null)

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

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timerId)
  }, [])

  return (
    <>
      {TimelineData.filter((timeline) => timeline.active).map((content) => {
        return (
          <div key={content.id} ref={panelRef}>
            {/* Header */}
            <Flex justify="space-between" px={4} py={20} align="center">
              <Text fw={600} size="lg">
                {`Highlight of ${moment(content.date, 'YYYY-MM-DD').format('DD MMMM YYYY')}, ${content.time}`}
              </Text>
            </Flex>
            {/* Tabs */}
            <Flex
              style={{
                height: 'calc(100vh - var(--memberProfileHeight))',
              }}
            >
              <Grid style={{ display: 'flex', width: '100%' }}>
                <Grid.Col span={8}>
                  <BhCallSummaryTranscript
                    summaryData={content?.summary}
                    transcriptData={content?.transcript}
                    editContent={false}
                  />
                </Grid.Col>
                <Grid.Col
                  span={4}
                  bg={'#fff'}
                  h={'calc(100vh - var(--memberProfileHeight) - 138px)'} //138 is height of title above + widget below
                  style={{
                    borderRadius: 12,
                    boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.05)',
                    overflow: 'scroll',
                  }}
                >
                  {loading ? (
                    <>
                      <Card>
                        <SkeletonLoader height={40} width={'100%'} />
                      </Card>
                      <Card>
                        <SkeletonLoader height={40} width={'100%'} />
                      </Card>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </Grid.Col>
              </Grid>
            </Flex>
          </div>
        )
      })}
    </>
  )
}

export default TimelineContent
