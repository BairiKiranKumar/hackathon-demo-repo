import { PropsWithChildren, useRef } from 'react'

import BhTooltip from '@lowLevelComp/BhTooltip/BhTooltip'
import IconLabel from '@lowLevelComp/IconLabel/IconLabel'
import { Checkbox, Table, Text, Box } from '@mantine/core'
import { IconPointFilled, IconUser } from '@tabler/icons-react'

type tableProps = PropsWithChildren<{
  onCheckboxChange?: (index, checked) => void
  rowData
  headerData
  highlightThead?: boolean
  highlightTRows?: boolean
  withCheckbox?: boolean
}>

const BhInterventionTable = ({
  rowData,
  headerData,
  withCheckbox = false,
  onCheckboxChange,
  highlightThead = false,
  highlightTRows = false,
}: tableProps) => {
  const descRef = useRef(null)

  const rows = rowData.map((row, index) => (
    <Table.Tr key={index}>
      {withCheckbox && (
        <Table.Td valign="top">
          <Box className="bh-table-col">
            <Checkbox
              checked={row.checked || false}
              onChange={(event) =>
                onCheckboxChange(index, event.target.checked)
              }
            />
          </Box>
        </Table.Td>
      )}
      <Table.Td>
        <Box className="bh-table-col">
          <BhTooltip label={row.description.value} elementRef={descRef}>
            <Text
              mb={3}
              size="sm"
              c="var(--mantine-color-black)"
              lineClamp={1}
              ref={descRef}
            >
              {row.description.value}
            </Text>
          </BhTooltip>
          <IconLabel
            color="var(--text-grey)"
            fontSize="12px"
            label={`${row.description.owner} ${row.description.department ? ` (${row.description.department})` : ''}`}
            icon={<IconUser color="var(--text-grey)" size={16} />}
          />
        </Box>
      </Table.Td>
      <Table.Td>
        <Box className="bh-table-col">{row.dueDate}</Box>
      </Table.Td>
      {headerData.some((header) => header.name === 'Status') && (
        <Table.Td>
          {row.status && (
            <Box className="bh-table-col" style={{ whiteSpace: 'nowrap' }}>
              <IconLabel
                label={row.status}
                icon={
                  <IconPointFilled
                    color={
                      row.status.toLowerCase() === 'completed'
                        ? 'var(--complete-green-status)'
                        : 'var(--progress-brown-status)'
                    }
                  />
                }
              />
            </Box>
          )}
        </Table.Td>
      )}
    </Table.Tr>
  ))

  return (
    <Table className="bh-table-wrap">
      <Table.Thead className={`${highlightThead ? 'highlight-thead' : ''}`}>
        <Table.Tr>
          {withCheckbox && <Table.Th></Table.Th>}
          {headerData.map((header, index) => (
            <Table.Th key={index}>{header.name}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody className={`${highlightTRows ? 'highlight-trows' : ''}`}>
        {rows}
      </Table.Tbody>
    </Table>
  )
}

export default BhInterventionTable
