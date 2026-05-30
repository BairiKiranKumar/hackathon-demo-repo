export const schema = gql`
  type Encounter {
    id: Int!
    when: DateTime
    summary: String
    notes: String
    transcript: JSON
    aiInsight: String
    communication: String
    type: EncounterType
    patientResponse: PatientResponseType
    activity: Activity
    activityId: Int
    Member: Member
    memberId: Int!
  }

  enum PatientResponseType {
    NO
    YES
  }

  enum EncounterType {
    PHONE
    VISIT
    OTHER
  }

  type Query {
    encounters: [Encounter!]! @requireAuth
    encounter(id: Int!): Encounter @requireAuth
  }

  input CreateEncounterInput {
    when: DateTime
    summary: String
    notes: String
    transcript: JSON
    aiInsight: String
    communication: String
    type: EncounterType
    activityId: Int
    memberId: Int
    activity: JSON
  }

  input UpdateEncounterInput {
    when: DateTime
    summary: String
    notes: String
    transcript: JSON
    aiInsight: String
    communication: String
    type: EncounterType
    patientResponse: PatientResponseType
    activityId: Int
    memberId: Int
    activity: JSON
  }

  type Mutation {
    createEncounter(input: CreateEncounterInput!): Encounter! @requireAuth
    updateEncounter(id: Int!, input: UpdateEncounterInput!): Encounter!
      @requireAuth
    deleteEncounter(id: Int!): Encounter! @requireAuth
  }
`
