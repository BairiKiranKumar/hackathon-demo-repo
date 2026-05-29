export const schema = gql`
  type Overview {
    id: Int!
    overview: JSON
    careManagement: JSON
    operationalMetrics: JSON
    Member: [Member]!
  }

  type Query {
    overviews: [Overview!]! @requireAuth
    overview(id: Int!): Overview @requireAuth
  }

  input CreateOverviewInput {
    memberId: Int
    overview: JSON
    careManagement: JSON
    operationalMetrics: JSON
  }

  input UpdateOverviewInput {
    overview: JSON
    careManagement: JSON
    operationalMetrics: JSON
  }

  type Mutation {
    createOverview(input: CreateOverviewInput!): Overview! @requireAuth
    updateOverview(id: Int!, input: UpdateOverviewInput!): Overview!
      @requireAuth
    deleteOverview(id: Int!): Overview! @requireAuth
  }
`
