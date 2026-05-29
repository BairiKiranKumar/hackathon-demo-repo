import { useState } from 'react'

import AiPill from '@lowLevelComp/AiPill/AiPill'
import CalendarEventCard from '@lowLevelComp/CalendarEventCard/CalendarEventCard'
import IconLabel from '@lowLevelComp/IconLabel/IconLabel'
import { Flex, Text, Box, Modal, Divider, List, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconAlertCircle,
  IconChevronLeft,
  IconChevronRight,
  IconFilter,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react'

import { useMutation } from '@redwoodjs/web'

import { DELETE_EVENT_MUTATION } from 'src/components/Event/Event'
import EventsCell from 'src/components/Event/EventsCell'
import BhButton from 'src/components/LowLevelComponents/BhButton/BhButton'
import { useHomeStore } from 'src/store/HomeStore'
import { formatIsoToMmDdYyyy } from 'src/utils/eventUtils'

import AddEditTask from '../AddEditTask/AddEditTask'

import './index.css'

const ScheduleTabPanel = ({ onDragEvent, handleAutoSchedule }) => {
  const taskEvents = useHomeStore((state) => state.unscheduledTasks)
  const removeUnscheduleTask = useHomeStore(
    (state) => state.removeUnscheduleTask
  )
  // for the right panel expand/collapse
  const [opened, { toggle }] = useDisclosure(true)
  const [
    deleteTaskModalOpened,
    { open: deleteTaskModalOpen, close: deleteTaskModalClose },
  ] = useDisclosure(false)

  // for the Add/Edit Task drawer
  const [taskDrawerOpened, { open: openTaskDrawer, close: closeTaskDrawer }] =
    useDisclosure(false)

  const [selectedTask, setSelectedTask] = useState(null)

  const handleNewTask = () => {
    setSelectedTask({
      id: Date.now().toString(),
      title: '',
      description: '',
      type: '',
      member: '',
      date: '',
      startTime: '',
      endTime: '',
      dueDate: '',
      activities: '',
    })
    openTaskDrawer()
  }

  const handleEditTask = (task) => {
    setSelectedTask(task)
  }

  const [deleteEvent] = useMutation(DELETE_EVENT_MUTATION, {
    onCompleted: () => {},
    onError: (error) => {
      console.error(error.message)
    },
  })

  const handleDeleteTask = async () => {
    try {
      await deleteEvent({
        variables: {
          id: +selectedTask.id,
        },
      })
      deleteTaskModalClose()
    } catch (error) {
      console.error('Error updating event:', error)
    }
  }

  return (
    <>
      <EventsCell unassignedOnly={true} />
      <Box
        className={`schedule-wrapper ${opened ? 'expanded' : 'collapsed'}`}
        pos="relative"
        miw={opened ? 320 : 0}
        w={opened ? 320 : 0}
        h="calc(100vh - 96px)"
      >
        {opened && (
          <Box className="schedule-right-panel h-full">
            <Flex justify="space-between" align="center" pb={8}>
              <Text c="#000" fw={600} size="sm" h="100%">
                Task List
              </Text>
              <IconFilter
                size={20}
                color="var(--text-color)"
                onClick={() => console.log('Filter clicked')}
                className="cursor-pointer"
              />
            </Flex>

            <BhButton
              variant="outline"
              size="md"
              fullWidth
              onClick={() => {
                handleNewTask()
              }}
            >
              <Flex
                align="center"
                gap={8}
                justify="center"
                style={{ width: '100%' }}
              >
                <IconPlus size={16} />
                <span>New Task</span>
              </Flex>
            </BhButton>

            <Flex
              gap={16}
              direction="column"
              className="events-list-wrap"
              mt={16}
              align={!taskEvents?.length && 'center'}
              justify={!taskEvents?.length && 'center'}
            >
              {taskEvents?.length ? (
                <>
                  {/* Task Events */}
                  {taskEvents?.map((event, index) => (
                    <div
                      key={`unschedule-${index}`}
                      onDragStart={onDragEvent}
                      className="unschedule-event-task"
                    >
                      <CalendarEventCard
                        eventId={event.id}
                        isDraggable={event.isDraggable}
                        state="side"
                        title={event.title}
                        priority={event.priority}
                        aiScheduled={event.aiScheduled}
                        encounter={event.encounter}
                        eventType={event.eventType}
                        cardIcon={event.encounter?.type}
                        duration={String(event.duration)}
                        dueDate={formatIsoToMmDdYyyy(event.due)}
                        handleOpenTaskDrawer={openTaskDrawer}
                        handleTaskEventChange={() => handleEditTask(event)}
                        deleteTaskModalOpen={deleteTaskModalOpen}
                        patientResponse={event.encounter?.patientResponse}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <IconLabel label="No Tasks" icon={<IconAlertCircle />} />
              )}
            </Flex>

            <div className="ai-generated-action">
              <AiPill size="xl" gap={8} handleClick={handleAutoSchedule}>
                Auto-Schedule with AI
              </AiPill>
            </div>
          </Box>
        )}
        <button className="drawer-btn" onClick={toggle}>
          {opened ? (
            <IconChevronRight color="#fff" size="20px" />
          ) : (
            <IconChevronLeft color="#fff" size="20px" />
          )}
        </button>
      </Box>

      <AddEditTask
        opened={taskDrawerOpened}
        onClose={closeTaskDrawer}
        taskData={selectedTask || {}}
        taskContext="unScheduleTask"
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
            <BhButton variant="filled" onClick={handleDeleteTask}>
              Yes, Delete
            </BhButton>
          </Flex>
        </Modal>
      )}
    </>
  )
}

export default ScheduleTabPanel
