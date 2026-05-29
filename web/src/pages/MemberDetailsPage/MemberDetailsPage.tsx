// import { Link, routes } from '@redwoodjs/router'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { Box, Card, Flex, Grid, Stack, Tabs, Text } from '@mantine/core'
import {
  CreateMemberInput,
  UpdateMemberInput,
  UpdateOverviewInput,
} from 'types/graphql'

import { navigate, routes, useParams } from '@redwoodjs/router'
import { Metadata, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import MemberDetailsForm from 'src/components/HighLevelComponents/MemberDetailsForm/MemberDetailsForm'
import TimelineEvents from 'src/components/HighLevelComponents/TimelineEvents/TimelineEvents'
import InsightCell from 'src/components/Insight/InsightCell'
import BhButton from 'src/components/LowLevelComponents/BhButton/BhButton'
import BhCallWidget from 'src/components/LowLevelComponents/BhCallWidget/BhCallWidget'
import Blinker from 'src/components/LowLevelComponents/Blinker/Blinker'
import { UPDATE_MEMBER_MUTATION } from 'src/components/Member/EditMemberCell/EditMemberCell'
import MemberCell from 'src/components/Member/MemberCell'
import { CREATE_MEMBER_MUTATION } from 'src/components/Member/NewMember/NewMember'
import MemberOverviewCell from 'src/components/MemberOverviewCell'
import { UPDATE_OVERVIEW_MUTATION } from 'src/components/Overview/EditOverviewCell'
import { CREATE_OVERVIEW_MUTATION } from 'src/components/Overview/NewOverview'
import {
  MemberProfileFormValues,
  OverviewFormValues,
} from 'src/interfaces/memberFormInterface'
import OverviewTab from 'src/pages/MemberPanelPage/Tabs/Overview'
import { useAppUtilityStore } from 'src/store/AppUtilityStore'
import { useMemberFormStore } from 'src/store/MemberFormStore'

import AllPlanContent from '../MemberPanelPage/Content/AllPlans'
import AllPlans from '../MemberPanelPage/Content/AllPlans'
import OverviewContent from '../MemberPanelPage/Content/Overview'
import PunchlistContent from '../MemberPanelPage/Content/Punchlist'
import TimelineContent from '../MemberPanelPage/Content/Timeline'
import {
  carePlan,
  HCBSPlan,
  servicePlan,
  timeline,
} from '../MemberPanelPage/data'
import PunchList from '../MemberPanelPage/Tabs/PunchList'

const MemberDetailsPage = () => {
  const { setSelectedMemberId } = useAppUtilityStore()
  const { memberId, tabValue, subTabValue } = useParams()

  const selectedMemberId = memberId ? parseInt(memberId, 10) : null

  const overviewContentRef = useRef(null)
  const [generateMemberInsight, setGenerateMemberInsight] = useState(false)
  const [loading, setLoading] = useState(true)
  const [hasJoinedCall, setHasJoinedCall] = useState(false)

  const [overviewContentWidth, setOverviewContentWidth] = useState(0)
  const chartWidth = overviewContentWidth - 20

  const [carePlanData] = useState(carePlan)

  const [timelineData, setTimelineData] = useState(timeline)

  const [HCBSData] = useState(HCBSPlan)

  const [servicePlanData] = useState(servicePlan)

  const PanelTabsRef = useRef<HTMLDivElement>(null)
  const PanelTabListRef = useRef<HTMLDivElement>(null)
  const activeTab = tabValue || 'overview'
  const allPlansTab = subTabValue || 'service-plan'
  const [showMemberWithRiskScore] = useState(false)
  // Mutations
  const [updateMember] = useMutation(UPDATE_MEMBER_MUTATION, {
    onCompleted: () => {
      toast.success('Member updated successfully')
    },
    onError: (error) => {
      toast.error(`Failed to update member: ${error.message}`)
    },
  })

  const [createMember] = useMutation(CREATE_MEMBER_MUTATION, {
    onCompleted: (data) => {
      toast.success('Member created successfully')
      const newMemberId = data.createMember.id
      // Navigate to the newly created member's page
      navigate(
        routes.memberDetail({
          memberId: String(newMemberId),
          tabValue: 'overview',
        })
      )
    },
    onError: (error) => {
      toast.error(`Failed to create member: ${error.message}`)
    },
  })

  const [updateOverview] = useMutation(UPDATE_OVERVIEW_MUTATION, {
    onCompleted: () => {
      toast.success('Overview updated successfully')
    },
    onError: (error) => {
      toast.error(`Failed to update overview: ${error.message}`)
    },
  })

  const [createOverview] = useMutation(CREATE_OVERVIEW_MUTATION, {
    onCompleted: () => {
      toast.success('Overview updated successfully')
    },
    onError: (error) => {
      toast.error(`Failed to update overview: ${error.message}`)
    },
  })

  const containerRef = useRef<HTMLDivElement | null>(null)
  const {
    isEditing,
    setIsEditing,
    setIsSaving,
    validateAllForms,
    getAllFormValues,
    resetAllForms,
    addingNewMember,
    setAddingNewMember,
  } = useMemberFormStore()

  useEffect(() => {
    const updateWidths = () => {
      if (overviewContentRef.current) {
        const contentWidth = overviewContentRef.current.offsetWidth
        setOverviewContentWidth(contentWidth)
      }
    }
    updateWidths()
    window.addEventListener('resize', updateWidths)
    return () => window.removeEventListener('resize', updateWidths)
  }, [overviewContentRef])

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => {
      clearTimeout(timerId)
      setIsEditing(false)
    }
  }, [])

  useEffect(() => {
    setSelectedMemberId(+memberId)
  }, [memberId, setSelectedMemberId])

  useEffect(() => {
    if (
      !addingNewMember &&
      (!selectedMemberId || isNaN(+selectedMemberId) || +selectedMemberId <= 0)
    ) {
      navigate(routes.memberPanel())
      return
    }
  }, [selectedMemberId])

  // PanelTabListRef
  const updateHeight = () => {
    if (PanelTabListRef.current) {
      const tabListHeight = PanelTabListRef.current.offsetHeight
      document.documentElement.style.setProperty(
        '--memberMainTabHeight',
        `${tabListHeight}px`
      )
    }
  }

  const updateProfileHeight = () => {
    if (containerRef.current) {
      const newHeight = containerRef.current.offsetHeight
      document.documentElement.style.setProperty(
        '--memberProfileHeight',
        `${newHeight}px`
      )
    }
  }

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      updateProfileHeight()
    })
  }, [isEditing])

  useEffect(() => {
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [PanelTabListRef])

  const handleActiveTimeline = (item) => {
    const updatedData = timeline.map((timelineItem) =>
      timelineItem.id === item.id
        ? { ...timelineItem, active: true }
        : { ...timelineItem, active: false }
    )
    setTimelineData(updatedData)
  }

  const handleTabChange = (value: string) => {
    if (value && selectedMemberId) {
      navigate(
        routes.memberDetail({
          memberId: String(selectedMemberId),
          tabValue: value,
        })
      )
    }
  }

  const handleCancel = () => {
    resetAllForms()
    setIsEditing(false)
    if (addingNewMember) {
      setAddingNewMember(false)
      navigate(routes.memberPanel())
    }
  }

  const handleSave = async () => {
    // Validate all forms
    if (!validateAllForms()) {
      console.error('Validation failed')
      return
    }

    // Get all form values
    const allFormValues = getAllFormValues()
    console.log('All form values:', allFormValues)

    const memberProfile: MemberProfileFormValues | undefined =
      allFormValues.memberProfile
    const overview: OverviewFormValues | undefined = allFormValues.overview

    setIsSaving(true)

    try {
      if (addingNewMember) {
        // Create new member
        if (memberProfile) {
          const createInput: CreateMemberInput = {
            name: memberProfile.memberName,
            dob: memberProfile.dob ? memberProfile.dob.toISOString() : null,
            ethnicity: memberProfile.ethnicity,
            gender: memberProfile.gender,
            languageSkills: memberProfile.languageSkills,
            phone: memberProfile.primaryContact,
            secondaryPhone: memberProfile.secondaryContact,
            address: memberProfile.address,
            bio: memberProfile.bio,
          }

          const result = await createMember({
            variables: {
              input: createInput,
            },
          })

          // Create overview for the newly created member if overview data exists
          if (overview && result?.data?.createMember?.id) {
            const newMemberId = result.data.createMember.id

            const overviewData = {
              careManagement: {
                title: 'Care Management',
                overviewData: overview.careManagement.map((item) => ({
                  key: item.key,
                  value:
                    item.value instanceof Date
                      ? item.value.toISOString()
                      : item.value,
                })),
              },
              operationalMetrics: {
                title: 'Operational Metrics',
                overviewData: overview.operationalMetrics.map((item) => ({
                  key: item.key,
                  value:
                    item.value instanceof Date
                      ? item.value.toISOString()
                      : item.value,
                })),
              },
              overview: {
                title: 'Member Overview',
                overviewData: overview.overview.map((item) => ({
                  key: item.key,
                  value: item.value,
                })),
              },
            }

            await createOverview({
              variables: {
                input: {
                  memberId: newMemberId,
                  overview: overviewData.overview,
                  careManagement: overviewData.careManagement,
                  operationalMetrics: overviewData.operationalMetrics,
                },
              },
            })
          }
        }
      } else {
        // Update existing member
        if (memberProfile && selectedMemberId) {
          const updateInput: UpdateMemberInput = {
            name: memberProfile.memberName,
            dob: memberProfile.dob ? memberProfile.dob.toISOString() : null,
            ethnicity: memberProfile.ethnicity,
            gender: memberProfile.gender,
            languageSkills: memberProfile.languageSkills,
            phone: memberProfile.primaryContact,
            secondaryPhone: memberProfile.secondaryContact,
            address: memberProfile.address,
            bio: memberProfile.bio,
          }

          await updateMember({
            variables: {
              id: selectedMemberId,
              input: updateInput,
            },
          })
        }

        // Update overview (only for existing members)
        if (overview && selectedMemberId) {
          const overviewData = {
            careManagement: {
              title: 'Care Management',
              overviewData: overview.careManagement.map((item) => ({
                key: item.key,
                value:
                  item.value instanceof Date
                    ? item.value.toISOString()
                    : item.value,
              })),
            },
            operationalMetrics: {
              title: 'Operational Metrics',
              overviewData: overview.operationalMetrics.map((item) => ({
                key: item.key,
                value:
                  item.value instanceof Date
                    ? item.value.toISOString()
                    : item.value,
              })),
            },
            overview: {
              title: 'Member Overview',
              overviewData: overview.overview.map((item) => ({
                key: item.key,
                value: item.value,
              })),
            },
          }

          const updateInput: UpdateOverviewInput = {
            overview: overviewData.overview,
            careManagement: overviewData.careManagement,
            operationalMetrics: overviewData.operationalMetrics,
          }

          await updateOverview({
            variables: {
              id: selectedMemberId,
              input: updateInput,
            },
          })
        }
      }

      setIsEditing(false)
      setAddingNewMember(false)
      resetAllForms()
    } catch (error) {
      console.error('Error saving forms:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <Metadata title="MemberDetails" description="MemberDetails page" />

      <Flex className="w-full member-panel-main" direction="column">
        <Flex ref={containerRef} align="center">
          {selectedMemberId && (
            <MemberCell
              id={selectedMemberId}
              updateProfileHeight={updateProfileHeight}
              isInsightGenerated={generateMemberInsight}
              setGenerateMemberInsight={setGenerateMemberInsight}
              memberWithRiskScore={showMemberWithRiskScore}
            />
          )}
          {(isEditing || addingNewMember) && (
            <Stack gap="sm" me={16} style={{ order: 2 }}>
              <BhButton
                buttonType="submit"
                variant="filled"
                onClick={handleSave}
              >
                {addingNewMember ? 'Save' : 'Save Changes'}
              </BhButton>
              <BhButton variant="outline" onClick={handleCancel}>
                Cancel
              </BhButton>
            </Stack>
          )}
          {addingNewMember && <MemberDetailsForm />}
        </Flex>
        {generateMemberInsight ? (
          <InsightCell id={1} />
        ) : (
          <Box
            bg="#F4F8F6"
            className="member-content-box"
            pos="relative"
            h="calc(100vh - var(--memberProfileHeight))"
          >
            <Grid className="member-grid-wrapper" h={'100%'}>
              {/* Tabs */}
              <Grid.Col span={4} className="tabs-section" pb={0}>
                <Card pb={0} pt={16} pl={16} pr={16} radius={0} h={'100%'}>
                  <Tabs
                    defaultValue="overview"
                    value={activeTab}
                    onChange={(value) => handleTabChange(value)}
                    className="h-full overflow-y-hidden member-panel-tabs"
                    ref={PanelTabsRef}
                  >
                    <Tabs.List
                      ref={PanelTabListRef}
                      className="member-panel-tab-list-new"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        overflowY: 'auto',
                      }}
                    >
                      <Flex gap={5}>
                        <Tabs.Tab
                          value="overview"
                          className={`${activeTab === 'overview' ? 'tab-active' : 'tab-inactive'}`}
                        >
                          Overview
                        </Tabs.Tab>
                        <Tabs.Tab
                          value="all-plans"
                          className={`${activeTab === 'all-plans' ? 'tab-active' : 'tab-inactive'}`}
                        >
                          All Plans
                        </Tabs.Tab>
                        <Tabs.Tab
                          value="timeline"
                          className={`${activeTab === 'timeline' ? 'tab-active' : 'tab-inactive'}`}
                        >
                          Timeline
                        </Tabs.Tab>
                      </Flex>
                      <Tabs.Tab
                        p={0}
                        mt={12}
                        mr={6}
                        value="punchlist"
                        className={`${activeTab === 'punchlist' ? 'punch-tab-active' : 'tab-inactive'} punchlist-tab`}
                      >
                        <Flex
                          gap={4}
                          align="center"
                          pos="relative"
                          className="puchlist-tab"
                        >
                          <Box pos="absolute" top={-7} right={-3}>
                            <Blinker />
                          </Box>
                          <span
                            className="bh-icon-Punchlist"
                            style={{
                              color: 'var(--primary-color)',
                              width: '16px',
                              height: '16px',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          ></span>
                          <Text c="var(--primary-color)" size="sm" fw={600}>
                            Punchlist
                          </Text>
                        </Flex>
                      </Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel
                      value="overview"
                      h={
                        isEditing
                          ? 'calc(100vh - (var(--memberProfileHeight) + var(--memberMainTabHeight)))'
                          : 'calc(100vh - var(--memberProfileHeight) - var(--memberMainTabHeight))'
                      }
                      className={`member-panel-tab ${loading ? 'overflow-y-hidden' : 'overflow-y-auto'}`}
                    >
                      {selectedMemberId ? (
                        <MemberOverviewCell id={Number(selectedMemberId)} />
                      ) : (
                        <OverviewTab />
                      )}
                    </Tabs.Panel>
                    <Tabs.Panel
                      value="all-plans"
                      h="calc(100vh - var(--memberProfileHeight) - var(--memberMainTabHeight))"
                    >
                      <AllPlans
                        ServicePlanData={servicePlanData}
                        CarePlanData={carePlanData}
                        allPlansTab={allPlansTab}
                      />
                    </Tabs.Panel>
                    <Tabs.Panel
                      value="timeline"
                      className="member-panel-tab"
                      h="calc(100vh - var(--memberProfileHeight) - var(--memberMainTabHeight) - 30px)"
                    >
                      <TimelineEvents
                        timelineData={timelineData}
                        handleActiveTimeline={handleActiveTimeline}
                      />
                    </Tabs.Panel>
                    <Tabs.Panel
                      value="punchlist"
                      className="member-panel-tab"
                      h="calc(100vh - var(--memberProfileHeight) - var(--memberMainTabHeight) - 30px)"
                    >
                      <PunchList />
                    </Tabs.Panel>
                  </Tabs>
                </Card>
              </Grid.Col>
              {/* Content Section */}
              <Grid.Col span={8} className="content-section" pb={0} mt={8}>
                <Box
                  className={`member-panel-tabs-wrap ${loading ? 'overflow-y-hidden' : ''}`}
                  h={isEditing ? 'calc(100% - 70px)' : '100%'}
                >
                  {activeTab && activeTab === 'overview' ? (
                    <div content="overview" ref={overviewContentRef}>
                      <OverviewContent
                        HCBSData={HCBSData}
                        chartWidth={chartWidth}
                        memberWithRiskScore={showMemberWithRiskScore}
                      />
                    </div>
                  ) : activeTab === 'all-plans' ? (
                    <div content="all-plans">
                      <AllPlanContent
                        ServicePlanData={servicePlanData}
                        CarePlanData={carePlanData}
                        allPlansTab={allPlansTab || 'service-plan'}
                      />
                    </div>
                  ) : activeTab === 'timeline' ? (
                    <div content="timeline">
                      <TimelineContent TimelineData={timelineData} />
                    </div>
                  ) : activeTab === 'punchlist' ? (
                    <div content="punchlist" className="h-full">
                      <PunchlistContent hasJoinedCall={hasJoinedCall} />
                    </div>
                  ) : null}
                </Box>
              </Grid.Col>
            </Grid>
            <BhCallWidget
              hasJoinedCall={hasJoinedCall}
              handleCallActions={setHasJoinedCall}
            />
          </Box>
        )}
      </Flex>
    </>
  )
}

export default MemberDetailsPage
