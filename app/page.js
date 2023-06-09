import Input from "@/components/input"
import { BsSearch, BsMap } from "react-icons/bs"
import Map from "@/components/map"
import Post from "@/components/post"

export default function Home() {
    return (
        <main>
            <form className='container mx-auto flex justify-center items-center gap-3'>
                <Input
                    type={"text"}
                    className='my-5 w-48'
                    label={"Search works"}
                    icon={<BsSearch />}
                />
                <Input
                    type={"text"}
                    className='my-5 w-48'
                    label={"Search Location"}
                    icon={<BsMap />}
                />
                <button className='button' type='submit'>
                    Search
                </button>
            </form>

            <section>
                <div className='w-full text-center mr-8 mb-4 text-white'>
                    <h5 className='text-3xl mb-2 font-bold'>
                        Find jobs near your
                    </h5>
                    <p className='flex justify-center items-center gap-3 mb-4'>
                        <span className='text-md md:text-xl font-bold'>
                            There Are
                        </span>
                        <span className='text-md md:text-xl'>
                            xxx Positions
                        </span>
                        <span className='text-md md:text-xl'>xx Companies</span>
                        <span className='text-md md:text-xl'>
                            Available 10 km.
                        </span>
                        <span className='text-md md:text-xl'>Near You</span>
                    </p>
                </div>
                <div className='flex justify-center w-full my-3'>
                    <button className='button'>More Details</button>
                </div>
                {/* MAPS */}
                <Map className='container mx-auto' />
                <Post
                    title={"Job Title"}
                    company={"Name"}
                    location={"Location"}
                    salary={"Salary"}
                />
            </section>

            {/* Reccommed */}

            {/* Posts */}
            <section>
                <Post
                    className={"container mx-auto rounded-full"}
                    title={"Job Title"}
                    company={"Name"}
                    location={"Location"}
                    salary={"Salary"}
                />
            </section>
        </main>
    )
}
