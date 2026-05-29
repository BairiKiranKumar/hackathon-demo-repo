import { useRef } from 'react'

import BhTooltip from '@lowLevelComp/BhTooltip/BhTooltip'
import { Timeline, Flex, Divider, Box, Text } from '@mantine/core'
import { IconCheck, IconCircle } from '@tabler/icons-react'

import {
  TimelineLoadingProps,
  TimelineNormalProps,
} from 'src/interfaces/commonInterfaces'

import SkeletonLoader from '../SkeletonLoader/SkeletonLoader'
import './index.css'

const getStatusIcon = (status: string) => {
  return status === 'resolved' ? (
    <IconCheck size={16} color="white" />
  ) : (
    <IconCircle size={8} color="#FA5252" fill="#FA5252" stroke={1.5} />
  )
}

type DiagnosisTimelineProps = TimelineLoadingProps | TimelineNormalProps

const DiagnosisTimeline: React.FC<DiagnosisTimelineProps> = (props) => {
  let timelineProps: TimelineNormalProps | null = null
  const opportunityRef = useRef(null)

  if (!props.loading) {
    timelineProps = props as TimelineNormalProps
  }

  return (
    <>
      {props.loading ? (
        <div className="timeline-loading-wrap">
          {Array.from({ length: props.loadingContentCount }).map((_, index) => (
            <Flex key={index} className="connecting-timeline">
              <SkeletonLoader
                isAiGradient={true}
                height={20}
                circle={true}
                display="block"
                styleClass="timeline-loader"
              />
              <Box w={'100%'} ml={4}>
                <SkeletonLoader
                  height={20}
                  display="block"
                  mb={4}
                  isAiGradient={true}
                />
                <SkeletonLoader
                  height={16}
                  display="block"
                  isAiGradient={true}
                />
              </Box>
            </Flex>
          ))}
        </div>
      ) : (
        <Timeline
          active={1}
          bulletSize={20}
          lineWidth={1}
          color="#DEE2E6"
          className="insight-diagnosis"
        >
          {timelineProps.timelineData.map((item, index: number) => (
            <Timeline.Item
              key={index}
              bullet={getStatusIcon(item.status)}
              title={item.label}
              className={item.status}
              fw={700}
            >
              <Box className="time-text">
                <Flex gap={10}>
                  Onset: {item.onset}
                  {item.abatement && (
                    <>
                      <Divider orientation="vertical" color="#DEE2E6" />
                      <div> Abatement: {item.abatement}</div>
                    </>
                  )}
                </Flex>
              </Box>
              {item.opportunity && (
                <BhTooltip label={item.opportunity} elementRef={opportunityRef}>
                  <Text
                    className="time-text"
                    lineClamp={1}
                    ref={opportunityRef}
                  >
                    Opportunity: {item.opportunity}
                  </Text>
                </BhTooltip>
              )}
            </Timeline.Item>
          ))}
        </Timeline>
      )}
    </>
  )
}

export default DiagnosisTimeline
