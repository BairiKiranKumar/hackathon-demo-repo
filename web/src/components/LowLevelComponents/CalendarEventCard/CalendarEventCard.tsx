import { useMemo, useState } from 'react'

import AiPill from '@lowLevelComp/AiPill/AiPill'
import BhButton from '@lowLevelComp/BhButton/BhButton'
import IconLabel from '@lowLevelComp/IconLabel/IconLabel'
import PriorityBadge from '@lowLevelComp/PriorityBadge/PriorityBadge'
import { Text, Flex, Image, Card, Grid, Box } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import {
  IconPhone,
  IconHomeSearch,
  IconCalendar,
  IconCircleCheck,
  IconClockHour3,
  IconVideo,
  IconBrandFunimation,
  IconGripVertical,
  IconDotsVertical,
} from '@tabler/icons-react'
import moment from 'moment'
import avatar from 'web/public/images/user-placeholder.png'

import './index.css'
import { Link } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { UPDATE_ENCOUNTER } from 'src/components/Encounter/EditEncounterCell/EditEncounterCell'
import { UPDATE_EVENT_MUTATION } from 'src/components/Event/EditEventCell'
import { CalendarEventCardProps } from 'src/interfaces/commonInterfaces'
import { useHomeStore } from 'src/store/HomeStore'
import { getAgeFromDob } from 'src/utils/eventUtils'

import AiButton from '../AiButton/AiButton'
import BhDropdown from '../BhDropdown/BhDropdown'

