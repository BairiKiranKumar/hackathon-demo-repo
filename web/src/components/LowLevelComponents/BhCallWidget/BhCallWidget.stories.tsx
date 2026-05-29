import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import BhCallWidget from './BhCallWidget'

const meta: Meta<typeof BhCallWidget> = {
  component: BhCallWidget,
  tags: ['autodocs'],
  argTypes: {
    hasJoinedCall: {
      description: 'if user has joined the call',
      defaultValue: { summary: 'false' },
    },
  },
}

export default meta

type Story = StoryObj<typeof BhCallWidget>

const BhCallWidgetStory = (args) => {
  const [hasJoinedCall, setHasJoinedCall] = useState(args.hasJoinedCall)

  const handleCallActions = (status: boolean) => {
    setHasJoinedCall(status)
  }
  return (
    <BhCallWidget
      {...args}
      hasJoinedCall={hasJoinedCall}
      handleCallActions={handleCallActions}
    ></BhCallWidget>
  )
}

export const Primary: Story = {
  args: {
    hasJoinedCall: false,
    handleCallActions: null,
  },
  render: (args) => <BhCallWidgetStory {...args} />,
}
