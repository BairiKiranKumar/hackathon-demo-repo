import { useState } from 'react'

import { Button } from '@mantine/core'
import type { Meta, StoryObj } from '@storybook/react'

import AddEditTask from './AddEditTask'

const meta: Meta<typeof AddEditTask> = {
  component: AddEditTask,
  tags: ['autodocs'],
  argTypes: {
    opened: {
      control: 'boolean',
      description: 'Controls whether the drawer is open or closed.',
      defaultValue: false,
    },
    onClose: {
      action: 'closed',
      description: 'Callback when the drawer is closed.',
    },
    taskContext: {
      control: 'select',
      options: ['unScheduleTask', 'scheduledTask'],
      description: 'Specifies the context for the task.',
    },
    taskData: {
      control: 'object',
      description: 'Task data used to pre-fill form fields.',
    },
  },
}

export default meta

type Story = StoryObj<typeof AddEditTask>

const AddEditTaskWrapper = () => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Button size="sm" onClick={() => setOpened(true)}>
        Open Add/Edit Task Drawer
      </Button>

      <AddEditTask
        opened={opened}
        onClose={() => setOpened(false)}
        taskContext="unScheduleTask"
        taskData={{
          id: '1761146978262',
          start: '10:00',
          end: '10:30',
          timelineEvent: {
            eventType: 'task',
            state: 'side',
            eventData: {
              title: 'Follow-up Call',
              status: 'upcoming',
              insights: 'Check on patient progress after appointment',
              activities: 'Call patient and record feedback',
              communication: '',
              dueDate: '2025-10-23',
              cardIcon: 'call',
              memberInfo: {
                profile: '',
                name: 'John Doe',
                age: 30,
                gender: 'M',
              },
              aiScheduled: false,
              priority: 'urgent',
            },
          },
        }}
      />
    </>
  )
}

export const Primary: Story = {
  render: () => <AddEditTaskWrapper />,
}
