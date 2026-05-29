import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import AiPill from '@lowLevelComp/AiPill/AiPill'
import BhTooltip from '@lowLevelComp/BhTooltip/BhTooltip'
import IconLabel from '@lowLevelComp/IconLabel/IconLabel'
import PriorityBadge from '@lowLevelComp/PriorityBadge/PriorityBadge'
import {
  Accordion,
  Flex,
  Title,
  Text,
  Badge,
  Divider,
  Group,
  Pill,
  Box,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import {
  IconMapPin,
  IconPhone,
  IconCake,
  IconArrowLeft,
  IconWorld,
  IconChevronRight,
  IconPencilMinus,
} from '@tabler/icons-react'
import moment from 'moment'
import { MdOutlineGroups } from 'react-icons/md'

import './index.css'

import { navigate, routes } from '@redwoodjs/router'

import BhButton from 'src/components/LowLevelComponents/BhButton/BhButton'
import { useMemberFormRegistration } from 'src/hooks/MemberFormRegistration'
import classes from 'src/index.module.css'
import { useMemberFormStore } from 'src/store/MemberFormStore'

interface MemberProfileProps {
  memberProfile
  isInsightGenerated: boolean
  generateMemberInsight: (isInsightGenerated: boolean) => void
  memberWithRiskScore?: boolean
  updateProfileHeight?
}

const MemberProfile = ({
  memberProfile,
  isInsightGenerated,
  generateMemberInsight,
  memberWithRiskScore = true,
  updateProfileHeight,
}: MemberProfileProps) => {
  const isEditing = useMemberFormStore((state) => state.isEditing)
  const setIsEditing = useMemberFormStore((state) => state.setIsEditing)

  const [value, setValue] = useState<string | null>(null)
  const memberNameRef = useRef(null)
  const memberQuoteRef = useRef(null)
  const memberBioRef = useRef(null)

  const memberAge = moment().diff(moment(memberProfile.dob), 'years')
  const memberId = memberProfile.id?.toString()

  const handleBackToMemberPanel = () => {
    navigate(routes.memberPanel())
  }
  const handleGenerateMemberInsight = () => {
    if (generateMemberInsight) {
      generateMemberInsight(true)
    }
  }
  const isExpanded = value == memberId
  useEffect(() => {
    if (!isExpanded && generateMemberInsight) {
      generateMemberInsight(false)
    }
  }, [isExpanded, generateMemberInsight])

  const form = useForm({
    initialValues: {
      memberName: memberProfile.name || '',
      bio: memberProfile.bio || '',
      dob: memberProfile.dob ? new Date(memberProfile.dob) : null,
      primaryContact: memberProfile.phone || '',
      secondaryContact: memberProfile.secondaryPhone || '',
      ethnicity: memberProfile.ethnicity || '',
      address: memberProfile.address || '',
      languageSkills: memberProfile.languageSkills || [],
    },
    validate: {
      memberName: (value) => (!value ? 'Member name is required' : null),
      dob: (value) => (!value ? 'Date of birth is required' : null),
      primaryContact: (value) =>
        !value ? 'Primary contact is required' : null,
      ethnicity: (value) => (!value ? 'Ethnicity is required' : null),
      address: (value) => (!value ? 'Address is required' : null),
    },
  })

  // Register this form with the store
  useMemberFormRegistration('memberProfile', form)

  const handleEditProfile = () => {
    setIsEditing(true)
  }

  // Reset form when member changes or editing starts
  useEffect(() => {
    if (isEditing) {
      form.setValues({
        memberName: memberProfile.name || '',
        bio: memberProfile.bio || '',
        dob: memberProfile.dob ? new Date(memberProfile.dob) : null,
        primaryContact: memberProfile.phone || '',
        secondaryContact: memberProfile.secondaryPhone || '',
        ethnicity: memberProfile.ethnicity || '',
        address: memberProfile.address || '',
      })
      form.resetDirty()
    }
  }, [memberProfile.id, isEditing])

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      updateProfileHeight()
    })
  }, [isExpanded, updateProfileHeight])

  return (
    <div className="member-profile-header w-full">
      {memberProfile && (
        <Accordion
          defaultValue={memberId}
          value={value} // Controlled value state
          onChange={setValue}
          classNames={{ chevron: classes.chevron }}
          chevron={<IconChevronRight />}
        >
          <Accordion.Item
            key={memberProfile.id}
            value={memberId}
            className={`member-accordion ${isInsightGenerated ? '' : 'expanded-accordion-shadow'}`}
          >
            <Flex justify="space-between" align="start">
              <Flex
                className="member-card-header w-full"
                gap={10}
                justify="space-between"
                align="start"
              >
                <Flex>
                  <button
                    className="md-btn-icon bh-btn-transparent h-full"
                    onClick={handleBackToMemberPanel}
                  >
                    <IconArrowLeft className="back-btn" />
                  </button>
                  <Flex ml={8} className="h-full">
                    <img
                      className="member-image"
                      src={memberProfile.image}
                      alt={memberProfile.name}
                    />
                    <Flex
                      direction="column"
                      gap={4}
                      ml={12}
                      className="member-personal-info"
                    >
                      <Flex align="center" gap={4}>
                        <Title
                          className="member-name-age"
                          size={isExpanded ? 'xl' : 'md'}
                          lh={isExpanded ? 'md' : 'sm'}
                          fw={isExpanded ? 600 : 700}
                        >
                          <BhTooltip
                            label={memberProfile.name}
                            direction="horizontal"
                            elementRef={memberNameRef}
                          >
                            <span ref={memberNameRef} className="member-name">
                              {memberProfile.name}
                            </span>
                          </BhTooltip>
                          <span className="text-nowrap">
                            ({memberAge} Y, {memberProfile.gender})
                          </span>
                        </Title>
                        <Flex gap={16} align="center">
                          {memberProfile.insight?.status && (
                            <PriorityBadge
                              priority={memberProfile.insight?.status}
                            >
                              {memberProfile.insight?.status}
                            </PriorityBadge>
                          )}
                          <AiPill
                            cursor={isExpanded}
                            size={isExpanded ? 'lg' : 'sm'}
                            handleClick={
                              isExpanded ? handleGenerateMemberInsight : null
                            }
                          >
                            {isExpanded ? 'Generate Member Insights' : ''}
                          </AiPill>
                        </Flex>
                      </Flex>
                      {memberProfile.quote && (
                        <BhTooltip
                          label={memberProfile.quote}
                          elementRef={memberQuoteRef}
                        >
                          <Text
                            ref={memberQuoteRef}
                            c="var(--text-grey)"
                            size="sm"
                            lineClamp={2}
                          >
                            {`"${memberProfile.quote}"`}
                          </Text>
                        </BhTooltip>
                      )}
                      <Group
                        c="var(--text-color)"
                        style={{ fontSize: '14px', rowGap: '4px' }}
                      >
                        <IconLabel
                          gap={4}
                          fontSize="14px"
                          className={'md-btn-icon'}
                          label={moment(memberProfile.dob).format('MM/DD/YYYY')}
                          icon={<IconCake />}
                        />
                        <Divider orientation="vertical" />
                        <IconLabel
                          gap={4}
                          fontSize="14px"
                          className={'md-btn-icon'}
                          label={memberProfile.phone}
                          icon={<IconPhone />}
                        />
                        <Divider orientation="vertical" />
                        <IconLabel
                          gap={4}
                          fontSize="14px"
                          className={'md-btn-icon'}
                          label={memberProfile.address}
                          icon={<IconMapPin />}
                        />
                        {value !== memberId && (
                          <>
                            <Divider orientation="vertical" />
                            <IconLabel
                              gap={4}
                              fontSize="14px"
                              className={'md-btn-icon'}
                              label={memberProfile.ethnicity}
                              icon={<MdOutlineGroups />}
                            />
                          </>
                        )}
                      </Group>
                      {isExpanded && (
                        <>
                          <Group c="var(--text-color)">
                            <IconLabel
                              gap={4}
                              fontSize="14px"
                              className={'md-btn-icon'}
                              label={memberProfile.ethnicity}
                              icon={<MdOutlineGroups />}
                            />
                            {memberProfile.language && (
                              <>
                                <Divider orientation="vertical" />
                                <Flex gap={4}>
                                  <IconLabel
                                    gap={4}
                                    fontSize="14px"
                                    className={'md-btn-icon'}
                                    label={memberProfile.language}
                                    icon={<IconWorld />}
                                  />
                                  {memberProfile.languageSkills.map(
                                    (skill: string, index: React.Key) => (
                                      <Pill
                                        key={index}
                                        radius={4}
                                        tt="capitalize"
                                      >
                                        {skill.toLocaleLowerCase()}
                                      </Pill>
                                    )
                                  )}
                                </Flex>
                              </>
                            )}
                          </Group>
                          <Box className="bio-text-wrap" mt={20}>
                            <Title order={5}>Bio</Title>
                            <BhTooltip
                              label={memberProfile.bio}
                              elementRef={memberBioRef}
                            >
                              <Text size="sm" lineClamp={3} ref={memberBioRef}>
                                {memberProfile.bio}
                              </Text>
                            </BhTooltip>
                          </Box>
                        </>
                      )}
                    </Flex>
                  </Flex>
                </Flex>
                {memberWithRiskScore && (
                  <Box
                    className={`member-score-info ${isExpanded ? 'show-score-bg' : ''}`}
                    miw={isExpanded ? 'max-content' : '20%'}
                    p={isExpanded ? 14 : 0}
                  >
                    {isExpanded && <Text mb={4}>HCBS Risk Score</Text>}
                    <Flex gap={8} wrap="wrap">
                      <Badge className="member-score-badge" radius="md">
                        <Text
                          component="span"
                          size="xs"
                          fw={isExpanded ? 600 : 400}
                        >
                          {isExpanded ? 'Current Score' : 'HCBS Risk Score'}
                        </Text>
                        <Text
                          component="span"
                          className="score-value"
                          size="xs"
                          fw={700}
                        >
                          {memberProfile.insight?.currentScore ?? 0}
                        </Text>
                      </Badge>
                      {isExpanded && (
                        <Badge
                          className="member-score-badge past-score"
                          radius="md"
                        >
                          <Text component="span" fw={600} size="xs">
                            Past Score
                          </Text>
                          <Text component="span" ml={4} size="xs" fw={600}>
                            {memberProfile.insight?.pastScores.dates &&
                              moment(
                                memberProfile.insight.pastScores.dates[0]
                              ).format('MM/DD/YYYY')}
                          </Text>
                          <Text
                            component="span"
                            className="score-value"
                            size="xs"
                            fw={700}
                          >
                            {memberProfile.insight?.pastScores.scores &&
                              memberProfile.insight?.pastScores?.scores[0]}
                          </Text>
                        </Badge>
                      )}
                    </Flex>
                  </Box>
                )}
              </Flex>
              <Flex
                miw={memberWithRiskScore ? 'max-content' : '18%'}
                justify="end"
              >
                <BhButton variant="outline" onClick={handleEditProfile}>
                  <IconLabel
                    label="Edit"
                    gap={8}
                    icon={<IconPencilMinus size={16} />}
                  ></IconLabel>
                </BhButton>
                <Accordion.Control></Accordion.Control>
              </Flex>
            </Flex>
          </Accordion.Item>
        </Accordion>
      )}
    </div>
  )
}

export default MemberProfile
