import type { SelectRef } from '@channel.io/bezier-react'
import {
  VStack,
  FormControl,
  FormLabel,
  TextField,
  FormErrorMessage,
  TextArea,
  Select,
  ListItem,
  ButtonGroup,
  Button,
  Text,
  Spinner,
  Center,
} from '@channel.io/bezier-react'
import { useFormik } from 'formik'
import { useRef } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import assert from 'assert'
import {
  UserGender,
  UserGenderLabels,
  UserGenderOptions,
} from '@/features/user/constants/constants'
import { useUpdateUserInfoMutation } from '@/features/user/queries/useUpdateUserInfoMutation'
import { SSRSafeSuspense } from '@/components/SSRSafeSuspense'
import { useGetThisUserQueryObject } from '@/features/user/queries/useGetThisUserQueryObject'
import { AvatarUploader } from '@/components/AvatarUploader'

export function ChangeInfoForm() {
  const { mutateAsync } = useUpdateUserInfoMutation()
  const { data } = useSuspenseQuery(useGetThisUserQueryObject())

  const genderSelectRef = useRef<SelectRef>(null)

  const {
    handleSubmit,
    values,
    handleChange,
    setFieldValue,
    errors,
    dirty,
    isValid,
    isSubmitting,
  } = useFormik({
    initialValues: {
      avatarUrl: (data?.user_metadata.avatar_url ?? '') as string,
      username: (data?.user_metadata.username ?? '') as string,
      description: (data?.user_metadata.description ?? '') as string,
      age: (data?.user_metadata.age ?? '') as string,
      gender: data?.user_metadata.gender as UserGender,
    },
    validateOnChange: false,
    validate: (values) => {
      const errors: Record<string, string> = {}

      if (values.age && values.age.match(/[0-9]{1,3}/) === null) {
        errors.age = '올바른 형식의 나이가 아닙니다.'
      }

      return errors
    },
    onSubmit: async (value, { resetForm }) => {
      const user = await mutateAsync({
        avatarUrl: value.avatarUrl,
        age: value.age,
        description: value.description,
        username: value.username,
        gender: value.gender,
      })
      assert(user, 'user should be defined')
      resetForm({
        values: {
          avatarUrl: user.user_metadata.avatar_url,
          username: user.user_metadata.username,
          description: user.user_metadata.description,
          age: user.user_metadata.age,
          gender: user.user_metadata.gender,
        },
      })
    },
  })

  const handleUploadSuccess = (key: string) => {
    setFieldValue('avatarUrl', key)
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={24}>
        <FormControl>
          <FormLabel>프로필 사진</FormLabel>
          <AvatarUploader
            avatarUrl={values.avatarUrl}
            onUploadSuccess={handleUploadSuccess}
          />
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

        <FormControl hasError={!!errors.description}>
          <FormLabel>당신을 소개해주세요</FormLabel>
          <TextArea
            name="description"
            placeholder="당신은 어떤 사람인가요?"
            value={values.description}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.description}</FormErrorMessage>
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
        {dirty && (
          <ButtonGroup justify="start">
            <Button
              disabled={!isValid}
              loading={isSubmitting}
              type="submit"
              text="저장하기"
            />
            <Button
              colorVariant="monochrome-dark"
              styleVariant="secondary"
              type="reset"
              text="취소"
            />
          </ButtonGroup>
        )}
      </VStack>
    </form>
  )
}

export default function SuspenseChangeInfoForm() {
  return (
    <SSRSafeSuspense
      fallback={
        <Center>
          <Spinner color="txt-black-dark" />
        </Center>
      }
    >
      <ChangeInfoForm />
    </SSRSafeSuspense>
  )
}
