import AccountCircle from "@mui/icons-material/AccountCircle";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import React, { useEffect, useState } from "react";

const DefaultProfilePage = (props: { setChangingPassword: (arg0: boolean) => void; setEditingProfile: (arg0: boolean) => void; userInfo: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
} }) => {
    return (
        <div className='mx-8'>
            <div className='flex justify-center my-8'>
                <AccountCircle fontSize="large" />
            </div>
            <div className='flex justify-center my-8'>
                { /* TODO: Fetch firstName and lastName of user from server */ }
                <label className='text-3xl font-bold'>firstName lastName</label>
            </div>
            <div className='flex justify-center my-8'>
                <label className='text-1xl font-bold'>{props.userInfo.username}</label>
            </div>
            <div className='flex justify-center mt-8'>
                <PhoneIcon className="mx-1" />
                <label className='text-1m mx-1'>{props.userInfo.phoneNumber}</label>
            </div>
            <div className='flex justify-center mt-4 mb-8'>
                <EmailIcon className="mx-1" />
                <label className='text-1m mx-1'>{props.userInfo.email}</label>
            </div>
            <div className='flex justify-evenly my-8'>
                <button className="transition duration-100 ease-in-out w-34 bg-blue-500 hover:bg-blue-700 text-white
                font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => props.setChangingPassword(true)}>
                    Change Password
                </button>
                <button className="transition duration-100 ease-in-out w-32 bg-blue-500 hover:bg-blue-700 text-white
                font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => props.setEditingProfile(true)}>
                    Edit Profile
                </button>
            </div>
        </div>
    )
}

const EditProfilePage = (props: { setEditingProfile: (arg0: boolean) => void; }) => {
    return (
        <div className="mx-8">
            <div className='grid grid-cols-2 grid-rows-12 gap-1 mt-6 mb-6'>
                <label className='mb-[2px] font-semibold'>First Name</label>
                <label className='ml-2 font-semibold'>Last Name</label>
                <div className='mr-2'>
                    <input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                    focus:outline-blue-500 focus:shadow-outline" type="text" placeholder="First Name" defaultValue="firstName"/>
                </div>
                <div className='ml-2'>
                    <input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                    focus:outline-blue-500 focus:shadow-outline" type="text" placeholder="Last Name" defaultValue="lastName"/>
                </div>
                <label className='col-span-2 mt-6 font-semibold'>
                    Email Address
                </label>
                <input className="col-span-2 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline" type="text" placeholder="Email Address" defaultValue="someone@example.com"/>
                <label className='col-span-2 mt-6 font-semibold'>
                    Phone Number
                </label>
                <input className="col-span-2 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline" type="text" placeholder="Phone Number" defaultValue="123-456-789"/>
                <label className='col-span-2 mt-6 font-semibold'>
                    Username
                </label>
                <input className="col-span-2 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline" type="text" placeholder="Username" defaultValue="username"/>
            </div>
            <div className='flex justify-evenly my-8'>
                <button className="transition duration-100 ease-in-out w-32 bg-white hover:bg-gray-100 text-black
                font-semibold py-2 px-4 rounded border border-black" type="button" onClick={() => props.setEditingProfile(false)}>
                    Cancel
                </button>
                <button className="transition duration-100 ease-in-out w-32 bg-blue-500 hover:bg-blue-700 text-white
                font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => props.setEditingProfile(false)}>
                    Save
                </button>
            </div>
        </div>
    )
}

const ChangePasswordPage = (props: { setChangingPassword: (arg0: boolean) => void; }) => {
    return (
        <div className="mx-8">
            <div className='grid grid-cols-2 grid-rows-12 gap-1 mt-6 mb-6'>
                <label className='col-span-2 mt-6 font-semibold'>
                    Old Password
                </label>
                <input className="col-span-2 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline" type="password" placeholder="************"/>
                <label className='col-span-2 mt-6 font-semibold'>
                    New Password
                </label>
                <input className="col-span-2 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline" type="password" placeholder="************"/>
                <label className='col-span-2 mt-6 font-semibold'>
                    Confirm Password
                </label>
                <input className="col-span-2 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline" type="password" placeholder="************"/>
            </div>
            <div className='flex justify-evenly my-8'>
                <button className="transition duration-100 ease-in-out w-32 bg-white hover:bg-gray-100 text-black
                font-semibold py-2 px-4 rounded border border-black" type="button" onClick={() => props.setChangingPassword(false)}>
                    Cancel
                </button>
                <button className="transition duration-100 ease-in-out w-32 bg-blue-500 hover:bg-blue-700 text-white
                font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => props.setChangingPassword(false)}>
                    Save
                </button>
            </div>
        </div>
    )
}

const Profile = () => {

    const [isEditingProfile, setEditingProfile] = useState<boolean>(false)
    const [isChangingPassword, setChangingPassword] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState< {
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        phoneNumber: string;
        password: string;
    }>({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phoneNumber: "",
        password: ""
    })

    useEffect(() => {
        //TODO: Call server
    })

    return (
        <div className='flex w-screen h-screen justify-center flex-wrap bg-gray-100 px-8 pt-8'>
            <div className='flex flex-wrap h-full max-w-md min-w-[330px] w-full'>
                <div className='w-full h-min border-2 border-gray-300 rounded-lg shadow-lg bg-white'>
                    {!isEditingProfile && !isChangingPassword ?
                        <DefaultProfilePage 
                            setChangingPassword={setChangingPassword}
                            setEditingProfile={setEditingProfile}
                            userInfo={userInfo}
                        />
                        : !isChangingPassword ?
                        <EditProfilePage 
                            setEditingProfile={setEditingProfile}
                        />
                        :
                        <ChangePasswordPage 
                            setChangingPassword={setChangingPassword}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile;