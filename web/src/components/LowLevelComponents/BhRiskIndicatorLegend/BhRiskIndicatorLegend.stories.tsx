import React from 'react'

import { Divider } from '@mantine/core'
import { Meta, StoryObj } from '@storybook/react'

import BhRiskIndicatorLegend from './BhRiskIndicatorLegend'
import './index.css'

export default {
  component: BhRiskIndicatorLegend,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    riskLevel: {
      description:
        'Select a single risk level to display or show all by default.',
      options: ['All', 'High', 'Medium', 'Low'],
      control: { type: 'select' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'All' },
      },
    },
  },
} as Meta

type Story = StoryObj<typeof BhRiskIndicatorLegend>

const riskLevels = [
  {
    label: 'High',
    tag: 'H',
    bg: 'var(--high-impact-bg)',
    c: 'var(--high-impact-color)',
  },
  { label: 'Medium', tag: 'M', bg: 'var(--medium-impact-bg)', c: '#000' },
  { label: 'Low', tag: 'L', bg: 'var(--low-badge-bg)', c: '#000' },
]
export const Default: Story = {
  args: {
    riskLevels: 'All',
  },
  render: ({ riskLevels: riskLevel }) => {
    const filteredRiskLevels =
      riskLevel === 'All'
        ? riskLevels
        : riskLevels.filter((risk) => risk.label === riskLevel)

    return (
      <div className="care-plan-legend">
        <Divider my="sm" variant="dashed" />
        <BhRiskIndicatorLegend riskLevels={filteredRiskLevels} />
      </div>
    )
  },
}
