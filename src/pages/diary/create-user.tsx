import type { ReactNode } from 'react'
import {
  VStack,
  Text,
  FormControl,
  FormLabel,
  TextField,
  Select,
  ListItem,
  Button,
} from '@channel.io/bezier-react'
import { BasicLayout } from '@/layout/BasicLayout'

export default function Page() {
  return (
    <VStack height="100vh">
      <VStack
        as="header"
        padding={16}
        spacing={4}
      >
        <Text
          as="p"
          typo="24"
          bold
        >
          만나서 반가워요!
        </Text>
        <Text
          as="p"
          typo="14"
          color="txt-black-darker"
        >
          당신에 대해 잘 알아가고 싶어요. <br /> 혹시 괜찮으시다면 아래 질문들에
          답변을 해주실수 있으신가요?
        </Text>
      </VStack>
      <form style={{ flex: 1 }}>
        <VStack
          spacing={24}
          paddingHorizontal={16}
        >
          <FormControl>
            <FormLabel>당신의 이름은 무엇인가요?</FormLabel>
            <TextField
              name="username"
              placeholder="이름을 입력해주세요."
            />
          </FormControl>

          <FormControl>
            <FormLabel>당신은 몇살인가요?</FormLabel>
            <TextField
              name="age"
              placeholder="나이를 입력해주세요"
              pattern="[0-9]{1,3}"
              inputMode="numeric"
              rightContent={<Text>살</Text>}
            />
          </FormControl>

          <FormControl>
            <FormLabel>당신을 가장 잘 나타내는 성별은 무엇인가요?</FormLabel>
            <Select
              name="gender"
              placeholder="성별을 선택해주세요"
              dropdownStyle={{
                width: '100%',
                padding: 8,
                boxSizing: 'border-box',
              }}
            >
              <ListItem
                leftContent="🙆‍♂️"
                content="남성에 더 가까운거 같아요."
              />
              <ListItem
                leftContent="🙆‍♀️"
                content="여성에 더 가까운거 같아요."
              />
              <ListItem
                leftContent="🙅"
                content="그 어디에도 속하지 않아요."
              />
            </Select>
          </FormControl>
        </VStack>
      </form>
      <VStack
        spacing={8}
        padding={16}
      >
        <Button
          size="l"
          text="저장하기"
        />
        <Button
          size="s"
          colorVariant="monochrome-dark"
          styleVariant="tertiary"
          text="지금 하고싶지 않아요"
        />
      </VStack>
    </VStack>
  )
}

Page.getLayout = (page: ReactNode) => <BasicLayout>{page}</BasicLayout>
