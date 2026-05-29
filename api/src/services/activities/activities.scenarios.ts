import type { Prisma, Activity } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ActivityCreateArgs>({
  activity: {
    one: { data: { description: 'String' } },
    two: { data: { description: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Activity, 'activity'>
