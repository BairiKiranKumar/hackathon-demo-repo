import type { Meta, StoryObj } from '@storybook/react'

import CalendarEventCard from './CalendarEventCard'

const meta: Meta<typeof CalendarEventCard> = {
  component: CalendarEventCard,
  tags: ['autodocs'],
  argTypes: {
    eventData: {
      description: 'An object of event data - details about member and event',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
      control: {
        type: 'object',
      },
    },
    state: {
      description: 'Defines the visual state of the card',
      options: ['expanded', 'side', 'collapsed'],
      control: {
        type: 'select',
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'expanded' },
      },
    },
    eventType: {
      description: 'Type of event (task, event, etc.)',
      options: ['task', 'event'],
      control: {
        type: 'select',
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'task' },
      },
    },
    startTime: {
      description: 'Start time of the event',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '10:00' },
      },
    },
    endTime: {
      description: 'End time of the event',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '10:30' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof CalendarEventCard>

export const Primary: Story = {
  args: {
    state: 'side',
    eventType: 'task',
    startTime: '10:00',
    endTime: '10:30',
    eventData: {
      title: 'Call member to complete annual LTSS assessment',
      status: 'upcoming',
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
}

export const Completed: Story = {
  args: {
    state: 'expanded',
    eventType: 'task',
    startTime: '11:00',
    endTime: '12:30',
    eventData: {
      title: 'Daily Huddle',
      status: 'completed',
      dueDate: '05/31/2024',
      cardIcon: 'check',
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
}

export const WithTags: Story = {
  args: {
    state: 'expanded',
    eventType: 'event',
    startTime: '14:00',
    endTime: '15:30',
    eventData: {
      title: 'Call member to complete annual LTSS assessment',
      status: 'upcoming',
      dueDate: '05/31/2024',
      cardIcon: 'home',
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
}

export const Active: Story = {
  args: {
    state: 'expanded',
    eventType: 'task',
    startTime: '11:00',
    endTime: '11:30',
    eventData: {
      title: 'Review Frailty Pathway with member',
      status: 'active',
      insights:
        'Discuss updating service plan to address increasing risk over last 3 months, 3 falls, 1 hospitalization despite execution of interventions',
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
    },
  },
}
