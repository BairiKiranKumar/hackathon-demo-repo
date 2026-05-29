import { useEffect, useMemo, useRef, useState } from 'react'

import CalendarEventCard from '@lowLevelComp/CalendarEventCard/CalendarEventCard'
import CalendarTravelCard from '@lowLevelComp/CalendarTravelCard/CalendarTravelCard'
import {
  Flex,
  Text,
  Box,
  Divider,
  List,
  Modal,
  Title,
  Card,
  Button,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconTrash,
  IconClock,
  IconCar,
  IconArrowRight,
  IconBus,
  IconPhone,
  IconCheck,
} from '@tabler/icons-react'
import moment from 'moment'
import { UpdateEventInput } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'

import { UPDATE_EVENT_MUTATION } from 'src/components/Event/EditEventCell'
import EventsCell from 'src/components/Event/EventsCell'
import BhButton from 'src/components/LowLevelComponents/BhButton/BhButton'
import { TimelineEvents } from 'src/interfaces/commonInterfaces'
import './index.css'
import { useAppUtilityStore } from 'src/store/AppUtilityStore'
import { useHomeStore } from 'src/store/HomeStore'
import {
  convertIsoTo24HourTime,
  formatIsoToMmDdYyyy,
  generateTimeSlots,
} from 'src/utils/eventUtils'

import AddEditTask from '../AddEditTask/AddEditTask'

import { DELETE_EVENT_MUTATION } from 'src/components/Event/Event'

