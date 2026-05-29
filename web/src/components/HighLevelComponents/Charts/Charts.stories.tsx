import { Meta, StoryObj } from '@storybook/react'

import Charts from './Charts'

const meta: Meta<typeof Charts> = {
  component: Charts,
  tags: ['autodocs'],
  argTypes: {
    chartWidth: {
      description: 'width of chart to manage its responsiveness',
      control: 'number',
      defaultValue: 800,
    },
    chartData: {
      description: 'series of data to present in chart',
      control: 'array',
      defaultValue: [],
    },
  },
}

const HCBS_Chart = [
  {
    month: 'Sep',
    visit: true,
    call: true,
    readings: [
      { current: 59, date: '2024-09-01T00:00:00Z', acute: false },
      { current: 61, date: '2024-09-12T00:00:00Z', acute: true },
      { current: 62, date: '2024-09-16T00:00:00Z', acute: true },
    ],
  },
  {
    month: 'Oct',
    visit: true,
    call: true,
    readings: [{ current: 64, date: '2024-10-17T00:00:00Z', acute: true }],
  },
  {
    month: 'Nov',
    visit: false,
    call: true,
    readings: [{ current: 71, date: '2024-11-29T00:00:00Z', acute: true }],
  },
  {
    month: 'Dec',
    visit: true,
    call: false,
    readings: [],
  },
  {
    month: 'Jan',
    visit: true,
    call: false,
    readings: [],
  },
  {
    month: 'Feb',
    visit: true,
    call: false,
    readings: [
      {
        current: null,
        date: '2025-02-28T00:00:00Z',
        desired: 55,
        projected: 81,
        acute: false,
      },
    ],
  },
]

export default meta

type Story = StoryObj<typeof Charts>

export const Default: Story = {
  args: {
    chartData: HCBS_Chart,
    chartWidth: 800,
  },
}
