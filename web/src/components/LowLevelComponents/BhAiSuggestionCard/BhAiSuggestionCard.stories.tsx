import type { Meta, StoryObj } from '@storybook/react'

import BhAiSuggestionCard from './BhAiSuggestionCard'

const meta: Meta<typeof BhAiSuggestionCard> = {
  component: BhAiSuggestionCard,
  tags: ['autodocs'],
  argTypes: {
    allowClose: {
      description: 'add close button to remove suggestion card',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    title: {
      description: 'title of suggestion with text styles',
      table: {
        defaultValue: {
          summary: 'Ask member if she has transportation to her appointment',
        },
      },
    },
    description: {
      description: `description text of suggestion with text styles. like:description: {
                value:
                  'some text',
                styles: { fontSize: 'sm', color: 'var(--text-grey)' },
              }`,
      control: 'object',
      table: {
        type: { summary: 'object' },
        defaultValue: {
          summary: { value: 'test description' },
        },
      },
    },
    actionButtonText: {
      description: 'action button text ',
      control: 'text',
      table: {
        defaultValue: {
          summary: 'Start',
        },
      },
    },
    onActionButtonClick: {
      description: 'event on button click',
    },
  },
}

export default meta

type Story = StoryObj<typeof BhAiSuggestionCard>

export const Primary: Story = {
  args: {
    allowClose: true,
    title: {
      value: 'Ask member if she has transportation to her appointment',
      styles: { fontSize: 'sm', color: 'var(--mantine-color-black)' },
    },
  },
}

export const WithDescription: Story = {
  args: {
    title: {
      value: 'PHQ9 Assessment',
      styles: { fontSize: 'sm', color: 'var(--mantine-color-black)' },
    },
    description: {
      value:
        'Based on the score obtained at the PHQ-2, the PHQ-9 assessment should be completed as well',
      styles: { fontSize: 'sm', color: 'var(--text-grey)' },
    },
    actionButtonText: 'start',
    onActionButtonClick: null,
    duration: '10 min',
  },
}