const BhTimeline = ({ movedTaskId }) => {
  const events = useHomeStore((state) => state.timelineEvents)

  const timeSlots = useMemo(() => {
    return generateTimeSlots(events)
  }, [events])
  const [updateEventData] = useMutation(UPDATE_EVENT_MUTATION)
  const unscheduledTasks = useHomeStore((state) => state.unscheduledTasks)

  const handleUnscheduleTasksChange = (updatedTaskEvent: TimelineEvents[]) => {
    useHomeStore.getState().updateUnscheduleTask(updatedTaskEvent)
  }
  const removeTimelineEvent = useHomeStore((state) => state.removeTimelineEvent)
  const containerRef = useRef(null)
  const [currentTimeTop, setCurrentTimeTop] = useState(0)
  const [eventToMoveId, setEventToMoveId] = useState()
  const [availableSlotId, setAvailableSlotId] = useState()
  const [newEvent, setNewEvent] = useState()
  const { addToast } = useAppUtilityStore()
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedConflictAction, setSelectedConflictAction] = useState<
    string | null
  >(null)
  const [conflictingTask, setConflictingTask] = useState<TimelineEvents | null>(
    null
  )

  const handleCloseScheduleChangeModal = () => {
    setSelectedConflictAction(null)
    setConflictingTask(null)
    closeScheduleChangeModal()
  }

  const handleMoveConflictingTaskToList = async () => {
    if (selectedConflictAction === 'move' && conflictingTask) {
      const updateInput: UpdateEventInput = {
        assignedUserId: null,
      }

      try {
        await updateEventData({
          variables: {
            id: +conflictingTask.id,
            input: updateInput,
          },
        })
      } catch (error) {
        console.error('Error updating event:', error)
      }
    }
    handleCloseScheduleChangeModal()
  }

  const [
    deleteTaskModalOpened,
    { open: deleteTaskModalOpen, close: deleteTaskModalClose },
  ] = useDisclosure(false)
  // Schedule Change Modal
  const [
    scheduleChangeModalOpened,
    { open: openScheduleChangeModal, close: closeScheduleChangeModal },
  ] = useDisclosure(false)
  // for the Add/Edit Task drawer
  const [taskDrawerOpened, { open: openTaskDrawer, close: closeTaskDrawer }] =
    useDisclosure(false)

  const calculateEventStyles = (
    start: string,
    end: string,
    slots,
    event: TimelineEvents
  ) => {
    const startTime = moment(start, 'HH:mm')
    const endTime = moment(end, 'HH:mm')
    const diff = endTime.diff(startTime, 'minutes')
    let height = 196

    const topIndex = slots.findIndex((slot, index) => {
      const slotStart = slot.time // Current slot's start time
      const slotEnd = slots[index + 1]?.time || Infinity // Next slot's start time, or Infinity if this is the last slot

      return startTime.isSameOrAfter(slotStart) && startTime.isBefore(slotEnd)
    })

    const bottomIndex = slots.findIndex((slot) =>
      endTime.isSameOrBefore(slot.time)
    )
    if (topIndex == -1 || bottomIndex == -1) return

    // Calculate the difference between the event's start time and the **start** of the slot
    const diffFromStart = startTime.diff(slots[topIndex].time, 'minutes')

    // Check if the event is active and has a 30-minute duration
    const isShortActiveEvent = diff <= 30 && event?.status === 'active'

    const dynamicHeight = 98 - diffFromStart * 3.2
    const diffFromEnd = slots[bottomIndex].time.diff(endTime, 'minutes')
    if (!isShortActiveEvent) {
      height =
        bottomIndex > topIndex
          ? (bottomIndex - topIndex) * dynamicHeight
          : dynamicHeight
    }
    if (bottomIndex !== -1) {
      if (diffFromEnd) {
        height = height - diffFromEnd * 3.2
      }
    }

    // Adjust for uneven start times
    const adjustedOffset = diffFromStart ? diffFromStart * 3.3 : 0
    const top = topIndex * 98 + adjustedOffset
    let state = event.state
    if (event?.status === 'active') {
      state = 'expanded'
    } else if (height < 80) {
      state = 'collapsed'
    } else if (height > 80) {
      state = 'expanded'
    }

    return {
      top: `${top + 10}px`,
      height: `${height}px`,
      state,
    }
  }

  const handleEditEvent = (task) => {
    setSelectedEvent(task)
  }

  const [deleteEvent] = useMutation(DELETE_EVENT_MUTATION, {
    onCompleted: () => {},
    onError: (error) => {
      console.error(error.message)
    },
  })

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent({
        variables: {
          id: +selectedEvent.id,
        },
      })
      deleteTaskModalClose()
    } catch (error) {
      console.error('Error updating event:', error)
    }
  }

  const handleTravelChange = (value: string) => {
    if (value === 'Public Transport') {
      const foundConflict = events.find(
        // Finding something after lunch for now static
        (event) =>
          (event.encounter?.type !== 'LUNCH' ||
            event.encounter?.type !== 'TRAVEL') &&
          event.start >= '14:00'
      )

      setConflictingTask(foundConflict || null)
      openScheduleChangeModal()
    }
  }

  useEffect(() => {
    const slots = containerRef.current.querySelectorAll('.event-slot')
    slots.forEach((slot, index) => {
      if (index % 2 !== 0) {
        slot.classList.add('even')
      } else {
        slot.classList.add('odd')
      }
    })
  }, [])

  useEffect(() => {
    const updateCurrentTimePosition = () => {
      const now = moment()

      // Find the closest slot
      const closestSlotIndex = timeSlots.findIndex((slot, idx) => {
        const slotStart = slot.time // Start of the current slot
        const nextSlotStart = timeSlots[idx + 1]?.time // Start of the next slot

        // Handle case when current time is after the last slot
        if (idx === timeSlots.length - 1 && now.isSameOrAfter(slotStart)) {
          return true // Mark the last slot as the closest
        }

        return (
          now.isSameOrAfter(slotStart) &&
          (!nextSlotStart || now.isBefore(nextSlotStart))
        )
      })

      if (
        closestSlotIndex === -1 ||
        (closestSlotIndex === timeSlots.length - 1 &&
          now.isAfter(timeSlots[timeSlots.length - 1].time))
      ) {
        // No valid slot found or current time is beyond the last slot
        setCurrentTimeTop(-1) // Indicate that the current time is outside slots
        return
      }

      const closestSlot = timeSlots[closestSlotIndex]
      const slotStart = closestSlot.time

      // Calculate the top offset within the closest slot
      const minutesPastInSlot = now.diff(slotStart, 'minutes')
      const slotHeight = 98 // Each slot's height in pixels
      const offsetWithinSlot = (minutesPastInSlot / 30) * slotHeight

      // Final position relative to the timeline
      const position = closestSlotIndex * slotHeight + offsetWithinSlot

      setCurrentTimeTop(position)
    }

    // Initial calculation
    updateCurrentTimePosition()

    // Update every minute
    const interval = setInterval(updateCurrentTimePosition, 60000)
    return () => clearInterval(interval) // Cleanup on unmount
  }, [timeSlots])
  const onDragStart = (event) => {
    setEventToMoveId(event.target.getAttribute('data-id'))
  }

  const ondrop = () => {
    if (newEvent) {
      events.push(newEvent)
      const updatedUnscheduledTasks = unscheduledTasks.filter(
        (task) => task.id !== movedTaskId
      )
      handleUnscheduleTasksChange(updatedUnscheduledTasks)
      addToast({
        type: 'success',
        message: 'Your schedule is now updated!',
        title: 'Successfully scheduled a task',
      })
    }

    setNewEvent(null)
    setAvailableSlotId(null)
    setEventToMoveId(null)
  }

  const convertTimeToISO = (momentTime, baseDateISO) => {
    const base = baseDateISO ? moment(baseDateISO) : moment()

    const local = base.clone().set({
      hour: moment(momentTime).hour(),
      minute: moment(momentTime).minute(),
      second: 0,
      millisecond: 0,
    })

    // Create "fake UTC" → keep local time, force Z
    return moment.utc(local.format('YYYY-MM-DDTHH:mm:ss.SSS')).toISOString()
  }

  const updateEvent = async (event, newStartTime, newEndTime) => {
    const updatedStart = convertTimeToISO(newStartTime, event.start)
    const updatedEnd = convertTimeToISO(newEndTime, event.start)

    const updateInput: UpdateEventInput = {
      start: updatedStart,
      end: updatedEnd,
    }

    try {
      await updateEventData({
        variables: {
          id: event.id,
          input: updateInput,
        },
      })
    } catch (error) {
      console.error('Error updating event:', error)
    }
  }

  const formatStringToDate = (date) => {
    const now = moment()
    now.set({
      hour: parseInt(date.split(':')[0]),
      minute: parseInt(date.split(':')[1]),
    })
    return now
  }
  const updatedEventsDataStyles = (event) => {
    const newStartTime = timeSlots.find((slot) => slot.id === availableSlotId)

    if (!newStartTime) {
      return
    }

    const formattedStart = formatStringToDate(event.start)
    const formattedEnd = formatStringToDate(event.end)
    const eventDuration = moment(formattedEnd).diff(
      moment(formattedStart),
      'minutes'
    )
    const newEndTime = newStartTime.time.clone().add(eventDuration, 'minutes')

    // Normalize to time-only moment objects for comparison
    const normalizedStartTime = moment(
      newStartTime.time.format('HH:mm'),
      'HH:mm'
    )
    const normalizedEndTime = moment(newEndTime.format('HH:mm'), 'HH:mm')
    // Check if any event exists in the new slot
    if (checkIfSlotAvailable(normalizedStartTime, normalizedEndTime)) {
      return
    }

    // Proceed to update the event
    updateEvent(event, newStartTime.time, newEndTime)
  }

  const checkIfSlotAvailable = (newStartTime, newEndTime) => {
    const now = moment() // Current time
    // Ensure the new start time is not before the current time
    if (newStartTime.isBefore(now)) {
      return true
    }
    const isSlotOccupied = events.some((existingEvent) => {
      const existingStart = moment(existingEvent.start, 'HH:mm')
      const existingEnd = moment(existingEvent.end, 'HH:mm')

      // Check for overlap
      return (
        (newStartTime.isSameOrAfter(existingStart) &&
          newStartTime.isBefore(existingEnd)) || // New start overlaps with existing
        (newEndTime.isAfter(existingStart) &&
          newEndTime.isSameOrBefore(existingEnd)) || // New end overlaps with existing
        (newStartTime.isSameOrBefore(existingStart) &&
          newEndTime.isSameOrAfter(existingEnd)) // New fully contains existing
      )
    })
    return isSlotOccupied
  }

  const onDragOver = (event) => {
    // eventToMoveId will only come if calendar event is moved (from timeline itself not from tasks panel)

    setAvailableSlotId(event.target.getAttribute('data-id'))
    if (availableSlotId && eventToMoveId) {
      // this use case is for moving event within calendar
      const toMoveEvent = events.find((event) => event.id === +eventToMoveId)
      updatedEventsDataStyles(toMoveEvent)
    } else if (movedTaskId && availableSlotId) {
      //this use case if when task is from right task panel to calendar
      const movedTask = unscheduledTasks.find((task) => task.id == movedTaskId)
      addTaskToTimeline(movedTask)
    }
    event.stopPropagation()
    event.preventDefault()
  }

  const addTaskToTimeline = (task) => {
    const taskStartTime = timeSlots.find((slot) => slot.id === availableSlotId)
    const taskEndTime = taskStartTime?.time
      .clone()
      .add(task.duration, 'minutes')
    // Check if any event exists in the new slot
    if (checkIfSlotAvailable(taskStartTime, taskEndTime)) {
      return
    }
    const newEvent = {
      ...task,
      start: moment(taskStartTime.time).format('HH:mm'),
      end: moment(taskEndTime).format('HH:mm'),
    }
    setNewEvent(newEvent)
  }

  // Helper function to render event
  const renderEvent = (event, styles, dragHandleProps?) => {
    if (event.eventType === 'TASK') {
      return (
        <>
          <CalendarEventCard
            eventId={event.id}
            onDragStart={onDragStart}
            isDraggable={true}
            startTime={convertIsoTo24HourTime(event.start)}
            endTime={convertIsoTo24HourTime(event.end)}
            state={styles?.state}
            status={event.status}
            patientResponse={event.encounter.patientResponse}
            description={event.description}
            duration={event.duration}
            dueDate={formatIsoToMmDdYyyy(event.due)}
            cardIcon={event.encounter?.type}
            title={event.title}
            priority={event.priority}
            aiScheduled={event.aiScheduled}
            encounter={event.encounter}
            eventType={event.eventType}
            dragHandleProps={dragHandleProps}
            enableAiCall={event}
            handleTaskEventChange={() => handleEditEvent(event)}
            deleteTaskModalOpen={deleteTaskModalOpen}
            handleOpenTaskDrawer={openTaskDrawer}
          />
        </>
      )
    } else if (event.eventType === 'LUNCH' || event.eventType === 'TRAVEL') {
      return (
        <CalendarTravelCard
          description={event.description}
          breakType={event.eventType}
          title={event.title}
          haveLocation={event.haveLocation}
          startTime={convertIsoTo24HourTime(event.start)}
          endTime={convertIsoTo24HourTime(event.end)}
          onTravelChange={handleTravelChange}
        />
      )
    }
    return null
  }
  return (
    <>
      <EventsCell userId={1} unassignedOnly={false} />
      <Flex
        className="timeline-events-view"
        mt={20}
        style={{
          position: 'relative',
        }}
      >
        {/* Time Slots Column */}
        <div
          ref={containerRef}
          className="slots-column-wrap"
          style={{
            flexBasis: '100px',
            borderRight: '1px solid #ADB5BD',
            padding: '11px',
            textAlign: 'right',
          }}
        >
          {timeSlots.map((slot, idx) => (
            <div
              data-id={slot.time.format('HH:mm')}
              className={`time-slot ${slot.isUpdated ? 'added-slot' : 'event-slot'}`}
              key={idx}
              style={{
                height: `98px`,
              }}
            >
              <Text size="xs" fw={500}>
                {slot.time.format('h:mm A')}
              </Text>
            </div>
          ))}
        </div>

        {/* Events Area */}

        <div
          style={{
            flex: 1,
            position: 'relative',
            backgroundColor: '#f9f9f9',
          }}
        >
          {/* first slot indicator */}
          <Box
            pos="absolute"
            top={17}
            left={0}
            right={0}
            className="first-slot-indicator"
            style={{
              borderTop: '1px dashed #DEE2E6',
            }}
          ></Box>

          {/* Current Time Indicator */}
          {currentTimeTop !== -1 && (
            <Box
              bg="var(--primary-color)"
              pos="absolute"
              top={currentTimeTop}
              left={0}
              right={0}
              h={2}
              className="current-time-indicator"
              style={{
                zIndex: 2,
                borderRadius: 100,
              }}
            >
              <span
                style={{
                  height: '12px',
                  width: '12px',
                  top: '-5px',
                  left: '-7px',
                  backgroundColor: 'var(--primary-color)',
                  display: 'inline-block',
                  borderRadius: '100%',
                  position: 'absolute',
                }}
              ></span>
            </Box>
          )}
          {events.map((event) => {
            const styles = calculateEventStyles(
              convertIsoTo24HourTime(event.start),
              convertIsoTo24HourTime(event.end),
              timeSlots,
              event
            )

            return (
              <div
                key={`event-${event.id}`}
                className="event-task-wrap"
                style={{
                  position: 'absolute',
                  left: '8.5px',
                  right: '8px',
                  padding: '4px',
                  borderRadius: '4px',
                  marginRight: '16px',
                  zIndex: `${event.status === 'active' ? 3 : 2}`,
                  ...styles,
                }}
              >
                {renderEvent(event, styles)}
              </div>
            )
          })}
          <div style={{ padding: '8px' }} className="slot-placeholder">
            {timeSlots.map((slot, idx) => (
              <div
                className="slot-drop"
                onDragOver={onDragOver}
                onDrop={ondrop}
                data-id={slot.time.format('HH:mm')}
                key={idx}
                style={{
                  height: `98px`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </Flex>
      <AddEditTask
        opened={taskDrawerOpened}
        onClose={closeTaskDrawer}
        taskData={selectedEvent || {}}
        taskContext="timelineEvent"
      />
      {deleteTaskModalOpened && (
        <Modal
          radius={8}
          bd="1px solid var(--mantine-color-gray-3)"
          size={340}
          opened={deleteTaskModalOpened}
          onClose={deleteTaskModalClose}
          title={
            <Flex
              c="var(--error-indicator-color)"
              align="center"
              gap={8}
              w="100%"
            >
              <IconTrash size={16} />
              <Text c="var(--error-indicator-color)" fw={600}>
                Delete Task
              </Text>
            </Flex>
          }
          centered
        >
          <Divider mb="md" />
          <Title order={5} mb={8}>
            Are you sure you want to delete this task?
          </Title>
          <List>
            <List.Item>This action cannot be undone</List.Item>
            <List.Item>Move to Task List instead</List.Item>
          </List>
          <Flex justify="end" mt="md" gap={8}>
            <BhButton variant="default">Move to Task List</BhButton>
            <BhButton variant="filled" onClick={handleDeleteEvent}>
              Yes, Delete
            </BhButton>
          </Flex>
        </Modal>
      )}

      {/* Schedule Change Modal */}
      <Modal
        opened={scheduleChangeModalOpened}
        onClose={handleCloseScheduleChangeModal}
        centered
        radius="md"
        size="lg"
        overlayProps={{ backgroundOpacity: 0.55 }}
        title={
          <Flex align="center" gap={8}>
            <IconClock color="#C87336" />
            <Text fw={600} c="#C87336">
              Schedule Change!
            </Text>
          </Flex>
        }
      >
        <Card radius="md" withBorder p="md" mb="md">
          <Flex align="center" justify="space-between" mb={10}>
            <Flex align="center" gap={8}>
              <IconCar color="#D08833" size={20} />
              <Text>Drive</Text>
              <IconArrowRight size={16} color="gray" />
              <IconBus color="var(--mantine-color-green-6)" size={20} />
              <Text fw={500}>Public Transport</Text>
            </Flex>

            <Box
              bg="var(--mantine-color-red-1)"
              px={10}
              py={4}
              style={{
                borderRadius: '6px',
                color: 'var(--mantine-color-red-8)',
                fontWeight: 600,
                fontSize: '12px',
              }}
            >
              15 Min Delay
            </Box>
          </Flex>

          <Text fz="sm" mb={8}>
            Changing to public transport will add a 15 min delay to your
            schedule.
          </Text>

          <Flex align="center" gap={6}>
            <IconPhone size={16} color="var(--mantine-color-blue-6)" />
            <Text fz="sm">Please call Beena to inform 15 mins delay.</Text>
          </Flex>
        </Card>

        {conflictingTask &&
          conflictingTask.encounter?.type !== 'LUNCH' &&
          conflictingTask.encounter?.type !== 'TRAVEL' && (
            <Box
              p="md"
              style={{
                border: '1px solid #C92A2A',
                borderRadius: '8px',
              }}
              mb="lg"
            >
              <Flex align="center" justify="space-between" mb="md">
                <Text fw={600} c="#C92A2A">
                  Next Task Conflicting
                </Text>
                <Text fz="sm">
                  {moment(conflictingTask.start, 'HH:mm').format('h:mm A')} -{' '}
                  {moment(conflictingTask.end, 'HH:mm').format('h:mm A')}
                </Text>
              </Flex>

              <Box mb="md">
                <CalendarEventCard
                  eventId={conflictingTask.id}
                  startTime={conflictingTask.start}
                  endTime={conflictingTask.end}
                  description={conflictingTask.description}
                  duration={conflictingTask.duration}
                  dueDate={formatIsoToMmDdYyyy(conflictingTask.due)}
                  cardIcon={conflictingTask.encounter?.type}
                  title={conflictingTask.title}
                  priority={conflictingTask.priority}
                  aiScheduled={conflictingTask.aiScheduled}
                  encounter={conflictingTask.encounter}
                  eventType={conflictingTask.eventType}
                  state="expanded"
                  isDraggable={false}
                  onDragStart={() => {}}
                  enableAiCall={false}
                  handleTaskEventChange={() => {}}
                  deleteTaskModalOpen={() => {}}
                  handleOpenTaskDrawer={() => {}}
                  hideMenu={true}
                  hideDueDate={true}
                  hideDragHandle={true}
                />
              </Box>

              <Flex gap={8} mt="md">
                <Button
                  variant="default"
                  size="xs"
                  onClick={() => setSelectedConflictAction('move')}
                  styles={{
                    root: {
                      borderColor:
                        selectedConflictAction === 'move'
                          ? '#12B886'
                          : undefined,
                    },
                  }}
                  leftSection={
                    selectedConflictAction === 'move' ? (
                      <IconCheck size={16} color="#12B886" />
                    ) : undefined
                  }
                >
                  Move to Task List
                </Button>
                <Button
                  variant="default"
                  size="xs"
                  onClick={() => setSelectedConflictAction('reschedule')}
                  styles={{
                    root: {
                      borderColor:
                        selectedConflictAction === 'reschedule'
                          ? '#12B886'
                          : undefined,
                    },
                  }}
                  leftSection={
                    selectedConflictAction === 'reschedule' ? (
                      <IconCheck size={16} color="#12B886" />
                    ) : undefined
                  }
                >
                  Reschedule
                </Button>
              </Flex>
            </Box>
          )}

        <Flex justify="flex-end" gap={8} mt="md">
          <Button
            variant="default"
            size="sm"
            onClick={handleCloseScheduleChangeModal}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            disabled={!selectedConflictAction}
            styles={{
              root: {
                backgroundColor: selectedConflictAction
                  ? 'var(--mantine-color-green-6)'
                  : '#E9ECEF',
                color: selectedConflictAction ? 'white' : '#495057',
                '&:disabled': {
                  backgroundColor: '#E9ECEF',
                  color: '#495057',
                  opacity: 0.6,
                },
              },
            }}
            onClick={handleMoveConflictingTaskToList}
          >
            Yes, I Confirm
          </Button>
        </Flex>
      </Modal>
    </>
  )
}

export default BhTimeline
