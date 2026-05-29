import React, { useState } from 'react'

import FeedbackPopover from '@lowLevelComp/FeedbackPopover/FeedbackPopover'
import { Card, Flex, Pill, Text } from '@mantine/core'

import {
  DiagnosesCardLoadingProps,
  DiagnosesCardNormalProps,
} from 'src/interfaces/commonInterfaces'

import SkeletonLoader from '../SkeletonLoader/SkeletonLoader'

import './index.css'

type DiagnosesCardProps = DiagnosesCardLoadingProps | DiagnosesCardNormalProps

const DiagnosesCard: React.FC<DiagnosesCardProps> = (props) => {
  const [reaction, setReaction] = useState({ dislike: false })
  const [popoverOpened, setPopoverOpened] = useState(false)
  let cardProps: DiagnosesCardNormalProps | null = null

  if (!props.loading) {
    cardProps = props as DiagnosesCardNormalProps
  }

  const handleDislikeClick = (disliked: boolean) => {
    if (!reaction.dislike) {
      cardProps.setFeedbackId(cardProps.id)
    }
    setReaction((prevReaction) => ({ dislike: !prevReaction.dislike }))
    setPopoverOpened(!disliked)

    // Reset feedback data when the dislike button is clicked again to close the popover
    if (!reaction.dislike && cardProps.feedbackProps?.onCancel) {
      cardProps.feedbackProps.onCancel()
    }
  }

  const handleSubmit = () => {
    if (cardProps.feedbackProps?.onSubmit) {
      cardProps.feedbackProps.onSubmit()
    }
    setPopoverOpened(false)
  }

  // Handle popover closing after cancel
  const handleCancel = () => {
    cardProps.setFeedbackId(null)
    setReaction({ dislike: false })
    if (cardProps.feedbackProps?.onCancel) {
      cardProps.feedbackProps.onCancel()
    }
    setPopoverOpened(false)
  }

  return (
    <>
      {props.loading ? (
        <Flex
          className="diagnoses-card-loading-wrap"
          gap={26}
          direction="column"
        >
          {Array.from({ length: props.loadingContentCount }).map(
            (_, index: number) => (
              <Flex key={index} gap={4} direction="column">
                <SkeletonLoader
                  width="50%"
                  height={28}
                  display="block"
                  isAiGradient={true}
                />
                <SkeletonLoader
                  height={60}
                  display="block"
                  isAiGradient={true}
                />
                <SkeletonLoader
                  height={40}
                  display="block"
                  isAiGradient={true}
                />
              </Flex>
            )
          )}
        </Flex>
      ) : (
        <Card className="diagnoses-card bh-gap-1">
          <Flex justify="space-between">
            <Pill
              size="lg"
              fs="xs"
              fw={600}
              className="bg-ai-pill ai-pill"
              radius="8px"
            >
              {cardProps.cardContent?.title}
            </Pill>
            <Flex gap={4}>
              <FeedbackPopover
                {...cardProps.feedbackProps}
                opened={popoverOpened}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                disabled={!reaction.dislike}
              >
                <div className="dislike-feedback">
                  <button
                    onClick={() => handleDislikeClick(reaction.dislike)}
                    className={`bh-btn-transparent bh-icon-Comment ${
                      reaction.dislike ? 'disliked-icon' : ''
                    }`}
                  />
                </div>
              </FeedbackPopover>
            </Flex>
          </Flex>
          {cardProps.cardContent?.items?.length > 0
            ? cardProps.cardContent.items.map((item, index) => (
                <Card key={index} className="inner-insight-card">
                  <Pill
                    w="max-content"
                    size="md"
                    fw={600}
                    className={`sub-card-pill ${item.category === 'problem' ? 'red-legend-pill ' : 'green-legend-pill '}`}
                    radius="4px"
                  >
                    {item.title}
                  </Pill>
                  <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
                    {item?.subEntries &&
                      item?.subEntries.map((subItem, index) => (
                        <li key={index}>
                          <Text
                            px={subItem.highlight && 4}
                            component="span"
                            size="sm"
                            bg={subItem.highlight ? 'var(--ai-highlight)' : ''}
                          >
                            {subItem.value}
                          </Text>
                        </li>
                      ))}
                  </ul>
                </Card>
              ))
            : null}
        </Card>
      )}
    </>
  )
}

export default DiagnosesCard
