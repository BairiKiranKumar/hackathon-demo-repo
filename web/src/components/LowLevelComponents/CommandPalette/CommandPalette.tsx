import { useRef } from 'react'

import { Box, Flex, Input, List, Paper, Text } from '@mantine/core'
import { IconSearch, IconX } from '@tabler/icons-react'
import moment from 'moment'

import { navigate } from '@redwoodjs/router'
import './index.css'

import { useAppUtilityStore } from 'src/store/AppUtilityStore'

import { useCommandPaletteSearch } from './useCommandPaletteSearch'

const CommandPalette = ({ isVisible, onClose, commandType }) => {
  const inputRef = useRef(null)
  const {
    searchValue,
    setSearchValue,
    filteredRoutes,
    filteredMembers,
    location,
  } = useCommandPaletteSearch(onClose, inputRef, isVisible)
  const { setSelectedMemberId } = useAppUtilityStore()
  if (!isVisible) return null

  const handleClose = () => {
    setSearchValue('')
    onClose()
  }

  const handleSelectedMember = (memberId: number) => {
    setSelectedMemberId(memberId)
    navigate('/member-panel')
  }

  const calcAge = (dob) => {
    return moment().diff(moment(dob), 'years')
  }
  return (
    <>
      <Paper shadow="xl" radius="md" py={6} className="command-palette-wrap">
        <Input
          ref={inputRef}
          px={6}
          mb={4}
          placeholder={
            commandType === 'pages'
              ? 'Jump to..'
              : 'Enter min 3 letters to search for member'
          }
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          rightSection={
            searchValue && (
              <IconX
                size={16}
                style={{ cursor: 'pointer' }}
                onClick={() => setSearchValue('')}
              />
            )
          }
          leftSection={<IconSearch size={16} />}
        />

        {filteredRoutes.length > 0 && commandType === 'pages' && (
          <List
            listStyleType="none"
            spacing="xs"
            px={8}
            pt={4}
            mah={350}
            className="overflow-y-auto command-routes-list"
            style={{ borderTop: '1px solid #d7d7d7' }}
          >
            {['Pages', 'Member Panel Tabs'].map((category) => {
              const categoryRoutes = filteredRoutes.filter(
                (route) => route.category === category
              )

              return categoryRoutes.length > 0 ? (
                <div key={category}>
                  <Text fw={700} size="xs" c="var(--text-grey)" my={4}>
                    {category}
                  </Text>
                  {categoryRoutes.map((route) => {
                    const isActive =
                      location.pathname + location.search === route.path

                    return (
                      <List.Item
                        key={route.path}
                        className={`route-list-item ${isActive ? 'active' : ''}`}
                        onClick={() => {
                          navigate(route.path)
                          handleClose()
                        }}
                      >
                        <Text
                          tt="capitalize"
                          size="sm"
                          c={isActive ? 'var(--primary-color)' : ''}
                        >
                          {route.name}
                        </Text>
                      </List.Item>
                    )
                  })}
                </div>
              ) : null
            })}
          </List>
        )}

        {filteredMembers.length > 0 &&
          commandType === 'members' &&
          searchValue.length > 2 && (
            <List
              listStyleType="none"
              spacing="xs"
              px={8}
              pt={4}
              mah={350}
              className="overflow-y-auto command-routes-list"
              style={{ borderTop: '1px solid #d7d7d7' }}
            >
              <Text fw={700} size="xs" c="var(--text-grey)" my={4}>
                Members
              </Text>
              {filteredMembers.map((member) => (
                <List.Item
                  key={member.id}
                  className="route-list-item member-list-item"
                  onClick={() => {
                    handleSelectedMember(member.id)
                    handleClose()
                  }}
                >
                  <Flex className="event-member-name" align={'center'}>
                    <Text size="sm" lineClamp={1} fw={500}>
                      {member.name}
                    </Text>
                    <Text className="text-nowrap" size="xs" c="dimmed" ml={2}>
                      ({calcAge(member.dob)}Y, {member.gender})
                    </Text>
                  </Flex>
                </List.Item>
              ))}
            </List>
          )}
      </Paper>
      <Box
        pos="fixed"
        h="100%"
        w="100%"
        bg="rgb(64 70 82 / 37%)"
        top={0}
        style={{ zIndex: 8 }}
        onClick={onClose}
      />
    </>
  )
}

export default CommandPalette
