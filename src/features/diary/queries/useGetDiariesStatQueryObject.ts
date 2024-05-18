import type { QueryOptions } from '@tanstack/react-query'
import { supabase } from '@/supabase/client'

export function useGetDiariesStatQueryObject(userId: string) {
  return {
    queryKey: ['diary', userId, 'stats'],
    queryFn: async () =>
      supabase
        .from('diary')
        .select('id', { count: 'exact', head: true })
        .eq('author', userId!)
        .throwOnError(),
  } satisfies QueryOptions
}
