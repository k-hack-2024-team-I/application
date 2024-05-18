import type { ReactNode } from 'react'
import { useRef } from 'react'
import type { SelectRef } from '@channel.io/bezier-react'
import {
  VStack,
  Text,
  FormControl,
  FormLabel,
  TextField,
  Select,
  ListItem,
  Button,
  FormHelperText,
  FormErrorMessage,
  useToast,
} from '@channel.io/bezier-react'
import { useFormik } from 'formik'
import { isEmpty, map, some } from 'lodash-es'
import { useRouter } from 'next/router'
import assert from 'assert'
import {
  UserGender,
  UserGenderLabels,
  UserGenderOptions,
} from '@/features/user/constants/constants'
import { BasicLayout } from '@/layout/BasicLayout'
import { supabase } from '@/supabase/client'

export default function Page() {
  const { addToast } = useToast()
  const router = useRouter()
  const genderSelectRef = useRef<SelectRef>(null)
  const {
    handleSubmit,
    submitForm,
    values,
    handleChange,
    setFieldValue,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      'confirm-password': '',
      username: '',
      age: '',
      gender: '' as UserGender,
    },
    validateOnChange: false,
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

      if (!values['confirm-password']) {
        errors['confirm-password'] = '비밀번호를 다시 한번 입력해주세요.'
      }

      if (values.password.length < 8) {
        errors.password = '비밀번호는 8자 이상이여야 합니다.'
      }

      if (values['confirm-password'] !== values.password) {
        errors['confirm-password'] = '비밀번호가 일치하지 않습니다.'
      }

      if (!values.username) {
        errors.username = '이름을 입력해주세요.'
      }

      if (!values.age) {
        errors.age = '나이를 입력해주세요.'
      }

      if (values.age.match(/[0-9]{1,3}/) === null) {
        errors.age = '올바른 형식의 나이가 아닙니다.'
      }

      if (!values.gender) {
        errors.gender = '성별을 선택해주세요.'
      }

      return errors
    },
    onSubmit: async (value) => {
      const { data, error } = await supabase.auth.signUp({
        email: value.email,
        password: value.password,
        options: {
          captchaToken: undefined,
          data: {
            username: value.username,
            age: value.age,
            gender: value.gender,
          },
        },
      })

      if (error) {
        addToast('회원가입에 실패했습니다.', { preset: 'error' })
        return
      }

      assert(data?.user, 'data?.user is required')
      addToast(`환영합니다. ${value.username}님!`, {
        preset: 'success',
      })
      router.push(`/diary/${data.user.id}`)
    },
  })

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
      <form
        style={{ flex: 1 }}
        onSubmit={handleSubmit}
      >
        <VStack
          spacing={24}
          paddingHorizontal={16}
          paddingBottom={32}
        >
          <FormControl hasError={!!errors.email}>
            <FormLabel>로그인에 사용할 이메일을 입력해주세요.</FormLabel>
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
            <FormLabel>로그인에 사용할 비밀번호를 입력해주세요.</FormLabel>
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

          <FormControl hasError={!!errors['confirm-password']}>
            <FormLabel>비밀번호를 다시 입력해주세요.</FormLabel>
            <TextField
              type="password"
              name="confirm-password"
              onChange={handleChange}
              value={values['confirm-password']}
              placeholder="비밀번호를 입력해주세요"
            />
            <FormErrorMessage>{errors['confirm-password']}</FormErrorMessage>
          </FormControl>

          <FormControl hasError={!!errors.username}>
            <FormLabel>당신의 이름은 무엇인가요?</FormLabel>
            <TextField
              name="username"
              placeholder="이름을 입력해주세요."
              value={values.username}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.username}</FormErrorMessage>
          </FormControl>

          <FormControl hasError={!!errors.age}>
            <FormLabel>당신은 몇살인가요?</FormLabel>
            <TextField
              name="age"
              placeholder="나이를 입력해주세요"
              pattern="[0-9]{1,3}"
              inputMode="numeric"
              rightContent={<Text>살</Text>}
              value={values.age}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.age}</FormErrorMessage>
          </FormControl>

          <FormControl hasError={!!errors.gender}>
            <FormLabel>당신을 가장 잘 나타내는 성별은 무엇인가요?</FormLabel>
            <Select
              name="gender"
              ref={genderSelectRef}
              placeholder="성별을 선택해주세요"
              text={
                values.gender &&
                (values.gender === UserGender.NonBinary
                  ? '그 어디에도 속하지 않아요'
                  : `${UserGenderLabels[values.gender]}에 더 가까운 것 같아요.`)
              }
              dropdownStyle={{
                width: '100%',
                padding: 8,
                boxSizing: 'border-box',
              }}
            >
              {UserGenderOptions.map(({ label, icon, value }) => (
                <ListItem
                  key={value}
                  leftContent={icon}
                  onClick={() => {
                    setFieldValue('gender', value)
                    genderSelectRef.current?.handleHideDropdown()
                  }}
                  content={
                    value === UserGender.NonBinary
                      ? '그 어디에도 속하지 않아요'
                      : `${label}에 더 가까운 것 같아요.`
                  }
                />
              ))}
            </Select>
            <FormErrorMessage>{errors.gender}</FormErrorMessage>
          </FormControl>
        </VStack>
      </form>
      <VStack
        position="sticky"
        bottom={0}
        left={0}
        style={{
          backgroundColor: 'rgba(47, 47, 47)',
        }}
        zIndex="floating"
        spacing={8}
        padding={16}
      >
        <Button
          size="l"
          text="저장하기"
          loading={isSubmitting}
          disabled={some(map(values, isEmpty)) || !isEmpty(errors)}
          onClick={submitForm}
        />
        {/* <Button
          size="s"
          colorVariant="monochrome-dark"
          styleVariant="tertiary"
          text="지금 하고싶지 않아요"
        /> */}
      </VStack>
    </VStack>
  )
}

Page.getLayout = (page: ReactNode) => <BasicLayout>{page}</BasicLayout>
