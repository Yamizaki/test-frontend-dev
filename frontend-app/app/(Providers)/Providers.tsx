'use client'
import { MINUTE } from '@/const/global'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'

interface Props {
  children: ReactNode
}
export default function Providers({ children }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * MINUTE,
            refetchOnWindowFocus: false,
            gcTime: 10 * MINUTE,
            refetchInterval: 5 * MINUTE
          }
        }
      })
  )
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster position='top-right' richColors/>
      </QueryClientProvider>
    </>
  )
}
