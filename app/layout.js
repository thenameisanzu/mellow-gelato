import './globals.css'
import { Bagel_Fat_One, Outfit } from 'next/font/google'
const display = Bagel_Fat_One({ subsets: ['latin'], weight: '400', variable: '--font-display' })
const body = Outfit({ subsets: ['latin'], variable: '--font-body' })
export const metadata = { title: 'Mellow Gelato', description: 'Small-batch gelato made fresh every morning.' }
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#E7DBFF' }
export default function RootLayout({ children }) {
  return (<html lang="en" className={`${display.variable} ${body.variable}`}><body>{children}</body></html>)
}
