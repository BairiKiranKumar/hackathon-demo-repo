import { ReactNode, useState } from 'react'

import { Menu, Text } from '@mantine/core'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'

import './index.css'
import { idValueInterface } from 'src/interfaces/commonInterfaces'

interface BhDropdownProps {
  children?: ReactNode
  listItems: idValueInterface[]
  onOptionChange: (value: string) => void
  triggerIcon?: ReactNode
  getItemColor?: (value: string) => string | undefined
}

const BhDropdown = ({
  children,
  listItems,
  onOptionChange,
  triggerIcon,
  getItemColor,
}: BhDropdownProps) => {
  const [opened, setOpened] = useState(false)

  const handleItemClick = (value: string) => {
    onOptionChange(value)
    setOpened(false)
  }

  return (
    <Menu
      shadow="md"
      width={200}
      opened={opened}
      onChange={setOpened}
      offset={2}
      radius={10}
    >
      <Menu.Target>
        <button className="bh-btn-transparent bh-dropdown-trigger">
          {triggerIcon ? (
            triggerIcon
          ) : (
            <>
              <Text size="sm" c="inherit" fw={500}>
                {children}
              </Text>
              {opened ? (
                <IconChevronUp size={16} />
              ) : (
                <IconChevronDown size={16} />
              )}
            </>
          )}
        </button>
      </Menu.Target>

      <Menu.Dropdown className="bh-dropdown-wrap">
        {listItems.map((item: idValueInterface) => (
          <Menu.Item
            key={item.id}
            onClick={() => handleItemClick(item.value)}
            fw={500}
            lh="20px"
            color={getItemColor?.(item.value)}
          >
            {item.value}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}

export default BhDropdown
