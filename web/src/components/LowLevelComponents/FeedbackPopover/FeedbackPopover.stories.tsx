import { useState } from 'react'

import { Button } from '@mantine/core'
import type { Meta, StoryObj } from '@storybook/react'

import FeedbackPopover from './FeedbackPopover'

const meta: Meta<typeof FeedbackPopover> = {
  component: FeedbackPopover,
  tags: ['autodocs'],
  argTypes: {
    opened: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the popover is open.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    width: {
      description: 'Width of the popover',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 300 },
      },
    },
    withArrow: {
      control: {
        type: 'boolean',
      },
      description: 'if the popover is with arrow',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    closeOnClickOutside: {
      control: {
        type: 'boolean',
      },
      description:
        'if true popover will not close on outside: have more control on submit and cancel events',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'disable target to trigger popover',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    position: {
      control: {
        type: 'text',
      },
      description:
        'initial position of popover to open respective of targeted element',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'bottom' },
      },
    },
    popoverTitle: {
      control: {
        type: 'text',
      },
      description: 'The title of the popover.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    offset: {
      control: {
        type: 'number',
      },
      description: 'Offset distance of the popover from the target element.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 4 },
      },
    },
    reasons: {
      description: 'An array of reason objects.',
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: '[]' },
      },
    },
    onSubmit: {
      description: 'Callback function to handle form submission.',
      table: {
        type: { summary: 'function' },
      },
    },
    onCancel: {
      description: 'Callback function to handle form cancellation.',
      table: {
        type: { summary: 'function' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof FeedbackPopover>

const FeedbackPopoverStory = (args) => {
  const [opened, setOpened] = useState(false)
  const [selectedReason, setSelectedReason] = useState(null)
  const [otherReason, setOtherReason] = useState('')

  const handleSubmit = () => {
    setOpened(false)
    resetReasons()
    console.log(`Selected Reason: ${selectedReason}, Other: ${otherReason}`)
  }

  const resetReasons = () => {
    setSelectedReason(null)
    setOtherReason('')
  }

  const handleCancel = () => {
    setOpened(false)
    resetReasons()
  }

  const togglePopover = (popoverState: boolean) => {
    setOpened(popoverState)
    resetReasons()
  }

  return (
    <FeedbackPopover
      {...args}
      opened={opened}
      selectedReason={selectedReason}
      onReasonChange={setSelectedReason}
      otherReason={otherReason}
      onOtherReasonChange={setOtherReason}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onChange={togglePopover}
    >
      <Button size="sm" onClick={() => togglePopover(!opened)}>
        Open Popover
      </Button>
    </FeedbackPopover>
  )
}

export const Primary: Story = {
  args: {
    popoverTitle: 'Please select a reason',
    offset: 4,
    reasons: [
      `Patient didn't want it`,
      `Clinician feels it's not appropriate`,
      `Others`,
    ],
  },
  render: (args) => <FeedbackPopoverStory {...args} />,
}
