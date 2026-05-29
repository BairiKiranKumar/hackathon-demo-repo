import type { Meta, StoryObj } from '@storybook/react'

import MemberDetailsPage from './MemberDetailsPage'

const meta: Meta<typeof MemberDetailsPage> = {
  component: MemberDetailsPage,
}

export default meta

type Story = StoryObj<typeof MemberDetailsPage>

export const Primary: Story = {}
