import type { Meta, StoryObj } from '@storybook/react'

import BhButton from './BhButton'

const meta: Meta<typeof BhButton> = {
  component: BhButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['filled', 'outline', 'default', 'transparent'],
      control: {
        type: 'select',
      },
      description: 'The visual style of the button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'filled' },
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

type Story = StoryObj<typeof BhButton>

export const Primary: Story = {
  args: {
    disabled: false,
    size: 'sm',
    variant: 'filled',
    children: 'Save',
    onClick: () => {
      console.log('Primary Button clicked:')
    },
  },
}

export const Secondary: Story = {
  args: {
    disabled: false,
    size: 'sm',
    variant: 'outline',
    children: 'Secondary',
    onClick: () => {
      console.log('Secondary Button clicked:')
    },
  },
}

export const Transparent: Story = {
  args: {
    disabled: false,
    size: 'sm',
    variant: 'transparent',
    children: 'Secondary',
    onClick: () => {
      console.log('Transparent Button clicked:')
    },
  },
}

export const Default: Story = {
  args: {
    disabled: false,
    size: 'sm',
    variant: 'default',
    children: 'Default',
    onClick: () => {
      console.log('Default Button clicked:')
    },
  },
}
