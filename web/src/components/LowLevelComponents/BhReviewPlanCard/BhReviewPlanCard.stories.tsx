import type { Meta, StoryObj } from '@storybook/react'

import BhReviewPlanCard from './BhReviewPlanCard'

const meta: Meta<typeof BhReviewPlanCard> = {
  component: BhReviewPlanCard,
  tags: ['autodocs'],
  argTypes: {
    planName: {
      description: 'Label for the review card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
      control: 'text',
    },
    isAiGenerated: {
      description: 'Indicates whether the plan is AI-generated',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: '-' },
      },
      control: 'boolean',
    },
    description: {
      description: 'Detailed description of the plan',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
      control: 'text',
    },
    isSelected: {
      description: 'Indicates if the card is selected',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: '-' },
      },
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof BhReviewPlanCard>

export const Primary: Story = {
  args: {
    planName: 'Frailty Pathway',
    isAiGenerated: true,
    description: 'Rising risk score due to multiple recent ED admissions',
    isSelected: false,
  },
}

export const Selected: Story = {
  args: {
    planName: 'Frailty Pathway',
    isAiGenerated: true,
    description: 'Rising risk score due to multiple recent ED admissions',
    isSelected: true,
  },
}
