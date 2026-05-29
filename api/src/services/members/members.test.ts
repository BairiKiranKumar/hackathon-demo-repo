import type { Member } from '@prisma/client'

import {
  members,
  member,
  createMember,
  updateMember,
  deleteMember,
} from './members'
import type { StandardScenario } from './members.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('members', () => {
  scenario('returns all members', async (scenario: StandardScenario) => {
    const result = await members()

    expect(result.length).toEqual(Object.keys(scenario.member).length)
  })

  scenario('returns a single member', async (scenario: StandardScenario) => {
    const result = await member({ id: scenario.member.one.id })

    expect(result).toEqual(scenario.member.one)
  })

  scenario('creates a member', async () => {
    const result = await createMember({
      input: {
        name: 'String',
        dob: '2025-10-31T06:26:33.691Z',
        gender: 'String',
        languageSkills: 'SPEAK',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.dob).toEqual(new Date('2025-10-31T06:26:33.691Z'))
    expect(result.gender).toEqual('String')
    expect(result.languageSkills).toEqual('SPEAK')
  })

  scenario('updates a member', async (scenario: StandardScenario) => {
    const original = (await member({ id: scenario.member.one.id })) as Member
    const result = await updateMember({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a member', async (scenario: StandardScenario) => {
    const original = (await deleteMember({
      id: scenario.member.one.id,
    })) as Member
    const result = await member({ id: original.id })

    expect(result).toEqual(null)
  })
})
