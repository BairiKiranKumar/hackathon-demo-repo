import type {
  DeleteOverviewMutation,
  DeleteOverviewMutationVariables,
  FindOverviewById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay } from 'src/lib/formatters'

const DELETE_OVERVIEW_MUTATION: TypedDocumentNode<
  DeleteOverviewMutation,
  DeleteOverviewMutationVariables
> = gql`
  mutation DeleteOverviewMutation($id: Int!) {
    deleteOverview(id: $id) {
      id
    }
  }
`

interface Props {
  overview: NonNullable<FindOverviewById['overview']>
}

const Overview = ({ overview }: Props) => {
  const [deleteOverview] = useMutation(DELETE_OVERVIEW_MUTATION, {
    onCompleted: () => {
      toast.success('Overview deleted')
      navigate(routes.overviews())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteOverviewMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete overview ' + id + '?')) {
      deleteOverview({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Overview {overview.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{overview.id}</td>
            </tr>
            <tr>
              <th>Overview</th>
              <td>{jsonDisplay(overview.overview)}</td>
            </tr>
            <tr>
              <th>Care management</th>
              <td>{jsonDisplay(overview.careManagement)}</td>
            </tr>
            <tr>
              <th>Operational metrics</th>
              <td>{jsonDisplay(overview.operationalMetrics)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editOverview({ id: overview.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(overview.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Overview
