import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'Giuseppe Ministeri - CV',
  description: 'Senior Front End Developer',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}


export default RootLayout
