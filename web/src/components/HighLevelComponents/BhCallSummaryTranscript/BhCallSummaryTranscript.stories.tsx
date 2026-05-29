import React from 'react'

import { Meta, StoryObj } from '@storybook/react'

import SkeletonLoader from 'src/components/LowLevelComponents/SkeletonLoader/SkeletonLoader'

import BhCallSummaryTranscript from './BhCallSummaryTranscript'

// Sample data for the component
const sampleSummaryData = [
  {
    id: 1,
    label: 'Meeting Purpose',
    value: [
      'To discuss and plan the member’s health goals and interventions, ensuring alignment with their personal aspirations, such as hanging out with her grandkids.',
    ],
  },
  {
    id: 2,
    label: 'Pathway Enrollment',
    value: [
      'Suggested pathway enrollment to support annual fishing trip goal.',
      'Explained the benefits of the pathway for achieving personal goals.',
      'Provided information on how to enroll and what to expect.',
    ],
  },
]

const sampleTranscriptData = [
  {
    id: 1,
    person: 'Dana Grubbs',
    conversation:
      'Hi, this is Dana calling from Braided Health, may I speak to Ms. Newman, please?',
    time: '00:10',
  },
  {
    id: 2,
    person: 'Stephanie Newman',
    conversation: 'This is Stephanie Newman',
    time: '00:15',
  },
]

export default {
  component: BhCallSummaryTranscript,
  tags: ['autodocs', 'interaction', 'UI'],
  argTypes: {
    summaryData: {
      description:
        'Array of summary items with labels and corresponding values.',
    },
    transcriptData: {
      description:
        'Array of transcript entries with person, conversation, and timestamp details.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'BhCallSummaryTranscript is a tab-based component that displays either a summary or a transcript of a call. It supports loading states and dynamic data rendering.',
      },
    },
  },
} as Meta<typeof BhCallSummaryTranscript>

const Template: StoryObj<typeof BhCallSummaryTranscript> = {
  render: (args) => <BhCallSummaryTranscript {...args} />,
}

export const Default = {
  ...Template,
  args: {
    summaryData: sampleSummaryData,
    transcriptData: sampleTranscriptData,
  },
}

export const EmptyData = {
  ...Template,
  args: {
    summaryData: [],
    transcriptData: [],
  },
}

export const LoadingState: StoryObj<typeof BhCallSummaryTranscript> = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <div>
        <SkeletonLoader height={40} width={'100%'} />
      </div>
      <div style={{ marginTop: 20 }}>
        <SkeletonLoader height={100} width={'100%'} />
      </div>
    </div>
  ),
  args: {
    summaryData: sampleSummaryData,
    transcriptData: sampleTranscriptData,
  },
}
