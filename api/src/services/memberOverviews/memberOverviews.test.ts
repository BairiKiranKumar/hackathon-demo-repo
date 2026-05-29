import type { MemberOverview } from '@prisma/client'

import {
  memberOverviews,
  memberOverview,
  createMemberOverview,
  updateMemberOverview,
  deleteMemberOverview,
} from './memberOverviews'
import type { StandardScenario } from './memberOverviews.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('memberOverviews', () => {
  scenario(
    'returns all memberOverviews',
    async (scenario: StandardScenario) => {
      const result = await memberOverviews()

      expect(result.length).toEqual(Object.keys(scenario.memberOverview).length)
    }
  )

  scenario(
    'returns a single memberOverview',
    async (scenario: StandardScenario) => {
      const result = await memberOverview({
        id: scenario.memberOverview.one.id,
      })

      expect(result).toEqual(scenario.memberOverview.one)
    }
  )

  scenario('deletes a memberOverview', async (scenario: StandardScenario) => {
    const original = (await deleteMemberOverview({
      id: scenario.memberOverview.one.id,
    })) as MemberOverview
    const result = await memberOverview({ id: original.id })

    expect(result).toEqual(null)
  })
})
