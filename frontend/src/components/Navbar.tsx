import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="flex items-center bg-slate-400 justify-between w-full h-24 p-4">
            <div className='text-5xl font-semibold text-blue-800'>
                Sayyara  {/* We could put a logo here instead */}
            </div>
            <div className="flex ">
                <Link to="/">Login</Link>
                <Link to="/SignUp">Sign Up</Link>
            </div>
        </div>
    )
}
export default Navbar;