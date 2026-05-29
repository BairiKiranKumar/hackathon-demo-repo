import type { Prisma, MemberOverview } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.MemberOverviewCreateArgs>({
  memberOverview: { one: { data: {} }, two: { data: {} } },
})

export type StandardScenario = ScenarioData<MemberOverview, 'memberOverview'>
