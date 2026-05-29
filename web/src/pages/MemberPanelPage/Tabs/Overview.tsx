import React, { useEffect } from 'react'

import {
  Title,
  Card,
  Text,
  Divider,
  Grid,
  Box,
  TextInput,
  Textarea,
} from '@mantine/core'
import '../index.css'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { IconCalendarEvent } from '@tabler/icons-react'

import { Link } from '@redwoodjs/router'

import '../index.css'
import { useMemberFormRegistration } from 'src/hooks/MemberFormRegistration'
import { useMemberFormStore } from 'src/store/MemberFormStore'

interface OverviewProps {
  overview?: {
    careManagement: {
      title: string
      overviewData: Array<{ key: string; value: string }>
    }
    operationalMetrics: {
      title: string
      overviewData: Array<{ key: string; value: string }>
    }
    overview: {
      title: string
      overviewData: Array<{ key: string; value: string }>
    }
  }
}

const DATE_KEYS = [
  'Date of Last Contact',
  'Last Attempt',
  'HCBS Completion Date',
]

const formatDateValue = (key: string, value: string) => {
  if (!value) return ''

  if (DATE_KEYS.includes(key)) {
    const date = new Date(value)
    if (!isNaN(date.getTime())) {
      return new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }).format(date)
    }
  }

  // fallback for normal text
  return value
}

