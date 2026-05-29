import React from 'react'

import { Meta, StoryFn } from '@storybook/react'

import ServicePlanCard, { ServicePlanCardProps } from './ServicePlanCard' // Ensure ServicePlanCardProps is imported

export default {
  component: ServicePlanCard,
  tags: ['autodocs'],
  argTypes: {
    urgency: {
      description: 'Indicates the urgency level of the service plan.',
      control: { type: 'select' },
      options: ['High', 'Medium', 'Low'],
    },
    status: {
      description: 'Displays the current status of the service plan.',
      control: { type: 'text' },
    },
    label: {
      description: 'Short label summarizing the service plan.',
      control: { type: 'text' },
    },
    description: {
      description: 'Detailed description of the service plan.',
      control: { type: 'text' },
    },
    startDate: {
      description: 'Start date of the service plan.',
      control: { type: 'text' },
    },
    endDate: {
      description: 'End date of the service plan.',
      control: { type: 'text' },
    },
  },
} as Meta<ServicePlanCardProps>

const Template: StoryFn<ServicePlanCardProps> = (args) => (
  <ServicePlanCard {...args} />
)

export const HighUrgency = Template.bind({})
HighUrgency.args = {
  urgency: 'High',
  label: 'Need 1',
  description:
    'I am unable to complete activities of daily living without support.',
  startDate: '27/06/2024',
  endDate: '26/07/2024',
  status: 'In Progress',
}

export const MediumUrgency = Template.bind({})
MediumUrgency.args = {
  urgency: 'Medium',
  label: 'Need 2',
  description: 'I struggle to get in and out of my shower without falling.',
  startDate: '27/06/2024',
  endDate: '26/07/2024',
  status: 'In Progress',
}

export const LowUrgency = Template.bind({})
LowUrgency.args = {
  urgency: 'Low',
  label: 'Need 3',
  description: 'I do not exercise regularly.',
  startDate: '27/06/2024',
  endDate: '26/07/2024',
  status: 'Completed',
}
