import { useState } from 'react'

import {
  Table,
  Avatar,
  Flex,
  Text,
  Badge,
  UnstyledButton,
  Group,
  Center,
} from '@mantine/core'
import {
  IconChevronUp,
  IconChevronDown,
  IconSelector,
} from '@tabler/icons-react'
import moment from 'moment'
import type { FindMembers } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'

import { useAppUtilityStore } from 'src/store/AppUtilityStore'

type SortField = 'name' | 'dob' | 'servicePlans'
type SortOrder = 'asc' | 'desc' | null

interface MembersListProps {
  members: FindMembers['members']
  onMemberClick?: (id: number) => void
}

const MembersList = ({ members }: MembersListProps) => {
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>(null)

  const { setSelectedMemberId, searchQuery } = useAppUtilityStore()

  // When a row is clicked → save + navigate
  const handleMemberClick = (id: number) => {
    setSelectedMemberId(id)
    navigate(routes.memberDetail({ memberId: String(id) }))
  }

  // Filter logic
  const filteredMembers = members.filter((member) =>
    member.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortOrder === 'asc') setSortOrder('desc')
      else if (sortOrder === 'desc') {
        setSortOrder(null)
        setSortField(null)
      }
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <IconSelector size={14} />
    if (sortOrder === 'asc') return <IconChevronUp size={14} />
    if (sortOrder === 'desc') return <IconChevronDown size={14} />
    return <IconSelector size={14} />
  }

  // Sort logic (runs after filtering)
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (!sortField || !sortOrder) return 0
    let comparison = 0

    switch (sortField) {
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
      case 'dob': {
        const dateA = moment(a.dob)
        const dateB = moment(b.dob)
        comparison = dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0
        break
      }
      case 'servicePlans':
        comparison = (a.servicePlans || 0) - (b.servicePlans || 0)
        break
    }

    return sortOrder === 'asc' ? comparison : -comparison
  })

  const SortableHeader = ({
    field,
    children,
  }: {
    field: SortField
    children: React.ReactNode
  }) => (
    <UnstyledButton onClick={() => handleSort(field)}>
      <Group gap={4}>
        <Text fw={700} size="sm">
          {children}
        </Text>
        <Center>{getSortIcon(field)}</Center>
      </Group>
    </UnstyledButton>
  )

  // Helper to normalize gender
  const formatGender = (gender: string | null | undefined) => {
    if (!gender) return '-'
    const g = gender.toLowerCase()
    if (g.startsWith('f')) return 'F'
    if (g.startsWith('m')) return 'M'
    return gender
  }

  return (
    <Table.ScrollContainer maxHeight="calc(100vh - 220px)" minWidth={500}>
      <Table
        bg={'#FFF'}
        highlightOnHover
        highlightOnHoverColor={'#E7F8F3'}
        stickyHeader
        stickyHeaderOffset={0}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th p={12}>
              <SortableHeader field="name">Member Name</SortableHeader>
            </Table.Th>
            <Table.Th p={12}>
              <SortableHeader field="dob">DOB</SortableHeader>
            </Table.Th>
            <Table.Th p={12}>Diagnosis</Table.Th>
            <Table.Th p={12}>
              <SortableHeader field="servicePlans">
                Service Plan(s)
              </SortableHeader>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {sortedMembers.map((member) => (
            <Table.Tr
              key={member.id}
              onClick={() => handleMemberClick(member.id)}
              style={{ cursor: 'pointer' }}
            >
              <Table.Td>
                <Flex align="center" gap={12}>
                  <Avatar src={member.image} radius="xl" size="sm" />
                  <div>
                    <Text fw={500}>{member.name}</Text>
                    <Text size="xs" c="dimmed">
                      {moment().diff(moment(member.dob), 'years')}Y,{' '}
                      {formatGender(member.gender)}
                    </Text>
                  </div>
                </Flex>
              </Table.Td>
              <Table.Td>
                {member.dob ? moment(member.dob).format('MM/DD/YYYY') : '-'}
              </Table.Td>
              <Table.Td>
                <Flex gap={4} wrap="wrap">
                  {member.diagnosis?.length ? (
                    member.diagnosis.map((d: string, idx: number) => (
                      <Badge key={idx} variant="light" size="sm">
                        {d}
                      </Badge>
                    ))
                  ) : (
                    <Badge color="gray" radius="sm">
                      Asthma
                    </Badge>
                  )}
                </Flex>
              </Table.Td>
              <Table.Td>
                <Badge color="gray" radius="sm">
                  {member.servicePlans ?? 3}
                </Badge>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  )
}

export default MembersList
