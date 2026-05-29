import React, { useState } from 'react'

import { Meta, StoryFn } from '@storybook/react'

import BhCalendar, { BhCalendarProps } from './BhCalendar'

export default {
  component: BhCalendar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'BhCalendar is a date picker component that also displays the corresponding day (e.g., Today, Yesterday, Tomorrow, or a weekday) based on the selected date.',
      },
    },
  },
  argTypes: {
    date: {
      control: { type: 'date' },
      description: 'The currently selected date.',
    },
    onChangeDate: {
      action: 'onChangeDate',
      description: 'Callback function triggered when the date is changed.',
    },
    label: {
      control: 'text',
      description: 'The label for the date input.',
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text displayed in the input field.',
    },
    valueFormat: {
      control: 'text',
      description: 'The format of the selected date.',
    },
    showDay: {
      control: 'boolean',
      description:
        'Specifies whether the day (e.g., Today, Yesterday, or a weekday) should be displayed alongside the selected date.',
    },
    clearable: {
      control: 'boolean',
      description: 'Determines if the input can be cleared.',
    },
    minDate: {
      control: 'date',
      description: 'The minimum selectable date.',
    },
    maxDate: {
      control: 'date',
      description: 'The maximum selectable date.',
    },
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
      description: 'The size of the date input.',
    },
    radius: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
      description: 'The border radius of the date input.',
    },
    className: {
      control: 'text',
      description: 'Custom class name for the component.',
    },
  },
} as Meta<BhCalendarProps>

const Template: StoryFn<BhCalendarProps> = (args) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    args.date || new Date()
  )

  return (
    <BhCalendar
      {...args}
      date={selectedDate}
      onChangeDate={(value) => {
        setSelectedDate(value)
        args.onChangeDate?.(value)
      }}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  label: '',
  placeholder: 'Pick a date',
  valueFormat: 'DD/MM/YYYY',
  clearable: false,
  showDay: true,
  size: 'md',
  radius: 'md',
  className: '',
}

export const WithMinAndMaxDate = Template.bind({})
WithMinAndMaxDate.args = {
  ...Default.args,
  minDate: new Date('2023-01-01'),
  maxDate: new Date('2023-12-31'),
  label: 'Pick a date within 2023',
}

export const Clearable = Template.bind({})
Clearable.args = {
  ...Default.args,
  clearable: true,
  label: 'Pick a date (clearable)',
}
