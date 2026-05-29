import React from 'react'

import { Divider, Flex, Pill, Text } from '@mantine/core'

const BhRiskIndicatorLegend = ({ riskLevels }) => {
  return (
    <div className="care-plan-legend" style={{ height: 50 }}>
      <Divider my="sm" variant="dashed" />
      <Flex gap={60}>
        {riskLevels.map((risk) => (
          <Flex gap={8} key={risk.label} align="center">
            <Pill
              size="sm"
              bg={risk.bg}
              c={risk.color}
              px={0}
              w={20}
              miw={20}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <Flex h="100%" align="center" fw={500}>
                {risk.tag.charAt(0)}
              </Flex>
            </Pill>
            <Text component="span" size="xs" fw={500}>
              {risk.label}
            </Text>
          </Flex>
        ))}
      </Flex>
    </div>
  )
}

export default BhRiskIndicatorLegend
