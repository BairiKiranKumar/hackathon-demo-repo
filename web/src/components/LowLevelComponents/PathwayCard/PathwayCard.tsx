import React, { useRef } from 'react'

import AiPill from '@lowLevelComp/AiPill/AiPill'
import BhTooltip from '@lowLevelComp/BhTooltip/BhTooltip'
import PathwayStages from '@lowLevelComp/PathwayStages/PathwayStages'
import { Card, Flex, Pill, Text } from '@mantine/core'

import './index.css'

export interface PathwayCardProps {
  pathwayData: {
    id: number | string
    name: string
    description: string
    priority?: string
    showPriorityBadge?: boolean
    formCount?: number
    state?: 'active' | 'completed' | 'upcoming'
    aiEnabled?: boolean
    stageInfo?: {
      stage: 'completed' | 'started' | 'inProgress' | 'notStarted'
      content?: string
    }
  }
  withBorder?: boolean
  onClick?: () => void
}

const PathwayCard = ({
  pathwayData,
  withBorder = false,
  onClick,
}: PathwayCardProps) => {
  const descRef = useRef(null)
  const getPriorityProperties = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'urgent':
        return {
          badgeBg: 'var(--high-impact-bg)',
          badgeColor: 'var(--high-impact-color)',
          renderContent: 'urgent',
        }
      case 'high':
        return {
          badgeBg: 'var(--high-impact-bg)',
          renderContent: <span className="bh-icon-H"></span>,
        }
      case 'medium':
        return {
          badgeBg: 'var(--medium-impact-bg)',
          renderContent: <span className="bh-icon-M"></span>,
        }
      case 'low':
        return {
          badgeBg: 'var(--low-badge-bg)',
          renderContent: <span className="bh-icon-L"></span>,
        }
      default:
        return {}
    }
  }

  const priorityProps = pathwayData.priority
    ? getPriorityProperties(pathwayData.priority)
    : {}
  return (
    <Card
      padding="md"
      radius="none"
      style={{
        borderLeft: withBorder ? '1px solid #DEE2E6' : 'none',
      }}
      bg={pathwayData.state === 'active' ? '#F4F8F6' : ''}
      className={`pathway-card ${pathwayData.state ? pathwayData.state : ''} ${pathwayData.stageInfo?.stage ? pathwayData.stageInfo?.stage : ''}`}
      onClick={onClick}
    >
      <Flex justify="space-between" align="flex-start" gap={6}>
        <Flex>
          <div className="pathway-text">
            <Flex
              className={`priority-badge priority-${pathwayData.priority}`}
              gap={4}
            >
              <Text
                lineClamp={1}
                fw={pathwayData.state === 'active' ? 700 : 600}
                c={
                  pathwayData.state === 'active'
                    ? 'var(--primary-color)'
                    : pathwayData.stageInfo?.stage === 'completed'
                      ? 'dimmed'
                      : '#000'
                }
                size="lg"
                lh="lg"
              >
                {pathwayData.name}
              </Text>
              {pathwayData.aiEnabled && <AiPill size="sm" />}
              {pathwayData.priority && pathwayData.showPriorityBadge && (
                <Pill
                  size="sm"
                  tt="capitalize"
                  bg={priorityProps.badgeBg}
                  c={priorityProps.badgeColor}
                  fw={500}
                >
                  {priorityProps.renderContent}
                </Pill>
              )}
              {pathwayData.formCount && (
                <Pill
                  size="sm"
                  tt="capitalize"
                  bg={priorityProps.badgeBg}
                  c={priorityProps.badgeColor}
                  fw={500}
                >
                  {pathwayData.formCount}
                </Pill>
              )}
            </Flex>
            <BhTooltip label={pathwayData.description} elementRef={descRef}>
              <Text
                size="sm"
                c={
                  pathwayData.stageInfo?.stage === 'completed'
                    ? 'dimmed'
                    : 'var(--text-light-grey)'
                }
                mt={2}
                lineClamp={1}
                ref={descRef}
              >
                {pathwayData.description}
              </Text>
            </BhTooltip>
          </div>
        </Flex>
        <Flex className="pathway-stage-container" justify={'space-between'}>
          {pathwayData.stageInfo && (
            <PathwayStages stage={pathwayData.stageInfo.stage}>
              {pathwayData.stageInfo.content}
            </PathwayStages>
          )}
        </Flex>
      </Flex>
    </Card>
  )
}

export default PathwayCard
