import type { Meta, StoryObj } from '@storybook/react'

import PathwayStages from './PathwayStages'

const meta: Meta<typeof PathwayStages> = {
  component: PathwayStages,
  tags: ['autodocs'],
  argTypes: {
    stage: {
      options: ['started', 'inProgress', 'completed', 'notStarted'],
      control: 'select',
      description: 'Status of the stage',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'started' },
      },
    },
    children: {
      control: 'text',
      description:
        'The content of the stage if status is ongoing and will take mentioned time to complete.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '10 min' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof PathwayStages>

export const Started: Story = {
  args: {
    stage: 'started',
  },
}

export const NotStarted: Story = {
  args: {
    stage: 'notStarted',
    children: '10 min',
  },
}

export const InProgress: Story = {
  args: {
    stage: 'inProgress',
  },
}

export const Completed: Story = {
  args: {
    stage: 'completed',
  },
}
