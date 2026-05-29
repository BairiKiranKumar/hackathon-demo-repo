import type { Meta, StoryObj } from '@storybook/react'

import DateTime from './DateTime'

const meta: Meta<typeof DateTime> = {
  component: DateTime,
  tags: ['autodocs'],
  argTypes: {
    format: {
      options: ['MM/DD/YY', 'MMMM Do YYYY', 'h:mm a', 'YYYY-MM-DD HH:mm:ss'],
      control: {
        type: 'select',
      },
      description: 'The format of the date and time display.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'MM/DD/YY' },
      },
    },
    allowToggle: {
      control: 'boolean',
      description: 'Whether to allow toggling between date and relative time.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    dateRange: {
      control: 'date',
      description: 'The initial date.',
      table: {
        type: { summary: 'Date' },
        defaultValue: { summary: 'new Date()' },
      },
    },
    cursor: {
      control: 'boolean',
      description: 'Whether to show a cursor on hover.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    styleClass: {
      control: 'text',
      description: 'Additional CSS classes to apply to the component.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof DateTime>

export const Primary: Story = {
  args: {
    allowToggle: true,
    dateRange: new Date(),
    format: 'MM/DD/YY',
    cursor: true,
    styleClass: '',
  },
}
