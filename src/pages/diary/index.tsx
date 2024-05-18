import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useGetThisUserQueryObject } from '@/features/user/queries/useGetThisUserQueryObject'

export default function Page() {
  const router = useRouter()
  const { data } = useQuery(useGetThisUserQueryObject())

  useEffect(() => {
    if (data?.id) {
      router.push(`/diary/${data.id}`)
    }
  }, [data?.id, router])

  return null
}
