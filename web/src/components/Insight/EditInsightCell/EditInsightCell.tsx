import type {
  EditInsightById,
  UpdateInsightInput,
  UpdateInsightMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import InsightForm from 'src/components/Insight/InsightForm'

export const QUERY: TypedDocumentNode<EditInsightById> = gql`
  query EditInsightById($id: Int!) {
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

const UPDATE_INSIGHT_MUTATION: TypedDocumentNode<
  EditInsightById,
  UpdateInsightMutationVariables
> = gql`
  mutation UpdateInsightMutation($id: Int!, $input: UpdateInsightInput!) {
    updateInsight(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ insight }: CellSuccessProps<EditInsightById>) => {
  const [updateInsight, { loading, error }] = useMutation(
    UPDATE_INSIGHT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Insight updated')
        navigate(routes.insights())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateInsightInput,
    id: EditInsightById['insight']['id']
  ) => {
    updateInsight({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Insight {insight?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <InsightForm
          insight={insight}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
