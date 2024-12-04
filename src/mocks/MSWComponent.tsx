'use client'
import { useEffect } from 'react'

export const MSWComponent = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      require('@/mocks/browser')
    }
  }, [])

  return null
}
