import React from "react";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react"

const Navbar = () => {
    //const [mobileDash, setMobileDash] = useState(false);
    return (
        <Disclosure as="nav" className="flex flex-col sm:flex-row items-center bg-gray-100 justify-between w-full px-4 sm:px-6 \
        sm:py-6 md:py-8 md:px-8">

            <div className='text-xl sm:text-5xl font-semibold text-blue-800 self-center sm:justify-start'>
                <Disclosure.Button>Dash</Disclosure.Button>
                Sayyara  {/* We could put a logo here instead */}
            </div>
            <Disclosure.Panel className="flex flex-col w-full sm:flex-row text-white sm:text-black \
                bg-slate-500 sm:bg-inherit sm:ml-10 text-sm sm:text-xl items-start">
                <button className="transition duration-100 ease-in-out w-35 bg-gray-10 hover:bg-blue-500 \
                    font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2" type="button">
                    <Link to="/home">Home</Link>
                </button>
                <button className="transition duration-100 ease-in-out w-35 bg-gray-10 hover:bg-blue-500 \
                    font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    <Link to="/appointments">Appointments</Link>
                </button>
            </Disclosure.Panel>
            <div className="flex text-sm sm:text-xl">
                <Link className="mx-4" to="/">Login</Link>
                <Link className="mx-4" to="/SignUp">Sign Up</Link>
            </div>
        </Disclosure>
    )
}
export default Navbar;