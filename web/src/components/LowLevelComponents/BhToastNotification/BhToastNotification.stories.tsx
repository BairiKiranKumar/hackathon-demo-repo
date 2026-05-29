import type { Meta, StoryObj } from '@storybook/react'

import { useAppUtilityStore } from 'src/store/AppUtilityStore'

import BhToastNotification from './BhToastNotification'

type ToastType = 'success' | 'error' | 'loading' | 'default'

const mockToasts = [
  {
    id: '1',
    type: 'success' as ToastType,
    title: 'Success!',
    message: 'Operation completed successfully.',
  },
  {
    id: '2',
    type: 'error' as ToastType,
    title: 'Error!',
    message: 'Something went wrong.',
  },
  {
    id: '3',
    type: 'default' as ToastType,
    title: 'Default notification',
    message: 'This is default notification with title and body',
  },
]

useAppUtilityStore.setState({
  toasts: mockToasts,
})

const meta: Meta<typeof BhToastNotification> = {
  component: BhToastNotification,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof BhToastNotification>

export const Primary: Story = {}
