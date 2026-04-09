'use client'

import dynamic from 'next/dynamic'

const MatrixRain = dynamic(() => import('@/app/components/MatrixRain'), {
  ssr: false,
})

export default function MatrixRainLoader() {
  return <MatrixRain />
}
