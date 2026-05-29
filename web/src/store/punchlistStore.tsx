import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { PHQ9Questionaire, punchList } from 'src/pages/MemberPanelPage/data'
import { PunchListItem } from 'src/pages/MemberPanelPage/types'

import { useAppUtilityStore } from './AppUtilityStore'

interface PunchListStore {
  punchListData: PunchListItem[]
  activePunchList: PunchListItem
  drawer: boolean
  phq9Data: typeof PHQ9Questionaire
  isAssessmentCompleted: boolean
  setPunchListData: (data: PunchListItem[]) => void
  setDrawer: (open: boolean) => void
  setActivePunchList: (activePunchList: PunchListItem) => void
  handleDoneClick: (key: string) => void
  setFormInProgress: (key: string) => void
  navigateToPunchListItem: (item: PunchListItem) => void
  addPHQFormToPunchlist: (form: number) => void
  handleOpenPanel: () => void
  consentFormValues: ConsentFormData
  setConsentFormData: (values: Partial<ConsentFormData>) => void
  eligibilityFormValues: EligibilityFormData
  setEligibilityFormData: (values: EligibilityFormData) => void
  conversationStarterFormValues: ConversationStarterFormData
  setConversationStarterFormData: (
    values: Partial<ConversationStarterFormData>
  ) => void
  personCenteredDiscoveryFormValues: PersonCenteredDiscoveryFormData
  setPersonCenteredDiscoveryFormData: (
    values: Partial<PersonCenteredDiscoveryFormData>
  ) => void
  pathwayAssessmentToolsFormValues: PathwayAssessmentToolsFormData
  setPathwayAssessmentToolsFormData: (
    values: Partial<PathwayAssessmentToolsFormData>
  ) => void
  wrapUpFormValues: WrapUpFormData
  setWrapUpFormData: (values: Partial<WrapUpFormData>) => void
  phq2AssessmentFormValues: PHQAssessmentFormData
  setPHQ2AssessmentFormData: (values: Partial<PHQAssessmentFormData>) => void
  phq9AssessmentFormValues: PHQAssessmentFormData
  setPHQ9AssessmentFormData: (values: Partial<PHQAssessmentFormData>) => void
}

export interface ConsentFormData {
  memberName: string
  consentDate: Date | string
  communication: string
  phone: string
  email: string
  text: string
  exchangeInfo: string
  hiv: string
  drug: string
}

export interface EligibilityFormData {
  eligible: string
  eligibilityReasons: Record<string, boolean>
  notes: string
}

export const consentFormMock: Partial<ConsentFormData> = {
  memberName: 'Stephanie Newman',
  consentDate: new Date(),
}

// Pathway Assessment Tools types
export interface PathwayToolAnswers {
  radioAnswers: Record<number, string>
  multiAnswers: Record<number, Record<number, boolean>>
  textAnswers: Record<number, string>
  otherText: Record<number, string>
}

export interface PathwayAssessmentToolsFormData {
  [toolId: string]: PathwayToolAnswers
}

export const conversationStarterFormMock: Partial<ConversationStarterFormData> =
  {
    questions: [],
    additionalInput: '',
  }

export const wrapUpFormMock: Partial<WrapUpFormData> = {
  finalThoughts: '',
}

export interface ConversationStarterFormData {
  questions: Array<{ label: string; checked: boolean }>
  additionalInput: string
}

export interface PersonCenteredDiscoveryFormData {
  questions: Array<{ label: string; checked: boolean; key?: string | number }>
}

export interface WrapUpFormData {
  finalThoughts: string
  [key: string]: string | string[]
}

export interface PHQAssessmentFormData {
  answers: Record<string, number | string>
  totalScore: number
}

const lastCompletedPunchListIndex = punchList
  .map((item) => item.stageInfo.stage)
  .lastIndexOf('started')

