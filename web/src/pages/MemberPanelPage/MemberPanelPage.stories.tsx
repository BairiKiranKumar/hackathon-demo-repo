import type { Meta, StoryObj } from '@storybook/react'

import MemberPanelPage from './MemberPanelPage'

const meta: Meta<typeof MemberPanelPage> = {
  component: MemberPanelPage,
}

export default meta

type Story = StoryObj<typeof MemberPanelPage>

export const Primary: Story = {}
