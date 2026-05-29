import { v4 as uuid } from 'uuid'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { TimelineEvents } from 'src/interfaces/commonInterfaces'
import {
  calculateDurationWithStartEnd,
  findFirstAvailableSlot,
} from 'src/utils/eventUtils'

interface HomeStoreState {
  userName: string
  date: Date
  tasksCount: number
  aiTasksCount: number
  eventsCount: number
  aiEventsCount: number
  timelineEvents: TimelineEvents[]
  slots
  unscheduledTasks: TimelineEvents[]
  updateTimelineEvent: (
    updater: TimelineEvents[] | ((prev: TimelineEvents[]) => [])
  ) => void

  updateUnscheduleTask: (
    updater: TimelineEvents[] | ((prev: TimelineEvents[]) => [])
  ) => void
  moveEventToTaskList: (
    eventId: string | number,
    patientResponse?: 'yes' | 'no' | null
  ) => void
  addUnscheduleTask: (task: TimelineEvents) => void
  removeUnscheduleTask: (id: string) => void
  removeTimelineEvent: (id: string) => void
  onDateChange: (newDate: Date) => void
  moveTaskToCalendar: (taskId: string | number) => void
}

// export const timelineEvents = [
//   {
//     id: uuid(),
//     start: '09:00',
//     end: '09:15',
//     timelineEvent: {
//       eventType: 'task',
//       state: 'expanded',
//       eventData: {
//         title: 'Call member to complete annual LTSS assessment',
//         status: 'completed',
//         insights: `Discuss updating service plan to address increasing risk over last 3 months, 3 falls, 1 hospitalization despite execution of interventions`,
//         activities: 'Simple games, music therapy, nature walks.',
//         communication: 'Direct, clear instructions & visual cues.',
//         dueDate: '05/31/2024',
//         cardIcon: 'call',
//         memberInfo: {
//           id: 1,
//           profile: '',
//           name: 'Beena Goldberg',
//           age: 35,
//           gender: 'F',
//         },
//         aiScheduled: false,
//         priority: '',
//       },
//     },
//   },
//   {
//     id: uuid(),
//     start: '09:30',
//     end: '10:00',
//     timelineEvent: {
//       eventType: 'task',
//       state: 'expanded',
//       eventData: {
//         title: 'Call member to complete annual LTSS assessment',
//         status: 'completed',
//         insights: `Discuss updating service plan to address increasing risk over last 3 months, 3 falls, 1 hospitalization despite execution of interventions`,
//         activities: 'Simple games, music therapy, nature walks.',
//         communication: 'Direct, clear instructions & visual cues.',
//         dueDate: '05/31/2024',
//         cardIcon: 'call',
//         memberInfo: {
//           id: 2,
//           profile: '',
//           name: 'Beena Goldberg',
//           age: 35,
//           gender: 'F',
//         },
//         aiScheduled: false,
//         priority: '',
//       },
//     },
//   },
//   {
//     id: uuid(),
//     start: '10:30',
//     end: '11:00',
//     isDraggable: false,
//     timelineEvent: {
//       eventType: 'break',
//       eventData: {
//         title: `Travel back from Mrs. Goldberg's home`,
//         breakType: 'travel',
//         description: 'Approx. 25 to 30 min',
//         haveLocation: true,
//       },
//     },
//   },
//   {
//     id: uuid(),
//     start: '11:05',
//     end: '11:30',
//     isDraggable: true,
//     timelineEvent: {
//       eventType: 'event',
//       state: 'expanded',
//       eventData: {
//         title: 'Project Presentation',
//         status: 'completed',
//         insights: `Discuss updating service plan to address increasing risk over last 3 months, 3 falls, 1 hospitalization despite execution of interventions`,
//         activities: 'Simple games, music therapy, nature walks.',
//         communication: 'Direct, clear instructions & visual cues.',
//         dueDate: '05/31/2024',
//         cardIcon: 'home',
//         memberInfo: {
//           id: 1,
//           profile: '',
//           name: 'Beena Goldberg',
//           age: 35,
//           gender: 'F',
//         },
//         aiScheduled: false,
//         priority: '',
//       },
//     },
//   },
//   {
//     id: uuid(),
//     start: '11:30',
//     end: '11:45',
//     isDraggable: true,
//     timelineEvent: {
//       eventType: 'task',
//       state: 'collapsed',
//       eventData: {
//         title: 'Call member to complete annual LTSS assessment',
//         status: 'upcoming',
//         insights: `Discuss updating service plan to address increasing risk over last 3 months, 3 falls, 1 hospitalization despite execution of interventions`,
//         activities: 'Simple games, music therapy, nature walks.',
//         communication: 'Direct, clear instructions & visual cues.',
//         dueDate: '05/31/2024',
//         cardIcon: 'call',
//         memberInfo: {
//           id: 3,
//           profile: '',
//           name: 'Beena Goldberg',
//           age: 35,
//           gender: 'F',
//         },
//         aiScheduled: false,
//         priority: '',
//       },
//     },
//   },
//   {
//     id: uuid(),
//     start: '11:45',
//     end: '12:00',
//     isDraggable: true,
//     timelineEvent: {
//       eventType: 'task',
//       state: 'collapsed',
//       eventData: {
//         title: 'Call member',
//         status: 'upcoming',
//         insights: `Discuss updating service plan to address increasing risk over last 3 months, 3 falls, 1 hospitalization despite execution of interventions`,
//         activities: 'Simple games, music therapy, nature walks.',
//         communication: 'Direct, clear instructions & visual cues.',
//         dueDate: '05/31/2024',
//         cardIcon: 'call',
//         memberInfo: {
//           id: 2,
//           profile: '',
//           name: 'Beena Goldberg',
//           age: 35,
//           gender: 'F',
//         },
//         aiScheduled: false,
//         priority: '',
//       },
//     },
//   },
//   {
//     id: uuid(),
//     start: '12:00',
//     end: '12:30',
//     isDraggable: true,
//     timelineEvent: {
//       eventType: 'event',
//       state: 'collapsed',
//       eventData: {
//         title: 'Review Frailty Pathway',
//         status: 'active',
//         insights: `Discuss updating service plan to address increasing risk over last 3 months, 3 falls, 1 hospitalization despite execution of interventions`,
//         activities: 'Simple games, music therapy, nature walks.',
//         communication: 'Direct, clear instructions & visual cues.',
//         dueDate: '05/31/2024',
//         cardIcon: 'home',
//         memberInfo: {
//           id: 1,
//           profile: '',
//           name: 'Beena Goldberg',
//           age: 35,
//           gender: 'F',
//         },
//         aiScheduled: false,
//         priority: '',
//       },
//     },
//   },
//   {
//     id: uuid(),
//     start: '12:30',
//     end: '13:00',
//     isDraggable: false,
//     timelineEvent: {
//       eventType: 'break',
//       eventData: {
//         title: `Travel from your place to Mrs. Goldberg's home by`,
//         breakType: 'travel',
//         description: 'More traffic than normal expected. Approx. 16 min',
//       },
//     },
//   },
//   {
//     id: uuid(),
//     start: '14:00',
//     end: '14:30',
//     isDraggable: true,
//     timelineEvent: {
//       eventType: 'task',
//       state: 'expanded',
//       eventData: {
//         title: 'Call member to complete annual LTSS assessment',
//         status: 'upcoming',
//         insights: `Discuss updating service plan to address increasing risk over last 3 months, 3 falls, 1 hospitalization despite execution of interventions`,
//         activities: 'Simple games, music therapy, nature walks.',
//         communication: 'Direct, clear instructions & visual cues.',
//         dueDate: '05/31/2024',
//         cardIcon: 'home',
//         memberInfo: {
//           id: 1,
//           profile: '',
//           name: 'Beena Goldberg',
//           age: 35,
//           gender: 'F',
//         },
//         aiScheduled: false,
//         priority: 'urgent',
//       },
//     },
//   },
//   {
//     id: uuid(),
//     start: '16:00',
//     end: '16:30',
//     isDraggable: false,
//     timelineEvent: {
//       eventType: 'break',
//       eventData: {
//         title: `Lunch Break`,
//         description: ``,
//         breakType: 'lunch',
//       },
//     },
//   },
// ]

