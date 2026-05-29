import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import DiagnosesCard from './DiagnosesCard'

const meta: Meta<typeof DiagnosesCard> = {
  component: DiagnosesCard,
  tags: ['autodocs'],
  argTypes: {
    cardContent: {
      description:
        'Data to be displayed in Diagnoses Card - title and list items',
      table: {
        type: { summary: '{}' },
      },
    },
    feedbackProps: {
      description: 'Props for FeedbackPopover',
      control: 'object',
    },
    loading: {
      description: 'Loading state for diagnoses card to show skeleton Loader',
      control: 'boolean',
      table: {
        type: { summary: false },
      },
    },
    loadingContentCount: {
      description:
        'Number of loading placeholder to display while data is loading',
      control: 'number',
      table: {
        type: { summary: 1 },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof DiagnosesCard>

const DiagnosesCardStory = (args) => {
  const reasons = [
    `Patient didn't want it`,
    `Clinician feels it's not appropriate`,
    `Others`,
  ]

  const [popoverOpened, setPopoverOpened] = useState(false)
  const [reaction, setReaction] = useState({ dislike: false })
  const [selectedReason, setSelectedReason] = useState(null)
  const [otherReason, setOtherReason] = useState('')

  const handleDislikeClick = (disliked: boolean) => {
    // Open the popover if dislike is true
    setReaction((prevReaction) => ({ dislike: !prevReaction.dislike }))
    setPopoverOpened(!disliked)

    if (!disliked) {
      // Reset popover data when dislike is turned off
      setSelectedReason(null)
      setOtherReason('')
    }
  }

  const onOtherReasonChange = (otherReason: string) => {
    setOtherReason(otherReason)
  }

  const handleCancel = () => {
    handleDislikeClick(false)
  }

  const handleSubmit = () => {
    setPopoverOpened(false)
  }

  const feedbackProps = {
    popoverOpened,
    onCancel: handleCancel,
    onSubmit: handleSubmit,
    popoverTitle: 'Please provide a reason',
    reasons,
    selectedReason,
    onReasonChange: setSelectedReason,
    otherReason,
    onOtherReasonChange: onOtherReasonChange,
  }

  return (
    <DiagnosesCard
      {...args}
      reaction={reaction}
      feedbackProps={feedbackProps}
      setFeedbackId={args.setFeedbackId || (() => {})}
    />
  )
}

export const Primary: Story = {
  args: {
    cardContent: {
      title: 'Multiple Chronic Conditions',
      items: [
        {
          title: 'Recommendations',
          category: 'problem',
          subEntries: [
            {
              value: 'Manage chronic conditions Detect early health changes',
            },
            {
              value: 'Detect early health changes',
            },
          ],
        },
        {
          title: 'Explanation',
          category: 'solution',
          subEntries: [
            {
              value: 'Enable early detection',
            },
            {
              value: 'Support timely intervention',
            },
          ],
        },
      ],
    },
    loading: false,
  },
  render: (args) => <DiagnosesCardStory {...args} />,
}

export const Loading: Story = {
  args: {
    loading: true,
    loadingContentCount: 3,
  },
  render: (args) => <DiagnosesCardStory {...args} />,
}
