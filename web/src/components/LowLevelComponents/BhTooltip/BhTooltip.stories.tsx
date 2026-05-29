import { useRef } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import BhTooltip from './BhTooltip'

const meta: Meta<typeof BhTooltip> = {
  component: BhTooltip,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The text to display in the tooltip.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Tooltip text' },
      },
    },
    elementRef: {
      description: 'reference to current element',
      table: {
        type: { summary: 'string' },
      },
    },
    direction: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'The direction of the tooltip.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'vertical' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof BhTooltip>
const TooltipWithRef = (args) => {
  const elementRef = useRef(null)

  return (
    <BhTooltip {...args} elementRef={elementRef}>
      <span className="line-clamp-2" ref={elementRef}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
      </span>
    </BhTooltip>
  )
}

export const Primary: Story = {
  args: {
    label:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    direction: 'vertical',
  },
  render: (args) => <TooltipWithRef {...args} />,
}
