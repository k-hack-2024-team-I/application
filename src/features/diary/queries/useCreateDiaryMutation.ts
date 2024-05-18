import { useMutation } from '@tanstack/react-query'
import { axios } from '@/utils/axios'

export function useCreateDiaryMutation() {
  return useMutation({
    mutationFn: async (content: string) => axios.post('/diary', { content }),
  })
}
