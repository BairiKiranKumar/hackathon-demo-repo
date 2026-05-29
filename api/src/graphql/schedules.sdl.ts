export const schema = gql`
  type Schedule {
    id: Int!
    event: Event
    eventId: Int
    User: [User]!
  }

  type Query {
    schedules: [Schedule!]! @requireAuth
    schedule(id: Int!): Schedule @requireAuth
  }

  input CreateScheduleInput {
    eventId: Int
  }

  input UpdateScheduleInput {
    eventId: Int
  }

  type Mutation {
    createSchedule(input: CreateScheduleInput!): Schedule! @requireAuth
    updateSchedule(id: Int!, input: UpdateScheduleInput!): Schedule!
      @requireAuth
    deleteSchedule(id: Int!): Schedule! @requireAuth
  }
`
