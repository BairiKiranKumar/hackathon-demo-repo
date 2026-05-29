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
  IconVideo,
  IconChevronUp,
  IconChevronDown,
  IconSelector,
} from '@tabler/icons-react'
import moment from 'moment'

const membersData = [
  {
    id: '1',
    name: 'Emily Chen',
    age: 45,
    gender: 'F',
    profile: '',
    dob: '07/22/1978',
    diagnosis: ['Asthma', 'Allergies'],
    servicePlans: 1,
    joinInfo: 'Join (in 0:10:00 mins)',
  },
  {
    id: '2',
    name: 'Michael Johnson',
    age: 58,
    gender: 'M',
    profile: '',
    dob: '03/05/1965',
    diagnosis: ['Hypertension', 'Diabetes'],
    servicePlans: 3,
    joinInfo: '',
  },
]

interface MembersTableProps {
  searchQuery: string
  onMemberClick: (memberId: string) => void
}

type SortField = 'name' | 'dob' | 'servicePlans'
type SortOrder = 'asc' | 'desc' | null

const MembersTable = ({ searchQuery, onMemberClick }: MembersTableProps) => {
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>(null)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // asc -> desc -> null
      if (sortOrder === 'asc') {
        setSortOrder('desc')
      } else if (sortOrder === 'desc') {
        setSortOrder(null)
        setSortField(null)
      }
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <IconSelector size={14} />
    }
    if (sortOrder === 'asc') {
      return <IconChevronUp size={14} />
    }
    if (sortOrder === 'desc') {
      return <IconChevronDown size={14} />
    }
    return <IconSelector size={14} />
  }

  const filteredMembers = membersData.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (!sortField || !sortOrder) return 0

    let comparison = 0

    switch (sortField) {
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
      case 'dob': {
        const dateA = moment(a.dob, 'MM/DD/YYYY')
        const dateB = moment(b.dob, 'MM/DD/YYYY')
        comparison = dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0
        break
      }
      case 'servicePlans':
        comparison = a.servicePlans - b.servicePlans
        break
      default:
        comparison = 0
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
        <Text fw={600} size="sm">
          {children}
        </Text>
        <Center>{getSortIcon(field)}</Center>
      </Group>
    </UnstyledButton>
  )

  return (
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>
            <SortableHeader field="name">Member Name</SortableHeader>
          </Table.Th>
          <Table.Th>
            <SortableHeader field="dob">DOB</SortableHeader>
          </Table.Th>
          <Table.Th>Diagnosis</Table.Th>
          <Table.Th>
            <SortableHeader field="servicePlans">
              Service Plan(s)
            </SortableHeader>
          </Table.Th>
          <Table.Th>{/* Empty heading */}</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {sortedMembers.map((member) => (
          <Table.Tr
            key={member.id}
            onClick={() => onMemberClick(member.id)}
            style={{ cursor: 'pointer' }}
          >
            <Table.Td>
              <Flex align="center" gap={12}>
                <Avatar src={member.profile} radius="xl" size="sm" />
                <div>
                  <Text fw={500}>{member.name}</Text>
                  <Text size="xs" c="dimmed">
                    {member.age}Y, {member.gender}
                  </Text>
                </div>
              </Flex>
            </Table.Td>
            <Table.Td>{member.dob}</Table.Td>
            <Table.Td>
              <Flex gap={4} wrap="wrap">
                {member.diagnosis.map((d, idx) => (
                  <Badge key={idx} variant="light" size="sm">
                    {d}
                  </Badge>
                ))}
              </Flex>
            </Table.Td>
            <Table.Td>{member.servicePlans}</Table.Td>
            <Table.Td>
              {member.joinInfo && (
                <Flex
                  align="center"
                  gap={6}
                  px={10}
                  py={6}
                  style={{
                    backgroundColor: '#335148',
                    borderRadius: 6,
                    color: 'white',
                    display: 'inline-flex',
                  }}
                >
                  <IconVideo size={16} color="white" />
                  <Text size="xs" fw={500} c="white">
                    {member.joinInfo}
                  </Text>
                </Flex>
              )}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}

export default MembersTable
