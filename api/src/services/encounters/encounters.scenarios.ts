import type { Prisma, Encounter } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.EncounterCreateArgs>({
  encounter: { one: { data: {} }, two: { data: {} } },
})

export type StandardScenario = ScenarioData<Encounter, 'encounter'>
