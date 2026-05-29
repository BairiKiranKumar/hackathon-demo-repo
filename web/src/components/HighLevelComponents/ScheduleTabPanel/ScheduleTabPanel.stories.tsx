import type { Meta, StoryObj } from '@storybook/react'

import ScheduleTabPanel from './ScheduleTabPanel'

const aiGeneratedEvents = [
  {
    id: 1,
    duration: '30',
    isDraggable: true,
    timelineEvent: {
      eventType: 'task',
      state: 'side',
      eventData: {
        title: 'Call member A to complete annual LTSS assessment',
        status: 'upcoming',
        insights: `Discuss updating service plan to address increasing risk over last 3 months, 3 falls, 1 hospitalization despite execution of interventions`,
        activities: 'Simple games, music therapy, nature walks.',
        communication: 'Direct, clear instructions & visual cues.',
        dueDate: '05/31/2024',
        cardIcon: 'call',
        memberInfo: {
          profile: '',
          name: 'Beena Goldberg',
          age: 31,
          gender: 'F',
        },
        aiScheduled: true,
        priority: 'urgent',
      },
    },
  },
  {
    id: 2,
    duration: '60',
    isDraggable: true,
    timelineEvent: {
      eventType: 'task',
      state: 'side',
      eventData: {
        title: 'Call member B to complete annual LTSS assessment',
        status: 'upcoming',
        insights: `Discuss updating service plan to address increasing risk over last 3 months, 3 falls, 1 hospitalization despite execution of interventions`,
        activities: 'Simple games, music therapy, nature walks.',
        communication: 'Direct, clear instructions & visual cues.',
        dueDate: '06/15/2024',
        cardIcon: 'call',
        memberInfo: {
          profile: '',
          name: 'John Doe',
          age: 45,
          gender: 'M',
        },
        aiScheduled: true,
        priority: '',
      },
    },
  },
]
const userGeneratedEvents = []

const onDragEvent = () => {
  console.log('Event is being dragged')
}

const meta: Meta<typeof ScheduleTabPanel> = {
  component: ScheduleTabPanel,
  tags: ['autodocs'],
  argTypes: {
    aiGeneratedEvents: {
      control: {
        type: 'array',
      },
      description:
        'Array of AI-generated events to display in the schedule panel',
    },
    userGeneratedEvents: {
      control: {
        type: 'array',
      },
      description:
        'Array of User-generated events to display in the schedule panel',
    },
    onDragEvent: {
      action: 'dragging',
      description: 'Function to handle drag events',
    },
  },
}

export default meta

type Story = StoryObj<typeof ScheduleTabPanel>

export const Primary: Story = {
  args: {
    aiGeneratedEvents,
    userGeneratedEvents,
    onDragEvent,
  },
}
