import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  TextArea,
  VStack,
  useToast,
} from '@channel.io/bezier-react'
import { useFormik } from 'formik'
import { isEmpty, noop } from 'lodash-es'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import { useCreateDiaryMutation } from '@/features/diary/queries/useCreateDiaryMutation'
import { PageLayout } from '@/layout/PageLayout'

export default function Page() {
  const toast = useToast()
  const router = useRouter()
  const { mutateAsync } = useCreateDiaryMutation()
  const {
    handleSubmit,
    submitForm,
    handleChange,
    values,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: {
      content: '',
    },
    onSubmit: async (value) => {
      await mutateAsync(value.content)
      toast.addToast('일기가 성공적으로 저장되었습니다.', {
        appearance: 'success',
      })
      router.push('/diary')
    },
  })

  return (
    <VStack height="100vh">
      <form
        onSubmit={handleSubmit}
        style={{ flex: 1 }}
      >
        <VStack padding={16}>
          <FormControl hasError={!!errors.content}>
            <FormLabel>일기의 내용 작성하기</FormLabel>
            <TextArea
              name="content"
              value={values.content}
              onChange={handleChange}
              placeholder="일기의 내용을 작성해주세요."
              minRows={24}
              maxRows={24}
            />
            <FormErrorMessage>{errors.content}</FormErrorMessage>
          </FormControl>
        </VStack>
      </form>
      <Box
        padding={16}
        position="sticky"
        bottom={0}
        left={0}
      >
        <ButtonGroup>
          <Button
            onClick={isSubmitting ? noop : submitForm}
            disabled={isEmpty(values.content)}
            loading={isSubmitting}
            style={{ flex: 1 }}
            text="저장하기"
          />
        </ButtonGroup>
      </Box>
    </VStack>
  )
}

Page.getLayout = (page: ReactNode) => (
  <PageLayout
    title="일기 작성하기"
    description="지금 이 상황을 기록해볼까요?"
    backLink="/diary"
  >
    {page}
  </PageLayout>
)
