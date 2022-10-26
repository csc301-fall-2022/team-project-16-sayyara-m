import React from "react";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react"
import ProfileDropdown from "./ProfileDropdown";
//hidden on web version
//sm:hidden on mobile version
//seperate react code
const navigation = [
    { name: "Home", to: "/home", current: true },
    { name: "Appointments", to: "/appointments", current: false },
];

const MobileNavMap = () => {
    return (
        <Disclosure.Panel className="sm:hidden flex flex-col sm:flex-row text-white sm:text-black \
            bg-slate-500 sm:bg-inherit sm:ml-10 text-sm sm:text-lg md:text-xl items-start">
            {navigation.map(item => (
                <Disclosure.Button className="transition duration-100 ease-in-out  bg-gray-10 hover:bg-blue-500 \
            font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2" type="button">
                    <Link to={item.to}>{item.name}</Link>
                </Disclosure.Button>
            ))}
        </Disclosure.Panel>
    );
};
const WebNavMap = () => {
    return (
        <div className="hidden sm:flex sm:text-lg md:text-xl">
            {navigation.map(item => (
                <button className="transition duration-100 ease-in-out  bg-gray-10 hover:bg-blue-500 \
        font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2" type="button">
                    <Link to={item.to}>{item.name}</Link>
                </button>
            ))}
        </div>

    )
};
const Navbar = () => {
    return (
        <Disclosure as="nav" className="flex flex-col sm:flex-row items-center bg-gray-100 w-full px-4 sm:px-6 \
        pt-6 pb-12 md:px-8">
            <Disclosure.Button className="sm:hidden">Dash</Disclosure.Button>
            <div className='text-xl sm:pr-6 sm:text-3xl md:text-5xl font-semibold text-blue-800 self-center sm:justify-start'>
                Sayyara  {/* We could put a logo here instead */}
            </div>
            {/* sm:hidden applied, hidden after 640px */}
            <MobileNavMap />

            {/* hidden by default all styles applied with sm: */}
            <WebNavMap />

            <div className="flex text-sm sm:ml-auto sm:text-xl">
                <ProfileDropdown />
                <Link className="mx-2" to="/">Login</Link>
                <Link className="mx-2 text-ellipsis" to="/SignUp">Sign Up</Link>
            </div>
        </Disclosure>
    )
}
export default Navbar;