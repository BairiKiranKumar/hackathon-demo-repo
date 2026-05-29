import React, { useState, useEffect } from 'react'

import BhRiskIndicatorLegend from '@lowLevelComp/BhRiskIndicatorLegend/BhRiskIndicatorLegend'
import ServicePlanCard from '@lowLevelComp/ServicePlanCard/ServicePlanCard'
import SkeletonLoader from '@lowLevelComp/SkeletonLoader/SkeletonLoader'
import { Flex, Card, Grid, Text } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'

interface ServicePlanItem {
  id: number
  urgency: 'High' | 'Medium' | 'Low'
  label: string
  description: string
  startDate: string
  endDate: string
  status: string
}
export interface ServicePlanContentProps {
  ServicePlanData: ServicePlanItem[]
}

const ServicePlanContent: React.FC<ServicePlanContentProps> = ({
  ServicePlanData,
}) => {
  const [loading, setLoading] = useState<boolean>(true)

  const riskLevels = [
    {
      label: 'High',
      tag: 'H',
      bg: 'var(--high-impact-bg)',
      c: 'var(--high-impact-color)',
    },
    { label: 'Medium', tag: 'M', bg: 'var(--medium-impact-bg)', c: '#000' },
    { label: 'Low', tag: 'L', bg: 'var(--low-badge-bg)', c: '#000' },
  ]

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timerId)
  }, [])

  return (
    <>
      <Flex justify="space-between" pt={20} pb={0} h={68}>
        <Text size="lg" fw={600} style={{ alignSelf: 'center' }}>
          Care Plan
        </Text>
        <IconInfoCircle
          size={20}
          color="var(--text-grey)"
          style={{ alignSelf: 'center' }}
        />
      </Flex>
      <Card
        shadow="0px 4px 10px 0px rgba(0, 0, 0, 0.05)"
        radius={10}
        className="overflow-y-auto new-class"
        style={{
          height: 'calc(100vh - var(--memberProfileHeight) - 88px)', // 88px is height of plan tabs + padding
          justifyContent: 'space-between',
          padding: '20px 20px 0px',
        }}
      >
        <Flex direction="column">
          {loading ? (
            <Grid gutter={{ base: 36 }} mt={8}>
              {Array.from({ length: 3 }).map((_, idx) => (
                <Grid.Col key={idx} span={12}>
                  <SkeletonLoader height={100} width="100%" />
                </Grid.Col>
              ))}
            </Grid>
          ) : (
            <>
              <Flex
                direction={'column'}
                gap={20}
                style={{
                  overflow: 'scroll',
                }}
              >
                {ServicePlanData.map((item) => (
                  <ServicePlanCard
                    key={item.id}
                    urgency={item.urgency}
                    label={item.label}
                    description={item.description}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    status={item.status}
                  />
                ))}
              </Flex>
            </>
          )}
        </Flex>
        <div style={{ position: 'sticky', bottom: 0 }}>
          <BhRiskIndicatorLegend riskLevels={riskLevels} />
        </div>
      </Card>
    </>
  )
}

export default ServicePlanContent
