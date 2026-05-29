import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import {
  IconClipboardData,
  IconHierarchy2,
  IconHome,
  IconMail,
  IconUsers,
  IconLogout,
  IconBulb,
  IconUser,
} from '@tabler/icons-react'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdAddTask } from 'react-icons/md'

import Sidebar from './Sidebar'
const navItems = [
  { path: '/home', id: 1, label: 'Home', icon: <IconHome /> },
  {
    path: '/members-panel',
    id: 2,
    label: 'Members Panel',
    icon: <IconUsers />,
  },
  { path: '/reports', id: 3, label: 'Reports', icon: <IconClipboardData /> },
  { path: '/inbox', id: 4, label: 'Inbox', icon: <IconMail /> },
  { path: '/tasks', id: 5, label: 'Task', icon: <MdAddTask /> },
  { path: '/referrals', id: 6, label: 'Referrals', icon: <IconHierarchy2 /> },
  { path: '/', id: 7, label: 'Care Hub', icon: <IconBulb /> },
  { path: '/profile', id: 8, label: 'Profile', icon: <IconUser /> },
  { path: '/settings', id: 9, label: 'Settings', icon: <IoSettingsOutline /> },
  { path: '/login', id: 10, label: 'Logout', icon: <IconLogout /> },
]

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const [url, setUrl] = useState(window.location.pathname)

      const mockNavigate = (path: string) => {
        setUrl(path)
        window.history.pushState({}, '', path)
      }

      return (
        <div>
          <Story {...{ navigate: mockNavigate, currentPath: url }} />
        </div>
      )
    },
  ],
  argTypes: {
    navItems: {
      control: { type: 'array' },
      description: 'Array of navigation items with path, label, and icon.',
    },
    activePath: {
      control: { type: 'text' },
      description: 'The path of the active sidebar item.',
      defaultValue: '/home',
    },
  },
}

export default meta

type Story = StoryObj<typeof Sidebar>

export const Primary: Story = {
  args: {
    navItems,
    activePath: '/home',
  },
}
