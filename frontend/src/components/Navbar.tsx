import React from "react";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react"
import AccountCircle from '@mui/icons-material/AccountCircle';
import { IconButton } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Disclosure as="nav" className="flex flex-col sm:flex-row items-center bg-gray-100 justify-between w-full px-4 sm:px-6 \
        sm:py-6 md:py-8 md:px-8">
            <Disclosure.Button className="sm:hidden">Dash</Disclosure.Button>
            <div className='text-xl sm:text-5xl font-semibold text-blue-800 self-center sm:justify-start'>
                Sayyara  {/* We could put a logo here instead */}
            </div>
            <Disclosure.Panel className="flex flex-col w-1/2 sm:flex-row text-white sm:text-black \
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
            <div className="flex flex-nowrap whitespace-nowrap text-sm sm:text-xl">
                <div className="">
                    <IconButton
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <Link to='/profile' style={{ textDecoration: 'none' }}>
                            <MenuItem>Profile</MenuItem>
                        </Link>
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <MenuItem>Log out</MenuItem>
                        </Link>
                    </Menu>
                    <Link className="mx-2" to="/">Login</Link>
                    <Link className="mx-2" to="/SignUp">Sign Up</Link>
                </div>
            </div>
        </Disclosure>
    )
}
export default Navbar;