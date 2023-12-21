import connectDB from '@/lib/db'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'

export default async function Home() {
  return (
    <UserButton
      afterSignOutUrl='/'
    />
  )
}
