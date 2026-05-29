import React, { useEffect, useState } from 'react'

import Charts from '@highLevelComp/Charts/Charts'
import SkeletonLoader from '@lowLevelComp/SkeletonLoader/SkeletonLoader'
import { Flex, Box, Card, Text, ActionIcon, Grid } from '@mantine/core'
import {
  IconCircle,
  IconCircleFilled,
  IconChevronLeft,
  IconChevronRight,
  IconHome,
} from '@tabler/icons-react'
import moment from 'moment'

import '../../index.css'

import { HCBSChart } from '../../data'

const OverviewContent = ({
  HCBSData,
  chartWidth,
  memberWithRiskScore = false,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [HCBS_Chart] = useState(HCBSChart)

  const itemsPerPage = 2

  const nextPage = () => {
    if ((currentPage + 1) * itemsPerPage < HCBSData.length) {
      setCurrentPage(currentPage + 1)
    }
  }
  // Handle "Previous" button click
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }
  // Calculate which items to display based on currentPage
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const itemsToDisplay = HCBSData.slice(startIndex, endIndex)
  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timerId)
  }, [])

  return (
    <Box className="overview-content">
      {HCBSData ? (
        <>
          {memberWithRiskScore && (
            <Flex justify={'space-between'} pt={14} pb={14}>
              <Text fw={600} size="lg">
                HCBS Risk Scores
              </Text>
              <Flex justify="center" gap={20} align="center">
                <Flex gap={4} align="center">
                  <IconCircleFilled size={12} color="#E87271" />
                  <Text size="xs" c="#495057">
                    Current
                  </Text>
                </Flex>
                <Flex gap={4} align="center">
                  <IconCircle size={12} color="#ADB5BD" strokeWidth={4} />
                  <Text size="xs" c="#495057">
                    Forecasted
                  </Text>
                </Flex>
                <Flex gap={4} align="center">
                  <IconCircle size={12} color="#E87271" strokeWidth={4} />
                  <Text size="xs" c="#495057">
                    Forecasted without Intervention
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          )}
          <Card
            mt={memberWithRiskScore ? 0 : 14}
            shadow="sm"
            p={'lg'}
            className="overflow-y-auto"
            style={{
              height: '100%',
              maxHeight:
                'calc(100vh - var(--memberProfileHeight) - var(--memberMainTabHeight) - 20px)',
              borderRadius: 10,
            }}
          >
            {memberWithRiskScore &&
              (loading ? (
                <SkeletonLoader height={350} />
              ) : (
                <Charts chartData={HCBS_Chart} chartWidth={chartWidth} />
              ))}

            <Box mt={memberWithRiskScore ? 30 : 0} className="content-monthly">
              {loading ? (
                <Grid gutter={{ base: 36 }} mb={20}>
                  <Grid.Col span={6}>
                    <Flex direction="column" gap={12}>
                      <Flex gap={4} w="fit-content">
                        <SkeletonLoader height={20} width={89} />
                        <SkeletonLoader height={20} width={20} circle={true} />
                      </Flex>
                      <SkeletonLoader height={112} />
                    </Flex>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Flex direction="column" gap={12}>
                      <Flex gap={4} w="fit-content">
                        <SkeletonLoader height={20} width={89} />
                        <SkeletonLoader height={20} width={20} circle={true} />
                      </Flex>
                      <SkeletonLoader height={112} />
                    </Flex>
                  </Grid.Col>
                </Grid>
              ) : (
                <Flex gap={36}>
                  {itemsToDisplay.map((item) => (
                    <div key={item.id}>
                      <Flex gap={10}>
                        <Text
                          component="span"
                          size="sm"
                          fw={600}
                          style={
                            item.active
                              ? { color: '#000' }
                              : { color: 'rgba(0, 0, 0, 0.3)' }
                          }
                        >
                          {moment(item.date, 'MMMM YYYY').format('MMMM YYYY')}
                        </Text>
                        <Flex
                          className={
                            item.active ? 'visit-ico-active' : 'visit-ico'
                          }
                        >
                          <IconHome
                            size={16}
                            style={
                              item.active ? {} : { color: 'rgba(0, 0, 0, 0.3)' }
                            }
                          />
                        </Flex>
                      </Flex>
                      <ul style={{ marginTop: 8 }}>
                        {item.data.map((summary, index) => (
                          <li
                            key={index}
                            style={
                              item.active
                                ? { color: '#000' }
                                : { color: 'rgba(0, 0, 0, 0.3)' }
                            }
                          >
                            <Text
                              size="sm"
                              style={
                                item.active
                                  ? { color: '#000' }
                                  : { color: 'rgba(0, 0, 0, 0.3)' }
                              }
                            >
                              {summary}
                            </Text>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </Flex>
              )}
              <Flex gap={20} mt={4} justify={'center'}>
                <ActionIcon
                  onClick={prevPage}
                  className="slider-btns"
                  size={32}
                  radius={'50%'}
                >
                  {/* disabled={currentPage === 0} */}
                  <IconChevronLeft size={20} color="var(--text-grey)" />
                </ActionIcon>
                <ActionIcon
                  onClick={nextPage}
                  className="slider-btns"
                  size={32}
                  radius={'50%'}
                >
                  {/* disabled={(currentPage + 1) * itemsPerPage >= HCBSData.length} */}
                  <IconChevronRight size={20} color="var(--text-grey)" />
                </ActionIcon>
              </Flex>
            </Box>
          </Card>
        </>
      ) : null}
    </Box>
  )
}

export default OverviewContent
