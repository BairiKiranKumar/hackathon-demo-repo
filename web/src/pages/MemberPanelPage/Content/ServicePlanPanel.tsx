import { useState, useEffect } from 'react'

import AiPill from '@lowLevelComp/AiPill/AiPill'
import BhInterventionTable from '@lowLevelComp/BhInterventionTable/BhInterventionTable'
import IconLabel from '@lowLevelComp/IconLabel/IconLabel'
import SkeletonLoader from '@lowLevelComp/SkeletonLoader/SkeletonLoader'
import {
  Box,
  Flex,
  Grid,
  Button,
  Text,
  Drawer,
  CloseButton,
  ActionIcon,
} from '@mantine/core'
import {
  IconChevronLeft,
  IconChevronRight,
  IconCalendarClock,
  IconXboxX,
  IconUser,
  IconPointFilled,
  IconX,
} from '@tabler/icons-react'

import '../index.css'

// import { usePunchListContext } from 'src/context/PunchListContext'
import usePunchlistStore from 'src/store/punchlistStore'

const ServicePlanPanel = ({ reviewPlans, handlePlanChange }) => {
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 1
  const isFirstPage = currentPage === 0
  const isLastPage = (currentPage + 1) * itemsPerPage >= reviewPlans.length
  // const { drawer, setDrawer } = usePunchListContext()
  const { drawer, setDrawer } = usePunchlistStore()

  const taskHeaderData = [
    { name: 'Intervention/ Owner' },
    { name: 'Due Date' },
    { name: 'Status' },
  ]

  const transformRowData = (taskData) => {
    return taskData.map((data) => ({
      description: {
        value: data.task,
        owner: data.assigned,
        department: data.department,
      },
      dueDate: data.date,
      status: data.status,
    }))
  }

  const nextPage = () => {
    if ((currentPage + 1) * itemsPerPage < reviewPlans.length) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleRemoveAllSuggestions = (carePlanId) => {
    const updatedData = reviewPlans.map((carePlan) =>
      carePlan.id === carePlanId ? { ...carePlan, aiSuggestions: [] } : carePlan
    )
    handlePlanChange(updatedData)
  }

  const handleRemoveSuggestion = (carePlanId, suggestionId) => {
    const updatedData = reviewPlans.map((carePlan) => {
      if (carePlan.id === carePlanId) {
        const filteredSuggestions = carePlan.aiSuggestions.filter(
          (sug) => sug.id !== suggestionId
        )
        return { ...carePlan, aiSuggestions: filteredSuggestions }
      }
      return carePlan
    })
    handlePlanChange(updatedData)
  }

  // On drawer open, jump to the active plan
  useEffect(() => {
    if (drawer && reviewPlans?.length) {
      const activeIndex = reviewPlans.findIndex((plan) => plan.isSelected)
      if (activeIndex !== -1) {
        setCurrentPage(activeIndex)
      } else {
        setCurrentPage(0) // fallback
      }
    }
  }, [drawer, reviewPlans])

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timerId)
  }, [])

  return (
    <>
      <Drawer
        opened={drawer}
        onClose={() => setDrawer(false)}
        position="right"
        size="xl"
        overlayProps={{ backgroundOpacity: 0 }}
        withCloseButton={false}
        className="side-panel-drawer"
        styles={{
          content: { overflow: 'visible' },
        }}
      >
        <div className="drawer-close-wrapper">
          <CloseButton
            size={'20px'}
            className="drawer-close"
            onClick={() => setDrawer(false)}
          />
        </div>
        {reviewPlans
          .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
          .map((item) => {
            return (
              <div key={item.id}>
                <Flex justify="space-between" key={item.id}>
                  <Flex align="center" gap={8}>
                    <Text size="lg" fw={600}>
                      {item.name}
                    </Text>
                    <AiPill size="sm" />
                  </Flex>
                  <Flex gap={8} mt={4} justify="center">
                    <ActionIcon
                      onClick={prevPage}
                      className="slider-btns"
                      size={35}
                      disabled={isFirstPage}
                      style={{
                        opacity: isFirstPage ? 0.5 : 1,
                        cursor: isFirstPage ? 'not-allowed' : 'pointer',
                      }}
                    >
                      <IconChevronLeft size={25} color="#495057" />
                    </ActionIcon>
                    <ActionIcon
                      onClick={nextPage}
                      className="slider-btns"
                      size={35}
                      disabled={isLastPage}
                      style={{
                        opacity: isLastPage ? 0.5 : 1,
                        cursor: isLastPage ? 'not-allowed' : 'pointer',
                      }}
                    >
                      <IconChevronRight size={25} color="#495057" />
                    </ActionIcon>
                  </Flex>
                </Flex>
                <Flex direction="column" mt={20} justify="space-between">
                  <Flex justify="space-between" w="100%" p={0} align="center">
                    <div>
                      <Text size="xs" c="#868E96" fw={700}>
                        {item.issue}
                      </Text>
                      <Text size="md" fw={600} className="care-plan-content">
                        {item.description}
                      </Text>
                    </div>
                    <Text
                      size="sm"
                      fw={400}
                      w={113}
                      style={{ alignContent: 'end' }}
                    >
                      <IconCalendarClock size={16} /> {item.dueDate}
                    </Text>
                  </Flex>
                  <Flex direction="column" mt={20}>
                    <BhInterventionTable
                      rowData={transformRowData(item.entries)}
                      headerData={taskHeaderData}
                      highlightTRows={true}
                    />
                  </Flex>
                  {loading ? (
                    <>
                      <SkeletonLoader height={30} width={'100%'} mb={8} />
                      <SkeletonLoader height={30} width={'100%'} mb={8} />
                      <SkeletonLoader height={30} width={'100%'} mb={8} />
                      <SkeletonLoader height={30} width={'100%'} mb={8} />
                    </>
                  ) : (
                    <>
                      {item.aiSuggestions.length > 0 && (
                        <Box mt={12}>
                          <Flex justify="space-between" mt={8} mb={8}>
                            <Flex gap={4} align="center">
                              <Text size="xs" fw={600}>
                                Discontinue interventions, Suggested by AI
                              </Text>
                              <AiPill size="sm" />
                            </Flex>
                            <Button
                              size="xs"
                              c="#BA1717"
                              bg="#fff"
                              onClick={() =>
                                handleRemoveAllSuggestions(item.id)
                              }
                            >
                              <IconXboxX size={18} style={{ marginRight: 4 }} />
                              Remove All
                            </Button>
                          </Flex>
                        </Box>
                      )}

                      {item.aiSuggestions.length > 0 && (
                        <Box
                          p={8}
                          bg="var(--gradients-ai)"
                          style={{ borderRadius: 8 }}
                        >
                          <Text size="xs">
                            <span style={{ fontWeight: 600 }}>Reason: </span>
                            {item.aiReason}
                          </Text>
                        </Box>
                      )}

                      <Box mt={10}>
                        {item.aiSuggestions.map((ai) => (
                          <Grid
                            bg="var(--ai-table-bg)"
                            p={12}
                            style={{ borderRadius: 8 }}
                            mb={10}
                            key={ai.id}
                          >
                            <Grid.Col span={7}>
                              <Text size="sm" className="care-plan-content">
                                {ai.task}
                              </Text>
                              <IconLabel
                                label={`${ai.assigned}`}
                                fontSize={'xs'}
                                color={'var(--text-grey)'}
                                icon={<IconUser size={12} />}
                              />
                            </Grid.Col>
                            <Grid.Col span={2}>
                              <Text size="sm">{ai.date}</Text>
                            </Grid.Col>
                            <Grid.Col span={3} className="ai-suggest-status">
                              {ai.status && (
                                <IconLabel
                                  label={ai.status}
                                  icon={
                                    <IconPointFilled
                                      color={
                                        ai.status.toLowerCase() === 'completed'
                                          ? 'var(--complete-green-status)'
                                          : 'var(--progress-brown-status)'
                                      }
                                    />
                                  }
                                />
                              )}
                              <IconX
                                color="#BA1717"
                                size={16}
                                style={{ cursor: 'pointer' }}
                                onClick={() =>
                                  handleRemoveSuggestion(item.id, ai.id)
                                }
                              />
                            </Grid.Col>
                          </Grid>
                        ))}
                      </Box>
                    </>
                  )}
                </Flex>
              </div>
            )
          })}
      </Drawer>
    </>
  )
}

export default ServicePlanPanel
