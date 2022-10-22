import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="flex items-center bg-gray-100 justify-between w-full h-24 px-4">
            <div className="flex items h-full">
            <div className='text-5xl font-semibold text-blue-800 self-center'>
                Sayyara  {/* We could put a logo here instead */}
            </div>
            <div className= "flex items-center ml-10 text-xl">
                <button className="transition duration-100 ease-in-out w-35 bg-gray-10 hover:bg-blue-500 text-black
                            font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2" type="button">
                    <Link to="/home">Home</Link>
                </button>
                <button className="transition duration-100 ease-in-out w-35 bg-gray-10 hover:bg-blue-500 text-black
                            font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    <Link to="/appointments">Appointments</Link>
                </button>
            </div>
            </div>
            <div className="mx-2">
                <Link className="mx-2" to="/">Login</Link>
                <Link className="mx-2" to="/SignUp">Sign Up</Link>
            </div>
        </div>
    )
}
export default Navbar;