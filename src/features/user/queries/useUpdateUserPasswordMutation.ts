import { useMutation } from '@tanstack/react-query'
import { useToast } from '@channel.io/bezier-react'
import { supabase } from '@/supabase/client'

export function useUpdateUserPasswordMutation() {
  const toast = useToast()

  return useMutation({
    mutationFn: async (newPassword: string) =>
      supabase.auth.updateUser({
        password: newPassword,
      }),
    onSuccess: () => {
      toast.addToast('비밀번호가 변경되었습니다.', { preset: 'success' })
    },
    onError: () => {
      toast.addToast('변경에 실패했습니다.', { preset: 'error' })
    },
  })
}
