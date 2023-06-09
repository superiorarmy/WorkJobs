"use client"

import Image from "next/image"
import { getProviders, signIn, signOut } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import { BsChevronLeft } from "react-icons/bs"
import { FaFacebook, FaLine } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { FcGoogle } from "react-icons/fc"
import Input from "../input"

const UserAuth = ({ userEntry, setUserEntry }) => {
    const ref = useRef(null)
    const modal = useRef(null)
    const [haveAccount, setHaveAccount] = useState(false)
    const [normalSignIn, setNormalSignIn] = useState(false)
    useEffect(() => {
        const click = (e) => {
            e.preventDefault()
            if (!modal.current.contains(e.target)) {
                console.log(e.target)
                setUserEntry(false)
            }
        }
        const filter = ref.current
        filter.addEventListener("click", click)

        if (userEntry) {
            document.body.style.overflow = "hidden"
        } else if (document.body.style.overflow) {
            document.body.removeAttribute("style")
        }

        return () => filter.removeEventListener("click", click)
    }, [userEntry, setUserEntry])
    return (
        <section
            className={`relative ${userEntry ? "" : "pointer-events-none"}`}
            ref={ref}
        >
            <div className='fixed top-0 left-0 w-screen h-screen z-50'>
                <div
                    ref={modal}
                    className={`w-1/2 bg-gray-100 dark:bg-gray-900 rounded-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-8 transition duration-500 ${
                        userEntry
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none"
                    }`}
                >
                    {normalSignIn ? (
                        <NormalSignIn setNormalSignIn={setNormalSignIn} />
                    ) : (
                        <SignInWays setNormalSignIn={setNormalSignIn} />
                    )}
                </div>
            </div>
            <div
                className={`fixed top-0 w-full h-full bg-black z-10 ${
                    userEntry ? "opacity-70" : "opacity-0 pointer-events-none"
                }`}
            />
        </section>
    )
}

const SignInWays = ({ setNormalSignIn }) => {
    const [providers, setProviders] = useState({})
    const [dropDown, setDropDown] = useState(false)

    useEffect(() => {
        const setUpProviders = async () => {
            const res = await getProviders()
            setProviders(res)
        }

        setUpProviders()
    }, [])

    const providerIcons = {
        google: <FcGoogle className='w-auto h-[30px]' />,
        facebook: <FaFacebook className='w-auto h-[30px]' color='#4267B2' />,
        line: <FaLine className='w-auto h-[30px]' color='#06C756' />,
    }

    return (
        <div className='flex flex-col items-center justify-center mx-auto h-auto lg:py-0'>
            <a
                href='#'
                className='flex flex-col justify-center items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white cursor-pointer'
            >
                <Image
                    className='mb-2'
                    width={80}
                    height={80}
                    src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
                    alt='logo'
                />
                Work Jobs
            </a>
            <h5 className='text-md font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white cursor-pointer'>
                Sign in with your preferable way.
            </h5>

            {/* Sign in Providers */}
            {Object.values(providers).length &&
                Object.values(providers).map((provider) => (
                    <div
                        key={`${provider.id}`}
                        className='mt-5 text-md rounded bg-white text-blue-950 py-2 w-full pl-5 flex justify-start items-center gap-3 cursor-pointer'
                        onClick={() => signIn(provider.id)}
                    >
                        {providerIcons[provider.id]}
                        <span>Continue with {provider.name}</span>
                    </div>
                ))}

            {/* Normal Sign In */}
            <div
                className='mt-5 text-md rounded bg-white text-blue-950 py-2 w-full pl-5 flex justify-start items-center gap-3 cursor-pointer'
                onClick={() => setNormalSignIn(true)}
            >
                <MdEmail className='w-auto h-[30px]' color='rgb(30 64 175)' />
                <span>Continue with Email</span>
            </div>
            <p className='mt-6 text-sm font-light text-gray-500 dark:text-gray-400'>
                Don’t have an account yet?{" "}
                <a
                    href='#'
                    className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                    Sign up
                </a>
            </p>
        </div>
    )
}

const NormalSignIn = ({ setNormalSignIn }) => {
    return (
        <div className='flex flex-col items-center justify-center mx-auto h-auto lg:py-0 relative'>
            <div
                className='flex gap-2 items-center absolute left-0 top-5 cursor-pointer'
                onClick={() => setNormalSignIn(false)}
            >
                <BsChevronLeft className='w-5 h-5' color={"#fff"} />
                <span className='text-white'>Back</span>
            </div>
            <a
                href='#'
                className='cursor-pointer flex flex-col justify-center items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
            >
                <Image
                    className='mb-2'
                    width={80}
                    height={80}
                    src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
                    alt='logo'
                />
                Work Jobs
            </a>
            <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                    <h5 className='text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                        Welcome Back
                    </h5>
                    <form className='space-y-4 md:space-y-6' action='#'>
                        <Input
                            labelBg={"bg-gray-800"}
                            type='email'
                            name='email'
                            id='email'
                            label={"Your Email"}
                            placeholder='name@company.com'
                            required=''
                        />

                        <Input
                            labelBg={"bg-gray-800"}
                            label={"Password"}
                            type='password'
                            name='password'
                            id='password'
                            placeholder='••••••••'
                            required=''
                        />

                        <div className='flex flex-col items-center justify-between'>
                            <div className='flex items-start'>
                                <div className='flex items-center h-5'>
                                    <input
                                        id='remember'
                                        aria-describedby='remember'
                                        type='checkbox'
                                        className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                                        required=''
                                    />
                                </div>
                                <div className='ml-3 text-sm'>
                                    <label
                                        htmlFor='remember'
                                        className='text-gray-500 dark:text-gray-300'
                                    >
                                        Remember me
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex justify-center'>
                            <button type='submit' className='button_inverse'>
                                Sign in
                            </button>
                        </div>
                        <div className='w-full flex justify-center'>
                            <a
                                href='#'
                                className='text-sm font-medium text-white hover:underline dark:text-primary-500'
                            >
                                Forgot password?
                            </a>
                        </div>
                        <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                            Don’t have an account yet?{" "}
                            <a
                                href='#'
                                className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                            >
                                Sign up
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserAuth
