import type { FindInsights, FindInsightsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Insights from 'src/components/Insight/Insights'

export const QUERY: TypedDocumentNode<FindInsights, FindInsightsVariables> =
  gql`
    query FindInsights {
      insights {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No insights yet.{' '}
      <Link to={routes.newInsight()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindInsights>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  insights,
}: CellSuccessProps<FindInsights, FindInsightsVariables>) => {
  return <Insights insights={insights} />
}
