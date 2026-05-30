export const schema = gql`
  type Member {
    id: Int!
    nickname: String
    name: String!
    dob: DateTime!
    gender: String!
    ethnicity: String
    language: String
    languageSkills: [LanguageSkill]!
    phone: String
    secondaryPhone: String
    address: String
    image: String
    quote: String
    bio: String
    insight: Insight
    insightId: Int
    overview: Overview
    overviewId: Int
    encounter: Encounter
    encounterId: Int
  }

  enum LanguageSkill {
    SPEAK
    READ
    WRITE
  }

  type Query {
    members: [Member!]! @requireAuth
    member(id: Int!): Member @requireAuth
  }

  input CreateMemberInput {
    nickname: String
    name: String!
    dob: DateTime!
    gender: String!
    ethnicity: String
    language: String
    languageSkills: [LanguageSkill]!
    phone: String
    secondaryPhone: String
    address: String
    image: String
    quote: String
    bio: String
    insightId: Int
    overviewId: Int
    encounterId: Int
  }

  input UpdateMemberInput {
    nickname: String
    name: String
    dob: DateTime
    gender: String
    ethnicity: String
    language: String
    languageSkills: [LanguageSkill]!
    phone: String
    secondaryPhone: String
    address: String
    image: String
    quote: String
    bio: String
    insightId: Int
    overviewId: Int
    encounterId: Int
  }

  type Mutation {
    createMember(input: CreateMemberInput!): Member! @requireAuth
    updateMember(id: Int!, input: UpdateMemberInput!): Member! @requireAuth
    deleteMember(id: Int!): Member! @requireAuth
  }
`
