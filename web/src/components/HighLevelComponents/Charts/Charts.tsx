import React, { useState, useEffect } from 'react'

import { Flex, Box, Text } from '@mantine/core'
import { IconHome, IconPhone, IconCircleFilled } from '@tabler/icons-react'
import moment from 'moment'
import AcuteEvent from 'public/images/acute.png'
import { FaRegCircle } from 'react-icons/fa'
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  Dot,
} from 'recharts'

import './index.css'
import { ChartsProps, Month } from 'src/pages/MemberPanelPage/data'

const currentDate = '11/29/2024'

const Charts: React.FC<ChartsProps> = ({ chartData, chartWidth }) => {
  interface Marker {
    month: string
    visit: boolean
    call: boolean
    current: number
    date: string
    position: number
    acute: boolean
    desired?: number | null
    projected?: number | null
    readings?: {
      date: string
      current: number
      acute: boolean
      desired?: number | null
      projected?: number | null
    }[]
  }
  const [HCBSData, setHCBSData] = useState<Marker[]>([])
  const [data] = useState<Month[]>(chartData)
  // chart height calculations
  const memberProfileHeight = getComputedStyle(document.documentElement)
    .getPropertyValue('--memberProfileHeight')
    .replace('px', '') // Convert to number

  const computedHeight = (window.innerHeight - +memberProfileHeight - 60) / 2
  const chartHeight = computedHeight > 350 ? computedHeight : 350
  // chart height calculations ends

  const preprocessData = (data) => {
    const monthDays = { Sep: 30, Oct: 31, Nov: 30, Dec: 31, Jan: 31, Feb: 28 }
    const markers = []
    if (data.length > 0) {
      data.forEach((currentMonth, i) => {
        const nextMonth = data[i + 1]?.month || null
        // Ensure every month gets at least one entry (even if null)
        if (
          !currentMonth.readings.length ||
          currentMonth.readings[0].current === null
        ) {
          markers.push({
            month: currentMonth.month,
            visit: currentMonth.visit,
            call: currentMonth.call,
            current: null,
            date: null,
            position: i,
            acute: null,
            desired: null,
            projected: null,
          })
        }
        // Create markers for each reading
        currentMonth.readings.forEach((reading) => {
          const readingDate = reading.date
            ? moment(reading.date).format('MM/DD/YYYY')
            : null
          if (reading.current !== null && readingDate) {
            const [, day] = readingDate.split('/').map(Number)
            const position = nextMonth
              ? i + day / monthDays[currentMonth.month]
              : i
            markers.push({
              month: currentMonth.month,
              visit: currentMonth.visit,
              call: currentMonth.call,
              current: reading.current,
              date: readingDate,
              position,
              acute: reading.acute,
              desired: reading.desired || null,
              projected: reading.projected || null,
            })
          }
        })
      })

      // Handle projected and desired markers
      const lastMonthIndex = data.length - 1
      const lastMonthData = data[lastMonthIndex]?.readings?.slice(-1)[0] || null // Use `slice(-1)` for the last element

      const resolvedCurrentMonthIndex = [...data]
        .reverse()
        .findIndex((d) =>
          d.readings.some((reading) => reading.current !== null)
        )
      const adjustedCurrentMonthIndex =
        resolvedCurrentMonthIndex !== -1
          ? data.length - 1 - resolvedCurrentMonthIndex
          : 0
      const currentMonthName = data[adjustedCurrentMonthIndex].month
      // Checks for the last marker with current value
      const getLastCurrentMarker = [...markers]
        .reverse()
        .find((marker) => marker.month === currentMonthName)

      if (lastMonthData && lastMonthData.date) {
        const lastMonthPosition = lastMonthIndex
        const lastMonthDate = moment(lastMonthData.date).format('MM/DD/YYYY')
        const addLineMarker = (type, startValue, endValue) => {
          markers.push(
            {
              month: currentMonthName,
              current: null,
              date: currentDate,
              position: getLastCurrentMarker.position,
              acute: false,
              lineStart: true,
              desired: type === 'desired' ? startValue : null,
              projected: type === 'projected' ? startValue : null,
            },
            {
              month: data[lastMonthIndex].month,
              current: null,
              date: lastMonthDate,
              position: lastMonthPosition,
              acute: false,
              lineStart: false,
              desired: type === 'desired' ? endValue : null,
              projected: type === 'projected' ? endValue : null,
            }
          )
        }

        if (lastMonthData.desired !== null) {
          addLineMarker(
            'desired',
            getLastCurrentMarker.current,
            lastMonthData.desired
          )
        }
        if (lastMonthData.projected !== null) {
          addLineMarker(
            'projected',
            getLastCurrentMarker.current,
            lastMonthData.projected
          )
        }
      }
      return markers
    }
  }

  useEffect(() => {
    if (chartData.length === 0) return
    const HCBSData = preprocessData(chartData)
    setHCBSData(HCBSData)
  }, [chartData])

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean
    payload?: { payload: { current: number; date: string } }[]
  }) => {
    if (active && payload && payload.length) {
      const { current, date } = payload[0].payload
      const formatDate = moment(date, 'MM/DD/YYYY').format('L')
      const areSameDay = moment(currentDate, 'YYYY-MM-DD').isSame(
        moment(formatDate, 'YYYY-MM-DD'),
        'day'
      )
      return (
        <Box
          style={
            current !== null
              ? {
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  padding: '5px 7px',
                  borderRadius: '5px',
                  height: 'auto',
                }
              : { display: 'none' }
          }
        >
          <Text size="xs">
            {areSameDay ? (
              <>
                <strong>Today, </strong>
                {formatDate}
              </>
            ) : (
              formatDate || 'N/A'
            )}{' '}
          </Text>
          <Text
            size="xs"
            bg={'#FCC8CC'}
            w={'fit-content'}
            style={{ padding: '2px 4px', borderRadius: '5px' }}
          >
            {current !== null ? current : 'N/A'}
          </Text>
        </Box>
      )
    }
    return null
  }

  const AcuteIcon = ({ size }) => {
    return (
      <>
        <img
          src={AcuteEvent}
          alt="event"
          style={{ width: size, height: size }}
        />
      </>
    )
  }

  const CustomLegend = () => {
    return (
      <Flex justify={'center'} gap={20} style={{ marginTop: '40px' }}>
        <Flex className="ico-center">
          <IconPhone size={16} /> <Text size="xs">CHW Calls</Text>
        </Flex>
        <Flex className="ico-center">
          <IconHome size={16} /> <Text size="xs">CHW Visits</Text>
        </Flex>
        <Flex className="ico-center">
          {' '}
          <AcuteIcon size={16} /> <Text size="xs">Acute Event</Text>
        </Flex>
      </Flex>
    )
  }

  const CustomMessageICO = ({ value, background }) => {
    return (
      <div
        style={{
          backgroundColor: background,
          color: '#fff',
          textAlign: 'center',
          borderRadius: '20%',
          width: '30px',
          height: '30px',
          lineHeight: '30px',
          fontSize: '12px',
          position: 'absolute',
          top: 0,
          left: '3px',
          zIndex: 2,
        }}
      >
        {value}
      </div>
    )
  }

  const CustomXAxisTick = ({
    x,
    y,
    payload,
  }: {
    x?: number
    y?: number
    payload?: { value: number }
  }) => {
    const index = Math.floor(payload.value)

    const currentMonth = data?.[index]
    if (!currentMonth) return null

    const { month, visit, call } = currentMonth
    const currentMonthValue = moment(currentDate, 'YYYY-MM-DD')
      .add(1, 'month')
      .month()
    const isCurrentMonth =
      moment(`${month} 1, 2024`, 'MMMM D, YYYY').month() === currentMonthValue

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="middle"
          fill="#666"
          fontSize="12px"
        >
          {month}
        </text>
        <g transform="translate(0, 25)">
          {visit && (
            <>
              {isCurrentMonth && (
                <circle
                  cx={visit && call ? -15 : 0}
                  cy={10}
                  r={13}
                  fill="var(--text-grey)"
                />
              )}
              <IconHome
                size={20}
                x={visit && call ? -25 : -10}
                style={{ color: isCurrentMonth ? 'white' : 'var(--text-grey)' }}
              />
            </>
          )}
          {call && (
            <>
              {isCurrentMonth && (
                <circle
                  cx={visit && call ? 18 : 0}
                  cy={10}
                  r={13}
                  fill="var(--text-grey)"
                />
              )}
              <IconPhone
                size={20}
                x={visit && call ? 9 : -9}
                style={{ color: isCurrentMonth ? 'white' : 'var(--text-grey)' }}
              />
            </>
          )}
        </g>
      </g>
    )
  }

  return (
    <Box mt={40}>
      {HCBSData?.length > 0 ? (
        <ComposedChart
          width={chartWidth}
          height={chartHeight}
          data={HCBSData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="32.09%" stopColor="#FFF" stopOpacity={1} />
              <stop offset="78.89%" stopColor="#EEE" stopOpacity={1} />
            </linearGradient>
          </defs>

          {/* Background Grid */}
          <CartesianGrid stroke="#fff" />

          {/* X and Y Axes */}
          <XAxis
            dataKey="position"
            ticks={[0, 1, 2, 3, 4, 5]}
            tickFormatter={(value) => data[Math.floor(value)]?.month}
            type="number"
            domain={[0, data.length - 1]}
            allowDecimals={false}
            tick={<CustomXAxisTick />}
          />
          <YAxis
            label={{ value: 'Score', angle: -90, position: 'insideLeft' }}
          />

          {/* Tooltip and Legend */}
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />

          {/* Area for Background */}
          <Area
            type="monotone"
            dataKey="current"
            fill="url(#areaGradient)"
            stroke="#8884d8"
          />

          {/* Lines for Other Data */}
          <Line
            key={`line-desired`}
            type="monotone"
            dataKey="desired"
            stroke="#000"
            strokeDasharray="5 5"
            dot={({ cx, cy, payload, index }) =>
              payload.desired !== null && !payload.lineStart ? (
                <foreignObject
                  key={`foreign-desired-${index}`}
                  x={cx - 20}
                  y={cy - 41}
                  width={50}
                  height={50}
                  style={{ alignContent: 'end' }}
                >
                  <CustomMessageICO
                    key={`ico-desired-${index}`}
                    value={payload.desired}
                    background="var(--text-grey)"
                  />
                  <FaRegCircle
                    key={`circle-desired-${index}`}
                    size={20}
                    color="var(--text-grey)"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '9px',
                      background: '#fff',
                    }}
                  />
                </foreignObject>
              ) : null
            }
            activeDot={false}
          />
          <Line
            key={`line-projected`}
            type="monotone"
            dataKey="projected"
            stroke="#000"
            strokeDasharray="5 5"
            dot={({ cx, cy, payload, index }) =>
              payload.projected !== null && !payload.lineStart ? (
                <foreignObject
                  key={`foreign-projected-${index}`}
                  x={cx - 20}
                  y={cy - 41}
                  width={50}
                  height={50}
                  style={{ alignContent: 'end' }}
                >
                  <CustomMessageICO
                    key={`ico-projected-${index}`}
                    value={payload.projected}
                    background={'#E87271'}
                  />
                  <FaRegCircle
                    key={`circle-projected-${index}`}
                    size={20}
                    color="#E87271"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '9px',
                      background: '#fff',
                    }}
                  />
                </foreignObject>
              ) : null
            }
            activeDot={false}
          />
          <Line
            key={`line-current`}
            type="monotone"
            dataKey="current"
            stroke="#000"
            dot={({ cx, cy, payload, index }) =>
              payload.current !== null ? (
                <React.Fragment key={`fragment-current-${index}`}>
                  {index === 0 ? null : moment(
                      currentDate,
                      'YYYY-MM-DD'
                    ).month() === moment(payload.date, 'YYYY-MM-DD').month() ? (
                    <foreignObject
                      key={`foreign-current-month-${index}`}
                      x={cx - 10}
                      y={cy - 10}
                      width={20}
                      height={20}
                    >
                      <IconCircleFilled
                        key={`icon-circle-filled-${index}`}
                        size={20}
                        color={'#E87271'}
                        className="current-ico"
                      />
                    </foreignObject>
                  ) : payload.acute ? (
                    <foreignObject
                      key={`foreign-current-acute-${index}`}
                      x={cx - 10}
                      y={cy - 10}
                      width={20}
                      height={20}
                    >
                      <AcuteIcon key={`acute-icon-${index}`} size={16} />
                    </foreignObject>
                  ) : (
                    <Dot
                      key={`dot-current-${index}`}
                      cx={cx}
                      cy={cy}
                      r={6}
                      fill="#E87271"
                    />
                  )}
                </React.Fragment>
              ) : null
            }
            activeDot={false}
          />
        </ComposedChart>
      ) : (
        <Text>No data available</Text>
      )}
    </Box>
  )
}

export default Charts
