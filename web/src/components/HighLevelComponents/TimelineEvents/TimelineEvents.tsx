import React, { useState, useEffect } from 'react'

import { Box, Text, Timeline } from '@mantine/core'
import moment from 'moment'

import './index.css'

type TimelineItem = {
  id: number
  date: string
  time: string
  event: string
  description: string
  active: boolean
  type: string
  Icon: React.ElementType
}

type TimelineEventsProps = {
  timelineData: TimelineItem[]
  handleActiveTimeline: (item: TimelineItem) => void
}

const TimelineEvents: React.FC<TimelineEventsProps> = ({
  timelineData,
  handleActiveTimeline,
}) => {
  const [data, setData] = useState([])

  const activeIndex = data.findIndex((item) => item.active)
  const formatDate = (date) => {
    return moment(date, 'YYYY-MM-DD').format('DD MMMM YYYY')
  }

  useEffect(() => {
    if (timelineData) {
      setData(timelineData)
    }
  }, [timelineData])

  return (
    <Box mt={20} className="custom-timeline h-full overflow-y-auto">
      <Timeline active={activeIndex} bulletSize={24} lineWidth={2}>
        {data.map((item, index) => {
          const Icon = item.Icon
          return (
            <Timeline.Item
              key={index}
              className={'timeline-lineItem'}
              onClick={() => handleActiveTimeline(item)}
              bullet={
                <Icon
                  size={'16px'}
                  className={item.active ? 'active-ico' : 'inactive-ico'}
                />
              }
              title={`${formatDate(item.date)}, ${item.time}`}
              style={{ fontWeight: 600 }}
            >
              <Box
                p={12}
                className={
                  item.active ? 'active-timeline' : 'inactive-timeline'
                }
              >
                <Text mt={4} size="sm" fw={600}>
                  {item.event}
                </Text>
                <Text size="sm">{item.description}</Text>
              </Box>
            </Timeline.Item>
          )
        })}
      </Timeline>
    </Box>
  )
}

export default TimelineEvents
