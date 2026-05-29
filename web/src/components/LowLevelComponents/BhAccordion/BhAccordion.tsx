import { useState, useEffect } from 'react'

import { Accordion, Text, Flex, Pill } from '@mantine/core'

export interface AccordionContent {
  id: string | number
  label: string
  icon?: React.ReactNode
  children: React.ReactNode
}

export interface BhAccordionProps {
  title: string
  data: AccordionContent[]
  variant?: string
  radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  chevronPosition?: 'left' | 'right'
  divideContent: boolean
  value?: string
  defaultOpen?: boolean
  className?: string
}

const BhAccordion: React.FC<BhAccordionProps> = ({
  title,
  data,
  variant = 'default',
  radius = 'md',
  chevronPosition = 'left',
  divideContent = false,
  defaultOpen = false,
  className,
}) => {
  const [openedItems, setOpenedItems] = useState<string[]>(
    defaultOpen ? [title] : []
  )

  useEffect(() => {
    if (defaultOpen) {
      setOpenedItems([title])
    }
  }, [title, defaultOpen])

  return (
    <Accordion
      multiple
      value={openedItems}
      onChange={setOpenedItems}
      variant={variant}
      radius={radius}
      chevronPosition={chevronPosition}
      className={className}
    >
      <Accordion.Item
        value={title}
        style={{ lineHeight: 20, margin: 0, border: 'none' }}
      >
        <Accordion.Control>
          <Flex gap={8} align={'center'}>
            <Text size="sm" fw={600}>
              {title}
            </Text>
            <Pill bg={'#e9ecef'} size="sm" px={7} fw={500}>
              {data.length}
            </Pill>
          </Flex>
        </Accordion.Control>
        <Accordion.Panel>
          {data.map((item, index) => (
            <Flex
              key={item.id}
              direction={'column'}
              justify="space-between"
              mb={8}
              style={{
                borderBottom:
                  divideContent && index < data.length - 1
                    ? '1px solid #DEE2E6'
                    : 'none',
              }}
            >
              <Flex gap={10}>
                {item.icon && item.icon}
                <Text size="xs" c="var(--mantine-color-black)">
                  {item.label}
                </Text>
              </Flex>
              {item.children && (
                <Flex gap={10} ml={item.icon ? 36 : 0}>
                  {item.children}
                </Flex>
              )}
            </Flex>
          ))}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}

export default BhAccordion
