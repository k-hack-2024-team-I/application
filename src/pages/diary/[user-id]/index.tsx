import { MenuIcon, NoteWritingIcon } from '@channel.io/bezier-icons'
import {
  HStack,
  VStack,
  Text,
  ButtonGroup,
  Button,
  Box,
  Tabs,
  TabList,
  TabItem,
  TabItems,
  TabContent,
} from '@channel.io/bezier-react'
import { useMemo, type ReactNode } from 'react'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { BasicLayout } from '@/layout/BasicLayout'
import { List } from '@/features/diary/components/List'
import UserInfo from '@/features/diary/components/UserInfo'
import UserModify from '@/features/diary/components/UserModify'
import MoodChart from '@/features/diary/components/MoodChart'

export const getServerSideProps = (async (context) => ({
  props: { 'user-id': context.query['user-id'] as string },
})) satisfies GetServerSideProps

export default function Page({
  'user-id': userId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const endDate = useMemo(() => new Date(), [])

  return (
    <VStack>
      <HStack
        position="sticky"
        top={0}
        left={0}
        as="nav"
        align="center"
        justify="between"
        spacing={8}
        paddingTop={8}
        paddingBottom={8}
        paddingHorizontal={16}
        zIndex="floating"
        style={{ backgroundColor: 'rgb(47, 47, 47)' }}
      >
        <Text
          typo="24"
          bold
        >
          Diary
        </Text>

        <ButtonGroup>
          <Link
            href="/diary/create"
            legacyBehavior
          >
            <Button
              size="l"
              leftContent={NoteWritingIcon}
              colorVariant="monochrome-dark"
              styleVariant="tertiary"
            />
          </Link>
          <Button
            size="l"
            leftContent={MenuIcon}
            colorVariant="monochrome-dark"
            styleVariant="tertiary"
          />
        </ButtonGroup>
      </HStack>

      <UserInfo userId={userId} />
      <UserModify userId={userId} />

      <Box paddingTop={16}>
        <Tabs
          defaultValue="diary"
          activationMode="automatic"
        >
          <TabList>
            <TabItems style={{ width: '100%' }}>
              <TabItem
                style={{ flex: 1 }}
                value="diary"
              >
                일기
              </TabItem>
              <TabItem
                style={{ flex: 1 }}
                value="mood_chart"
              >
                기분 기록
              </TabItem>
            </TabItems>
          </TabList>

          <TabContent value="diary">
            <List userId={userId} />
          </TabContent>
          <TabContent value="mood_chart">
            <Box
              height={300}
              paddingVertical={24}
            >
              <MoodChart
                userId={userId}
                endDate={endDate}
              />
            </Box>
          </TabContent>
        </Tabs>
      </Box>
    </VStack>
  )
}

Page.getLayout = (page: ReactNode) => <BasicLayout>{page}</BasicLayout>
