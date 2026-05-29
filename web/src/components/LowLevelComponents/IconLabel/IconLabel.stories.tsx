import type { Meta, StoryObj } from '@storybook/react'
import { IconUser } from '@tabler/icons-react'

import IconLabel from './IconLabel'

const meta: Meta<typeof IconLabel> = {
  component: IconLabel,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      description: 'The icon to be displayed.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    label: {
      description: 'The label text to be displayed.',
      table: {
        type: { summary: 'string' },
      },
    },
    gap: {
      description: 'The gap between elements.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 4 },
      },
    },
    fontSize: {
      description: 'The font size of the text.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '14px' },
      },
    },
    className: {
      description: 'Additional CSS classes to be applied to the component.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    fontWeight: {
      description: 'Font weight of the text.',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '400' },
      },
    },
    iconClass: {
      description: 'Class of custom icon (icomoon font)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    alignItems: {
      description: 'Align the icon and text vertically',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'center' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof IconLabel>

export const Primary: Story = {
  args: {
    icon: <IconUser />,
    label: 'User',
    gap: 4,
    fontSize: '14px',
    className: '',
    alignItems: 'center',
  },
}
