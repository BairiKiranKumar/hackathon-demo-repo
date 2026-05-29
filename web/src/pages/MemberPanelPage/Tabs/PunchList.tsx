import React from 'react'

import PathwayCard from '@lowLevelComp/PathwayCard/PathwayCard'
import { Box, Text } from '@mantine/core'

import '../index.css'
import usePunchlistStore from 'src/store/punchlistStore'

const PunchList = () => {
  const punchListData = usePunchlistStore((state) => state.punchListData)
  const navigateToPunchListItem = usePunchlistStore(
    (state) => state.navigateToPunchListItem
  )

  // Group data by category
  const groupedData = punchListData.reduce(
    (acc, item) => {
      if (item.category === 'introduction') {
        acc.introduction.push(item)
      } else if (item.category === 'interaction') {
        acc.interactions.push(item)
      } else if (item.category === 'assessment') {
        acc.assessments.push(item)
      } else if (item.category === 'wrapup') {
        acc.wrapup.push(item)
      } else if (item.category === 'todo') {
        acc.todo.push(item)
      }
      return acc
    },
    {
      introduction: [],
      interactions: [],
      assessments: [],
      wrapup: [],
      todo: [],
    }
  )

  const handleCardClick = (item) => {
    navigateToPunchListItem(item)
  }

  return (
    <>
      <Box mt={20} className="punchlist-tab-container h-full overflow-y-auto">
        {groupedData.introduction.length > 0 && (
          <>
            <Text fw={700} size="xs" mb={8} c="var(--text-grey)" tt="uppercase">
              INTRODUCTION
            </Text>
            {groupedData.introduction.map(
              (item, index) =>
                item.view && (
                  <PathwayCard
                    key={index}
                    pathwayData={item}
                    withBorder={true}
                    onClick={() => handleCardClick(item)}
                  />
                )
            )}
          </>
        )}
        {groupedData.assessments.some((item) => item.view) && (
          <>
            <Text
              fw={700}
              size="xs"
              mt={16}
              mb={8}
              c="var(--text-grey)"
              tt="uppercase"
            >
              ASSESSMENT
            </Text>
            {groupedData.assessments.map(
              (item, index) =>
                item.view && (
                  <PathwayCard
                    key={index}
                    pathwayData={item}
                    withBorder={true}
                    onClick={() => handleCardClick(item)}
                  />
                )
            )}
          </>
        )}

        {groupedData.interactions.some((item) => item.view) && (
          <>
            <Text
              fw={700}
              size="xs"
              mt={16}
              mb={8}
              c="var(--text-grey)"
              tt="uppercase"
            >
              INTERACTION TARGET PRIORITIES
            </Text>
            {groupedData.interactions.map(
              (item, index) =>
                item.view && (
                  <PathwayCard
                    key={index}
                    pathwayData={item}
                    withBorder={true}
                    onClick={() => handleCardClick(item)}
                  />
                )
            )}
          </>
        )}

        {groupedData.wrapup.some((item) => item.view) &&
          groupedData.wrapup.length > 0 && (
            <>
              <Text
                fw={700}
                size="xs"
                mt={16}
                mb={8}
                c="var(--text-grey)"
                tt="uppercase"
              >
                WRAP UP
              </Text>
              {groupedData.wrapup.map(
                (item, index) =>
                  item.view && (
                    <PathwayCard
                      key={index}
                      pathwayData={item}
                      withBorder={true}
                      onClick={() => handleCardClick(item)}
                    />
                  )
              )}
            </>
          )}

        {groupedData.wrapup.some((item) => item.view) &&
          groupedData.todo.length > 0 && (
            <>
              <Text
                fw={700}
                size="xs"
                mt={16}
                mb={8}
                c="var(--text-grey)"
                tt="uppercase"
              >
                REMAINING TO-DO
              </Text>
              {groupedData.todo.map((item, index) => (
                <PathwayCard
                  key={index}
                  pathwayData={item}
                  withBorder={true}
                  onClick={() => handleCardClick(item)}
                />
              ))}
            </>
          )}
      </Box>
    </>
  )
}

export default PunchList
