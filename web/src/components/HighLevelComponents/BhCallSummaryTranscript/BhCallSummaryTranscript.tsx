import React, { useState, useEffect } from 'react'

import SkeletonLoader from '@lowLevelComp/SkeletonLoader/SkeletonLoader'
import {
  Flex,
  Text,
  Tabs,
  ActionIcon,
  List,
  Card,
  Group,
  Stack,
} from '@mantine/core'
import { IconEdit } from '@tabler/icons-react'

import './index.css'

type CaseNote = {
  dateTimeInfo?: {
    date?: string
    time?: string
    duration?: string
  }
  patient?: string
  chw?: string
  subjective?: string
  objective?: string
  assessment?: string
  plan?: {
    id: number
    title: string
    description: string
  }[]
}

type Goal = { id: number; title: string; description: string }
type Intervention = {
  id: number
  task: string
  assignedTo: string
  startDate: string
  targetEndDate: string
  status: string
}
type Issue = {
  id: number
  title: string
  status: string
  priority?: string
  smartGoal?: string
  identifiedBarriers?: string
  barriers?: string
  startDate?: string
  targetEndDate?: string
  interventions?: Intervention[]
}

type ClientCarePlan = {
  goals?: Goal[]
  issues?: Issue[]
}

const BhCallSummaryTranscript = ({
  caseNote = {} as CaseNote,
  clientCarePlan = {} as ClientCarePlan,
  transcriptData = [],
  editContent = false,
}) => {
  const [timelineTab, setTimelineTab] = useState('caseNote')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(t)
  }, [])

  const panelHeight = editContent
    ? 'calc(100vh - var(--memberProfileHeight) - 136px)'
    : 'calc(100vh - var(--memberProfileHeight) - 116px)'

  return (
    <>
      <Tabs
        defaultValue="caseNote"
        value={timelineTab}
        onChange={setTimelineTab}
        variant="pills"
        mb="lg"
        pt={0}
        pl={4}
        className="timeline-tabs"
      >
        <Tabs.List
          className="timeline-tabs-list"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Flex gap={5}>
            <Tabs.Tab
              value="caseNote"
              className={
                timelineTab === 'caseNote'
                  ? 'timeline-tab-active'
                  : 'timeline-tab-inactive'
              }
            >
              CHW Case Note
            </Tabs.Tab>

            <Tabs.Tab
              value="clientCarePlan"
              className={
                timelineTab === 'clientCarePlan'
                  ? 'timeline-tab-active'
                  : 'timeline-tab-inactive'
              }
            >
              Client Care Plan
            </Tabs.Tab>

            <Tabs.Tab
              value="transcript"
              className={
                timelineTab === 'transcript'
                  ? 'timeline-tab-active'
                  : 'timeline-tab-inactive'
              }
            >
              Transcript
            </Tabs.Tab>
          </Flex>

          {editContent && (
            <ActionIcon className="summary-transcript-edit-btn" size={32}>
              <IconEdit size={20} color="#495057" />
            </ActionIcon>
          )}
        </Tabs.List>

        {/* CASE NOTE */}
        <Tabs.Panel value="caseNote" className="timeline-panel">
          {loading ? (
            <SkeletonLoader height={350} width="100%" />
          ) : (
            <Flex
              direction="column"
              mt={20}
              className="timeline-panel-content"
              h={panelHeight}
              style={{ overflowY: 'scroll' }}
            >
              <Flex direction="column" className="case-note-wrap">
                {/* Header */}
                <Flex
                  className="case-note-header"
                  justify="space-between"
                  wrap="wrap"
                >
                  <Flex gap={50} className="case-note-meta">
                    <Flex direction="column">
                      <Text size="sm" c="gray.6">
                        Date
                      </Text>
                      <Text fw={500}>{caseNote?.dateTimeInfo?.date}</Text>
                    </Flex>

                    <Flex direction="column">
                      <Text size="sm" c="gray.6">
                        Time
                      </Text>
                      <Text fw={500}>{caseNote?.dateTimeInfo?.time}</Text>
                    </Flex>

                    <Flex direction="column">
                      <Text size="sm" c="gray.6">
                        Duration
                      </Text>
                      <Text fw={500}>{caseNote?.dateTimeInfo?.duration}</Text>
                    </Flex>
                  </Flex>
                </Flex>

                {/* Patient */}
                <Flex direction="column" mt="lg">
                  <Text size="sm" c="gray.6">
                    Patient
                  </Text>
                  <Text fw={500} size="md">
                    {caseNote?.patient}
                  </Text>
                </Flex>

                {/* CHW */}
                <Flex direction="column" mt="md">
                  <Text size="sm" c="gray.6">
                    Community Health Worker (CHW)
                  </Text>
                  <Text fw={500} size="md">
                    {caseNote?.chw}
                  </Text>
                </Flex>

                {/* Subjective */}
                <div className="case-note-section">
                  <Text fw={700} size="xl" mt="xl" mb={8}>
                    Subjective
                  </Text>
                  <Text size="sm" lh={1.7}>
                    {caseNote?.subjective}
                  </Text>
                </div>

                {/* Objective */}
                <div className="case-note-section">
                  <Text fw={700} size="xl" mt="xl" mb={8}>
                    Objective
                  </Text>
                  <Text size="sm" lh={1.7}>
                    {caseNote?.objective}
                  </Text>
                </div>

                {/* Assessment */}
                <div className="case-note-section">
                  <Text fw={700} size="xl" mt="xl" mb={8}>
                    Assessment
                  </Text>
                  <Text size="sm" lh={1.7}>
                    {caseNote?.assessment}
                  </Text>
                </div>

                {/* Plan (ordered list) */}
                <div className="case-note-section">
                  <Text fw={700} size="xl" mt="xl" mb={8}>
                    Plan
                  </Text>

                  <List type="ordered" size="sm">
                    {caseNote?.plan?.map((item) => (
                      <List.Item key={item.id}>
                        <Text fw={600}>{item.title}</Text>
                        <Text size="sm" lh={1.7}>
                          {item.description}
                        </Text>
                      </List.Item>
                    ))}
                  </List>
                </div>
              </Flex>
            </Flex>
          )}
        </Tabs.Panel>

        {/* CLIENT CARE PLAN */}
        <Tabs.Panel value="clientCarePlan" className="timeline-panel">
          {loading ? (
            <SkeletonLoader height={350} width="100%" />
          ) : (
            <Flex
              direction="column"
              mt={20}
              className="timeline-panel-content"
              h={panelHeight}
              style={{ overflowY: 'auto', gap: 16 }}
            >
              {/* Goals */}
              <div style={{ marginBottom: 6 }}>
                {Array.isArray(clientCarePlan?.goals) &&
                clientCarePlan?.goals?.length ? (
                  clientCarePlan.goals.map((g) => (
                    <>
                      <Text fw={600}>{g.title}</Text>
                      <Text size="sm" color="dimmed" mt={6}>
                        {g.description}
                      </Text>
                    </>
                  ))
                ) : (
                  <Text size="sm">No Goals</Text>
                )}
              </div>

              {/* Issues */}
              {Array.isArray(clientCarePlan?.issues) &&
              clientCarePlan.issues.length > 0 ? (
                clientCarePlan.issues.map((issue) => {
                  const rows = Array.isArray(issue.interventions)
                    ? issue.interventions.map((r) => (
                        <tr
                          key={r.id}
                          style={{ borderTop: '1px solid #f1f5f9' }}
                        >
                          <td
                            style={{
                              padding: '12px 8px',
                              verticalAlign: 'top',
                            }}
                          >
                            <Text fw={600}>{r.task}</Text>
                            <Text size="xs" color="dimmed" mt={6}>
                              {r.assignedTo}
                            </Text>
                          </td>
                          <td
                            style={{
                              padding: '12px 8px',
                              verticalAlign: 'top',
                            }}
                          >
                            <Text size="sm">{r.startDate}</Text>
                            <Text size="xs" color="dimmed">
                              — {r.targetEndDate}
                            </Text>
                          </td>
                          <td
                            style={{
                              padding: '12px 8px',
                              verticalAlign: 'top',
                            }}
                          >
                            <Group gap={8} align="center">
                              <span
                                style={{
                                  width: 10,
                                  height: 10,
                                  borderRadius: 10,
                                  display: 'inline-block',
                                  background:
                                    r.status === 'In Progress'
                                      ? '#F59E0B'
                                      : r.status === 'Not Started'
                                        ? '#9CA3AF'
                                        : '#6B7280',
                                }}
                              />
                              <Text size="sm" fw={600}>
                                {r.status}
                              </Text>
                            </Group>
                          </td>
                        </tr>
                      ))
                    : []

                  return (
                    <div
                      key={issue.id}
                      className="issue-wrapper"
                      style={{ marginBottom: 28 }}
                    >
                      <Flex
                        direction="row"
                        align="center"
                        justify={'space-between'}
                        style={{ marginBottom: 0 }}
                      >
                        <Text
                          className="issue-title"
                          fw={700}
                          size="lg"
                          style={{ marginLeft: 6 }}
                        >
                          {issue.title}
                        </Text>
                        <Group
                          align="center"
                          gap={8}
                          bg={'#FFF3BF'}
                          p={4}
                          px={12}
                          style={{ marginRight: 8, borderRadius: 20 }}
                        >
                          <Group gap={8} align="center">
                            <span
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: 10,
                                display: 'inline-block',
                                background:
                                  issue.status === 'In Progress'
                                    ? '#F59E0B'
                                    : issue.status === 'Not Started'
                                      ? '#9CA3AF'
                                      : '#6B7280',
                              }}
                            />
                            <Text fw={600}>{issue.status}</Text>
                          </Group>
                        </Group>
                      </Flex>

                      {/* Card with content */}
                      <Card
                        padding="lg"
                        radius="md"
                        className="issue-card"
                        style={{ marginTop: 8, position: 'relative' }}
                      >
                        <Group align="flex-start">
                          <Stack gap={6} style={{ flex: 1 }}>
                            <Text size="sm" color="dimmed">
                              SMART Goal:
                            </Text>
                            <Text size="sm">{issue.smartGoal}</Text>

                            <Text size="sm" color="dimmed" mt={8}>
                              Identified Barriers:
                            </Text>
                            <Text size="sm">
                              {issue.identifiedBarriers ||
                                issue.barriers ||
                                '—'}
                            </Text>

                            <Flex gap={16} mt={12} wrap="wrap">
                              <div>
                                <Text size="xs" color="dimmed">
                                  Priority (Client-Determined)
                                </Text>
                                <Text fw={600} mt={6}>
                                  {issue.priority}
                                </Text>
                              </div>

                              <div>
                                <Text size="xs" color="dimmed">
                                  Start Date - Target End Date
                                </Text>
                                <Text fw={600} mt={6}>
                                  {issue.startDate} - {issue.targetEndDate}
                                </Text>
                              </div>
                            </Flex>
                          </Stack>
                        </Group>

                        <div style={{ marginTop: 18 }}>
                          <div style={{ overflowX: 'auto' }}>
                            <table
                              style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                              }}
                            >
                              <thead style={{ background: '#F3FBF8' }}>
                                <tr>
                                  <th
                                    style={{
                                      fontSize: '14px',
                                      textAlign: 'left',
                                      padding: '12px 8px',
                                    }}
                                  >
                                    Intervention and Assigned To
                                  </th>
                                  <th
                                    style={{
                                      fontSize: '14px',
                                      textAlign: 'left',
                                      padding: '12px 8px',
                                    }}
                                  >
                                    Start Date - Target End Date
                                  </th>
                                  <th
                                    style={{
                                      fontSize: '14px',
                                      textAlign: 'left',
                                      padding: '12px 8px',
                                    }}
                                  >
                                    Status
                                  </th>
                                </tr>
                              </thead>
                              <tbody>{rows}</tbody>
                            </table>
                          </div>
                        </div>
                      </Card>
                    </div>
                  )
                })
              ) : (
                <Text size="sm">No Issues</Text>
              )}
            </Flex>
          )}
        </Tabs.Panel>

        {/* TRANSCRIPT */}
        <Tabs.Panel value="transcript" className="timeline-panel">
          {loading ? (
            <SkeletonLoader height={350} width="100%" />
          ) : (
            <Flex
              direction="column"
              className="timeline-panel-content"
              h={
                editContent
                  ? 'calc(100vh - var(--memberProfileHeight) - 138px)'
                  : 'calc(100vh - var(--memberProfileHeight) - 118px)'
              }
              style={{ overflowY: 'scroll' }}
            >
              {transcriptData.length ? (
                transcriptData.map((item) => (
                  <Flex gap={20} key={item.id} style={{ marginBottom: '1rem' }}>
                    <Text size="xs" mt={2}>
                      {item.time}
                    </Text>
                    <div>
                      <Text size="sm" fw={700}>
                        {item.person}
                      </Text>
                      <Text size="sm">{item.conversation}</Text>
                    </div>
                  </Flex>
                ))
              ) : (
                <Text size="sm">No Data</Text>
              )}
            </Flex>
          )}
        </Tabs.Panel>
      </Tabs>
    </>
  )
}

export default BhCallSummaryTranscript
