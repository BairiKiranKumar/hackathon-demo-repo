import type { Prisma, Member } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.MemberCreateArgs>({
  member: {
    one: {
      data: {
        name: 'String',
        dob: '2025-10-31T06:26:33.790Z',
        gender: 'String',
        languageSkills: 'SPEAK',
      },
    },
    two: {
      data: {
        name: 'String',
        dob: '2025-10-31T06:26:33.790Z',
        gender: 'String',
        languageSkills: 'SPEAK',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Member, 'member'>
