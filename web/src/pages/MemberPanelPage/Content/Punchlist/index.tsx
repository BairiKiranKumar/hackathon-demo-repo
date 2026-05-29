import React, { useState } from 'react'

import '../../index.css'

import BhAiSuggestedNudges from '@highLevelComp/BhAiSuggestedNudges/BhAiSuggestedNudges'
import { Grid } from '@mantine/core'

import usePunchlistStore from 'src/store/punchlistStore'

import {
  aiSuggestionsData,
  consentOptions,
  consentScriptData,
  consentTermsData,
  conversationStartersData,
  eligibilityOptions,
  eligibilityReasonOptions,
  informationOptions,
  pathwayAssessmentToolsData,
  personCenteredDiscoveryData,
  reviewPlan,
  timeToWrapSectionData,
} from '../../data'
import ReviewServicePlan from '../ReviewServicePlan'
import ServicePlanPanel from '../ServicePlanPanel'

import { ConsentPunchlist } from './ConsentPunchlist'
import ConversationStarterPunchlist from './ConversationStarterPunchlist'
import { EligibilityPunchlist } from './EligibilityPunchlist'
import { PathwayAssessmentTools } from './PathwayAssessmentTools'
import { PersonCenteredDiscoveryPunchlist } from './PersonCenteredDiscoveryPunchlist'
import PHQ2Content from './PHQ2Content'
import TimeToWrap from './TimeToWrapUp'

const PunchlistContent = ({ hasJoinedCall }) => {
  const { addPHQFormToPunchlist, activePunchList } = usePunchlistStore()
  const [reviewPlans, setReviewPlans] = useState(reviewPlan)

  const aiSuggestions = aiSuggestionsData

  const isAssessmentCompleted = usePunchlistStore(
    (state) => state.isAssessmentCompleted
  )

  const activeView = () => {
    switch (activePunchList.name) {
      case 'Consent':
        return (
          <ConsentPunchlist
            consentOptions={consentOptions}
            informationOptions={informationOptions}
            consentScriptData={consentScriptData}
            consentTermsData={consentTermsData}
          />
        )
      case 'Eligibility':
        return (
          <EligibilityPunchlist
            eligibilityOptions={eligibilityOptions}
            eligibilityReasonOptions={eligibilityReasonOptions}
          />
        )
      case 'Conversation Starter':
        return (
          <ConversationStarterPunchlist
            conversationStarterQuestions={conversationStartersData.questions}
            conversationStarterScript={conversationStartersData.script}
            conversationStarterTodoText={conversationStartersData.todoText}
            conversationStarterAdditionalPrompt={
              conversationStartersData.additionalPrompt
            }
          />
        )
      case 'Person Centered Discovery':
        return (
          <PersonCenteredDiscoveryPunchlist
            personCenteredDiscoveryQuestions={
              personCenteredDiscoveryData.questions
            }
          />
        )
      case 'Pathway Assessment Tools':
        return (
          <PathwayAssessmentTools
            pathwayAssessmentToolsData={pathwayAssessmentToolsData}
          ></PathwayAssessmentTools>
        )
      case 'PHQ2 Assessment':
        return <PHQ2Content activePunchList={activePunchList}></PHQ2Content>
      case 'Time to wrap-up':
        return (
          <TimeToWrap
            wrapUpQuestions={timeToWrapSectionData.wrapUpQuestionsData}
            followUpPreferences={timeToWrapSectionData.followUpPreferencesData}
            wrapUpScript1={timeToWrapSectionData.wrapUpScript1Data}
            wrapUpScript2={timeToWrapSectionData.wrapUpScript2Data}
            aiSuggestionOptions={timeToWrapSectionData.aiSuggestionOptions}
          />
        )

      case 'PHQ9 Assessment':
        return <PHQ2Content activePunchList={activePunchList}></PHQ2Content>
      default:
        break
    }
  }

  return (
    <>
      <Grid h={'100%'}>
        <Grid.Col span={activePunchList.aiSuggestion ? 8 : 12} p={0}>
          {activeView()}
          {isAssessmentCompleted && (
            <ReviewServicePlan
              servicePlans={reviewPlans}
              handlePlanSelection={setReviewPlans}
            />
          )}
        </Grid.Col>
        {activePunchList.aiSuggestion && (
          <Grid.Col span={4}>
            <BhAiSuggestedNudges
              aiSuggestions={aiSuggestions}
              hasJoinedCall={hasJoinedCall}
              activePunchList={activePunchList}
              addPHQFormToPunchlist={addPHQFormToPunchlist}
            ></BhAiSuggestedNudges>
          </Grid.Col>
        )}
      </Grid>
      <div className="member-drawer">
        <ServicePlanPanel
          reviewPlans={reviewPlans}
          handlePlanChange={setReviewPlans}
        />
      </div>
    </>
  )
}

export default PunchlistContent
