import React from "react";
import { Link } from "react-router-dom";
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
    )
}
export default Navbar;