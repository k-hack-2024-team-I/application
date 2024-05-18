import { MenuIcon, NoteWritingIcon } from '@channel.io/bezier-icons'
import {
  HStack,
  VStack,
  Text,
  ButtonGroup,
  Button,
  Avatar,
  Box,
  Tabs,
  TabList,
  TabItem,
  TabItems,
  TabContent,
} from '@channel.io/bezier-react'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BasicLayout } from '@/layout/BasicLayout'

export default function Page() {
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
          <Button
            size="l"
            leftContent={NoteWritingIcon}
            colorVariant="monochrome-dark"
            styleVariant="tertiary"
          />
          <Button
            size="l"
            leftContent={MenuIcon}
            colorVariant="monochrome-dark"
            styleVariant="tertiary"
          />
        </ButtonGroup>
      </HStack>
      <HStack
        as="header"
        align="center"
        justify="between"
        paddingHorizontal={16}
      >
        <Avatar
          name="UserProfilePic"
          avatarUrl="https://avatars.githubusercontent.com/u/42037851?v=4"
          size="90"
        />

        <HStack
          spacing={32}
          paddingRight={24}
        >
          {/* TODO(@nabi-chan): 일기 카운트 */}
          <VStack align="center">
            <Text bold>310</Text>
            <Text>일기</Text>
          </VStack>

          {/* TODO(@nabi-chan): 팔로워 카운트 */}
          <VStack align="center">
            <Text bold>0</Text>
            <Text>팔로잉</Text>
          </VStack>

          {/* TODO(@nabi-chan): 팔로잉 카운트 */}
          <VStack align="center">
            <Text bold>0</Text>
            <Text>팔로워</Text>
          </VStack>
        </HStack>
      </HStack>
      <VStack
        as="aside"
        paddingTop={16}
        paddingHorizontal={16}
      >
        <HStack
          spacing={8}
          align="center"
        >
          <Text
            typo="16"
            truncated
            bold
          >
            유저의 이름유저의 이름유저의 이름유저의 이름유저의 이름유저의
            이름유저의 이름유저의 이름유저의 이름유저의 이름유저의 이름
          </Text>
          <Text
            typo="14"
            color="txt-black-dark"
          >
            she/her
          </Text>
        </HStack>
        <Text
          typo="16"
          color="txt-black-darker"
          truncated={3}
        >
          당신을 나타내는 한마디를 입력해보세요. 당신을 나타내는 한마디를
          입력해보세요. 당신을 나타내는 한마디를 입력해보세요. 당신을 나타내는
          한마디를 입력해보세요. 당신을 나타내는 한마디를 입력해보세요. 당신을
          나타내는 한마디를 입력해보세요. 당신을 나타내는 한마디를 입력해보세요.
          당신을 나타내는 한마디를 입력해보세요. 당신을 나타내는 한마디를
          입력해보세요.
        </Text>
      </VStack>
      <Box
        paddingTop={16}
        paddingHorizontal={16}
      >
        <ButtonGroup justify="start">
          <Button
            style={{ flex: 1 }}
            styleVariant="secondary"
            colorVariant="monochrome-dark"
            text="프로필 수정하기"
          />
        </ButtonGroup>
      </Box>
      <Box paddingTop={16}>
        <Tabs value="diary">
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
            <Box
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 2,
              }}
            >
              {[...Array(9)].map((_, index) => (
                <Link
                  key={index}
                  href={`/diary/user-id/123456`}
                >
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      aspectRatio: '1 / 1',
                    }}
                    src="https://avatars.githubusercontent.com/u/1234?v=4"
                    width={300}
                    height={300}
                    alt=""
                  />
                </Link>
              ))}
            </Box>
          </TabContent>
          <TabContent value="mood_chart" />
        </Tabs>
      </Box>
    </VStack>
  )
}

Page.getLayout = (page: ReactNode) => <BasicLayout>{page}</BasicLayout>
