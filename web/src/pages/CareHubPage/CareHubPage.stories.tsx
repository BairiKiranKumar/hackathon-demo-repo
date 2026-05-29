import type { Meta, StoryObj } from '@storybook/react'

import { mockGraphQLQuery } from '@redwoodjs/testing/web'

import { standard as memberData } from 'src/components/Member/MemberCell/MemberCell.mock'

import CareHubPage from './CareHubPage'

// Meta configuration for the story
const meta: Meta<typeof CareHubPage> = {
  title: 'Pages/CareHubPage',
  component: CareHubPage,
}

export default meta

// Primary story
export const Primary: StoryObj<typeof CareHubPage> = {
  render: () => {
    // Mock the GraphQL query
    mockGraphQLQuery('FindMemberById', () => {
      return memberData()
    })

    return <CareHubPage />
  },
}
