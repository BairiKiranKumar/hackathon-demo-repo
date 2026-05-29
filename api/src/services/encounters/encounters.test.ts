import type { Encounter } from '@prisma/client'

import {
  encounters,
  encounter,
  createEncounter,
  updateEncounter,
  deleteEncounter,
} from './encounters'
import type { StandardScenario } from './encounters.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('encounters', () => {
  scenario('returns all encounters', async (scenario: StandardScenario) => {
    const result = await encounters()

    expect(result.length).toEqual(Object.keys(scenario.encounter).length)
  })

  scenario('returns a single encounter', async (scenario: StandardScenario) => {
    const result = await encounter({ id: scenario.encounter.one.id })

    expect(result).toEqual(scenario.encounter.one)
  })

  scenario('deletes a encounter', async (scenario: StandardScenario) => {
    const original = (await deleteEncounter({
      id: scenario.encounter.one.id,
    })) as Encounter
    const result = await encounter({ id: original.id })

    expect(result).toEqual(null)
  })
})
