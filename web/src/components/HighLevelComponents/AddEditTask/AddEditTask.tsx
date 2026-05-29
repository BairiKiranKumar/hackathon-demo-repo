import { useEffect, useMemo } from 'react'

import BhButton from '@lowLevelComp/BhButton/BhButton'
import {
  Drawer,
  Flex,
  Text,
  TextInput,
  Select,
  Textarea,
  Checkbox,
  Grid,
  Box,
  Autocomplete,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import {
  IconX,
  IconCalendar,
  IconPhone,
  IconHome,
  IconBell,
  IconCoffee,
} from '@tabler/icons-react'
import moment, { duration } from 'moment'

import { useMutation, useQuery } from '@redwoodjs/web'

import { UPDATE_EVENT_MUTATION } from 'src/components/Event/EditEventCell'
import { CREATE_EVENT_MUTATION } from 'src/components/Event/NewEvent/NewEvent'
import DashedContainer from 'src/components/LowLevelComponents/DashedContainer/DashedContainer'
import { QUERY as MEMBERS_QUERY } from 'src/components/Member/MembersCell'
import { TimelineEvents } from 'src/interfaces/commonInterfaces'
import { formatIsoToMmDdYyyy } from 'src/utils/eventUtils'

interface AddEditTaskProps {
  opened: boolean
  onClose: () => void
  taskData?: TimelineEvents
  taskContext: 'timelineEvent' | 'unScheduleTask'
}

const AddEditTask = ({
  opened,
  onClose,
  taskData,
  taskContext,
}: AddEditTaskProps) => {
  const { data, loading, error } = useQuery(MEMBERS_QUERY)
  const [updateEvent] = useMutation(UPDATE_EVENT_MUTATION, {
    onCompleted: () => {
      onClose()
    },
    onError: (error) => {
      console.log(`Failed to update event: ${error.message}`)
    },
  })

  const [createEvent] = useMutation(CREATE_EVENT_MUTATION, {
    onCompleted: () => {
      onClose()
    },
    onError: (error) => {
      console.log(`Failed to create event: ${error.message}`)
    },
  })

  const taskForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      isUrgent: false,
      description: '',
      eventType: '',
      member: '',
      date: '',
      start: '',
      end: '',
      dueDate: '',
      activities: '',
      address: '',
      commute: '',
    },
    validate: {
      title: (value) => (value.trim() ? null : 'Task name is required'),
      eventType: (value) => (value ? null : 'Type is required'),
      member: (value) => (value ? null : 'Member is required'),
      address: (value, values) => {
        if (values.eventType === 'VISIT' && !value.trim()) {
          return 'Address is required for home visits'
        }
        return null
      },
      commute: (value, values) => {
        if (values.eventType === 'VISIT' && !value) {
          return 'Commute method is required for home visits'
        }
        return null
      },
      end: (value, values) => {
        if (!value) return null
        const startMinutes = convertToMinutes(values.start)
        const endMinutes = convertToMinutes(value)

        if (endMinutes <= startMinutes) {
          return 'End time must be after start time'
        }
        return null
      },
    },
  })

  const convertToMinutes = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number)
    return hours * 60 + minutes
  }

  const getEndTimeOptions = () => {
    if (!taskForm.values.start) return timeOptions

    const startMinutes = convertToMinutes(taskForm.values.start)
    return timeOptions.map((option) => {
      const optionMinutes = convertToMinutes(option.value)
      return {
        ...option,
        disabled: optionMinutes <= startMinutes,
      }
    })
  }

  const formatMemberOption = (member: any) => {
    if (!member) return ''
    const age = member.dob
      ? `${new Date().getFullYear() - new Date(member.dob).getFullYear()}Y`
      : ''
    return `${member.name} (${age}, ${member.gender?.[0]?.toUpperCase() || ''})`
  }

  useEffect(() => {
    if (taskData) {
      const e = taskData

      // Helper function to extract time from ISO string
      const extractTimeFromISO = (isoString?: string) => {
        if (!isoString) return ''
        // Extract time directly from ISO string: "2025-11-22T12:30:00.000Z" -> "12:30"
        const timePart = isoString.split('T')[1] // Get "12:30:00.000Z"
        const [hours, minutes] = timePart.split(':') // Get ["12", "30", "00.000Z"]
        return `${hours}:${minutes}`
      }

      // Format member from encounter.member object
      const formattedMember = e.encounter?.Member
        ? formatMemberOption(e.encounter.Member)
        : ''

      taskForm.setValues({
        title: e.title,
        isUrgent: e.priority?.toLowerCase() === 'urgent',
        description: e.description || '',
        eventType: e.encounter?.type,
        member: formattedMember,
        date: formatIsoToMmDdYyyy(e.start),
        start: extractTimeFromISO(taskData.start), // Convert ISO to HH:mm
        end: extractTimeFromISO(taskData.end),
        dueDate: e.due,
        activities: e.encounter?.activity?.description,
        address: e.address || '',
        commute: e.commute || '',
      })
    } else {
      taskForm.reset()
    }
  }, [taskData, opened])

  const memberOptions = useMemo(() => {
    if (!data?.members) return []
    return data.members.map((m) => {
      const age = m.dob
        ? `${new Date().getFullYear() - new Date(m.dob).getFullYear()}Y`
        : ''
      return `${m.name} (${age}, ${m.gender?.[0]?.toUpperCase() || ''})`
    })
  }, [data])

  // Helper function to convert MM/DD/YYYY to YYYY-MM-DD or Date object to YYYY-MM-DD
  const convertDateToISO = (dateStr?: string | Date) => {
    if (!dateStr) return undefined

    // If it's a Date object, convert it directly
    if (dateStr instanceof Date) {
      const year = dateStr.getFullYear()
      const month = String(dateStr.getMonth() + 1).padStart(2, '0')
      const day = String(dateStr.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    // If it's a string, handle it
    if (typeof dateStr === 'string') {
      // Check if it's already in YYYY-MM-DD format
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        return dateStr
      }

      // Handle MM/DD/YYYY format
      const parts = dateStr.split('/')
      if (parts.length !== 3) return undefined

      const [month, day, year] = parts
      if (!month || !day || !year) return undefined

      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }

    return undefined
  }

  // Helper function to convert date to full ISO datetime string
  const convertDateToISODateTime = (dateStr?: string | Date) => {
    if (!dateStr) return undefined

    const isoDate = convertDateToISO(dateStr)
    if (!isoDate) return undefined

    // Add time component (midnight UTC) to make it a valid DateTime
    return `${isoDate}T00:00:00.000Z`
  }

  // Helper function to convert date + time back to ISO format
  const convertToISO = (date?: string | Date, time?: string) => {
    if (!date || !time) return undefined
    // Convert date from MM/DD/YYYY or Date object to YYYY-MM-DD first
    const isoDate = convertDateToISO(date)
    if (!isoDate) return undefined
    return `${isoDate}T${time}:00.000Z`
  }

  const handleSave = async () => {
    const validation = taskForm.validate()
    if (validation.hasErrors) return
    const startISO = convertToISO(taskForm.values.date, taskForm.values.start)
    const endISO = convertToISO(taskForm.values.date, taskForm.values.end)

    const duration = moment.duration(moment(endISO).diff(moment(startISO)))

    // Prepare input for mutation
    const input = {
      title: taskForm.values.title,
      description: taskForm.values.description,
      priority: taskForm.values.isUrgent ? 'URGENT' : 'LOW',
      start: startISO,
      end: endISO,
      duration: duration.asMinutes().toString(),
      due: taskForm.values.dueDate
        ? convertDateToISODateTime(taskForm.values.dueDate) // Changed this line
        : undefined,
    }
    // Check if we're updating an existing event or creating a new one
    if (taskData?.id && typeof taskData.id === 'number') {
      // Update existing event
      await updateEvent({
        variables: {
          id: taskData.id,
          input,
        },
      })
    } else {
      // Create new event
      await createEvent({
        variables: {
          input,
        },
      })
    }
  }

  const generateTimeOptions = () => {
    const options = []
    for (let hours = 0; hours < 24; hours++) {
      for (let minutes = 0; minutes < 60; minutes += 15) {
        const hour24 = String(hours).padStart(2, '0')
        const minute = String(minutes).padStart(2, '0')

        let hour12 = hours % 12
        if (hour12 === 0) hour12 = 12

        const period = hours < 12 ? 'am' : 'pm'
        const label = `${hour12}:${minute}${period}`
        const value = `${hour24}:${minute}`

        options.push({ value, label })
      }
    }
    return options
  }

  const timeOptions = generateTimeOptions()

  const handleCancel = () => {
    taskForm.reset()
    onClose()
  }

  const commuteOptions = [
    { value: 'Public Transport', label: 'Public Transport' },
    { value: 'Personal Vehicle', label: 'Personal Vehicle' },
    { value: 'Walking', label: 'Walking' },
    { value: 'Bike', label: 'Bike' },
  ]

  const taskTypeOptions = [
    { value: 'PHONE', label: 'Call' },
    { value: 'VISIT', label: 'Home visit' },
    { value: 'Reminder', label: 'Reminder' },
    { value: 'Break', label: 'Break' },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PHONE':
        return <IconPhone size={16} />
      case 'VISIT':
        return <IconHome size={16} />
      case 'Reminder':
        return <IconBell size={16} />
      case 'Break':
        return <IconCoffee size={16} />
      default:
        return null
    }
  }

  return (
    <Drawer
      opened={opened}
      onClose={handleCancel}
      position="right"
      size={500}
      padding={0}
      styles={{
        header: {
          padding: '16px 20px',
          borderBottom: '1px solid #e9ecef',
        },
        body: {
          padding: 0,
        },
      }}
      title={
        <Text fw={600} size="md">
          {taskData.title ? 'Edit Task' : 'New Task'}
        </Text>
      }
      closeButtonProps={{
        icon: <IconX size={20} />,
      }}
    >
      <Box p={20}>
        <Flex direction="column" gap={16}>
          {/* Task Name */}
          <TextInput
            label={
              <Text size="sm" fw={500} mb={4}>
                Task Name<span style={{ color: 'red' }}>*</span>
              </Text>
            }
            placeholder="Enter task name"
            styles={{
              input: {
                padding: '10px 12px',
              },
            }}
            {...taskForm.getInputProps('title')}
          />

          {/* Is this an urgent task? */}
          <Checkbox
            label="Is this an urgent task?"
            styles={{
              label: {
                fontSize: '14px',
              },
            }}
            {...taskForm.getInputProps('isUrgent', { type: 'checkbox' })}
          />

          {/* Description */}
          <Textarea
            label={
              <Text size="sm" fw={500} mb={4}>
                Description
              </Text>
            }
            placeholder="Type here"
            minRows={3}
            styles={{
              input: {
                padding: '10px 12px',
              },
            }}
            {...taskForm.getInputProps('description')}
          />

          {/* Type and Member */}
          <Grid gutter={12}>
            <Grid.Col span={6}>
              <Select
                label={
                  <Text size="sm" fw={500} mb={4}>
                    Type<span style={{ color: 'red' }}>*</span>
                  </Text>
                }
                placeholder="Select type"
                data={taskTypeOptions}
                styles={{
                  input: {
                    padding: '10px 12px',
                  },
                }}
                renderOption={({ option }) => (
                  <Flex align="center" gap={8}>
                    {getTypeIcon(option.value)}
                    <span>{option.label}</span>
                  </Flex>
                )}
                {...taskForm.getInputProps('eventType')}
                onChange={(value) => {
                  taskForm.setFieldValue('eventType', value)
                  if (value !== 'VISIT') {
                    taskForm.setFieldValue('address', '')
                    taskForm.setFieldValue('commute', '')
                  }
                }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Autocomplete
                label={
                  <Text size="sm" fw={500} mb={4}>
                    Member<span style={{ color: 'red' }}>*</span>
                  </Text>
                }
                placeholder="Search or select member"
                data={memberOptions}
                disabled={loading || !!error}
                limit={5}
                styles={{
                  input: {
                    padding: '10px 12px',
                  },
                }}
                {...taskForm.getInputProps('member')}
              />
            </Grid.Col>
          </Grid>

          {/* Conditional Address and Commute fields - only show for Home visit */}
          {taskForm.values.eventType === 'VISIT' && (
            <DashedContainer
              label=""
              content={
                <>
                  <TextInput
                    label={
                      <Text size="sm" fw={500} mb={4}>
                        Address<span style={{ color: 'red' }}>*</span>
                      </Text>
                    }
                    placeholder="Enter address"
                    styles={{
                      input: {
                        padding: '10px 12px',
                      },
                    }}
                    {...taskForm.getInputProps('address')}
                  />

                  <Select
                    label={
                      <Text size="sm" fw={500} mb={4}>
                        Commute<span style={{ color: 'red' }}>*</span>
                      </Text>
                    }
                    placeholder="Select commute method"
                    data={commuteOptions}
                    styles={{
                      input: {
                        padding: '10px 12px',
                      },
                    }}
                    {...taskForm.getInputProps('commute')}
                  />
                </>
              }
            />
          )}

          {/* Date and Time */}
          <Box>
            <Grid gutter={12}>
              <Grid.Col span={5}>
                <Box pos="relative">
                  <DateInput
                    label="Date"
                    placeholder="MM/DD/YYYY"
                    valueFormat="MM/DD/YYYY"
                    value={
                      taskForm.values.date
                        ? new Date(taskForm.values.date)
                        : null
                    }
                    onChange={(value) =>
                      taskForm.setFieldValue(
                        'date',
                        value ? value.toISOString().split('T')[0] : ''
                      )
                    }
                    rightSection={<IconCalendar size={16} />}
                    popoverProps={{
                      withinPortal: false,
                      position: 'bottom-start',
                      middlewares: { flip: false, shift: false },
                      styles: {
                        dropdown: {
                          transform: 'translateX(-180px)',
                          marginTop: 2,
                        },
                      },
                    }}
                  />
                </Box>
              </Grid.Col>

              <Grid.Col span={7}>
                <Text size="sm" fw={500} mb={4}>
                  Time
                </Text>
                <Flex gap={8} align="center">
                  <Select
                    placeholder="Start"
                    data={timeOptions}
                    searchable
                    styles={{
                      root: { flex: 1 },
                      input: { padding: '14px 16px' },
                    }}
                    {...taskForm.getInputProps('start')}
                    onChange={(value) => {
                      taskForm.setFieldValue('start', value)
                      if (taskForm.values.end && value) {
                        const startMinutes = convertToMinutes(value)
                        const endMinutes = convertToMinutes(taskForm.values.end)
                        if (endMinutes <= startMinutes) {
                          taskForm.setFieldValue('end', '')
                        }
                      }
                    }}
                  />
                  <Text>-</Text>
                  <Select
                    placeholder="End"
                    data={getEndTimeOptions()}
                    searchable
                    styles={{
                      root: { flex: 1 },
                      input: { padding: '14px 16px' },
                    }}
                    {...taskForm.getInputProps('end')}
                  />
                </Flex>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Note */}
          <Text size="xs" c="dimmed">
            {`Note: Task won't be added to the calendar unless a date and time are assigned. You can still find it under 'Task List'.`}
          </Text>

          {/* Due Date */}
          <Box pos="relative">
            <DateInput
              label="Due Date"
              placeholder="MM/DD/YYYY"
              valueFormat="MM/DD/YYYY"
              value={
                taskForm.values.dueDate
                  ? new Date(taskForm.values.dueDate)
                  : null
              }
              onChange={(value) =>
                taskForm.setFieldValue(
                  'dueDate',
                  value ? value.toISOString().split('T')[0] : ''
                )
              }
              rightSection={<IconCalendar size={16} />}
              popoverProps={{
                withinPortal: false,
                position: 'bottom-start',
                middlewares: { flip: false, shift: false },
                styles: {
                  dropdown: {
                    transform: 'translateX(-180px)',
                    marginTop: 2,
                  },
                },
              }}
            />
          </Box>

          {/* Activities */}
          <Textarea
            label={
              <Text size="sm" fw={500} mb={4}>
                Activities
              </Text>
            }
            placeholder="Type here"
            minRows={3}
            styles={{
              input: {
                padding: '10px 12px',
              },
            }}
            {...taskForm.getInputProps('activities')}
          />
        </Flex>

        {/* Update Button */}
        <Flex justify="flex-end" mt={24}>
          <BhButton variant="filled" onClick={handleSave}>
            {taskData.title ? 'Update Task' : 'Add Task'}
          </BhButton>
        </Flex>
      </Box>
    </Drawer>
  )
}

export default AddEditTask
