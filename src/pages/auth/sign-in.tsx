import type { ReactNode } from 'react'
import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Text,
  TextField,
  VStack,
  useToast,
} from '@channel.io/bezier-react'
import { useFormik } from 'formik'
import { some } from 'lodash'
import { map, isEmpty } from 'lodash-es'
import { useRouter } from 'next/router'
import { AuthApiError } from '@supabase/supabase-js'
import Link from 'next/link'
import { BasicLayout } from '@/layout/BasicLayout'
import { useSignInMutation } from '@/features/user/queries/useSignInMutation'

export default function Page() {
  const toast = useToast()
  const router = useRouter()
  const { mutateAsync } = useSignInMutation()

  const { handleSubmit, handleChange, values, errors, isSubmitting } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validateOnChange: true,
      validate: (values) => {
        const errors: Record<string, string> = {}

        if (!values.email) {
          errors.email = '이메일을 입력해주세요.'
        }

        if (values.email.match(/[^@]+@[^.]+\..+/) === null) {
          errors.email = '올바른 이메일 형식이 아닙니다.'
        }

        if (!values.password) {
          errors.password = '비밀번호를 입력해주세요.'
        }

        return errors
      },
      onSubmit: async (values, { setFieldError }) => {
        try {
          await mutateAsync({
            email: values.email,
            password: values.password,
          })
          router.push('/diary')
        } catch (error) {
          if (error instanceof AuthApiError) {
            setFieldError('email', '이메일 또는 비밀번호가 올바르지 않습니다.')
            return
          }

          toast.addToast('로그인에 실패했습니다.', { preset: 'error' })
        }
      },
    })

  return (
    <Center height="100vh">
      <form onSubmit={handleSubmit}>
        <VStack
          spacing={16}
          maxWidth={300}
          width="100vw"
        >
          <Text
            typo="24"
            bold
          >
            Diary
          </Text>
          <Text color="txt-black-darker">다시 만나 반가워요!</Text>

          <FormControl hasError={!!errors.email}>
            <FormLabel>이메일</FormLabel>
            <TextField
              autoFocus
              name="email"
              placeholder="user-name@example.com"
              value={values.email}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl hasError={!!errors.password}>
            <FormLabel>비밀번호</FormLabel>
            <TextField
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              value={values.password}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
            <FormHelperText>비밀번호는 8자 이상이여야 합니다.</FormHelperText>
          </FormControl>

          <VStack spacing={4}>
            <Button
              type="submit"
              size="l"
              text="로그인하기"
              loading={isSubmitting}
              disabled={some(map(values, isEmpty)) || !isEmpty(errors)}
            />
            <Link
              href="/"
              legacyBehavior
            >
              <Button
                text="돌아가기"
                size="s"
                colorVariant="monochrome-dark"
                styleVariant="tertiary"
              />
            </Link>
          </VStack>
        </VStack>
      </form>
    </Center>
  )
}

Page.getLayout = (page: ReactNode) => <BasicLayout>{page}</BasicLayout>
