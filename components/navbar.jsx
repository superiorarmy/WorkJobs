"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import UserAuth from "./auth/user"
import Image from "next/image"
import { FaBell } from "react-icons/fa"

const Navbar = () => {
    const ref = useRef(null)
    const { data: session } = useSession()
    const [userEntry, setUserEntry] = useState(false)
    const [y, setY] = useState(0)
    const [triggerNavbar, setTriggerNavbar] = useState(true)
    const [dropDown, setDropDown] = useState(false)

    useEffect(() => {
        const scroll = () => {
            const st = window.pageYOffset || document.documentElement.scrollTop
            if (st > y) {
                setTriggerNavbar(false)
            } else {
                setTriggerNavbar(true)
            }
            setY(st <= 0 ? 0 : st)
        }

        window.addEventListener("scroll", scroll)
        return () => {
            window.removeEventListener("scroll", scroll)
        }
    }, [y])

    useEffect(() => {
        if (userEntry) {
            setTriggerNavbar(false)
        } else {
            setTriggerNavbar(true)
        }
    }, [userEntry])

    useEffect(() => {
        console.log(dropDown)
        const click = (e) => {
            if (!ref.current.contains(e.target)) {
                setDropDown(false)
            }
        }
        let id
        if (dropDown) {
            id = setTimeout(() => {
                window.addEventListener("click", click, { once: true })
            }, 0)
        } else {
            window.removeEventListener("click", click, { once: true })
        }

        return () => {
            if (dropDown) {
                window.removeEventListener("click", click, { once: true })
            }
            clearTimeout(id)
        }
    }, [dropDown])

    const dropDownItems = [
        { name: "Profile", onClick: () => {} },
        { name: "Resume", onClick: () => {} },
        { name: "History", onClick: () => {} },
        { name: "Settings", onClick: () => {} },
        { name: "Terms & Policy", onClick: () => {} },
        { name: "Sign Out", onClick: () => signOut() },
    ]
    return (
        <>
            <header
                className={`sticky top-0 rounded-b-[30px] bg-white text-blue-950 px-14 py-1 text-sm z-50 transition duration-700 ${
                    triggerNavbar ? "translate-y-0" : "-translate-y-full"
                }`}
            >
                <div className='container mx-auto flex justify-between items-center h-16'>
                    <div className='text-lg text-blue-950 hover:cursor-pointer hover:text-blue-600 ease duration-300'>
                        Work Jobs
                    </div>
                    <div className='flex items-center'>
                        <button className='px-4 py-2 bg-blue-900 text-white rounded-md ease duration-300 hover:bg-blue-700'>
                            EN
                        </button>
                        {session?.user ? (
                            <>
                                <FaBell className='w-[30px] h-[30px] mx-3 cursor-pointer' />
                                <div
                                    className='rounded-full flex items-center cursor-pointer relative'
                                    onClick={() => setDropDown(true)}
                                >
                                    <Image
                                        className='rounded-full'
                                        width={35}
                                        height={35}
                                        src={session?.user.image}
                                        alt={session?.user.name}
                                    />
                                    <span className='ml-2 text-md'>
                                        {session?.user.name}
                                    </span>
                                    {/* DropDown */}
                                    <ul
                                        ref={ref}
                                        className={`absolute left-0 bg-white px-6 py-4 transition duration-700 ${
                                            dropDown
                                                ? "top-full"
                                                : "-top-[500px]"
                                        }`}
                                    >
                                        {dropDownItems.map((item) => (
                                            <li
                                                key={`dropdown-${item.name.toLowerCase()}`}
                                                className={`mb-1 ${
                                                    item.name === "Sign Out"
                                                        ? "text-red-500"
                                                        : ""
                                                }`}
                                                onClick={item.onClick}
                                            >
                                                {item.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                <button className='mx-8 text-blue-950 hover:underline underline-offset-2 hover:cursor-pointer hover:text-blue-600 ease duration-300'>
                                    For Enterprise
                                </button>
                                <button
                                    className='button_inverse'
                                    onClick={() => setUserEntry(true)}
                                >
                                    Sign In
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <UserAuth userEntry={userEntry} setUserEntry={setUserEntry} />
        </>
    )
}

export default Navbar
