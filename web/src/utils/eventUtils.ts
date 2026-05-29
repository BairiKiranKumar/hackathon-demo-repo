import moment, { Moment } from 'moment'

import { TimelineEvents } from 'src/interfaces/commonInterfaces'

// Fixed slot duration in minutes
const TIME_SLOT_DURATION = 30

export const calculateDurationWithStartEnd = (
  start?: string,
  end?: string
): number => {
  if (!start || !end) return 30

  const parseTime = (timeStr: string): number => {
    // Normalize whitespace and lowercase
    const t = timeStr.trim().toLowerCase()

    // Extract hours, minutes, and AM/PM if present
    const match = t.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/)
    if (!match) return 0

    let hours = Number(match[1])
    const minutes = Number(match[2] || 0)
    const meridian = match[3]

    if (meridian) {
      // Convert 12-hour format to 24-hour
      if (meridian === 'pm' && hours < 12) hours += 12
      if (meridian === 'am' && hours === 12) hours = 0
    }

    return hours * 60 + minutes
  }

  const startMinutes = parseTime(start)
  const endMinutes = parseTime(end)

  // Handle cases where end time is "past midnight"
  const duration =
    endMinutes >= startMinutes
      ? endMinutes - startMinutes
      : 24 * 60 - startMinutes + endMinutes

  // Default fallback of 30 mins if zero or invalid
  return duration > 0 ? duration : 30
}

// to get end time with start time and duration
export const addDurationToStartTime = (
  start: string,
  durationMinutes: number
): string => {
  if (!start || !durationMinutes) return start

  const parseTime = (
    timeStr: string
  ): { minutes: number; is12Hour: boolean } => {
    const t = timeStr.trim().toLowerCase()
    const match = t.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/)
    if (!match) return { minutes: 0, is12Hour: false }

    let hours = Number(match[1])
    const minutes = Number(match[2] || 0)
    const meridian = match[3]
    let is12Hour = false

    if (meridian) {
      is12Hour = true
      if (meridian === 'pm' && hours < 12) hours += 12
      if (meridian === 'am' && hours === 12) hours = 0
    }

    return { minutes: hours * 60 + minutes, is12Hour }
  }

  const { minutes: startMinutes, is12Hour } = parseTime(start)
  const totalMinutes = (startMinutes + durationMinutes) % (24 * 60)

  const endH = Math.floor(totalMinutes / 60)
  const endM = totalMinutes % 60

  if (is12Hour) {
    // Convert back to 12-hour format
    const suffix = endH >= 12 ? 'pm' : 'am'
    const displayH = ((endH + 11) % 12) + 1
    const displayM = endM.toString().padStart(2, '0')
    return `${displayH}:${displayM}${suffix}`
  } else {
    // Keep 24-hour format
    const displayH = endH.toString().padStart(2, '0')
    const displayM = endM.toString().padStart(2, '0')
    return `${displayH}:${displayM}`
  }
}

export const extractEventData = (event: TimelineEvents) => {
  const { eventType, eventData } = event.timelineEvent
  const isCardEvent = eventType !== 'break'

  return {
    title: isCardEvent ? eventData.title : '',
    description: isCardEvent ? eventData.insights : '',
    member: isCardEvent ? eventData.memberInfo : {},
    dueDate: isCardEvent ? eventData.dueDate : '',
    activities: isCardEvent ? eventData.activities : '',
    priority: isCardEvent ? eventData.priority : '',
    address: isCardEvent ? eventData.address : '',
    commute: isCardEvent ? eventData.commute : '',
  }
}

export const startOfDay = moment().startOf('day').set('hour', 9) // Start at 9:00 AM
export const endOfDay = moment()
  .startOf('day')
  .set('hour', 18)
  .add(30, 'minutes') // End at 6:00 PM ui wise but endtime is 6:30

export const generateTimeSlots = (events) => {
  const slots = []
  const currentTime = startOfDay.clone()
  while (currentTime.isBefore(endOfDay)) {
    slots.push({
      id: currentTime.clone().format('HH:mm'),
      time: currentTime.clone(),
      isUpdated: false,
    })
    currentTime.add(TIME_SLOT_DURATION, 'minutes')
  }

  // Handle active events with duration less than 30
  events.forEach((event) => {
    const startTime = moment(event.start, 'HH:mm')
    const endTime = moment(event.end, 'HH:mm')
    const duration = endTime.diff(startTime, 'minutes')

    if (duration <= 30 && event.status === 'active') {
      const minutesToAdd = duration / 2
      const midpoint = startTime.clone().add(minutesToAdd, 'minutes')

      // Add midpoint if not already present
      if (!slots.some((slot) => slot.time.isSame(midpoint))) {
        slots.push({
          id: moment(midpoint).format('HH:mm'),
          time: moment(midpoint),
          isUpdated: duration < 20,
        })
      }

      // Add end time if not already present
      if (!slots.some((slot) => slot.time.isSame(endTime))) {
        slots.push({
          id: endTime.format('HH:mm'),
          time: endTime,
          isUpdated: false,
        })
      }
    }

    // Handle multiple events in one slot by dividing it further for card to have enough height
    events.forEach((innerEvent) => {
      const innerStart = moment(innerEvent.start, 'HH:mm')
      const innerEnd = moment(innerEvent.end, 'HH:mm')
      if (
        startTime.isBefore(innerEnd) &&
        endTime.isAfter(innerStart) &&
        innerEvent.status === 'active' &&
        !slots.some((slot) => slot.time.isSame(innerStart))
      ) {
        slots.push({
          id: moment(innerStart).format('HH:mm'),
          time: innerStart,
          isUpdated: false,
        })
      }
    })
  })

  // Sort slots to ensure they are in chronological order
  slots.sort((a, b) => a.time.diff(b.time))
  return slots
}

export const findFirstAvailableSlot = (
  durationMinutes: number,
  events: Array<{ start: string; end: string }>,
  slots: Array<{ time: moment.Moment }>
) => {
  if (!slots?.length || durationMinutes <= 0) return undefined

  const now = moment()

  // Preprocess and sort events for efficient comparison
  const normalizedEvents = events
    .filter((ev) => ev.start && ev.end)
    .map((ev) => ({
      start: moment(ev.start, 'HH:mm'),
      end: moment(ev.end, 'HH:mm'),
    }))
    .sort((a, b) => a.start.valueOf() - b.start.valueOf())

  const hasOverlap = (start: Moment, end: Moment): boolean =>
    normalizedEvents.some(
      (ev) => start.isBefore(ev.end) && end.isAfter(ev.start)
    )

  for (const { time } of slots) {
    if (time.isBefore(now)) continue

    const end = time.clone().add(durationMinutes, 'minutes')
    const latestAllowedEnd = endOfDay.clone().subtract(30, 'minutes')
    if (end.isAfter(latestAllowedEnd)) continue

    if (!hasOverlap(time, end)) {
      return {
        start: time.format('HH:mm'),
        end: end.format('HH:mm'),
      }
    }
  }

  return undefined
}

export const convertIsoTo24HourTime = (isoString: string): string => {
  if (!isoString) return ''

  const m = moment(isoString)
  if (!m.isValid()) return ''

  return m.utc().format('H:mm') // 0–23 hour format, no leading zero
}

export const getAgeFromDob = (dobIso: string): number => {
  if (!dobIso) return 0

  const dob = moment(dobIso)
  if (!dob.isValid()) return 0

  return moment().diff(dob, 'years')
}

export const formatIsoToMmDdYyyy = (iso: string): string => {
  if (!iso) return ''
  const m = moment(iso)
  return m.isValid() ? m.format('MM/DD/YYYY') : ''
}
