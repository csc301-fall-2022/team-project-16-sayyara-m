import React from "react";
import {Link} from "react-router-dom";
import {Disclosure} from "@headlessui/react"
import ProfileDropdown from "./ProfileDropdown";
import MenuIcon from '@mui/icons-material/Menu';
import useAuth from "../utilities/hooks/useAuth";

//hidden on web version
//sm:hidden on mobile version
//seperate react code
const navigation = [
    {name: "Home", to: "/", current: true},
    {name: "Appointments", to: "/appointments", current: false},
];

const MobileNavMap = () => {
    return (
        <Disclosure.Panel className="sm:hidden flex flex-col text-sm items-start">
            {navigation.map(item => (
                <Disclosure.Button as={Link} to={item.to} className="transition duration-100 ease-in-out  bg-gray-10 hover:bg-blue-300 \
            font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full text-left" type="button">
                    {/*<Link to={item.to}>{item.name}</Link>*/}
                    {item.name}
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
    const { auth } = useAuth();
    return (
        <Disclosure as="nav" className="bg-gray-200 w-full px-4 sm:px-6 \
        pt-6 pb-5 md:px-8">
            <div className="flex justify-between">
                <div className="w-2/5 pl-0 sm:hidden">
                    <Disclosure.Button className="text-left ml-4 sm:hidden active:bg-inherit">
                        <MenuIcon />
                    </Disclosure.Button>
                </div>
                <div
                    className='text-xl sm:pr-6 sm:text-3xl md:text-5xl font-semibold text-blue-800 justify-center sm:justify-start'>
                    Sayyara {/* We could put a logo here instead */}
                </div>

                {/* hidden by default all styles applied with sm: */}
                <WebNavMap/>

                <div className="flex w-2/5 text-right justify-end items-center text-sm sm:ml-auto sm:text-xl">
                    {auth ? <ProfileDropdown/>
                     :<div>
                        <Link className="mx-2" to="/login">Login</Link>
                        <Link className="mx-2 text-ellipsis" to="/SignUp">Sign Up</Link>
                    </div>}
                </div>
            </div>

            {/* sm:hidden applied, hidden after 640px */}
            <MobileNavMap/>
        </Disclosure>
    )
}
export default Navbar;