import type { Meta, StoryObj } from '@storybook/react'

import MemberInsights from './MemberInsights'

const meta: Meta<typeof MemberInsights> = {
  component: MemberInsights,
  tags: ['autodocs'],
  argTypes: {
    insight: {
      description:
        'data for insight data - including aiDiagSummary, aiRiskFactors, aiRecommendations',
    },
    loading: {
      description: 'state of the component loading if data is not loaded yet',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      control: {
        type: 'boolean',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof MemberInsights>

export const Primary: Story = {
  args: {
    insight: {
      id: 2,
      status: 'URGENT',
      currentScore: 71,
      pastScores: {
        dates: ['2024-10-10T00:00:00.000Z'],
        scores: [21],
      },
      aiDiagSummary: {
        entries: [
          {
            label: 'Hyperlipidemia',
            onset: '03/03/2018',
            status: 'active',
            abatement: '',
          },
          {
            label: 'Chronic sinusitis',
            onset: '07/15/2010',
            status: 'resolved',
            abatement: '03/03/2015',
          },
        ],
        heading: 'Diagnoses',
      },
      aiRiskFactors: {
        entries: [
          {
            title: 'Multiple Chronic Conditions',
            items: [
              {
                title: 'Indication',
                category: 'problem',
                subEntries: [{ value: '5+ comorbidities' }],
              },
              {
                title: 'Solutions',
                category: 'solution',
                subEntries: [
                  { value: 'Skilled nursing support' },
                  { value: 'Disease education' },
                  { value: 'Nutritional evaluation' },
                ],
              },
            ],
          },
          {
            title: 'Medication Management',
            items: [
              {
                title: 'Indication',
                category: 'problem',
                subEntries: [
                  { value: 'Prescription changes', highlight: true },
                  { value: 'Unfilled refills' },
                ],
              },
              {
                title: 'Solutions',
                category: 'solution',
                subEntries: [
                  {
                    value:
                      'Explore interventions to address medication adherence',
                  },
                ],
              },
            ],
          },
        ],
        heading: 'High Risk Factors',
      },
      aiRecommendations: {
        entries: [
          {
            title: 'Telehealth Monitoring',
            items: [
              {
                title: 'Recommendations',
                category: 'problem',
                subEntries: [
                  {
                    value:
                      'Manage chronic conditions Detect early health changes',
                  },
                  { value: 'Detect early health changes' },
                ],
              },
              {
                title: 'Explanation',
                category: 'solution',
                subEntries: [
                  { value: 'Enable early detection' },
                  { value: 'Support timely intervention' },
                ],
              },
            ],
          },
        ],
        heading: 'Recommendations',
      },
    },
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}
