import type { Meta, StoryObj } from '@storybook/react'

import AiButton from './AiButton'

const meta: Meta<typeof AiButton> = {
  component: AiButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['outline', 'default', 'transparent'],
      control: {
        type: 'select',
      },
      description: 'The visual style of the button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'outline' },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      description: 'Determines whether the button is disabled.',
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: {
        type: 'select',
      },
      description:
        'The size of the button. Can be one of: xs, sm, md, lg, or xl.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    children: {
      control: 'text',
      description: 'The content of the button.',
    },
    onClick: {
      action: 'onClick',
      description: 'The function to be called when the button is clicked.',
    },
  },
}

export default meta

type Story = StoryObj<typeof AiButton>

export const Primary: Story = {
  args: {
    disabled: false,
    size: 'sm',
    variant: 'outline',
    children: 'AI Call',
    onClick: () => {
      console.log('Default Button clicked:')
    },
  },
}
