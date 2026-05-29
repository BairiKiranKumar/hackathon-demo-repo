import React from 'react'

import { Meta, StoryObj } from '@storybook/react'
import { IconCircleCheck } from '@tabler/icons-react'

import BhAccordion, { AccordionContent } from './BhAccordion'

const meta: Meta = {
  component: BhAccordion,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled'],
      description: 'Defines the style variant of the accordion.',
    },
    title: {
      description: 'Title of the accordion card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    data: {
      description: 'Data of the list inside accordion content',
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: [] },
      },
    },
    divideContent: {
      description: 'add divider between the list of accordion content',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    value: {
      description: 'name/value of the accordion to set as expanded',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    defaultOpen: {
      description: 'set the accordion to be expanded by default',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    radius: {
      control: { type: 'radio' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Defines the border radius of the accordion.',
      table: {
        type: { summary: 'string' },
      },
    },
    chevronPosition: {
      control: { type: 'radio' },
      options: ['left', 'right'],
      description: 'Position of the accordion chevron, either left or right.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'right' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'This is a customizable accordion component that displays a list of items with icons, labels, and content. It supports customization for variant, radius, and chevron position.',
      },
    },
  },
}

export default meta

const activitiesContent: AccordionContent[] = [
  {
    id: 1,
    label: 'Initiated Frailty Pathway',
    icon: <IconCircleCheck size={20} color="green" />,
    children: null,
  },
  {
    id: 2,
    label: 'PHQ2',
    icon: <IconCircleCheck size={20} color="green" />,
    children: null,
  },
  {
    id: 3,
    label: 'PHQ9',
    icon: <IconCircleCheck size={20} color="green" />,
    children: null,
  },
  {
    id: 4,
    label: 'Updated person-centered service plan',
    icon: <IconCircleCheck size={20} color="green" />,
    children: null,
  },
]

type Story = StoryObj<typeof BhAccordion>

export const Default: Story = {
  args: {
    title: 'Activities',
    data: activitiesContent,
    variant: 'default',
    radius: 'md',
    chevronPosition: 'right',
    defaultOpen: true,
    value: 'Activities',
  },
}

export const Filled: Story = {
  args: {
    title: 'Custom Activities',
    data: activitiesContent,
    variant: 'filled',
    radius: 'lg',
    defaultOpen: false,
    chevronPosition: 'left',
    value: 'Custom Activities',
  },
}
