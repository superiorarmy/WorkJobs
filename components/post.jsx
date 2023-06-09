"use client"

import Image from "next/image"
import dummy from "@/public/dummy_map.jpg"
import { AiFillHeart } from "react-icons/ai"
import { useEffect, useRef, useState } from "react"

const Post = ({ title, company, location, salary, className = "" }) => {
    const ref = useRef(null)
    const [hover, setHover] = useState(false)
    useEffect(() => {
        const post = ref?.current

        const mouseenter = () => setHover(true)
        const mouseleave = () => setHover(false)

        if (post) {
            post.addEventListener("mouseenter", mouseenter)
            post.addEventListener("mouseleave", mouseleave)
        }

        return () => {
            if (post) {
                post.removeEventListener("mouseenter", mouseenter)
                post.removeEventListener("mouseleave", mouseleave)
            }
        }
    }, [])
    return (
        <div
            className={`mb-5 px-[10%] py-5 bg-blue-900 duration-300 ${className}`}
            ref={ref}
        >
            <div className='flex gap-5 w-full items-center container'>
                <Image
                    className='rounded-full w-[100px] h-[100px]'
                    src={dummy}
                    alt='username'
                />
                <div className='w-full flex flex-col text-white'>
                    <span className='font-bold'>{title}</span>
                    <span>{company}</span>
                    <span>{location}</span>
                    <span>{salary}</span>
                    <div className=' w-full flex justify-center items-center'>
                        <div className='flex items-center gap-3'>
                            <AiFillHeart />
                            <span>{25}</span>
                            <span>7 minutes ago</span>
                        </div>
                    </div>
                    <button className='button mx-8 mt-2'>Read more</button>
                </div>
            </div>
        </div>
    )
}

export default Post
