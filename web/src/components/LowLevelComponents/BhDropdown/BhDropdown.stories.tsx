import type { Meta, StoryObj } from '@storybook/react'

import BhDropdown from './BhDropdown'

const meta: Meta<typeof BhDropdown> = {
  component: BhDropdown,
  tags: ['autodocs'],
  argTypes: {
    listItems: {
      description: 'List of items to display in the dropdown',
      defaultValue: [],
    },
    children: {
      description: 'The default value to display in the dropdown',
    },
    onOptionChange: {
      description: 'Callback function to handle option selection',
    },
  },
}

export default meta

type Story = StoryObj<typeof BhDropdown>

export const Primary: Story = {
  args: {
    listItems: [
      { id: 1, value: 'Walk' },
      { id: 2, value: 'Drive' },
      { id: 3, value: 'Public Transport' },
    ],
    children: 'Drive',
    onOptionChange: (value) => {
      console.log(`Selected option: ${value}`)
    },
  },
}