const usePunchlistStore = create<PunchListStore>()(
  devtools(
    (set, get) => ({
      punchListData: punchList,
      phq9Data: PHQ9Questionaire,
      activePunchList: punchList[lastCompletedPunchListIndex],
      drawer: false,
      isAssessmentCompleted: false,

      setPunchListData: (data) => set({ punchListData: data }),
      setActivePunchList: (activePunchList) => set({ activePunchList }),
      setDrawer: (open) => set({ drawer: open }),

      navigateToPunchListItem: (item) => {
        const { punchListData } = get()
        const { addToast } = useAppUtilityStore.getState()

        if (item.stageInfo.stage === 'completed') return

        // Check wrap-up condition
        if (
          item.key === 'timeToWrapUp' &&
          !punchListData.every(
            (p) => p.key === 'timeToWrapUp' || p.stageInfo.stage === 'completed'
          )
        ) {
          addToast({
            type: 'error',
            title: 'Complete all items first',
            message:
              'You can only wrap up after completing all previous assessments.',
          })
          return
        }

        // Find current active index
        let currentActiveIndex = -1
        for (let i = punchListData.length - 1; i >= 0; i--) {
          const stage = punchListData[i].stageInfo.stage
          if (stage === 'started' || stage === 'inProgress') {
            currentActiveIndex = i
            break
          }
        }

        const targetIndex = punchListData.findIndex((p) => p.id === item.id)

        const updatedData = punchListData.map((p, index) => {
          if (index === currentActiveIndex) {
            return {
              ...p,
              state: '',
              stageInfo: {
                ...p.stageInfo,
                stage:
                  p.stageInfo.stage === 'started'
                    ? 'notStarted'
                    : p.stageInfo.stage,
              },
            }
          }
          if (index === targetIndex) {
            return {
              ...p,
              state: 'active',
              stageInfo: {
                ...p.stageInfo,
                stage:
                  p.stageInfo.stage === 'notStarted'
                    ? 'started'
                    : p.stageInfo.stage,
              },
            }
          }
          return p
        })

        set({
          activePunchList: updatedData[targetIndex],
          punchListData: updatedData,
        })
      },

      handleDoneClick: (formKey: string) => {
        const { punchListData } = get()
        const updatedData = [...punchListData]

        const currentIndex = updatedData.findIndex(
          (item) => item.key === formKey
        )

        if (currentIndex === -1) {
          return
        }

        // Mark the current active item as 'completed'
        updatedData[currentIndex] = {
          ...updatedData[currentIndex],
          stageInfo: {
            ...updatedData[currentIndex].stageInfo,
            stage: 'completed',
          },
          state: '',
        }

        // Find the next item **after the currentIndex** that is not completed
        const nextActiveIndex = updatedData.findIndex(
          (item, index) =>
            index > currentIndex &&
            item.stageInfo.stage !== 'completed' &&
            item.view
        )

        if (nextActiveIndex !== -1) {
          // Mark the next item as 'started' and 'active'
          updatedData[nextActiveIndex] = {
            ...updatedData[nextActiveIndex],
            stageInfo: {
              ...updatedData[nextActiveIndex].stageInfo,
              stage:
                updatedData[nextActiveIndex].stageInfo.stage === 'notStarted'
                  ? 'started'
                  : updatedData[nextActiveIndex].stageInfo.stage,
            },
            state: 'active',
          }

          set({ activePunchList: updatedData[nextActiveIndex] })
        } else {
          // No next incomplete item
          set({
            activePunchList: {} as PunchListItem,
            isAssessmentCompleted: true,
          })
        }

        set({ punchListData: updatedData })
      },

      setFormInProgress: (key: string) => {
        const { punchListData } = get()
        const updatedData = punchListData.map((item) => {
          if (item.key === key) {
            return {
              ...item,
              stageInfo: { ...item.stageInfo, stage: 'inProgress' },
            }
          }
          return item
        })
        set({ punchListData: updatedData })
      },

      addPHQFormToPunchlist: (form) => {
        const { punchListData, phq9Data } = get()
        const updatedData = punchListData.map((item) => {
          // Check if this is the PHQ form we need to show
          if (
            (form === 2 && item.key === 'phq2Assessment') ||
            (form === 9 && item.key === 'phq9Assessment')
          ) {
            return {
              ...item,
              view: true,
              priority: 'Urgent',
              questionnaire:
                form === 2
                  ? [
                      {
                        problem: 'Little interest or pleasure in doing things',
                        answer: '',
                        id: 'pr0',
                      },
                      {
                        problem: 'Feeling down, depressed or hopeless',
                        answer: '',
                        id: 'pr1',
                      },
                    ]
                  : phq9Data,
            }
          }
          return item
        })

        set({ punchListData: updatedData })
      },

      handleOpenPanel: () => {
        set({ drawer: true })
      },

      // punchlist form store values
      consentFormValues: {
        memberName: consentFormMock.memberName,
        consentDate: consentFormMock.consentDate,
        communication: '',
        phone: '',
        email: '',
        text: '',
        exchangeInfo: '',
        hiv: '',
        drug: '',
      },

      setConsentFormData: (values) => {
        set((state) => ({
          consentFormValues: { ...state.consentFormValues, ...values },
        }))
      },

      // Eligibility form store values
      eligibilityFormValues: {
        eligible: '',
        eligibilityReasons: {} as Record<string, boolean>,
        notes: '',
      },

      setEligibilityFormData: (values) => {
        set((state) => ({
          eligibilityFormValues: { ...state.eligibilityFormValues, ...values },
        }))
      },
      // conversation starter form store values
      conversationStarterFormValues: {
        questions: conversationStarterFormMock.questions || [],
        additionalInput: conversationStarterFormMock.additionalInput || '',
      },

      setConversationStarterFormData: (values) => {
        set((state) => ({
          conversationStarterFormValues: {
            ...state.conversationStarterFormValues,
            ...values,
          },
        }))
      },
      personCenteredDiscoveryFormValues: {
        questions: [],
      },
      wrapUpFormValues: {
        finalThoughts: wrapUpFormMock.finalThoughts || '',
      },

      setWrapUpFormData: (values) => {
        set((state) => ({
          wrapUpFormValues: {
            ...state.wrapUpFormValues,
            ...values,
          },
        }))
      },

      setPersonCenteredDiscoveryFormData: (values) => {
        set((state) => ({
          personCenteredDiscoveryFormValues: {
            ...state.personCenteredDiscoveryFormValues,
            ...values,
          },
        }))
      },
      // Pathway Assessment Tools form store values
      pathwayAssessmentToolsFormValues: {},

      setPathwayAssessmentToolsFormData: (values) => {
        set((state) => ({
          pathwayAssessmentToolsFormValues: {
            ...state.pathwayAssessmentToolsFormValues,
            ...values,
          },
        }))
      },
      // PHQ-2 Assessment form store values
      phq2AssessmentFormValues: {
        answers: {},
        totalScore: 0,
      },

      setPHQ2AssessmentFormData: (values) => {
        set((state) => ({
          phq2AssessmentFormValues: {
            ...state.phq2AssessmentFormValues,
            ...values,
          },
        }))
      },

      // PHQ-9 Assessment form store values
      phq9AssessmentFormValues: {
        answers: {},
        totalScore: 0,
      },

      setPHQ9AssessmentFormData: (values) => {
        set((state) => ({
          phq9AssessmentFormValues: {
            ...state.phq9AssessmentFormValues,
            ...values,
          },
        }))
      },
    }),
    { name: 'PunchListStore', enabled: process.env.NODE_ENV === 'development' }
  )
)

export default usePunchlistStore
