import type { Prisma, Overview } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.OverviewCreateArgs>({
  overview: { one: { data: {} }, two: { data: {} } },
})

export type StandardScenario = ScenarioData<Overview, 'overview'>
