import React from 'react'

import { Box, Grid, Text, Flex, Pill } from '@mantine/core'
import { IconCalendarClock, IconPointFilled } from '@tabler/icons-react'

import { Link } from '@redwoodjs/router'
import './index.css'

export interface ServicePlanCardProps {
  urgency: 'High' | 'Medium' | 'Low'
  label: string
  description: string
  startDate: string
  endDate: string
  status: string
}

const ServicePlanCard: React.FC<ServicePlanCardProps> = ({
  urgency,
  label,
  description,
  startDate,
  endDate,
  status,
}) => (
  <Box p={16} className="bg-light-grey br-12">
    <Grid className="h-full">
      <Grid.Col span={10} style={{ display: 'flex' }}>
        <Pill
          h={20}
          miw={20}
          size="sm"
          lh="20px"
          px={0}
          mr={12}
          bg={
            urgency.toLowerCase() === 'high'
              ? 'var(--high-impact-bg)'
              : urgency.toLowerCase() === 'medium'
                ? 'var(--medium-impact-bg)'
                : 'var(--low-impact-bg)'
          }
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <Flex h="100%" align="center" fw={500}>
            {urgency.charAt(0)}
          </Flex>
        </Pill>

        <div>
          <Text mt={4} className="service-label">
            {label}
          </Text>
          <Text c="var(--text-color)" className="service-desc" size="sm">
            {description}
          </Text>
          <Flex gap={20} mt={8}>
            <Text c="var(--text-color)" className="service-desc">
              <IconCalendarClock size={20} color="var(--text-grey)" />{' '}
              {startDate} -
              <IconCalendarClock size={20} color="var(--text-grey)" /> {endDate}
            </Text>
          </Flex>
        </div>
      </Grid.Col>
      <Grid.Col span={2} className="service-status-col">
        <Text mt={4} className="service-status">
          <IconPointFilled
            color={
              status === 'Not Started'
                ? 'var(--text-light-grey)'
                : status === 'Completed'
                  ? 'var(--complete-green-status)'
                  : 'var(--progress-brown-status)'
            }
            size="20px"
          />{' '}
          {status}
        </Text>
        <Link to={''} className="service-more">
          <Text c="var(--primary-color)" className="service-more">
            View More
          </Text>
        </Link>
      </Grid.Col>
    </Grid>
  </Box>
)

export default ServicePlanCard
