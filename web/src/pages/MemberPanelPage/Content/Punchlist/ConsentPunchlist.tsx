import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  Anchor,
  Box,
  Card,
  Flex,
  Grid,
  Radio,
  TextInput,
  Title,
  Text,
  Modal,
  ActionIcon,
  Table,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { IconEye } from '@tabler/icons-react'

import { useLocation } from '@redwoodjs/router'

import BhButton from 'src/components/LowLevelComponents/BhButton/BhButton'
import DashedContainer from 'src/components/LowLevelComponents/DashedContainer/DashedContainer'
import usePunchlistStore from 'src/store/punchlistStore'

export const ConsentPunchlist = ({
  consentOptions,
  informationOptions,
  consentScriptData,
  consentTermsData,
}) => {
  const location = useLocation()
  const dateInputKey = useMemo(
    () => `consent-${location.pathname}`,
    [location.pathname]
  )

  const setConsentFormData = usePunchlistStore(
    (state) => state.setConsentFormData
  )

  const setFormInProgress = usePunchlistStore(
    (state) => state.setFormInProgress
  )

  const consentFormValues = usePunchlistStore(
    (state) => state.consentFormValues
  )

  const handleDoneClick = usePunchlistStore((state) => state.handleDoneClick)
  const consentForm = useForm({
    initialValues: consentFormValues,
    validate: {
      memberName: (value) => (!value ? 'Member name is required' : null),
      consentDate: (value) => (!value ? 'Consent date is required' : null),
      communication: (value) => (!value ? 'Please select an option' : null),
      phone: (value) => (!value ? 'Please select an option' : null),
      email: (value) => (!value ? 'Please select an option' : null),
      text: (value) => (!value ? 'Please select an option' : null),
      exchangeInfo: (value) => (!value ? 'Please select an option' : null),
      hiv: (value) => (!value ? 'Please select an option' : null),
      drug: (value) => (!value ? 'Please select an option' : null),
    },
  })
  const isAnyFieldTouched = consentForm.isTouched()
  const [opened, setOpened] = useState(false)

  // Handle radio button change
  const handleRadioChange = useCallback(
    (value: string, field: string) => {
      consentForm.setFieldValue(field, value)
    },
    [consentForm]
  )

  useEffect(() => {
    if (isAnyFieldTouched) {
      setFormInProgress('consent')
      setConsentFormData(consentForm.values)
    }
  }, [
    isAnyFieldTouched,
    setFormInProgress,
    setConsentFormData,
    consentForm.values,
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
          Consent
        </Title>
        <BhButton
          variant={'filled'}
          onClick={() => {
            handleDoneClick('consent')
          }}
          disabled={!consentForm.isValid()}
        >
          Done
        </BhButton>
      </Flex>
      <Flex direction="column" gap="md" mt="md">
        <DashedContainer label={'Script'} content={consentScriptData.script} />
        <Card
          shadow="sm"
          padding="24px"
          radius="md"
          style={{ overflow: 'visible' }}
        >
          <Grid gutter="md">
            <Grid.Col span={6}>
              <TextInput
                label="Consent Member Name"
                placeholder="Enter member name"
                required
                {...consentForm.getInputProps('memberName')}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <DateInput
                key={dateInputKey}
                label="Consent Date"
                placeholder="MM/DD/YYYY"
                required
                popoverProps={{
                  withinPortal: false,
                  zIndex: 20000,
                  floatingStrategy: 'absolute',
                  styles: {
                    dropdown: {
                      transform: 'translateY(28px)',
                      marginTop: 2,
                    },
                  },
                }}
                valueFormat="MM/DD/YYYY"
                {...consentForm.getInputProps('consentDate')}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Anchor
                href="#"
                underline="always"
                onClick={(e) => {
                  e.preventDefault()
                  setOpened(true)
                }}
                className="consentLink"
              >
                View Consent Terms &amp; Conditions
              </Anchor>
            </Grid.Col>
          </Grid>
        </Card>

        <Card shadow="sm" radius="md" padding={24}>
          <Table className="bh-table-wrap" mb="lg">
            <Table.Thead className="highlight-thead">
              <Table.Tr>
                <Table.Th>Consent Type</Table.Th>
                <Table.Th ta="center" w={80}>
                  Yes
                </Table.Th>
                <Table.Th ta="center" w={80}>
                  No
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {consentOptions.map((item) => (
                <Table.Tr key={item.key}>
                  <Table.Td>{item.label}</Table.Td>
                  <Table.Td>
                    <Flex justify="center">
                      <Radio
                        checked={consentForm.values[item.key] === 'yes'}
                        onChange={() => handleRadioChange('yes', item.key)}
                      />
                    </Flex>
                  </Table.Td>
                  <Table.Td>
                    <Flex justify="center">
                      <Radio
                        color="var(--error-indicator-color)"
                        checked={consentForm.values[item.key] === 'no'}
                        onChange={() => handleRadioChange('no', item.key)}
                      />
                    </Flex>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          <Table className="bh-table-wrap">
            <Table.Thead className="highlight-thead">
              <Table.Tr>
                <Table.Th>Information Consent</Table.Th>
                <Table.Th ta="center" w={80}>
                  Yes
                </Table.Th>
                <Table.Th ta="center" w={80}>
                  No
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {informationOptions.map((item) => (
                <Table.Tr key={item.key}>
                  <Table.Td>{item.label}</Table.Td>
                  <Table.Td>
                    <Flex justify="center">
                      <Radio
                        checked={consentForm.values[item.key] === 'yes'}
                        onChange={() => handleRadioChange('yes', item.key)}
                      />
                    </Flex>
                  </Table.Td>
                  <Table.Td>
                    <Flex justify="center">
                      <Radio
                        color="var(--error-indicator-color)"
                        checked={consentForm.values[item.key] === 'no'}
                        onChange={() => handleRadioChange('no', item.key)}
                      />
                    </Flex>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Card>
      </Flex>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        size={500}
        padding={24}
        radius={12}
        withCloseButton={false}
        shadow="0 7px 7px -5px rgba(0,0,0,0.04), 0 10px 15px -5px rgba(0,0,0,0.10), 0 1px 3px 0 rgba(0,0,0,0.05)"
        styles={{
          content: {
            maxHeight: '80vh',
          },
        }}
      >
        <Flex mb={16} direction="column" align="flexStart">
          <Flex justify="space-between" align="center" mb={8} w="100%">
            <ActionIcon
              size={35}
              className="consent-modal-icon"
              style={{
                backgroundColor: 'rgba(250, 176, 5, 0.12)',
                borderRadius: '50%',
                color: '#FAB005',
              }}
            >
              <IconEye size={20} />
            </ActionIcon>
            <Modal.CloseButton fz={20} />
          </Flex>
          <Title
            order={4}
            fw={600}
            className="consent-modal-title"
            c="var(--text-color)"
          >
            Consent Terms &amp; Conditions
          </Title>
          <Text
            mt={8}
            size="xs"
            c="var(--text-grey)"
            fw={400}
            className="consent-modal-view-label"
          >
            View Only
          </Text>
        </Flex>
        <Flex direction="column" gap={16}>
          {/* Scrollable Content */}
          <Flex
            direction="column"
            gap={16}
            w="100%"
            className="consent-modal-content"
            style={{
              overflowY: 'auto',
              flex: 1,
            }}
          >
            {/* Program Participation Section */}
            <div className="consent-section">
              <Title
                order={5}
                mb={2}
                fw={600}
                className="consent-section-title"
              >
                {consentTermsData.programParticipation.title}
              </Title>
              <Text
                className="consent-section-subtitle"
                c="var(--text-grey)"
                fz="sm"
              >
                {consentTermsData.programParticipation.subtitle}
              </Text>
              <div className="consent-points-list">
                {consentTermsData.programParticipation.points.map(
                  (point, index) => (
                    <Text
                      key={index}
                      className="consent-point"
                      c="var(--text-grey)"
                      fw={400}
                      fz="sm"
                      pl="0"
                    >
                      • {point}
                    </Text>
                  )
                )}
              </div>
            </div>

            {/* Release Information Section */}
            <div className="consent-section">
              <Title
                order={5}
                fw={600}
                mb={2}
                className="consent-section-title"
              >
                {consentTermsData.releaseInformation.title}
              </Title>
              <div className="consent-points-list">
                {consentTermsData.releaseInformation.organizations.map(
                  (org, index) => (
                    <div key={index} className="consent-organization">
                      {typeof org === 'string' ? (
                        <Text
                          className="consent-point"
                          c="var(--text-grey)"
                          fw={400}
                          fz="sm"
                          pl="0"
                        >
                          • {org}
                        </Text>
                      ) : (
                        <div>
                          <Text
                            className="consent-point"
                            c="var(--text-grey)"
                            fw={400}
                            fz="sm"
                            pl="0"
                          >
                            • {org.title}
                          </Text>
                          <Text
                            component="span"
                            className="consent-sub-point"
                            c="var(--text-grey)"
                            fz="sm"
                          >
                            {org.list.join(', ')}
                          </Text>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Information to be Released Section */}
            <div className="consent-section">
              <Title
                order={5}
                mb={2}
                fw={600}
                className="consent-section-title"
              >
                {consentTermsData.informationToBeReleased.title}
              </Title>
              <Text
                className="consent-section-subtitle"
                fz="sm"
                c="var(--text-grey)"
              >
                {consentTermsData.informationToBeReleased.subtitle}
              </Text>
              <div className="consent-points-list">
                {consentTermsData.informationToBeReleased.points.map(
                  (point, index) => (
                    <Text
                      key={index}
                      className="consent-point"
                      c="var(--text-grey)"
                      fw={400}
                      fz="sm"
                    >
                      • {point}
                    </Text>
                  )
                )}
              </div>
            </div>
          </Flex>
        </Flex>
      </Modal>
    </Box>
  )
}
