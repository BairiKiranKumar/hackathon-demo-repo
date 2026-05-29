import React, { useCallback, useEffect, useMemo } from 'react'

import {
  Box,
  Flex,
  Title,
  Text,
  Radio,
  Table,
  Checkbox,
  Divider,
  Accordion,
  Input,
} from '@mantine/core'
import { useForm } from '@mantine/form'

import BhButton from 'src/components/LowLevelComponents/BhButton/BhButton'
import DashedContainer from 'src/components/LowLevelComponents/DashedContainer/DashedContainer'
import usePunchlistStore from 'src/store/punchlistStore'

export const PathwayAssessmentTools = ({ pathwayAssessmentToolsData }) => {
  const pathwayAssessmentToolsFormValues = usePunchlistStore(
    (state) => state.pathwayAssessmentToolsFormValues
  )
  const handleDoneClick = usePunchlistStore((state) => state.handleDoneClick)
  const setFormInProgress = usePunchlistStore(
    (state) => state.setFormInProgress
  )
  const setPathwayAssessmentToolsFormData = usePunchlistStore(
    (state) => state.setPathwayAssessmentToolsFormData
  )

  const initialValues = useMemo(() => {
    const values: Record<
      string,
      {
        radioAnswers: Record<number, string>
        multiAnswers: Record<number, Record<number, boolean>>
        textAnswers: Record<number, string>
        otherText: Record<number, string>
      }
    > = {}

    pathwayAssessmentToolsData.assessmentTools.forEach((tool) => {
      if (!tool.questionsGroup) return

      // Use stored values if available, otherwise initialize empty
      values[tool.id] = pathwayAssessmentToolsFormValues[tool.id] || {
        radioAnswers: {},
        multiAnswers: {},
        otherText: {},
        textAnswers: {},
      }

      // Initialize multiAnswers structure if not present
      tool.questionsGroup.multipleChoiceQuestions?.forEach((mcq) => {
        if (!values[tool.id].multiAnswers[mcq.questionId]) {
          values[tool.id].multiAnswers[mcq.questionId] = {}
        }
        if (!values[tool.id].otherText[mcq.questionId]) {
          values[tool.id].otherText[mcq.questionId] = ''
        }
      })
    })

    return values
  }, [pathwayAssessmentToolsFormValues])

  const form = useForm({
    initialValues,
    validate: {
      ...pathwayAssessmentToolsData.assessmentTools.reduce(
        (acc, tool) => {
          if (!tool.questionsGroup) return acc

          // Validate radio answers
          tool.questionsGroup.radioSelectionQuestion?.questions.forEach(
            (question) => {
              acc[`${tool.id}.radioAnswers.${question.id}`] = (
                value: string
              ) => (!value ? 'Required' : null)
            }
          )

          // Validate "Other" text inputs
          tool.questionsGroup.multipleChoiceQuestions?.forEach((mcq) => {
            const otherOption = mcq.options.find(
              (opt) => opt.label.toLowerCase() === 'other'
            )

            if (otherOption) {
              acc[`${tool.id}.otherText.${mcq.questionId}`] = (
                value: string,
                values: typeof initialValues
              ) => {
                const isOtherChecked =
                  values[tool.id]?.multiAnswers[mcq.questionId]?.[
                    otherOption.id
                  ]
                return isOtherChecked && (!value || value.trim() === '')
                  ? 'Required'
                  : null
              }
            }
          })

          return acc
        },
        {} as Record<string, (value, values?) => string | null>
      ),
    },
  })
  const isAnyFieldTouched = form.isTouched()

  // Save to store when form changes
  useEffect(() => {
    if (isAnyFieldTouched) {
      setFormInProgress('pathwayAssessmentTools')
      setPathwayAssessmentToolsFormData(form.values)
    }
  }, [
    form.values,
    isAnyFieldTouched,
    setFormInProgress,
    setPathwayAssessmentToolsFormData,
  ])

  const handleSubmit = useCallback(() => {
    handleDoneClick('pathwayAssessmentTools')
  }, [handleDoneClick])

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex
          p="lg"
          direction="column"
          gap={12}
          style={{
            height: 'calc(100vh - var(--memberProfileHeight))',
            overflowY: 'auto',
          }}
        >
          <Flex justify="space-between" align="center">
            <Title order={4} fw={600}>
              Pathway Assessment Tools
            </Title>
            <BhButton
              variant={'filled'}
              // disabled={!form.isValid()}
              onClick={() => handleDoneClick('pathwayAssessmentTools')}
            >
              Done
            </BhButton>
          </Flex>
          <Accordion
            variant="filled"
            multiple={false}
            chevronPosition="right"
            display="flex"
            style={{ flexDirection: 'column', gap: '12px' }}
          >
            {pathwayAssessmentToolsData.assessmentTools.map((tool) => {
              if (!tool.questionsGroup) return null

              return (
                <Accordion.Item
                  bg="var(--mantine-color-white)"
                  key={`tool-${tool.id}`}
                  title={tool.name}
                  value={tool.name}
                  style={{ borderRadius: 10 }}
                >
                  <Accordion.Control>
                    <Box>
                      <Text fw={600} c="var(--mantine-color-black)">
                        {tool.name}
                      </Text>
                      <Text size="sm" c="var(--text-grey)">
                        {tool.description}
                      </Text>
                    </Box>
                  </Accordion.Control>

                  <Accordion.Panel>
                    <Box>
                      <Divider mb={20} mt={3} />

                      {/* If Housing, render MCQ first */}
                      {tool.name === 'Housing' &&
                        tool.questionsGroup.multipleChoiceQuestions?.map(
                          (mcq) => (
                            <Box my="lg" key={`mcq-${mcq.questionId}`}>
                              <Text mb="md" fw={500}>
                                {mcq.question}
                              </Text>
                              <Flex gap="xs" direction="column">
                                {mcq.options.map((option) => (
                                  <Box key={`${mcq.questionId}-${option.id}`}>
                                    <Checkbox
                                      label={option.label}
                                      checked={
                                        form.values[tool.id].multiAnswers[
                                          mcq.questionId
                                        ]?.[option.id] || false
                                      }
                                      onChange={(e) =>
                                        form.setFieldValue(
                                          `${tool.id}.multiAnswers.${mcq.questionId}.${option.id}`,
                                          e.currentTarget.checked
                                        )
                                      }
                                    />

                                    {/* Show input only if this question's "Other" is checked */}
                                    {option.label.toLowerCase() === 'other' &&
                                      form.values[tool.id].multiAnswers[
                                        mcq.questionId
                                      ]?.[option.id] && (
                                        <Input
                                          size="xs"
                                          mt="xs"
                                          placeholder="Write here"
                                          value={
                                            form.values[tool.id].otherText[
                                              mcq.questionId
                                            ] || ''
                                          }
                                          onChange={(e) =>
                                            form.setFieldValue(
                                              `${tool.id}.otherText.${mcq.questionId}`,
                                              e.currentTarget.value
                                            )
                                          }
                                        />
                                      )}
                                  </Box>
                                ))}
                              </Flex>
                            </Box>
                          )
                        )}

                      {/* Radio Selection Questions */}
                      <Table className="bh-table-wrap">
                        <Table.Thead className="highlight-thead">
                          <Table.Tr>
                            <Table.Th lh="sm">Questions</Table.Th>
                            {tool.questionsGroup.radioSelectionQuestion.options.map(
                              (option, index) => (
                                <Table.Th
                                  key={`${option}-${index}`}
                                  ta="center"
                                  miw={80}
                                >
                                  {option}
                                </Table.Th>
                              )
                            )}
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {tool.questionsGroup.radioSelectionQuestion?.questions.map(
                            (question) => (
                              <Table.Tr key={`radio-${question.id}`}>
                                <Table.Td c="var(--text-color)">
                                  {question.question}
                                </Table.Td>
                                {tool.questionsGroup.radioSelectionQuestion.options.map(
                                  (option) => (
                                    <Table.Td key={`${option}-cell`}>
                                      <Flex justify="center">
                                        <Radio
                                          name={`tool-${tool.id}-q-${question.id}`}
                                          value={option}
                                          checked={
                                            form.values[tool.id].radioAnswers[
                                              question.id
                                            ] === option
                                          }
                                          onChange={() =>
                                            form.setFieldValue(
                                              `${tool.id}.radioAnswers.${question.id}`,
                                              option
                                            )
                                          }
                                          // disabled={
                                          //   option === 'Prefer not to say' &&
                                          //   question.allowPreferNotToSay ===
                                          //     false
                                          // }
                                        />
                                      </Flex>
                                    </Table.Td>
                                  )
                                )}
                              </Table.Tr>
                            )
                          )}
                        </Table.Tbody>
                      </Table>

                      <Divider my="sm" />

                      {/* If NOT Housing, render MCQ after radio */}
                      {tool.name !== 'Housing' &&
                        tool.questionsGroup.multipleChoiceQuestions?.map(
                          (mcq) => (
                            <Box mt="lg" key={`mcq-${mcq.questionId}`}>
                              <Text mb="md" fw={500}>
                                {mcq.question}
                              </Text>
                              <Flex gap="xs" direction="column">
                                {mcq.options.map((option) => (
                                  <Box key={`${mcq.questionId}-${option.id}`}>
                                    <Checkbox
                                      label={option.label}
                                      checked={
                                        form.values[tool.id].multiAnswers[
                                          mcq.questionId
                                        ]?.[option.id] || false
                                      }
                                      onChange={(e) =>
                                        form.setFieldValue(
                                          `${tool.id}.multiAnswers.${mcq.questionId}.${option.id}`,
                                          e.currentTarget.checked
                                        )
                                      }
                                    />

                                    {/* Show input only if this question's "Other" is checked */}
                                    {option.label.toLowerCase() === 'other' &&
                                      form.values[tool.id].multiAnswers[
                                        mcq.questionId
                                      ]?.[option.id] && (
                                        <Input
                                          size="xs"
                                          mt="xs"
                                          placeholder="Write here"
                                          value={
                                            form.values[tool.id].otherText[
                                              mcq.questionId
                                            ] || ''
                                          }
                                          onChange={(e) =>
                                            form.setFieldValue(
                                              `${tool.id}.otherText.${mcq.questionId}`,
                                              e.currentTarget.value
                                            )
                                          }
                                        />
                                      )}
                                  </Box>
                                ))}
                              </Flex>
                            </Box>
                          )
                        )}

                      {tool.script && (
                        <Box mt="lg">
                          <DashedContainer
                            label="Script"
                            content={tool.script}
                          />
                        </Box>
                      )}
                    </Box>
                  </Accordion.Panel>
                </Accordion.Item>
              )
            })}
          </Accordion>
        </Flex>
      </form>
    </>
  )
}
