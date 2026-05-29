export const schema = gql`
  type Event {
    id: Int!
    start: DateTime
    end: DateTime
    description: String
    isDraggable: Boolean
    due: DateTime
    title: String!
    status: String
    duration: String
    encounterId: Int
    encounter: Encounter
    priority: Priority!
    hint: String
    aiScheduled: Boolean
    eventType: String
    state: String
    assignedUserId: Int
    assignedUser: User
  }

  enum Priority {
    LOW
    MEDIUM
    HIGH
    URGENT
  }

  type Query {
    events(userId: Int, unassignedOnly: Boolean): [Event!]! @requireAuth
    events(userId: Int, unassignedOnly: Boolean): [Event!]! @requireAuth
    event(id: Int!): Event @requireAuth
  }

  input CreateEventInput {
    start: DateTime
    end: DateTime
    description: String
    isDraggable: Boolean
    due: DateTime
    title: String!
    status: String
    duration: String
    encounterId: Int
    priority: Priority!
    hint: String
    aiScheduled: Boolean
    state: String
    assignedUserId: Int
    eventType: String
  }

  input UpdateEventInput {
    start: DateTime
    end: DateTime
    description: String
    isDraggable: Boolean
    due: DateTime
    title: String
    status: String
    duration: String
    encounterId: Int
    priority: Priority
    hint: String
    aiScheduled: Boolean
    eventType: String
    state: String
    assignedUserId: Int
  }

  type Mutation {
    createEvent(input: CreateEventInput!): Event! @requireAuth
    updateEvent(id: Int!, input: UpdateEventInput!): Event! @requireAuth
    deleteEvent(id: Int!): Event! @requireAuth
  }
`
