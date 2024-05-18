import { Center, Spinner, VStack, Text } from '@channel.io/bezier-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  ResponsiveContainer,
} from 'recharts'
import { useSuspenseQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useMemo } from 'react'
import { SSRSafeSuspense } from '@/components/SSRSafeSuspense'
import { useGetDiaryMoodStatQuery } from './useGetDiaryMoodStatQuery'

interface MoodChartProps {
  userId: string
  endDate: Date
  limit?: number
}

export function MoodChart({ userId, endDate, limit = 10 }: MoodChartProps) {
  const { data } = useSuspenseQuery(
    useGetDiaryMoodStatQuery(userId, { endDate, limit })
  )

  const moodScores = useMemo(
    () =>
      data?.map((item) => ({
        name: format(item.created_at ?? '', 'yyyy-MM-dd HH:mm'),
        score: item.mood_score,
      })),
    [data]
  )

  const moodDistribution = useMemo(() => {
    const distribution = data?.reduce(
      (acc, item) => {
        acc[item.mood ?? 'UNKNOWN'] = (acc[item.mood ?? 'UNKNOWN'] ?? 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    return Object.keys(distribution).map((key) => ({
      name: key,
      value: distribution[key],
    }))
  }, [data])

  return (
    <VStack
      height={900}
      spacing={12}
    >
      <Text
        typo="24"
        bold
        align="center"
      >
        최근 {limit}건의 기분 점수
      </Text>
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <LineChart
          width={500}
          height={300}
          data={moodScores}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ background: 'var(--bg-white-high)' }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="score"
            stroke="var(--bgtxt-blue-normal)"
          />
        </LineChart>
      </ResponsiveContainer>

      <Text
        typo="24"
        bold
        align="center"
      >
        최근 {limit}건의 기분 분포
      </Text>
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <PieChart
          width={400}
          height={400}
        >
          <Pie
            data={moodDistribution}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="var(--bgtxt-blue-normal)"
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              percent,
              index,
            }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5
              const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180)
              const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180)

              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                >
                  {`${moodDistribution[index].name} ${percent.toFixed(2) * 100}%`}
                </text>
              )
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </VStack>
  )
}

export default function SuspenseMoodChart(props: MoodChartProps) {
  return (
    <SSRSafeSuspense
      fallback={
        <Center height={300}>
          <Spinner color="txt-black-dark" />
        </Center>
      }
    >
      <MoodChart {...props} />
    </SSRSafeSuspense>
  )
}
