import type { Meta, StoryObj } from '@storybook/react'

import MemberProfile from './MemberProfile'

const meta: Meta<typeof MemberProfile> = {
  component: MemberProfile,
  tags: ['autodocs'],
  argTypes: {
    memberProfile: {
      description: 'Object that holds details for member profile',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof MemberProfile>

export const Primary: Story = {
  args: {
    memberProfile: {
      id: 'member1',
      name: 'Stephanie Newman',
      age: '71Y',
      gender: 'F',
      insight: {
        status: 'urgent',
        pastScores: { dates: ['2024-10-10T00:00:00.000Z'], scores: [21] },
        currentScore: 45,
      },
      image: '/images/user-placeholder.png',
      quote:
        'I want to stay in my own home, where I feel comfortable and independent. Being close to my family is important, so I can see them regularly and remain connected to my loved ones. I also want to continue attending my annual fishing trip, which is a tradition that brings me joy and a sense of normalcy, allowing me to enjoy the outdoors, relax, and bond with friends. Maintaining these aspects of my life will help me stay active, engaged, and fulfilled in the years to come.',
      dob: '01/01/1990',
      phone: '(123) 456-7890',
      address: '123 Street Name, City, State',
      race: 'Caucasian',
      language: 'English',
      languageSkills: ['Speak', 'Read', 'Write'],

      bio: 'The member is a 72-year-old, recently widowed, queer person of color. They live alone with two cats and a dog, their main social support. Since their partner’s death in May 2023, their declining health has limited their social interactions.',
    },
  },
}
