import "./globals.css"
import Navbar from "@/components/navbar"
import Provider from "@/components/provider"
import { SessionProvider } from "next-auth/react"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({ subsets: ["latin"] })

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
}

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className={montserrat.className}>
                <Provider>
                    <Navbar />
                </Provider>
                {children}
            </body>
        </html>
    )
}
