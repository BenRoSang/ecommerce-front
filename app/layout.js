import Header from '@/components/Header'
import './globals.css'
import { Inter } from 'next/font/google'
import CartContextProvider from '@/context/CartContext'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          <CartContextProvider>
            <Header />
            {children}
          </CartContextProvider>
        </main>
      </body>
    </html>
  )
}
