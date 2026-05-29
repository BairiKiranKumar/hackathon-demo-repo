import type { Meta, StoryObj } from '@storybook/react'

import PriorityBadge from './PriorityBadge'

const meta: Meta<typeof PriorityBadge> = {
  component: PriorityBadge,
  argTypes: {
    priority: {
      options: ['urgent', 'high', 'medium', 'low'],
      control: {
        type: 'select',
      },
      description: 'The priority level of the badge.',
      table: {
        type: { summary: '"urgent" | "high" | "medium" | "low"' },
        defaultValue: { summary: 'medium' },
      },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
      description: 'The size of the badge.',
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: 'md' },
      },
    },
    children: {
      description: 'The content to be displayed inside the badge.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof PriorityBadge>

export const Urgent: Story = {
  args: {
    children: 'urgent',
    priority: 'urgent',
    size: 'sm',
  },
}

export const High: Story = {
  args: {
    children: 'high',
    priority: 'high',
    size: 'md',
  },
}

export const Medium: Story = {
  args: {
    children: 'medium',
    priority: 'medium',
    size: 'lg',
  },
}

export const Low: Story = {
  args: {
    children: 'low',
    priority: 'low',
  },
}
