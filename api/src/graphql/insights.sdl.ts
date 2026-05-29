export const schema = gql`
  type Insight {
    id: Int!
    status: Priority
    currentScore: Int
    pastScores: JSON
    aiDiagSummary: JSON
    aiRiskFactors: JSON
    aiRecommendations: JSON
    Member: [Member]!
  }

  enum Priority {
    LOW
    MEDIUM
    HIGH
    URGENT
  }

  type Query {
    insights: [Insight!]! @requireAuth
    insight(id: Int!): Insight @requireAuth
  }

  input CreateInsightInput {
    status: Priority
    currentScore: Int
    pastScores: JSON
    aiDiagSummary: JSON
    aiRiskFactors: JSON
    aiRecommendations: JSON
  }

  input UpdateInsightInput {
    status: Priority
    currentScore: Int
    pastScores: JSON
    aiDiagSummary: JSON
    aiRiskFactors: JSON
    aiRecommendations: JSON
  }

  type Mutation {
    createInsight(input: CreateInsightInput!): Insight! @requireAuth
    updateInsight(id: Int!, input: UpdateInsightInput!): Insight! @requireAuth
    deleteInsight(id: Int!): Insight! @requireAuth
  }
`