const CalendarEventCard = ({
  eventId,
  startTime,
  endTime,
  status,
  cardIcon,
  title,
  aiScheduled,
  priority,
  encounter,
  dueDate,
  isDraggable,
  onDragStart,
  duration,
  state = 'expanded',
  enableAiCall,
  handleTaskEventChange,
  deleteTaskModalOpen,
  handleOpenTaskDrawer,
  patientResponse,
  hideMenu = false,
  hideDueDate = false,
  hideDragHandle = false,
  hideDuration = false,
}: CalendarEventCardProps) => {
  const { hovered, ref } = useHover()
  const start = moment(startTime, 'HH:mm').format('h:mm A')
  const end = moment(endTime, 'HH:mm').format('h:mm A')

  const eventDuration = moment(endTime, 'HH:mm').diff(
    moment(startTime, 'HH:mm'),
    'minutes'
  )

  const { currentUser } = useAuth()
  const [updateEncounter] = useMutation(UPDATE_ENCOUNTER)

  const moveEventToTaskList = useHomeStore((state) => state.moveEventToTaskList)
  // const moveTaskToCalendar = useHomeStore((state) => state.moveTaskToCalendar)
  const [updateEventData] = useMutation(UPDATE_EVENT_MUTATION)

  const menuOptions = useMemo(() => {
    if (state === 'side') {
      return [
        { id: 1, value: 'Edit', label: 'Edit' },
        { id: 2, value: 'Add to Calendar', label: 'Add to Calendar' },
        { id: 3, value: 'Start Now', label: 'Start Now' },
        { id: 4, value: 'Delete Task', label: 'Delete Task' },
      ]
    } else {
      return [
        { id: 1, value: 'Edit', label: 'Edit' },
        { id: 2, value: 'Move to Task List', label: 'Move to Task List' },
        { id: 3, value: 'Patient Unavailable', label: 'Patient Unavailable' },
        { id: 4, value: 'Delete Task', label: 'Delete Task' },
      ]
    }
  }, [state])

  const getCardIcon = (cardIcon: string, state: string) => {
    const getSize = () => {
      if (state === 'expanded') return 24
      if (state === 'collapsed') return 16
      return 20
    }

    const getColor = () => {
      if (cardIcon !== 'PHONE') return 'var(--selected-green)'
      return '#4174A6'
    }

    switch (cardIcon) {
      case 'PHONE':
        return <IconPhone size={getSize()} color={getColor()} />
      case 'VISIT':
        return <IconHomeSearch size={getSize()} color={getColor()} />
      case 'check':
        return <IconCircleCheck size={getSize()} color={getColor()} />
      case 'calendar':
        return <IconCalendar size={getSize()} color={getColor()} />
      case 'careService':
        return (
          <Box
            className="bh-icon-care-service"
            c="var(--selected-green)"
            style={{ fontSize: 20 }}
          ></Box>
        )
      default:
        return null
    }
  }
  const [dragEnable, setDragEnable] = useState(false)

  const handleMoveEventToTaskList = async (eventId) => {
    await updateEventData({
      variables: {
        id: eventId,
        input: { assignedUserId: null, duration: eventDuration.toString() },
      },
    })
  }

  const handleUpdatePatientResponse = async (eventId, encounterId) => {
    try {
      await updateEventData({
        variables: {
          id: eventId,
          input: {
            assignedUserId: null,
            duration: eventDuration.toString(),
          },
        },
      })

      await updateEncounter({
        variables: {
          id: encounterId,
          input: {
            patientResponse: 'NO',
          },
        },
      })
    } catch (error) {
      console.error('Failed to update patient response', error)
    }
  }

  const handleMoveEventToCalendarQuery = async (eventId) => {
    await updateEventData({
      variables: {
        id: eventId,
        input: { assignedUserId: currentUser.id },
      },
    })
  }

  const handleMenuAction = (action: string) => {
    switch (action) {
      case 'Edit':
        handleOpenTaskDrawer()
        handleTaskEventChange()
        break
      case 'Add to Calendar':
        // moveTaskToCalendar(eventId)
        handleMoveEventToCalendarQuery(eventId)
        break
      case 'Start Now':
        console.log('Start Now clicked for event:', eventId)
        break
      case 'Move to Task List':
        // moveEventToTaskList(eventId)
        handleMoveEventToTaskList(eventId)
        console.log('Move to Task List clicked for event:', eventId)
        break
      case 'Patient Unavailable':
        // moveEventToTaskList(eventId, 'no')
        handleUpdatePatientResponse(eventId, encounter?.id)
        console.log('Patient Unavailable clicked for event:', eventId)
        break
      case 'Delete Task':
        handleTaskEventChange()
        deleteTaskModalOpen()
        break
      default:
        break
    }
  }

  return (
    <>
      <Flex
        data-id={eventId}
        draggable={dragEnable && isDraggable}
        onDragStart={onDragStart}
        gap={16}
        ref={ref}
        align="center"
        className={`calendar-card-wrap h-full`}
        pos="relative"
      >
        <Flex
          flex={1}
          gap={10}
          direction={'column'}
          className={`calendar-event-card ${state}-event-card ${status} ${state !== 'side' ? 'h-full' : ''}`}
        >
          <Flex align={state == 'collapsed' ? 'center' : 'start'} gap={10}>
            <Card
              className="calendar-event-icon"
              p={state == 'expanded' ? 12 : state == 'collapsed' ? 4 : 6}
              bg={cardIcon == 'PHONE' ? '#E0F0FF' : '#DEF3EE'}
              radius={state == 'expanded' ? 8 : state == 'collapsed' ? 4 : 6}
            >
              {getCardIcon(cardIcon, state)}
            </Card>
            <Flex
              className="event-info-wrap"
              flex={1}
              justify={'space-between'}
              direction={state == 'collapsed' ? 'row' : 'column'}
              gap={state == 'side' ? '' : 8}
            >
              <Flex gap={8} align="center">
                <Text size="sm" fw={600} lineClamp={1}>
                  {title}
                </Text>
                {state !== 'side' && (
                  <>
                    {priority && (
                      <PriorityBadge priority={priority} size="sm">
                        {priority}
                      </PriorityBadge>
                    )}
                  </>
                )}
                {aiScheduled && status !== 'active' && (
                  <AiPill size="sm">
                    {state !== 'side' && 'AI-Generated'}
                  </AiPill>
                )}
              </Flex>
              {status == 'completed' && state == 'expanded' ? (
                <IconLabel
                  color="var(--text-color)"
                  label={`${start} - ${end}`}
                  icon={
                    <IconClockHour3 color="var(--text-light-grey)" size={16} />
                  }
                />
              ) : (
                <Flex
                  className="event-member-info"
                  align={'center'}
                  mt={state === 'side' ? 4 : ''}
                  gap={state === 'expanded' ? 8 : ''}
                >
                  <Flex className="event-member-name" align={'center'}>
                    <Image src={avatar} radius="100%" w={16} h={16} mr={4} />
                    <Text size="sm" lineClamp={1} fw={500}>
                      {encounter?.Member.name}
                    </Text>
                    <Text className="text-nowrap" size="xs" c="dimmed" ml={2}>
                      ({getAgeFromDob(encounter?.Member.dob)}Y,
                      {encounter?.Member.gender})
                    </Text>
                  </Flex>
                  {state == 'expanded' && !hideDueDate && (
                    <>
                      <span className="divider"></span>
                      <Flex
                        gap={6}
                        className="event-due-date text-nowrap"
                        wrap="nowrap"
                      >
                        <Text size="sm">Due Date:</Text>
                        <Text size="sm" fw={500}>
                          {dueDate}
                        </Text>
                      </Flex>
                    </>
                  )}
                </Flex>
              )}
              {state == 'side' && (
                <>
                  <Flex gap={6} align={'center'} mt={10}>
                    {!hideDueDate && dueDate && (
                      <Flex gap={6} align={'center'}>
                        <IconLabel
                          gap={6}
                          alignItems="center"
                          fontWeight={500}
                          color="var(--text-color)"
                          label={dueDate}
                          icon={
                            <IconCalendar
                              style={{ marginBottom: 2 }}
                              color="var(--text-grey)"
                              size={16}
                            />
                          }
                        />
                        <span className="line-divider"></span>
                      </Flex>
                    )}
                    {!hideDuration && (
                      <Text size="sm">
                        {duration ? duration : eventDuration} min
                      </Text>
                    )}
                  </Flex>
                  <Flex mt={4} gap={6}>
                    {priority && (
                      <PriorityBadge priority={priority} size="sm">
                        {priority}
                      </PriorityBadge>
                    )}

                    {patientResponse === 'NO' && (
                      <PriorityBadge priority="urgent" size="sm">
                        Patient didn’t respond
                      </PriorityBadge>
                    )}
                  </Flex>
                </>
              )}
            </Flex>

            <Flex className="event-duration-action" align={'start'} gap={10}>
              <Box
                display={state === 'collapsed' ? 'flex' : ''}
                style={{ gap: 10 }}
              >
                {state !== 'side' && (
                  <Text size="sm" ta="end">
                    {eventDuration} min
                  </Text>
                )}
                {enableAiCall && status !== 'completed' && <AiButton />}
              </Box>
              {!hideMenu && (
                <BhDropdown
                  listItems={menuOptions}
                  onOptionChange={handleMenuAction}
                  triggerIcon={
                    <IconDotsVertical
                      color="var(--text-light-grey)"
                      size={20}
                    />
                  }
                  getItemColor={(value) => {
                    if (value === 'Delete Task') return 'red'
                    if (value === 'Start Now') return 'green'
                    return undefined
                  }}
                ></BhDropdown>
              )}
            </Flex>
          </Flex>
          {state == 'expanded' && status === 'active' && (
            <>
              <Grid
                align="center"
                mt={10}
                gutter={24}
                className="insight-activities-wrap"
              >
                {encounter?.aiInsight && (
                  <Grid.Col span={{ base: 12, md: 6 }} py={0}>
                    <Card className="insight-card" p={8} radius={8}>
                      <Flex gap={8}>
                        <AiPill size="sm"></AiPill>
                        <div className="event-expanded-info">
                          <Text component="span" size="xs" fw={600}>
                            Insights:&nbsp;
                          </Text>
                          <Text
                            component="span"
                            size="xs"
                            lineClamp={hovered ? 0 : 2}
                          >
                            {encounter?.aiInsight}
                          </Text>
                        </div>
                      </Flex>
                    </Card>
                  </Grid.Col>
                )}
                <Grid.Col span={{ base: 12, md: 6 }} py={0}>
                  <Flex direction="column" gap={4}>
                    <Box
                      className={`insight-activity-info ${hovered ? 'hovered' : ''}`}
                      lh="16px"
                      display={hovered ? 'block' : 'flex'}
                      style={{ alignItems: 'flex-start' }}
                    >
                      <IconLabel
                        fontWeight={600}
                        fontSize="xs"
                        label={'Activities:'}
                        icon={
                          <IconBrandFunimation
                            size={16}
                            color="var(--text-grey)"
                          />
                        }
                      />
                      <Text
                        className="activity-detail-text"
                        lineClamp={!hovered && 1}
                        component="span"
                        size="xs"
                        ml={3}
                        c="var(--mantine-color-black)"
                      >
                        {encounter?.activity?.description}
                      </Text>
                    </Box>
                    <Box
                      className={`insight-activity-info ${hovered ? 'hovered' : ''}`}
                      lh="16px"
                      display={hovered ? 'block' : 'flex'}
                      style={{ alignItems: 'flex-start' }}
                    >
                      <IconLabel
                        fontWeight={600}
                        color="var(--mantine-color-black)"
                        fontSize="xs"
                        label={'Communication:'}
                        iconClass="bh-icon-message"
                      />

                      <Text
                        className="activity-detail-text"
                        lineClamp={!hovered && 1}
                        component="span"
                        size="xs"
                        ml={3}
                        c="var(--mantine-color-black)"
                      >
                        {encounter?.communication}
                      </Text>
                    </Box>
                  </Flex>
                </Grid.Col>
              </Grid>
              <Flex justify={'flex-end'} mt="auto">
                <Link to={`/member-panel/${encounter?.Member.id}`}>
                  <BhButton variant="filled">
                    <IconLabel
                      gap={8}
                      fontWeight={500}
                      label={'Get Ready  For The Call'}
                      icon={<IconVideo size={16} />}
                    />
                  </BhButton>
                </Link>
              </Flex>
            </>
          )}
        </Flex>
        {status !== 'active' &&
          status !== 'completed' &&
          state !== 'side' &&
          !hideDragHandle && (
            <button
              onMouseDown={() => setDragEnable(true)}
              onBlur={() => setDragEnable(false)}
              className={`bh-btn-transparent ${state}-event-handle card-drag-handle`}
            >
              <IconGripVertical size={16} />
            </button>
          )}
      </Flex>
    </>
  )
}

export default CalendarEventCard
