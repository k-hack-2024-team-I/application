import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@channel.io/bezier-react'
import { every, isEmpty, omitBy } from 'lodash-es'
import { supabase } from '@/supabase/client'
import type { UserGender } from '@/features/user/constants/constants'

export function useUpdateUserInfoMutation() {
  const toast = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      age,
      avatarUrl,
      description,
      username,
      gender,
    }: {
      avatarUrl?: string
      username?: string
      description?: string
      age?: string
      gender?: UserGender
    }) =>
      supabase.auth
        .updateUser({
          data: omitBy(
            {
              age,
              avatar_url: avatarUrl,
              description,
              username,
              gender,
            },
            (value) => isEmpty(value)
          ),
        })
        .then((res) => res.data.user!),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          every([query.queryKey[0] === 'user', query.queryKey[1] === 'this']),
      })
      toast.addToast('회원정보가 변경되었습니다.', { preset: 'success' })
    },
  })
}
