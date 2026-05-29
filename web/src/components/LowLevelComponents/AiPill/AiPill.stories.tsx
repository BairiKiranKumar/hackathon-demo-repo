import type { Meta, StoryObj } from '@storybook/react'

import AiPill from './AiPill'

const meta: Meta<typeof AiPill> = {
  component: AiPill,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: {
        type: 'select',
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'sm' },
      },
      description:
        'The size of the pill. Can be one of: xs, sm, md, lg, or xl.',
    },
    gap: {
      description: 'space between text content and ai icon',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 4 },
      },
    },
    cursor: {
      description:
        'to show cursor pointer on the pill - as indication of call to action for pill',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      description: 'Content to be displayed inside pill',
    },
  },
}

export default meta

type Story = StoryObj<typeof AiPill>

export const Primary: Story = {
  args: {
    size: 'md',
    children: 'AI-Generated',
  },
}
