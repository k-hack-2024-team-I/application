import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/supabase/client'

export function useCreateDiaryMutation() {
  return useMutation({
    mutationFn: async (content: string) =>
      supabase
        .from('diary')
        .insert({ content })
        .select('id')
        .single()
        .throwOnError(),
  })
}
