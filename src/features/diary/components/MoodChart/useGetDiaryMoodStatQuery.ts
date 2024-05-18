import type { QueryOptions } from '@tanstack/react-query'
import { supabase } from '@/supabase/client'

export function useGetDiaryMoodStatQuery(
  userId: string,
  filter: {
    endDate: Date
    limit?: number
  }
) {
  return {
    queryKey: ['diary-mood-stat', userId, filter],
    queryFn: async () =>
      supabase
        .from('diary')
        .select('created_at, mood_score, mood')
        .eq('author', userId)
        .lte('created_at', filter.endDate.toISOString())
        .limit(filter.limit ?? 10)
        .order('created_at', { ascending: true })
        .throwOnError()
        .then((res) => res.data ?? []),
  } satisfies QueryOptions
}