export const unscheduledTasks = [
  {
    id: uuid(),
    duration: '30',
    isDraggable: true,
    patientResponded: null,
    timelineEvent: {
      eventType: 'event',
      state: 'side',
      eventData: {
        title:
          'Review PCA vendor choices and initiate change per member request',
        status: 'upcoming',
        insights: `Discuss updating service plan to address increasing risk over last 3 months, 3 falls, 1 hospitalization despite execution of interventions`,
        activities: 'Simple games, music therapy, nature walks.',
        communication: 'Direct, clear instructions & visual cues.',
        dueDate: '05/31/2024',
        cardIcon: 'careService',
        memberInfo: {
          id: 1,
          profile: '',
          name: 'Beena Goldberg',
          age: 35,
          gender: 'F',
        },
        aiScheduled: true,
        priority: 'urgent',
      },
    },
  },
  {
    id: uuid(),
    duration: '30',
    isDraggable: true,
    patientResponded: null,
    timelineEvent: {
      eventType: 'task',
      state: 'side',
      eventData: {
        title: 'Call member B to complete annual LTSS assessment',
        status: 'upcoming',
        insights: `Discuss updating service plan to address increasing risk over last 3 months, 3 falls, 1 hospitalization despite execution of interventions`,
        activities: 'Simple games, music therapy, nature walks.',
        communication: 'Direct, clear instructions & visual cues.',
        dueDate: '05/31/2024',
        cardIcon: 'call',
        memberInfo: {
          id: 2,
          profile: '',
          name: 'Beena Goldberg',
          age: 35,
          gender: 'F',
        },
        aiScheduled: true,
        priority: '',
      },
    },
  },
  {
    id: uuid(),
    duration: '60',
    isDraggable: true,
    patientResponded: null,
    timelineEvent: {
      eventType: 'event',
      state: 'side',
      eventData: {
        title: 'Refer member to PCP',
        status: 'upcoming',
        insights: `Discuss updating service plan to address increasing risk over last 3 months, 3 falls, 1 hospitalization despite execution of interventions`,
        activities: 'Simple games, music therapy, nature walks.',
        communication: 'Direct, clear instructions & visual cues.',
        dueDate: '05/31/2024',
        cardIcon: 'careService',
        memberInfo: {
          id: 3,
          profile: '',
          name: 'Beena Goldberg',
          age: 35,
          gender: 'F',
        },
        aiScheduled: true,
        priority: '',
      },
    },
  },
  {
    id: uuid(),
    duration: '30',
    isDraggable: true,
    patientResponded: null,
    timelineEvent: {
      eventType: 'task',
      state: 'side',
      eventData: {
        title: 'Call member D to complete annual LTSS assessment',
        status: 'upcoming',
        insights: `Discuss updating service plan to address increasing risk over last 3 months, 3 falls, 1 hospitalization despite execution of interventions`,
        activities: 'Simple games, music therapy, nature walks.',
        communication: 'Direct, clear instructions & visual cues.',
        dueDate: '05/31/2024',
        cardIcon: 'call',
        memberInfo: {
          id: 4,
          profile: '',
          name: 'Beena Goldberg',
          age: 35,
          gender: 'F',
        },
        aiScheduled: true,
        priority: '',
      },
    },
  },
]

