import { useEffect, useState } from 'react'

import { Box, Card, Flex, Tabs, Text, TextInput } from '@mantine/core'
import { IconPlus, IconSearch } from '@tabler/icons-react'

import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import HomeHeader from 'src/components/HighLevelComponents/HomeHeader/HomeHeader'
import BhButton from 'src/components/LowLevelComponents/BhButton/BhButton'
import MembersCell from 'src/components/Member/MembersCell'
import { useAppUtilityStore } from 'src/store/AppUtilityStore'
import { useMemberFormStore } from 'src/store/MemberFormStore'

import './index.css'

const MemberPanelPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('member-list')

  const { setSearchQuery: setGlobalSearchQuery } = useAppUtilityStore()
  const { setAddingNewMember } = useMemberFormStore()

  useEffect(() => {
    setGlobalSearchQuery(searchQuery)
  }, [searchQuery, setGlobalSearchQuery])

  const handleNewMember = () => {
    setAddingNewMember(true)
    // Navigate to new member route
    navigate(routes.newMember())
  }

  return (
    <>
      <Metadata title="Members Panel" description="Members Panel page" />

      <Box className="w-full" bg={'#F9FAFC'}>
        <HomeHeader page="MembersPanel" />

        <Card radius="md" px={24} bg={'#F9FAFC'}>
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List>
              <Tabs.Tab value="member-list" p={12}>
                Member List
              </Tabs.Tab>
              <Tabs.Tab value="analytics" p={12}>
                Analytics
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="member-list" mt={20}>
              <Flex justify={'space-between'}>
                <TextInput
                  placeholder="Search Member"
                  leftSection={<IconSearch size={16} />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  mb={16}
                  w={300}
                />
                <Box>
                  <BhButton
                    size="sm"
                    variant="outline"
                    onClick={handleNewMember}
                  >
                    <Flex gap={'xs'}>
                      <IconPlus size={16} />
                      New Member
                    </Flex>
                  </BhButton>
                </Box>
              </Flex>
              <MembersCell />
            </Tabs.Panel>

            <Tabs.Panel value="analytics" p={16}>
              <Text>Analytics content coming soon...</Text>
            </Tabs.Panel>
          </Tabs>
        </Card>
      </Box>
    </>
  )
}

export default MemberPanelPage
