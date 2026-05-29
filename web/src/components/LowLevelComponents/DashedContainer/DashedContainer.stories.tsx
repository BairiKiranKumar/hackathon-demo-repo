import type { Meta, StoryObj } from '@storybook/react'

import DashedContainer from './DashedContainer'

const meta: Meta<typeof DashedContainer> = {
  component: DashedContainer,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof DashedContainer>

export const Primary: Story = {
  args: {
    label: 'Script',
    content: 'Script content here',
  },
}
