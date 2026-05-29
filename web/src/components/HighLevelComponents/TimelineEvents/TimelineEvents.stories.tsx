import type { Meta, StoryObj } from '@storybook/react'
import { IconPhone, IconHome } from '@tabler/icons-react'

import TimelineEvents from './TimelineEvents'

const meta: Meta<typeof TimelineEvents> = {
  component: TimelineEvents,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    timelineData: {
      description:
        'Array of timeline events, each containing details about date, time, event, description, active status, type, and an associated icon.',
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: '[]' },
      },
      control: {
        type: 'object',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof TimelineEvents>

export const Default: Story = {
  args: {
    timelineData: [
      {
        id: 1,
        date: '11/11/24',
        time: '5:30 PM',
        event: 'Telephonic Encounter',
        description:
          'To discuss and plan the member’s health goals and interventions, ensuring alignment with their personal aspirations, such as the annual fishing trip.',
        active: true,
        type: 'call',
        Icon: IconPhone,
      },
      {
        id: 2,
        date: '11/10/24',
        time: '3:20 PM',
        event: 'Home Visit',
        description:
          'Reminded about BP meds, patient agrees to monitor BP at home. Follow-up on BP next week.',
        active: false,
        type: 'visit',
        Icon: IconHome,
      },
      {
        id: 3,
        date: '11/08/24',
        time: '6:10 PM',
        event: 'Telephonic Encounter',
        description:
          'Suggested home safety measures to prevent falls, possible referral to PT. Patient notes occasional dizziness.',
        active: false,
        type: 'call',
        Icon: IconPhone,
      },
    ],
  },
}

export const ActiveEvent: Story = {
  args: {
    timelineData: [
      {
        id: 1,
        date: '11/11/24',
        time: '5:30 PM',
        event: 'Telephonic Encounter',
        description:
          'To discuss and plan the member’s health goals and interventions, ensuring alignment with their personal aspirations, such as the annual fishing trip.',
        active: true,
        type: 'call',
        Icon: IconPhone,
      },
    ],
  },
}

export const InactiveEvent: Story = {
  args: {
    timelineData: [
      {
        id: 1,
        date: '11/10/24',
        time: '3:20 PM',
        event: 'Home Visit',
        description:
          'Reminded about BP meds, patient agrees to monitor BP at home. Follow-up on BP next week.',
        active: false,
        type: 'visit',
        Icon: IconHome,
      },
    ],
  },
}
