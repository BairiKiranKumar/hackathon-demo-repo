import type { Insight } from '@prisma/client'

import {
  insights,
  insight,
  createInsight,
  updateInsight,
  deleteInsight,
} from './insights'
import type { StandardScenario } from './insights.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('insights', () => {
  scenario('returns all insights', async (scenario: StandardScenario) => {
    const result = await insights()

    expect(result.length).toEqual(Object.keys(scenario.insight).length)
  })

  scenario('returns a single insight', async (scenario: StandardScenario) => {
    const result = await insight({ id: scenario.insight.one.id })

    expect(result).toEqual(scenario.insight.one)
  })

  scenario('deletes a insight', async (scenario: StandardScenario) => {
    const original = (await deleteInsight({
      id: scenario.insight.one.id,
    })) as Insight
    const result = await insight({ id: original.id })

    expect(result).toEqual(null)
  })
})
