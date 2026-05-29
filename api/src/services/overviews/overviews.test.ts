import type { Overview } from '@prisma/client'

import {
  overviews,
  overview,
  createOverview,
  updateOverview,
  deleteOverview,
} from './overviews'
import type { StandardScenario } from './overviews.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('overviews', () => {
  scenario('returns all overviews', async (scenario: StandardScenario) => {
    const result = await overviews()

    expect(result.length).toEqual(Object.keys(scenario.overview).length)
  })

  scenario('returns a single overview', async (scenario: StandardScenario) => {
    const result = await overview({ id: scenario.overview.one.id })

    expect(result).toEqual(scenario.overview.one)
  })

  scenario('deletes a overview', async (scenario: StandardScenario) => {
    const original = (await deleteOverview({
      id: scenario.overview.one.id,
    })) as Overview
    const result = await overview({ id: original.id })

    expect(result).toEqual(null)
  })
})
