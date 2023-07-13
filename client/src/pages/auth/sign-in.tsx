import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function SignIn() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
     <form>
        <input placeholder='email' type="text" />
        <input placeholder='password' type="text" />
     </form>
    </main>
  )
}