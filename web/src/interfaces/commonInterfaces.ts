import { ReactNode } from 'react'

export interface IconLabelProps {
  icon?: ReactNode
  label: string
  gap?: number
  color?: string
  alignItems?: string
  fontWeight?: number
  fontSize?: string
  iconClass?: string
  className?: string
  lineHeight?: string
}

export interface TimelineStatus {
  status: string
  label: string
  onset: string
  abatement: string
  opportunity: string
}

export interface TimelineLoadingProps {
  loading: true
  loadingContentCount?: number
}

export interface TimelineNormalProps {
  timelineData: TimelineStatus[]
  loading: false
}

// Props for the loading state
export interface DiagnosesCardLoadingProps {
  loading: true
  loadingContentCount?: number
}

// Props for the normal state
export interface DiagnosesSubEntries {
  title: string
  category: string
  subEntries: { value: string; highlight?: boolean }[]
}
export interface DiagnosesCardNormalProps {
  loading: false
  id: number
  cardContent: {
    title: string
    items: DiagnosesSubEntries[]
  }
  setFeedbackId: (id: number | null) => void
  feedbackProps: {
    offset: number
    reasons: string[]
    popoverTitle: string
    selectedReason: string
    otherReason: string
    onReasonChange: (reason: string) => void
    onOtherReasonChange: (otherReason: string) => void
    onCancel: () => void
    onSubmit: () => void
  }
}

export interface CalendarEventCardProps {
  eventId: string | number

  title: string
  status: string
  dueDate: string
  aiScheduled: boolean
  priority?: string
  description?: string
  type?: string
  member?: string
  date?: string
  startTime?: string
  encounter?: {
    Member: {
      id: number | string
      profile: string
      name: string
      dob: string
      gender: string
    }
    patientResponse
    aiInsight
    activity: { description: string }
    communication
  }
  endTime?: string
  address?: string
  commute?: string
  cardIcon?: string
  isDraggable?: boolean
  onDragStart?
  eventType: string
  duration?: string
  state?: 'expanded' | 'collapsed' | 'side' | string
  dragHandleProps?
  enableAiCall?: boolean
  handleTaskEventChange?: () => void
  deleteTaskModalOpen?: () => void
  handleOpenTaskDrawer?: () => void
  patientResponse?: 'YES' | 'NO' | null
  hideMenu?: boolean
  hideDueDate?: boolean
  hideDragHandle?: boolean
  hideDuration?: boolean
}

export interface EventBreakProps {
  description: string
  breakType: string
  startTime: string
  endTime: string
  title: string
  children?: ReactNode
  haveLocation?: boolean
  conflictingEvent?: {
    eventId: string | number
    startTime: string
    endTime: string
    eventType: string
    encounter?: {}
    title: string
    status: string
    dueDate: string
    aiScheduled: boolean
    priority?: string
    cardIcon?: string
    description?: string
    type?: string
    duration?: string
    patientResponse?: 'YES' | 'NO' | null
  } | null
  onTravelChange?: (value: string) => void
}

export interface EventBreakData {
  status?: string
  description: string
  breakType: string
  title: string
  haveLocation?: boolean
}

export interface idValueInterface {
  id: number
  value: string
  label: string
}

export interface TimelineSlots {
  time: string
  isUpdated: boolean
}

export interface TimelineEvents {
  id: number | string
  start: string
  end: string
  title: string
  encounter: {
    Member: {
      id: number | string
      profile: string
      name: string
      dob: string
      gender: string
    }
    type
    activity: {
      description: string
    }
  }
  address
  commute
  description: string
  priority
  due
  isDraggable?: boolean
  duration?: string | number
  patientResponse?: 'YES' | 'NO' | null
  timelineEvent: TimelineEvent
}

export type TimelineEvent =
  | {
      eventType: 'task' | 'event'
      state?: 'expanded' | 'collapsed' | 'side'
      title: string
      status: string
      dueDate: string
      aiScheduled: boolean
      priority?: string
      encounter?: {}
      description?: string
      type?: string
      cardIcon?: string
    }
  | {
      eventType: 'break'
      state?: string
      eventData: EventBreakData
    }

export interface SkeletonLoaderProps {
  count?: number
  isAiGradient?: boolean
  height?: number | string
  radius?: number
  width?: number | string
  circle?: boolean
  display?: string
  styleClass?: string
  mb?: number
  mt?: number
}

interface MemberInfo {
  profile: string
  name: string
  age: number
  gender: 'M' | 'F'
}

// Define the eventData interface
export interface EventData {
  title: string
  status: 'upcoming' | 'completed' | 'in-progress'
  insights: string
  activities: string
  communication: string
  dueDate: string
  cardIcon: string
  memberInfo: MemberInfo
  aiScheduled: boolean
  priority: 'urgent' | 'normal' | 'low' | ''
}
interface TaskType {
  eventType: 'event' | 'task'
  state: 'side' | 'main'
  eventData: EventData
}

export interface UnscheduledTasks {
  id: string
  duration: string
  isDraggable: boolean
  timelineEvent: TaskType
}
