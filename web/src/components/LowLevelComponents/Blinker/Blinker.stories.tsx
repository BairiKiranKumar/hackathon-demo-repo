import type { Meta, StoryObj } from '@storybook/react'

import Blinker from './Blinker'

const meta: Meta<typeof Blinker> = {
  component: Blinker,
  tags: ['autodocs'],
  argTypes: {
    bgColor: {
      control: 'color',
      description: 'Color of the blinking element.',
      table: {
        type: { summary: 'color' },
        defaultValue: { summary: 'rgb(171, 0, 11)' },
      },
    },
    shadowColor: {
      control: 'color',
      description: 'Shadow color of the blinking element.',
      table: {
        type: { summary: 'color' },
        defaultValue: { summary: 'rgb(255, 138, 138)' },
      },
    },
    size: {
      control: 'number',
      description: 'height and width of element in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 10 },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Blinker>

export const Primary: Story = {
  args: {
    bgColor: 'rgb(171, 0, 11)',
    shadowColor: 'rgb(255, 138, 138)',
    size: 10,
  },
}
