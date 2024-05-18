import type { QueryOptions } from '@tanstack/react-query'
import type { UserGender } from '@/features/user/constants/constants'
import { axios } from '@/utils/axios'

export type UserMetadata = {
  avatarUrl: string
  username: string
  description: string
  gender: UserGender
}

export function useGetUserQueryObject(userId: string) {
  return {
    queryKey: ['user', userId],
    queryFn: async () =>
      axios.get<UserMetadata>(`/user/${userId}`).then((res) => res.data),
  } satisfies QueryOptions
}
