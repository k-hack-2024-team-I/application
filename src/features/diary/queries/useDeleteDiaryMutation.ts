import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@channel.io/bezier-react'
import { supabase } from '@/supabase/client'

export function useDeleteDiaryMutation() {
  const toast = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ diaryId }: { diaryId: string; userId?: string }) =>
      supabase.from('diary').delete().eq('id', diaryId).single().throwOnError(),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          if (!userId) {
            return query.queryKey[0] === 'diary'
          }
          return query.queryKey[0] === 'diary' && query.queryKey[1] === userId
        },
      })
      toast.addToast('일기가 성공적으로 삭제되었습니다.', {
        preset: 'success',
      })
    },
  })
}
