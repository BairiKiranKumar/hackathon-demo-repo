import type { Prisma, Event } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.EventCreateArgs>({
  event: {
    one: { data: { title: 'String', priority: 'LOW' } },
    two: { data: { title: 'String', priority: 'LOW' } },
  },
})

export type StandardScenario = ScenarioData<Event, 'event'>
