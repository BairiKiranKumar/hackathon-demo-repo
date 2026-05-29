import React, { useEffect, useState } from 'react'

import BhRiskIndicatorLegend from '@lowLevelComp/BhRiskIndicatorLegend/BhRiskIndicatorLegend'
import PathwayCard from '@lowLevelComp/PathwayCard/PathwayCard'
import SkeletonLoader from '@lowLevelComp/SkeletonLoader/SkeletonLoader'
import { Flex, Box, Title, Tabs, Text, Divider } from '@mantine/core'
import '../index.css'

import { navigate } from '@redwoodjs/router'

const AllPlans = ({ servicePlanDate, carePlan, allPlansTab }) => {
  const [loading, setLoading] = useState(true)

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

  const handleSubTabChange = (value: string | null) => {
    if (value) {
      navigate(`/member-panel?tabValue=all-plans&subTabValue=${value}`) // Update query param for inner tabs
    }
  }

  return (
    <>
      <Tabs
        defaultValue={allPlansTab}
        variant="pills"
        value={allPlansTab}
        onChange={handleSubTabChange}
        mb="lg"
        className="service-plan-tabs"
      >
        <Tabs.List className="service-plan-tabs-list" mt={16} mb={16}>
          <Tabs.Tab
            className={`${
              allPlansTab === 'service-plan'
                ? 'service-plan-tab-active'
                : 'service-plan-tab-inactive'
            }`}
            value="service-plan"
          >
            Service Plan
          </Tabs.Tab>
          <Tabs.Tab
            className={`${
              allPlansTab === 'care-plan'
                ? 'service-plan-tab-active'
                : 'service-plan-tab-inactive'
            }`}
            value="care-plan"
          >
            Care Plan
          </Tabs.Tab>
        </Tabs.List>
        {/* Service Plan */}
        <Tabs.Panel
          className="service-plan-panel"
          value="service-plan"
          style={{
            height:
              'calc(100vh - var(--memberProfileHeight) - var(--memberMainTabHeight) - 78px', // 78 is height plan tabs + padding
          }}
        >
          {loading ? (
            <>
              <SkeletonLoader height={38} width={'100%'} mb={0} mt={16} />
              <SkeletonLoader height={38} width={'100%'} mb={16} mt={16} />
              <SkeletonLoader height={38} width={'100%'} mb={16} mt={16} />
              <SkeletonLoader height={38} width={'100%'} mb={16} mt={16} />
              <SkeletonLoader height={38} width={'100%'} mb={16} mt={16} />
              <Flex gap={16} mt={16} mb={16}>
                <SkeletonLoader height={38} width={'100%'} />
                <SkeletonLoader height={38} width={'100%'} />
              </Flex>
              <SkeletonLoader height={38} width={'100%'} mb={16} mt={16} />
              <SkeletonLoader height={38} width={'100%'} mb={16} mt={16} />
              <SkeletonLoader height={38} width={'100%'} mb={16} mt={16} />
              <SkeletonLoader height={38} width={'100%'} mb={16} mt={16} />
            </>
          ) : (
            <Box className="service-plan-content h-full overflow-y-auto">
              <Title order={4} fw={600} size={'lg'} mb={0}>
                Service Plan Details
              </Title>
              <Box mt={16}>
                <Text className="care-hub-key" size="sm">
                  Services
                </Text>
                <Text className="care-hub-val" size="sm">
                  Personal Assistance
                </Text>
              </Box>
              <Box mt={16}>
                <Text className="care-hub-key" size="sm">
                  Provider
                </Text>
                <Text className="care-hub-val" size="sm">
                  Home Health Aides R` Us, Unlimited
                </Text>
              </Box>
              <Box mt={16}>
                <Text className="care-hub-key" size="sm">
                  Description
                </Text>
                <Text className="care-hub-val" size="sm">
                  T1019- Personal Assistance Services, per 15 minutes
                </Text>
              </Box>
              <Box mt={16}>
                <Text className="care-hub-key" size="sm">
                  Frequency
                </Text>
                <Text className="care-hub-val" size="sm">
                  20 hrs per week
                </Text>
              </Box>
              <Flex className="care-mgt-main" mt={16} gap={16}>
                {Object.entries(servicePlanDate).map(([key, value], index) => {
                  return (
                    <div className="care-mgt-section" key={index}>
                      <Text className="care-hub-key" size="sm">
                        {key}
                      </Text>
                      <Text className="care-hub-val" size="sm">
                        {String(value)}
                      </Text>
                    </div>
                  )
                })}
              </Flex>
              <Box mt={16}>
                <Text className="care-hub-key" size="sm">
                  Identified Needs for ADL/IADL
                </Text>
                <Text className="care-hub-val" size="sm">
                  Meal Preparation, Ordinary Housework, Managing Medications,
                  Stairs, , Transportation, Bathing, Dressing Lower Body,
                  Walking, Locomotion
                </Text>
              </Box>
              <Divider my={'sm'} variant="dashed" />
              <Title order={4} fw={600} size={'lg'} mt={16} mb={0}>
                Participants Health Promotion
              </Title>
              <Box mt={16}>
                <Text className="care-hub-key" size="sm">
                  Health Concern
                </Text>
                <Text className="care-hub-val" size="sm">
                  Dana`s primary health concern is diabities.
                </Text>
              </Box>
              <Box mt={16}>
                <Text className="care-hub-key" size="sm">
                  Participants Primary Objective
                </Text>
                <Text className="care-hub-val" size="sm">
                  The primary objective is to maintain as much of Dana`s
                  independence as possible.
                </Text>
              </Box>
              <Box mt={16}>
                <Text className="care-hub-key" size="sm">
                  Person responsible to meet objective
                </Text>
                <Text className="care-hub-val" size="sm">
                  Dana, informal supports(children), Personal Assitant Services,
                  HCBS home modification providers.
                </Text>
              </Box>
            </Box>
          )}
        </Tabs.Panel>
        {/* Care Plan */}
        <Tabs.Panel className="service-plan-panel" value="care-plan">
          <Box
            className="care-plan-content"
            style={{
              height:
                'calc(100vh - var(--memberProfileHeight) - var(--memberMainTabHeight) - 130px', // 130 is height plan tabs + padding + legends below
            }}
          >
            {carePlan.map((cp, idx) => (
              <PathwayCard pathwayData={cp} key={idx} />
            ))}
          </Box>
          <BhRiskIndicatorLegend riskLevels={riskLevels} />
        </Tabs.Panel>
      </Tabs>
    </>
  )
}

export default AllPlans
