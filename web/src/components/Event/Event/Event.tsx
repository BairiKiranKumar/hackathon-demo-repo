import type {
  DeleteEventMutation,
  DeleteEventMutationVariables,
  FindEventById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, formatEnum, timeTag } from 'src/lib/formatters'

export const DELETE_EVENT_MUTATION: TypedDocumentNode<
  DeleteEventMutation,
  DeleteEventMutationVariables
> = gql`
  mutation DeleteEventMutation($id: Int!) {
    deleteEvent(id: $id) {
      id
    }
  }
`

interface Props {
  event: NonNullable<FindEventById['event']>
}

const Event = ({ event }: Props) => {
  const [deleteEvent] = useMutation(DELETE_EVENT_MUTATION, {
    onCompleted: () => {
      toast.success('Event deleted')
      navigate(routes.events())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteEventMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete event ' + id + '?')) {
      deleteEvent({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Event {event.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{event.id}</td>
            </tr>
            <tr>
              <th>Start</th>
              <td>{timeTag(event.start)}</td>
            </tr>
            <tr>
              <th>End</th>
              <td>{timeTag(event.end)}</td>
            </tr>
            <tr>
              <th>Is draggable</th>
              <td>{checkboxInputTag(event.isDraggable)}</td>
            </tr>
            <tr>
              <th>Due</th>
              <td>{timeTag(event.due)}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{event.title}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{event.status}</td>
            </tr>
            <tr>
              <th>Duration</th>
              <td>{event.duration}</td>
            </tr>
            <tr>
              <th>Encounter id</th>
              <td>{event.encounterId}</td>
            </tr>
            <tr>
              <th>Priority</th>
              <td>{formatEnum(event.priority)}</td>
            </tr>
            <tr>
              <th>Hint</th>
              <td>{event.hint}</td>
            </tr>
            <tr>
              <th>Ai scheduled</th>
              <td>{checkboxInputTag(event.aiScheduled)}</td>
            </tr>
            <tr>
              <th>Event type</th>
              <td>{event.eventType}</td>
            </tr>
            <tr>
              <th>State</th>
              <td>{event.state}</td>
            </tr>
            <tr>
              <th>Assigned user id</th>
              <td>{event.assignedUserId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editEvent({ id: event.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(event.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Event
