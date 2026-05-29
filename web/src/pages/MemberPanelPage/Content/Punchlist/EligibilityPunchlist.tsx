import { useCallback, useEffect } from 'react'

import {
  Box,
  Flex,
  Title,
  Card,
  Text,
  Radio,
  Checkbox,
  Textarea,
  Table,
} from '@mantine/core'
import { useForm } from '@mantine/form'

import BhButton from 'src/components/LowLevelComponents/BhButton/BhButton'
import usePunchlistStore from 'src/store/punchlistStore'

export const EligibilityPunchlist = ({
  eligibilityOptions,
  eligibilityReasonOptions,
}) => {
  const handleDoneClick = usePunchlistStore((state) => state.handleDoneClick)
  const { eligibilityFormValues, setEligibilityFormData } = usePunchlistStore()
  const eligibilityForm = useForm({
    initialValues: eligibilityFormValues,
    validate: {
      eligible: (value) => (value ? null : 'Please select an option'),
      eligibilityReasons: (value, values) => {
        if (values.eligible === 'yes') {
          const hasAtLeastOne = Object.values(value).some(
            (checked) => checked === true
          )
          return hasAtLeastOne
            ? null
            : 'Please select at least one eligibility reason'
        }
        return null
      },
    },
  })

  const setFormInProgress = usePunchlistStore(
    (state) => state.setFormInProgress
  )

  const isAnyFieldTouched = eligibilityForm.isTouched()
  const isEligible = eligibilityForm.values.eligible === 'yes'

  const handleRadioChange = useCallback(
    (value: string, field: string) => {
      eligibilityForm.setFieldValue(field, value)
      if (field === 'eligible' && value === 'no') {
        eligibilityForm.setFieldValue('eligibilityReasons', {})
        eligibilityForm.setFieldValue('notes', '')
      }
    },
    [eligibilityForm]
  )

  /** Handles checkbox change for eligibility reasons */
  const handleCheckboxChange = useCallback(
    (field: string, checked: boolean) => {
      eligibilityForm.setFieldValue(`eligibilityReasons.${field}`, checked)
    },
    [eligibilityForm]
  )

  useEffect(() => {
    if (isAnyFieldTouched) {
      setFormInProgress('eligibility')
      setEligibilityFormData(eligibilityForm.values)
    }
  }, [
    isAnyFieldTouched,
    setFormInProgress,
    setEligibilityFormData,
    eligibilityForm.values,
  ])

  return (
    <Box
      p="lg"
      style={{
        maxHeight: 'calc(100vh - 120px)',
        overflowY: 'auto',
      }}
    >
      <Flex justify="space-between">
        <Title order={5} fw={600}>
          Eligibility
        </Title>
        <BhButton
          variant={'filled'}
          onClick={() => {
            handleDoneClick('eligibility')
          }}
          disabled={!eligibilityForm.isValid()}
        >
          Done
        </BhButton>
      </Flex>
      <Flex direction="column" gap="md" mt="md">
        {/* CHW Program Card */}
        <Card shadow="sm" radius="md" padding="24px">
          <Table className="bh-table-wrap">
            <Table.Thead className="highlight-thead">
              <Table.Tr>
                <Table.Th>CHW Program</Table.Th>
                <Table.Th ta="center" style={{ width: 80 }}>
                  Yes
                </Table.Th>
                <Table.Th ta="center" style={{ width: 80 }}>
                  No
                </Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {eligibilityOptions.map((item) => (
                <Table.Tr key={item.key}>
                  <Table.Td>{item.label}</Table.Td>
                  <Table.Td>
                    <Flex justify="center">
                      <Radio
                        checked={eligibilityForm.values[item.key] === 'yes'}
                        onChange={() => handleRadioChange('yes', item.key)}
                      />
                    </Flex>
                  </Table.Td>
                  <Table.Td>
                    <Flex justify="center">
                      <Radio
                        color="var(--error-indicator-color)"
                        checked={eligibilityForm.values[item.key] === 'no'}
                        onChange={() => handleRadioChange('no', item.key)}
                      />
                    </Flex>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Card>

        {/* Empty Placeholder Card (shows when no selection or "No" is selected) */}
        {!isEligible && (
          <Card
            shadow="sm"
            radius="md"
            h={428}
            padding="24px"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className="eligibility-placeholder-content">
              <Text size="sm" c="dimmed" ta="center">
                Populates based on eligibility
              </Text>
            </div>
          </Card>
        )}

        {/* Eligibility Reason Card (shows only when "Yes" is selected) */}
        {isEligible && (
          <Card
            shadow="sm"
            radius="md"
            className="eligibility-reason-card"
            padding="24px"
            style={{ display: 'flex', gap: '16px' }}
          >
            <Flex direction="column" gap="8px">
              <Title order={5} fw={600}>
                Eligibility Reason
              </Title>
              <Text size="sm">
                Diagnosis of a chronic health condition(s), including behavioral
                health, or a suspected and undiagnosed mental or substance use
                disorder
              </Text>
            </Flex>

            <div className="eligibility-reason-list">
              {eligibilityReasonOptions.map((option) => (
                <div
                  key={option.key}
                  className="eligibility-reason-item-container"
                >
                  <Checkbox
                    checked={
                      eligibilityForm.values.eligibilityReasons[option.key] ||
                      false
                    }
                    onChange={(event) =>
                      handleCheckboxChange(
                        option.key,
                        event.currentTarget.checked
                      )
                    }
                    label={option.label}
                    className="eligibility-reason-checkbox"
                    fw={500}
                    description={
                      option.subItems ? (
                        <Flex direction="column" component="span">
                          {option.subItems.map((subItem, index) => (
                            <Text
                              component="span"
                              key={index}
                              size="sm"
                              c="var(--mantine-color-black)"
                            >
                              • {subItem}
                            </Text>
                          ))}
                        </Flex>
                      ) : null
                    }
                  />
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Eligibility Notes Card (shows only when "Yes" is selected) */}
        {isEligible && (
          <Card shadow="sm" radius="md" className="eligibility-notes-card">
            <Title order={6} fw={600} mb="md">
              Eligibility Notes
            </Title>
            <Textarea
              placeholder="Write here..."
              {...eligibilityForm.getInputProps('notes')}
              minRows={4}
              className="eligibility-notes-textarea"
            />
          </Card>
        )}
      </Flex>
    </Box>
  )
}
