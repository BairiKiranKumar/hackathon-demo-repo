interface Reading {
  current: number | null
  date: string | null
  acute: boolean
  desired?: number | null
  projected?: number | null
}
export interface Month {
  month: string
  visit: boolean
  call: boolean
  readings: Reading[]
}
export interface ChartsProps {
  chartData: Month[]
  chartWidth: number
}
export interface TimelineData {
  id: number
  date: string
  time: string
  event: string
  description: string
  active: boolean
  type: string
  Icon: React.ElementType
  summary: SummaryProps[] | Record<string, never> | null
  transcript: TranscriptProps[] | Record<string, never>
  activities: string[] | null
  recommendations: RecommendationsContent[] | null
}
interface SummaryProps {
  id: number
  label: string
  value: string[]
}
interface TranscriptProps {
  id: number
  person: string
  conversation: string
  time: string
}
interface RecommendationsContent {
  id: number
  label: string
  priority: string | null
  action: string
}

// Type definition for PunchList items
export interface PunchListItem {
  id: number
  checked: boolean
  name: string
  description: string
  state: string
  aiEnabled: boolean
  aiSuggestion: boolean
  formCount?: number
  showPriorityBadge?: boolean
  stageInfo: { stage: string; content?: string }
  category: string
  view: boolean
  priority?: string // Optional property
  questionnaire?: { problem: string; answer: string | number; id: string }[]
  key: string
}

export interface AssessmentQuestionnaire {
  script: string
  questions: ConversationStarterQuestions[]
  todoText: string
  additionalPrompt?: string
}
export interface ConversationStarterQuestions {
  label: string
  key: number
  checked: boolean
  children?: ConversationStarterQuestions[]
}

export interface PersonCenteredDiscoveryQuestions {
  label: string
  key: number
  checked: boolean
  children?: PersonCenteredDiscoveryQuestions[]
}
export interface FrailtyPathwayChildList {
  headerData: { name: string }[]
  rowData: {
    description: {
      value: string
      owner: string
    }
    dueDate: string
    checked?: boolean
  }[]
}

export interface FrailtyPathwayList {
  label: string
  dueDate: string
  key: number
  checked: boolean
  children?: FrailtyPathwayChildList
  indeterminate?: boolean
}
