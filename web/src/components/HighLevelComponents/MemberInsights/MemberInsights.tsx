import { useState, useRef } from 'react'

import DiagnosesCard from '@lowLevelComp/DiagnosesCard/DiagnosesCard'
import DiagnosisTimeline from '@lowLevelComp/DiagnosisTimeline/DiagnosisTimeline'
import { Box, Flex, Title, Card, Grid } from '@mantine/core'

const MemberInsights = ({ insight, loading = false }) => {
  const [activeFeedbackId, setFeedbackId] = useState(null)
  const [reaction, setReaction] = useState({ dislike: false })
  const insightsCardRef = useRef(null)

  const [popoverData, setPopoverData] = useState({
    disabled: reaction.dislike,
    popoverTitle: 'Please provide a reason',
    opened: false,
    offset: -6,
    reasons: [
      `Patient didn't want it`,
      `Clinician feels it's not appropriate`,
      `Others`,
    ],
    selectedReason: null,
    otherReason: '',
  })

  const handleReasonChange = (reason: string) => {
    setPopoverData((prev) => ({ ...prev, selectedReason: reason }))
  }

  const handleOtherReasonChange = (value: string) => {
    setPopoverData((prev) => ({ ...prev, otherReason: value }))
  }

  const handleCancel = () => {
    setReaction({ dislike: false })
    setPopoverData((prev) => ({
      ...prev,
      selectedReason: null,
      otherReason: '',
      opened: false,
    }))
  }

  const handleSubmit = () => {
    console.log(
      'Submitted reason:',
      popoverData.selectedReason,
      activeFeedbackId
    )
    console.log('Other reason:', popoverData.otherReason)
    setPopoverData((prev) => ({
      ...prev,
      opened: false,
    }))
  }

  return (
    <Box
      bg="var(--bg-primary-grey)"
      mx={24}
      mt={20}
      className="ai-insights-wrap"
      p="md"
      style={{
        borderRadius: 16,
        height: `calc(100vh - var(--memberProfileHeight) - 40px)`,
      }}
      ref={insightsCardRef}
    >
      <Flex gap={4} align={'center'} pb={20}>
        <Title order={4} fw={600}>
          Member Insights
        </Title>
      </Flex>
      <Card px={24} py={20} radius={12}>
        <Grid>
          <Grid.Col span={4} className="member-panel-grid">
            <Title order={4} fw={600} mb={22}>
              Diagnoses
            </Title>
            <div
              className={`member-panel-col-scroll ${loading ? 'overflow-y-hidden' : ''}`}
              style={{
                height: 'calc(100vh - var(--memberProfileHeight) - 186px)',
              }}
            >
              {loading ? (
                <DiagnosisTimeline loading={loading} loadingContentCount={6} />
              ) : (
                <DiagnosisTimeline
                  loading={loading}
                  timelineData={insight.aiDiagSummary.entries}
                />
              )}
            </div>
          </Grid.Col>
          <Grid.Col span={4} className="member-panel-grid">
            <Title order={4} fw={600} mb={22}>
              High Risk Factors
            </Title>
            <div
              className={`member-panel-col-scroll ${loading ? 'overflow-y-hidden' : ''}`}
              style={{
                height: 'calc(100vh - var(--memberProfileHeight) - 186px)',
              }}
            >
              {loading ? (
                <DiagnosesCard loading={loading} loadingContentCount={5} />
              ) : (
                <>
                  {insight.aiRiskFactors.entries.map((diagnosisData, index) => (
                    <DiagnosesCard
                      id={index}
                      key={index}
                      setFeedbackId={setFeedbackId}
                      loading={loading}
                      cardContent={diagnosisData}
                      feedbackProps={{
                        offset: popoverData.offset,
                        reasons: popoverData.reasons,
                        popoverTitle: popoverData.popoverTitle,
                        selectedReason: popoverData.selectedReason,
                        otherReason: popoverData.otherReason,
                        onReasonChange: handleReasonChange,
                        onOtherReasonChange: handleOtherReasonChange,
                        onCancel: handleCancel,
                        onSubmit: handleSubmit,
                      }}
                    />
                  ))}
                </>
              )}
            </div>
          </Grid.Col>
          <Grid.Col span={4} className="member-panel-grid">
            <Title order={4} fw={600} mb={22}>
              Recommendations
            </Title>
            <div
              className={`member-panel-col-scroll ${loading ? 'overflow-y-hidden' : ''}`}
              style={{
                height: 'calc(100vh - var(--memberProfileHeight) - 186px)',
              }}
            >
              {loading ? (
                <DiagnosesCard loading={loading} loadingContentCount={5} />
              ) : (
                <>
                  {insight.aiRecommendations.entries.map(
                    (diagnosisData, index) => (
                      <DiagnosesCard
                        id={index}
                        key={index}
                        setFeedbackId={setFeedbackId}
                        loading={loading}
                        cardContent={diagnosisData}
                        feedbackProps={{
                          offset: popoverData.offset,
                          reasons: popoverData.reasons,
                          popoverTitle: popoverData.popoverTitle,
                          selectedReason: popoverData.selectedReason,
                          otherReason: popoverData.otherReason,
                          onReasonChange: handleReasonChange,
                          onOtherReasonChange: handleOtherReasonChange,
                          onCancel: handleCancel,
                          onSubmit: handleSubmit,
                        }}
                      />
                    )
                  )}
                </>
              )}
            </div>
          </Grid.Col>
        </Grid>
      </Card>
      <div className="popover-overlay-backdrop"></div>
    </Box>
  )
}

export default MemberInsights
