import {
  IconBulb,
  IconCheckupList,
  IconHierarchy2,
  IconHome,
  IconLogout,
  IconMail,
  IconUser,
  IconUsers,
} from '@tabler/icons-react'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdAddTask } from 'react-icons/md'

export const Routes = [
  { path: '/', id: 1, label: 'Home', class: '', icon: <IconHome /> },
  {
    path: '/member-panel',
    id: 2,
    label: 'Members Panel',
    class: '',
    icon: <IconUsers />,
  },
  {
    path: '/reports',
    id: 3,
    label: 'Reports',
    class: '',
    icon: <IconCheckupList />,
  },
  { path: '/inbox', id: 4, label: 'Inbox', class: '', icon: <IconMail /> },
  { path: '/tasks', id: 5, label: 'Task', class: '', icon: <MdAddTask /> },
  {
    path: '/referrals',
    id: 10,
    label: 'Referrals',
    class: '',
    icon: <IconHierarchy2 />,
  },
  {
    path: '/care-hub',
    id: 0,
    label: 'Care Hub',
    class: '',
    icon: <IconBulb />,
  },
  {
    path: '/profile',
    id: 7,
    label: '',
    class: 'bottomLink mt-auto profile',
    icon: <IconUser />,
  },
  {
    path: '/settings',
    id: 8,
    label: '',
    class: 'bottomLink',
    icon: <IoSettingsOutline />,
  },
  {
    path: '/logout',
    id: 9,
    label: '',
    class: 'bottomLink',
    icon: <IconLogout />,
  },
]
