import type { Meta, StoryObj } from '@storybook/react'

import CalendarTravelCard from './CalendarTravelCard'

const meta: Meta<typeof CalendarTravelCard> = {
  component: CalendarTravelCard,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Title of the event',
      defaultValue: '',
    },
    startTime: {
      description: 'Start time of the event',
    },
    endTime: {
      description: 'End time of the event',
    },
    breakType: {
      description: 'type of break - lunch or travel',
    },
    description: {
      description: 'Description of the event',
      defaultValue: '',
    },
    haveLocation: {
      description: 'Whether to display a location link',
      defaultValue: false,
    },
  },
}

export default meta

type Story = StoryObj<typeof CalendarTravelCard>

export const Primary: Story = {
  args: {
    title: 'Lunch Break',
    breakType: 'lunch',
    description: '',
    startTime: '14:00',
    endTime: '14:30',
  },
}

export const Travel: Story = {
  args: {
    startTime: '16:00',
    endTime: '16:30',
    title: `Travel from your place to Mrs. Goldberg's home by`,
    breakType: 'travel',
    description: 'More traffic than normal expected. Approx. 16 min',
  },
}

export const withLocationLink: Story = {
  args: {
    startTime: '17:00',
    endTime: '17:30',
    title: `Travel back from Mrs. Goldberg's home`,
    breakType: 'travel',
    description: 'Approx. 25 to 30 min',
    haveLocation: true,
  },
}
