import type { Meta, StoryObj } from '@storybook/react'

import PathwayCard from './PathwayCard'

const meta: Meta<typeof PathwayCard> = {
  component: PathwayCard,
  tags: ['autodocs'],
  argTypes: {
    pathwayData: {
      description: 'An objects for pathway card data',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
    withBorder: {
      description: 'to add border to the card',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof PathwayCard>

export const Primary: Story = {
  args: {
    withBorder: true,
    pathwayData: {
      id: '1',
      state: 'upcoming',
      priority: 'urgent',
      name: 'Norway Fjord Adventures',
      description:
        'With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway',
      aiEnabled: true,
      stageInfo: {
        stage: 'notStarted',
        content: '10 min',
      },
    },
  },
}

export const Selected: Story = {
  args: {
    pathwayData: {
      id: 1,
      state: 'active',
      priority: 'high',
      name: 'Norway Fjord Adventures',
      description:
        'With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway',
      aiEnabled: false,
      stageInfo: {
        stage: 'started',
        content: '10 min',
      },
    },
  },
}

export const Completed: Story = {
  args: {
    pathwayData: {
      id: 2,
      state: 'completed',
      priority: 'medium',
      name: 'Norway Fjord Adventures',
      description:
        'With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway',
      aiEnabled: false,
      stageInfo: {
        stage: 'completed',
      },
    },
  },
}
