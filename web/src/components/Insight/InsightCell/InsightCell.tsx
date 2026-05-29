import MemberInsights from '@highLevelComp/MemberInsights/MemberInsights'
import type { FindInsightById, FindInsightByIdVariables } from 'types/graphql'

import type { CellFailureProps, TypedDocumentNode } from '@redwoodjs/web'

// import Insight from 'src/components/Insight/Insight'

export const QUERY: TypedDocumentNode<
  FindInsightById,
  FindInsightByIdVariables
> = gql`
  query FindInsightById($id: Int!) {
    insight: insight(id: $id) {
      id
      status
      currentScore
      pastScores
      aiDiagSummary
      aiRiskFactors
      aiRecommendations
    }
  }
`

export const Loading = () => (
  <MemberInsights insight={undefined} loading={true} />
)

export const Empty = () => <div>Insight not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindInsightByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ insight }) => {
  // return <Insight insight={insight} />
  return <MemberInsights insight={insight} />
}
