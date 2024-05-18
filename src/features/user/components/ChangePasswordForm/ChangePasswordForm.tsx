import {
  VStack,
  FormControl,
  FormLabel,
  TextField,
  FormHelperText,
  ButtonGroup,
  Button,
  FormErrorMessage,
} from '@channel.io/bezier-react'
import { useFormik } from 'formik'
import { useUpdateUserPasswordMutation } from '@/features/user/queries/useUpdateUserPasswordMutation'

export function ChangePasswordForm() {
  const { mutateAsync } = useUpdateUserPasswordMutation()
  const {
    handleSubmit,
    values,
    handleChange,
    dirty,
    isValid,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: {
      'new-password': '',
    },
    validate: (values) => {
      const errors: Record<string, string> = {}

      if (!values['new-password']) {
        errors.password = '비밀번호를 입력해주세요.'
      }

      if (values['new-password'].length < 8) {
        errors.password = '비밀번호는 8자 이상이여야 합니다.'
      }

      return errors
    },
    onSubmit: async (values, { resetForm }) => {
      await mutateAsync(values['new-password'])
      resetForm()
    },
  })

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={8}>
        <FormControl hasError={!!errors['new-password']}>
          <FormLabel>비밀번호 변경하기</FormLabel>
          <TextField
            name="new-password"
            type="password"
            value={values['new-password']}
            onChange={handleChange}
            placeholder="새로운 비밀번호를 입력해주세요."
          />
          <FormErrorMessage>{errors['new-password']}</FormErrorMessage>
          <FormHelperText>비밀번호는 8자 이상이여야 합니다.</FormHelperText>
        </FormControl>

        {dirty && (
          <ButtonGroup justify="start">
            <Button
              disabled={!isValid}
              loading={isSubmitting}
              type="submit"
              text="변경하기"
            />
            <Button
              type="reset"
              colorVariant="monochrome-dark"
              styleVariant="secondary"
              text="취소"
            />
          </ButtonGroup>
        )}
      </VStack>
    </form>
  )
}
