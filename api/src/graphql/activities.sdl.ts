export const schema = gql`
  type Activity {
    id: Int!
    description: String!
    completed: DateTime
    triggers: String
    Encounter: [Encounter]!
  }

  type Query {
    activities: [Activity!]! @requireAuth
    activity(id: Int!): Activity @requireAuth
  }

  input CreateActivityInput {
    description: String!
    completed: DateTime
    triggers: String
  }

  input UpdateActivityInput {
    description: String
    completed: DateTime
    triggers: String
  }

  type Mutation {
    createActivity(input: CreateActivityInput!): Activity! @requireAuth
    updateActivity(id: Int!, input: UpdateActivityInput!): Activity!
      @requireAuth
    deleteActivity(id: Int!): Activity! @requireAuth
  }
`
