import type { Meta, StoryObj } from '@storybook/react'

import SkeletonLoader from './SkeletonLoader'

const meta: Meta<typeof SkeletonLoader> = {
  component: SkeletonLoader,
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: {
        type: 'number',
      },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
      description: 'Number of Loader components of same configurations',
    },
    isAiGradient: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      description: 'true if the Loader is for ai generated content',
    },
    height: {
      control: {
        type: 'number',
      },
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: 28 },
      },
      description: 'Height of the Loader',
    },
    width: {
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '30' },
      },
      description: 'Width of the Loader',
    },
    display: {
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'block' },
      },
      description: 'sets the display property of components. eg. flex, block',
    },
    styleClass: {
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      description: 'custom class for styling',
    },
    mb: {
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '0' },
      },
      description: 'margin bottom css styles',
    },
    mt: {
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '0' },
      },
      description: 'margin top css styles',
    },
    radius: {
      control: {
        type: 'number',
      },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
      description: 'Set the border radius of the Loader',
    },
    circle: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      description:
        'if true width, height and border-radius will equal to value specified in height prop',
    },
  },
}

export default meta

type Story = StoryObj<typeof SkeletonLoader>

export const Primary: Story = {
  args: {
    count: 1,
    height: 28,
    width: '100%',
    radius: 4,
    circle: false,
  },
}

export const Rounded: Story = {
  args: {
    count: 1,
    height: 100,
    width: '100%',
    circle: true,
  },
}
