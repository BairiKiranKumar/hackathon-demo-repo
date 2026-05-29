import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import BhButton from '@lowLevelComp/BhButton/BhButton'
import {
  Box,
  Flex,
  Title,
  Text,
  Card,
  Pill,
  Spoiler,
  Table,
  Radio,
} from '@mantine/core'
import { useForm } from '@mantine/form'

import usePunchlistStore from 'src/store/punchlistStore'

type QuestionnaireAnswers = Record<string, number | string>

const PHQ2Content = ({ activePunchList }) => {
  // Initialize state with the pre-selected answers

  const handleDoneParam =
    activePunchList.name === 'PHQ9 Assessment'
      ? 'phq9Assessment'
      : 'phq2Assessment'

  const isPHQ9 = useMemo(
    () => activePunchList.name === 'PHQ9 Assessment',
    [activePunchList.name]
  )
  // Get store values and setters
  const phq2FormValues = usePunchlistStore(
    (state) => state.phq2AssessmentFormValues
  )
  const phq9FormValues = usePunchlistStore(
    (state) => state.phq9AssessmentFormValues
  )
  const setPHQ2FormData = usePunchlistStore(
    (state) => state.setPHQ2AssessmentFormData
  )
  const setPHQ9FormData = usePunchlistStore(
    (state) => state.setPHQ9AssessmentFormData
  )

  const setFormInProgress = usePunchlistStore(
    (state) => state.setFormInProgress
  )
  const handleDoneClick = usePunchlistStore((state) => state.handleDoneClick)

  const currentFormValues = isPHQ9 ? phq9FormValues : phq2FormValues
  const setFormData = isPHQ9 ? setPHQ9FormData : setPHQ2FormData

  // Use ref to track if form has been touched (prevents infinite loops)
  const hasBeenTouchedRef = useRef(false)

  const initialValues = useMemo(
    () =>
      activePunchList.questionnaire.reduce((acc, row) => {
        acc[row.id] = currentFormValues.answers[row.id] ?? row.answer ?? ''
        return acc
      }, {} as QuestionnaireAnswers),
    [activePunchList.questionnaire, currentFormValues.answers]
  )

  const form = useForm<QuestionnaireAnswers>({
    initialValues,
  })

  const [total, setTotal] = useState(currentFormValues.totalScore || 0)
  const [isDoneButtonEnabled, setIsDoneButtonEnabled] = useState(false)

  // Memoize the calculation of total and answered count
  const { calculatedTotal, allAnswered } = useMemo(() => {
    const values = form.values
    const answered = Object.values(values).filter((v) => v !== '').length
    const isAllAnswered = answered === activePunchList.questionnaire.length

    const newTotal = Object.values(values).reduce<number>(
      (sum, val) => sum + Number(val || 0),
      0
    )

    return { calculatedTotal: newTotal, allAnswered: isAllAnswered }
  }, [form.values, activePunchList.questionnaire.length])

  // Update total and button state
  useEffect(() => {
    setTotal(calculatedTotal)
    setIsDoneButtonEnabled(allAnswered)
  }, [calculatedTotal, allAnswered])

  // Save to store only when form is touched - with stable dependencies
  useEffect(() => {
    if (hasBeenTouchedRef.current) {
      setFormData({
        answers: form.values,
        totalScore: calculatedTotal,
      })
    }
  }, [form.values, calculatedTotal, setFormData])

  // Track when form is touched and set in progress
  useEffect(() => {
    if (!hasBeenTouchedRef.current && form.isTouched()) {
      hasBeenTouchedRef.current = true
      setFormInProgress(handleDoneParam)
    }
  }, [form.values]) // Only depend on form.values to detect changes

  // Reinitialize when punch list changes
  useEffect(() => {
    const newInitialValues = activePunchList.questionnaire.reduce(
      (acc, row) => {
        acc[row.id] = currentFormValues.answers[row.id] ?? row.answer ?? ''
        return acc
      },
      {} as QuestionnaireAnswers
    )

    form.setValues(newInitialValues)
    setTotal(currentFormValues.totalScore || 0)
    // Reset touched state when switching forms
    hasBeenTouchedRef.current = false
  }, [activePunchList.id]) // Only depend on ID for stability

  // Memoize the handleDone callback
  const onDoneClick = useCallback(() => {
    handleDoneClick(handleDoneParam)
  }, [handleDoneClick, handleDoneParam])

  return (
    <Box p="lg">
      <Flex align={'center'}>
        <Title order={5} fw={600}>
          {activePunchList.name}
        </Title>
        <Pill
          size="sm"
          tt="capitalize"
          bg={'var(--' + activePunchList.priority.toLowerCase() + '-impact-bg)'}
          c={
            'var(--' + activePunchList.priority.toLowerCase() + '-impact-color)'
          }
          fw={500}
          mr="auto"
          ml={4}
        >
          {activePunchList.priority}
        </Pill>
        <BhButton
          variant={'filled'}
          onClick={onDoneClick}
          disabled={!isDoneButtonEnabled}
        >
          Done
        </BhButton>
      </Flex>
      <Card
        className="conversation-starters-list-wrap overflow-y-auto"
        radius={10}
        mt={12}
        p={24}
        shadow="0px 4px 10px -5px rgba(0, 0, 0, 0.05)"
        mah="calc(100vh - var(--memberProfileHeight) - 68px"
      >
        <Spoiler
          maxHeight={60}
          showLabel="show more"
          hideLabel="show less"
          className="show-more-content"
        >
          <Text size="sm">
            The PHQ-2 assesses the frequency of depressed mood and anhedonia
            (loss of interest or pleasure) over the past two weeks. It consists
            of the first two items from the PHQ-9 questionnaire.
          </Text>
          <Flex direction={'column'} gap={12} mt={'16px'}>
            <Flex align={'top'} gap={8}>
              <div className="number-circle">1</div>
              <div>
                <strong className="step-heading">Purpose:</strong>
                The PHQ-2 serves as an initial screening tool for depression.
              </div>
            </Flex>
            <Flex align={'top'} gap={8}>
              <div className="number-circle">2</div>
              <div>
                <strong className="step-heading">Next Steps:</strong>
                Patients who screen positive on the PHQ-2 should undergo further
                evaluation using the complete PHQ-9 to determine if they meet
                criteria for a depressive disorder.
              </div>
            </Flex>
          </Flex>
        </Spoiler>
        <Text fw={600} mt={16}>
          Over the last 2 weeks, how often have you been bothered by the
          following problems?
        </Text>
        <form onSubmit={form.onSubmit(() => handleDoneClick(handleDoneParam))}>
          <Table className="bh-table-wrap" mt={8}>
            <Table.Thead className="highlight-thead">
              <Table.Tr>
                <Table.Th>Problems</Table.Th>
                {[0, 1, 2, 3].map((val) => (
                  <Table.Th
                    key={val}
                    style={{ textAlign: 'center', width: 43 }}
                  >
                    +{val}
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {activePunchList.questionnaire?.map((row, index) => (
                <Table.Tr key={index}>
                  <Table.Td valign="middle">
                    <Text mb={3} size="sm">
                      {row.problem}
                    </Text>
                  </Table.Td>
                  {[0, 1, 2, 3].map((value) => (
                    <Table.Td key={value} valign="middle" width={43}>
                      <Flex align="center" justify="center">
                        <Radio
                          {...form.getInputProps(row.id)}
                          value={value}
                          checked={form.values[row.id] === value}
                          onChange={() => form.setFieldValue(row.id, value)}
                        />
                      </Flex>
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          <Flex align="center" gap={10} mt={4}>
            <Text size="md" fw={600}>
              Total Score
            </Text>
            <Box className="phq-score-total">{total}</Box>
          </Flex>
        </form>
      </Card>
    </Box>
  )
}

export default PHQ2Content
