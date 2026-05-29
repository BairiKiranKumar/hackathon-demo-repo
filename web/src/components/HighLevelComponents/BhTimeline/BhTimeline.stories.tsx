import type { Meta, StoryObj } from '@storybook/react'
import { v4 as uuid } from 'uuid'

import BhTimeline from './BhTimeline'

const meta: Meta<typeof BhTimeline> = {
  component: BhTimeline,
  tags: ['autodocs'],
  argTypes: {
    events: {
      description: 'Array of scheduled events to be displayed on the timeline.',
      table: {
        type: { name: 'array' },
      },
    },
    movedTaskId: {
      description:
        'ID of the task that has been moved into scheduled tasks (in timeline).',
      type: { name: 'string' },
      defaultValue: '',
    },
    aiTasks: {
      description: 'Array of AI-generated tasks.',
      table: {
        type: { name: 'array' },
      },
    },
    onAiTasksChange: {
      description: 'Callback function triggered when AI tasks are updated.',
      type: { name: 'function' },
    },
  },
}

export default meta

type Story = StoryObj<typeof BhTimeline>

const mockEvents = [
  {
    id: uuid(),
    start: '09:00',
    end: '09:15',
    timelineEvent: {
      eventType: 'task',
      state: 'expanded',
      eventData: {
        title: 'Call member to complete annual LTSS assessment',
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
        aiScheduled: false,
        priority: 'urgent',
      },
    },
  },
  {
    id: uuid(),
    start: '09:30',
    end: '10:00',
    timelineEvent: {
      eventType: 'task',
      state: 'expanded',
      eventData: {
        title: 'Call member to complete annual LTSS assessment',
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
        aiScheduled: false,
        priority: '',
      },
    },
  },
]

const mockAiTasks = [
  {
    id: uuid(),
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
        priority: '',
      },
    },
  },
]

export const Primary: Story = {
  args: {
    events: mockEvents,
    movedTaskId: null,
    aiTasks: mockAiTasks,
    onAiTasksChange: (updatedTasks) =>
      console.log('Updated AI Tasks:', updatedTasks),
  },
}
