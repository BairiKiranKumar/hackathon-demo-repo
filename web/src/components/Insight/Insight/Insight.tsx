import type {
  DeleteInsightMutation,
  DeleteInsightMutationVariables,
  FindInsightById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { formatEnum, jsonDisplay } from 'src/lib/formatters'

const DELETE_INSIGHT_MUTATION: TypedDocumentNode<
  DeleteInsightMutation,
  DeleteInsightMutationVariables
> = gql`
  mutation DeleteInsightMutation($id: Int!) {
    deleteInsight(id: $id) {
      id
    }
  }
`

interface Props {
  insight: NonNullable<FindInsightById['insight']>
}

const Insight = ({ insight }: Props) => {
  const [deleteInsight] = useMutation(DELETE_INSIGHT_MUTATION, {
    onCompleted: () => {
      toast.success('Insight deleted')
      navigate(routes.insights())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteInsightMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete insight ' + id + '?')) {
      deleteInsight({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Insight {insight.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{insight.id}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{formatEnum(insight.status)}</td>
            </tr>
            <tr>
              <th>Current score</th>
              <td>{insight.currentScore}</td>
            </tr>
            <tr>
              <th>Past scores</th>
              <td>{jsonDisplay(insight.pastScores)}</td>
            </tr>
            <tr>
              <th>Ai diag summary</th>
              <td>{jsonDisplay(insight.aiDiagSummary)}</td>
            </tr>
            <tr>
              <th>Ai risk factors</th>
              <td>{jsonDisplay(insight.aiRiskFactors)}</td>
            </tr>
            <tr>
              <th>Ai recommendations</th>
              <td>{jsonDisplay(insight.aiRecommendations)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editInsight({ id: insight.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(insight.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Insight
