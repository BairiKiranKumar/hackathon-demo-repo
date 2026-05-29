import type { Meta, StoryObj } from '@storybook/react'

import BhInterventionTable from './BhInterventionTable'

const meta: Meta<typeof BhInterventionTable> = {
  component: BhInterventionTable,
  tags: ['autodocs'],
  argTypes: {
    rowData: {
      description: 'row data for table body',
      table: {
        type: { summary: 'array' },
      },
    },
    headerData: {
      description: 'table header columns',
      table: {
        type: { summary: 'array' },
      },
    },
    withCheckbox: {
      description: 'include checkbox selection',
      table: {
        type: { summary: 'boolean' },
      },
    },
    highlightThead: {
      description: 'add background color to table header',
      table: {
        type: { summary: 'boolean' },
      },
    },
    highlightTRows: {
      description: 'add background color to table body rows',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onCheckboxChange: {
      description: 'event on selection of checkbox',
      action: 'checkbox changed',
      table: {
        type: { summary: 'event' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof BhInterventionTable>

export const Primary: Story = {
  args: {
    rowData: [
      {
        description: { value: 'Schedule in-home visit', owner: 'Dana Grubbs' },
        dueDate: '12/28/2024',
      },
      {
        description: {
          value: 'Complete home safety assessment',
          owner: 'Dana Grubbs',
        },
        dueDate: '12/28/2024',
      },
    ],
    headerData: [
      {
        name: 'Intervention/ Owner',
      },
      { name: 'Due Date' },
    ],
    withCheckbox: false,
    highlightThead: false,
    highlightTRows: true,
  },
}

export const WithCheckbox: Story = {
  args: {
    rowData: [
      {
        description: { value: 'Schedule in-home visit', owner: 'Dana Grubbs' },
        dueDate: '12/28/2024',
      },
      {
        description: {
          value: 'Complete home safety assessment',
          owner: 'Dana Grubbs',
        },
        dueDate: '12/28/2024',
      },
    ],
    headerData: [
      {
        name: 'Intervention/ Owner',
      },
      { name: 'Due Date' },
    ],
    withCheckbox: true,
    highlightThead: true,
    highlightTRows: false,
    onCheckboxChange: () => {
      console.log(`Checkbox changed`)
    },
  },
}

export const WithStatus: Story = {
  args: {
    rowData: [
      {
        description: { value: 'Schedule in-home visit', owner: 'Dana Grubbs' },
        dueDate: '12/28/2024',
        status: 'Completed',
      },
      {
        description: {
          value: 'Complete home safety assessment',
          owner: 'Dana Grubbs',
          department: 'PCP',
        },
        dueDate: '12/28/2024',
        status: 'In Progress',
      },
    ],
    headerData: [
      {
        name: 'Intervention/ Owner',
      },
      { name: 'Due Date' },
      { name: 'Status' },
    ],
    withCheckbox: false,
    highlightThead: false,
    highlightTRows: true,
  },
}
