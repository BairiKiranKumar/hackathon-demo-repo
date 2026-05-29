export const schema = gql`
  type MemberOverview {
    id: Int!
    overview: JSON
    careManagement: JSON
    operationalMetrics: JSON
  }

  type Query {
    memberOverviews: [MemberOverview!]! @requireAuth
    memberOverview(id: Int!): MemberOverview @requireAuth
  }

  input CreateMemberOverviewInput {
    overview: JSON
    careManagement: JSON
    operationalMetrics: JSON
  }

  input UpdateMemberOverviewInput {
    overview: JSON
    careManagement: JSON
    operationalMetrics: JSON
  }

  type Mutation {
    createMemberOverview(input: CreateMemberOverviewInput!): MemberOverview!
      @requireAuth
    updateMemberOverview(
      id: Int!
      input: UpdateMemberOverviewInput!
    ): MemberOverview! @requireAuth
    deleteMemberOverview(id: Int!): MemberOverview! @requireAuth
  }
`
