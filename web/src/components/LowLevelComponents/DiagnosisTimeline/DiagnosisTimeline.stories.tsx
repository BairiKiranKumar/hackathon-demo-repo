import type { Meta, StoryObj } from '@storybook/react'

import DiagnosisTimeline from './DiagnosisTimeline'

const meta: Meta<typeof DiagnosisTimeline> = {
  component: DiagnosisTimeline,
  tags: ['autodocs'],
  argTypes: {
    timelineData: {
      description: 'An array of objects, each representing a medical condition',
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: '[]' },
      },
    },
    loading: {
      description: 'Loading state for timeline card to show skeleton Loader',
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
        type: { summary: 2 },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof DiagnosisTimeline>

export const Primary: Story = {
  args: {
    timelineData: [
      {
        status: 'active',
        label: 'Hyperlipidemia',
        onset: '03/03/2018',
        abatement: '',
      },
      {
        status: 'resolved',
        label: 'Viral Sinusitis (disorder)',
        onset: '03/20/2015',
        abatement: '04/10/2015',
      },
    ],
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    loadingContentCount: 2,
  },
}
