'use client'

import { useEffect, useState } from 'react'

import { StoreModal } from '@/components/modals/store-modal'

export const ModalProvider = () => {
  // To prevent a hydration error.
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <StoreModal />
    </>
  )
}