const Overview = ({ overview }: OverviewProps) => {
  const isEditing = useMemberFormStore((state) => state.isEditing)
  const showForm = !overview || isEditing

  // Create empty form structure when overview is not available
  const getEmptyFormValues = () => ({
    careManagement: [
      { key: 'Last Attempt', value: null },
      { key: 'Date of Last Contact', value: null },
      { key: 'Open Care Gaps', value: '' },
      { key: 'Service Delivery', value: '' },
    ],
    operationalMetrics: [
      { key: 'Insurer', value: '' },
      { key: 'HCBS Completion Date', value: null },
      { key: 'Preferred days of contact', value: '' },
      { key: 'Preferred time for contact', value: '' },
    ],
    overview: [
      { key: 'Diagnosis', value: '' },
      { key: 'Program Eligibility', value: '' },
    ],
  })

  const getInitialFormValues = () => {
    if (!overview) return getEmptyFormValues()

    return {
      careManagement:
        overview.careManagement?.overviewData?.map((item) => ({
          key: item.key,
          value:
            item.key === 'Date of Last Contact' || item.key === 'Last Attempt'
              ? item.value
                ? new Date(item.value)
                : null
              : item.value,
        })) || [],
      operationalMetrics:
        overview.operationalMetrics?.overviewData?.map((item) => ({
          key: item.key,
          value:
            item.key === 'HCBS Completion Date'
              ? item.value
                ? new Date(item.value)
                : null
              : item.value,
        })) || [],
      overview:
        overview.overview?.overviewData?.map((item) => ({
          key: item.key,
          value: item.value,
        })) || [],
    }
  }

  const form = useForm({
    initialValues: getInitialFormValues(),
  })

  // Register this form with the store
  useMemberFormRegistration('overview', form)

  // Reset form when overview changes or editing starts
  useEffect(() => {
    if (showForm) {
      form.setValues(getInitialFormValues())
      form.resetDirty()
    }
  }, [overview, showForm])

  return (
    <>
      <Title order={4} fw={600} mt={16} mb={8}>
        {overview?.overview?.title || 'Overview'}
      </Title>
      <Card
        p={12}
        className="member-overview-diagnosis bh-gap-2"
        bg="#E7F8F3"
        radius={10}
        shadow="none"
      >
        {!showForm &&
          overview?.overview?.overviewData?.map((item, index) => (
            <Box className="overview-summary-card" key={`overview-${index}`}>
              <Text className="care-hub-key" size="sm" mb={4}>
                {item.key}
              </Text>
              <Text className="care-hub-val" size="sm" fw={700}>
                {formatDateValue(item.key, item.value)}
              </Text>
            </Box>
          ))}
        {showForm &&
          form.values.overview.map((item, index) =>
            item.key !== 'Diagnosis' ? (
              <TextInput
                className="overview-form-control"
                key={`${index}-${item.key}`}
                size="xs"
                label={item.key}
                {...form.getInputProps(`overview.${index}.value`)}
              />
            ) : (
              <Textarea
                className="overview-form-control"
                key={`${index}-${item.key}`}
                size="xs"
                label={item.key}
                {...form.getInputProps(`overview.${index}.value`)}
              />
            )
          )}
      </Card>
      <Title order={4} fw={600} mt={20} mb={12}>
        {overview?.careManagement?.title || 'Care Management'}
      </Title>
      <Grid gutter={{ base: 16 }}>
        {!showForm &&
          overview?.careManagement?.overviewData?.map((item, index) => (
            <Grid.Col span={6} className="care-mgt-section" key={index}>
              <Text className="care-hub-key" size="sm">
                {item.key}
              </Text>
              <Text className="care-hub-val" size="sm">
                {formatDateValue(item.key, item.value)}
                {formatDateValue(item.key, item.value)}
              </Text>
            </Grid.Col>
          ))}
      </Grid>
      {showForm && (
        <Grid gutter={{ base: 16 }}>
          {form.values.careManagement.map((item, index) => (
            <Grid.Col span={6} key={`${index}-${item.key}`}>
              {item.key === 'Date of Last Contact' ||
              item.key === 'Last Attempt' ? (
                <Box pos="relative">
                  <DateInput
                    className="overview-form-control"
                    {...form.getInputProps(`careManagement.${index}.value`)}
                    label={item.key}
                    placeholder="MM/DD/YYYY"
                    valueFormat="MM/DD/YYYY"
                    popoverProps={{
                      withinPortal: false,
                      position: 'top-start',
                      middlewares: { flip: true, shift: false },
                      styles: {
                        dropdown: {
                          transform: 'translate(-260px, 0)',
                          marginTop: 2,
                        },
                      },
                    }}
                    rightSection={<IconCalendarEvent size={12} />}
                    size="xs"
                  />
                </Box>
              ) : (
                <TextInput
                  className="overview-form-control"
                  size="xs"
                  label={item.key}
                  {...form.getInputProps(`careManagement.${index}.value`)}
                  placeholder={`Enter ${item.key}`}
                />
              )}
            </Grid.Col>
          ))}
        </Grid>
      )}
      {!showForm && (
        <Link to={''}>
          <Text
            td="underline"
            size="xs"
            c="var(--primary-color )"
            mt={12}
            fw={600}
          >
            View All
          </Text>
        </Link>
      )}
      <Divider my={16} variant="dashed" />
      <Box mb={32}>
        <Title order={4} fw={600} mt={16} mb={12}>
          {overview?.operationalMetrics?.title || 'Operational Metrics'}
        </Title>
        <Grid gutter={{ base: 16 }}>
          {!showForm &&
            overview?.operationalMetrics?.overviewData?.map((metric, index) => (
              <Grid.Col span={6} className="care-mgt-section" key={index}>
                <Text className="care-hub-key" size="sm">
                  {metric.key}
                </Text>
                <Text className="care-hub-val" size="sm">
                  {formatDateValue(metric.key, metric.value)}
                  {formatDateValue(metric.key, metric.value)}
                </Text>
              </Grid.Col>
            ))}
        </Grid>
        {showForm && (
          <Grid gutter={{ base: 16 }}>
            {form.values.operationalMetrics.map((item, index) => (
              <Grid.Col span={6} key={`${index}-${item.key}`}>
                {item.key === 'HCBS Completion Date' ? (
                  <Box pos="relative">
                    <DateInput
                      className="overview-form-control"
                      {...form.getInputProps(
                        `operationalMetrics.${index}.value`
                      )}
                      label={item.key}
                      placeholder="MM/DD/YYYY"
                      popoverProps={{
                        withinPortal: false,
                        position: 'top-start',
                        middlewares: { flip: false, shift: false },
                        styles: {
                          dropdown: {
                            transform: 'translate(-260px, -290px)',
                            marginTop: 2,
                          },
                        },
                      }}
                      valueFormat="MM/DD/YYYY"
                      rightSection={<IconCalendarEvent size={12} />}
                      size="xs"
                    />
                  </Box>
                ) : (
                  <TextInput
                    className="overview-form-control"
                    size="xs"
                    label={item.key}
                    {...form.getInputProps(`operationalMetrics.${index}.value`)}
                    placeholder={`Enter ${item.key}`}
                  />
                )}
              </Grid.Col>
            ))}
          </Grid>
        )}
        {!showForm && (
          <Link to={''}>
            <Text
              td="underline"
              size="xs"
              c="var(--primary-color )"
              mt={12}
              fw={600}
            >
              View All
            </Text>
          </Link>
        )}
      </Box>
    </>
  )
}

export default Overview
