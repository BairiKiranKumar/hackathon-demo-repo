import type { Meta, StoryObj } from '@storybook/react'

import BhAiSuggestedNudges from './BhAiSuggestedNudges'

const meta: Meta<typeof BhAiSuggestedNudges> = {
  component: BhAiSuggestedNudges,
  tags: ['autodocs'],
  argTypes: {
    aiSuggestions: {
      description: 'array of ai suggestion nudges',
      table: {
        defaultValue: {
          summary: '[]',
        },
      },
    },
    activePunchList: {
      description: 'details of active card/list of punchlist',
      table: {
        defaultValue: {
          summary: '{}',
        },
      },
    },
    hasJoinedCall: {
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
      description:
        'if user has joined to call, suggestions will show once the call is joined',
    },
  },
}

export default meta

type Story = StoryObj<typeof BhAiSuggestedNudges>

export const Primary: Story = {
  args: {
    aiSuggestions: [
      {
        id: 1,
        allowClose: true,
        title: {
          value: 'Ask member if she has transportation to her appointment',
          styles: { fontSize: 'sm', color: 'var(--mantine-color-black)' },
        },
        description: {
          value:
            'Based on the score obtained at the PHQ-2, the PHQ-9 assessment should be completed as well',
          styles: { fontSize: 'xs', color: 'var(--text-grey)' },
        },
      },
      {
        id: 2,
        allowClose: true,
        title: {
          value: 'Ask member if she has transportation to her appointment',
          styles: { fontSize: 'sm', color: 'var(--mantine-color-black)' },
        },
      },
      {
        id: 3,
        title: {
          value: 'PHQ9 Assessment',
          styles: { fontSize: 'sm', color: 'var(--mantine-color-black)' },
        },
        description: {
          value:
            'Based on the score obtained at the PHQ-2, the PHQ-9 assessment should be completed as well',
          styles: { fontSize: 'xs', color: 'var(--text-grey)' },
        },
        actionButtonText: 'start',
        onActionButtonClick: null,
        duration: '10 min',
      },
    ],
    activePunchList: {
      id: 1,
      checked: false,
      name: 'Conversation Starter',
      description: 'Verify member identity and elicit member priorities',
      state: 'active',
      stageInfo: {
        stage: 'started',
      },
      category: 'introduction',
    },
    hasJoinedCall: true,
  },
}

export const Empty: Story = {
  args: {},
}