export const useHomeStore = create<HomeStoreState>()(
  devtools(
    (set) => ({
      userName: 'Dana',
      date: new Date(),
      tasksCount: 5,
      aiTasksCount: 4,
      eventsCount: 5,
      aiEventsCount: 3,
      userGeneratedEvents: [],
      timelineEvents: [],
      unscheduledTasks: unscheduledTasks,
      updateUnscheduleTask: (updater) =>
        set((state) => ({
          unscheduledTasks:
            typeof updater === 'function'
              ? updater(state.unscheduledTasks)
              : updater,
        })),
      updateTimelineEvent: (updater) =>
        set((state) => ({
          timelineEvents:
            typeof updater === 'function'
              ? updater(state.timelineEvents)
              : updater,
        })),

      addUnscheduleTask: (task) =>
        set((state) => ({
          unscheduledTasks: [...state.unscheduledTasks, task],
        })),

      removeUnscheduleTask: (id) =>
        set((state) => ({
          unscheduledTasks: state.unscheduledTasks.filter((t) => t.id !== id),
        })),
      moveEventToTaskList: (eventId, patientResponse) =>
        set((state) => {
          const movedEvent = state.timelineEvents.find(
            (event) => event.id === eventId
          )
          // Remove the event from timeline
          const updatedTimeline = state.timelineEvents.filter(
            (t) => t.id !== eventId
          )

          // Calculate duration (in minutes) if start and end exist
          const duration = calculateDurationWithStartEnd(
            movedEvent.start,
            movedEvent.end
          )

          const taskVersion = {
            ...movedEvent,
            start: undefined,
            end: undefined,
            duration: String(duration),
            patientResponse: patientResponse,
            isDraggable: true,
            timelineEvent: {
              ...movedEvent.timelineEvent,
              state: 'side',
              eventData: {
                ...movedEvent.timelineEvent.eventData,
                status: 'upcoming',
              },
            },
          }

          return {
            timelineEvents: updatedTimeline,
            unscheduledTasks: [...state.unscheduledTasks, taskVersion],
          }
        }),
      removeTimelineEvent: (id) =>
        set((state) => ({
          timelineEvents: state.timelineEvents.filter((t) => t.id !== id),
        })),
      moveTaskToCalendar: (taskId) => {
        set((state) => {
          const movedTask = state.unscheduledTasks.find(
            (task) => task.id === taskId
          )
          // Find the available slot
          const availableSlot = findFirstAvailableSlot(
            +movedTask.duration,
            state.timelineEvents,
            state.slots
          )

          // Handle case when no valid slot found
          if (!availableSlot) {
            // keep the task unscheduled
            return {
              ...state,
              unscheduledTasks: state.unscheduledTasks.map((t) =>
                t.id === taskId
                  ? {
                      ...t,
                      timelineEvent: {
                        ...t.timelineEvent,
                        eventData: {
                          ...t.timelineEvent.eventData,
                          status: 'unscheduled',
                        },
                      },
                    }
                  : t
              ),
            }
            // add a notification here to show no slots available for selected duration
          }
          // Construct the new event when slot exists
          const scheduleTask = {
            ...movedTask,
            start: availableSlot.start,
            end: availableSlot.end,
            timelineEvent: {
              ...movedTask.timelineEvent,
              state: 'collapsed',
              eventData: {
                ...movedTask.timelineEvent.eventData,
                status: 'upcoming',
              },
            },
          }

          // Update the state
          return {
            unscheduledTasks: state.unscheduledTasks.filter(
              (t) => t.id !== taskId
            ),
            timelineEvents: [...state.timelineEvents, scheduleTask],
          }
        })
      },
      onDateChange: (newDate) =>
        set(() => ({
          date: newDate,
        })),
    }),

    {
      name: 'HomeStore',
      enable: process.env.NODE_ENV === 'development',
    }
  )
)
