import type { Prisma, Insight } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.InsightCreateArgs>({
  insight: { one: { data: {} }, two: { data: {} } },
})

export type StandardScenario = ScenarioData<Insight, 'insight'>
