import type { Meta, StoryObj } from '@storybook/react'

import HomeHeader from './HomeHeader'

const headerData = {
  date: '09/28/2024',
  time: '09:50 AM',
  userName: 'Dana',
  tasksCount: 5,
  aiTasksCount: 4,
  eventsCount: 5,
  aiEventsCount: 3,
}

const meta: Meta<typeof HomeHeader> = {
  component: HomeHeader,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description:
        'The header data containing date, time, user name, tasks, and events counts.',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: JSON.stringify(headerData) },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof HomeHeader>

export const Primary: Story = {
  args: {
    data: headerData,
  },
}
