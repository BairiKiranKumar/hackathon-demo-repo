import { useEffect } from 'react'

import type { FindEvents, FindEventsVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { useHomeStore } from 'src/store/HomeStore'

export const QUERY = gql`
  query FindEvents($userId: Int, $unassignedOnly: Boolean) {
    events(userId: $userId, unassignedOnly: $unassignedOnly) {
      id
      title
      description
      start
      end
      due
      status
      duration
      priority
      hint
      eventType
      encounter {
        id
        type
        summary
        transcript
        aiInsight
        patientResponse
        communication
        activity {
          description
        }
        Member {
          id
          name
          dob
          gender
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps<FindEventsVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  events,
  queryResult,
}: CellSuccessProps<FindEvents, FindEventsVariables>) => {
  const updateTimelineEvent = useHomeStore((state) => state.updateTimelineEvent)
  const updateUnscheduleTask = useHomeStore(
    (state) => state.updateUnscheduleTask
  )

  useEffect(() => {
    if (events?.length) {
      // Get the variables from the query
      const variables = queryResult?.variables

      if (variables?.unassignedOnly) {
        // Update unscheduled tasks if querying unassigned events
        updateUnscheduleTask(events)
      } else if (variables?.userId) {
        // Update timeline events if querying by userId
        updateTimelineEvent(events)
      }
    }
  }, [events, queryResult, updateTimelineEvent, updateUnscheduleTask])

  return null
}
