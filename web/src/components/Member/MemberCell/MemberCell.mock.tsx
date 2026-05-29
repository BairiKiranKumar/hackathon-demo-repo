import type { FindMemberById } from 'types/graphql'

export const standard = (): FindMemberById => ({
  member: {
    id: 1,
    name: 'Jane Doe',
    dob: '1960-01-01',
    gender: 'Female',
    ethnicity: 'Hispanic',
    language: 'English',
    languageSkills: ['SPEAK', 'READ', 'WRITE'],
    phone: '123-456-7890',
    address: '123 Main St, Springfield, USA',
    image: '/images/user-placeholder.png',
    quote: 'Always learning and growing.',
    bio: 'Passionate about technology and community building.',
    insightId: 1,
  },
})
