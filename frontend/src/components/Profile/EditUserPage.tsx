import React from "react";
import { MuiTelInput } from 'mui-tel-input';

const EditUserPage = (props: { setEditingProfile: (arg0: boolean) => void; saveUserInfo: (arg0: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
}) => void; userInfo: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
} }) => {
    const [phoneNumber, setPhoneNumber] = React.useState(props.userInfo.phoneNumber)
    return (
        <div className="mx-8">
            <div className='grid grid-cols-2 grid-rows-12 gap-1 mt-6 mb-6'>
                <label className='mb-[2px] font-semibold'>First Name</label>
                <label className='ml-2 font-semibold'>Last Name</label>
                <div className='mr-2'>
                    <input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                    focus:outline-blue-500 focus:shadow-outline" type="text" id="firstName" placeholder="First Name" defaultValue={props.userInfo.firstName}/>
                </div>
                <div className='ml-2'>
                    <input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                    focus:outline-blue-500 focus:shadow-outline" type="text" id="lastName" placeholder="Last Name" defaultValue={props.userInfo.lastName}/>
                </div>
                <label className='col-span-2 mt-6 font-semibold'>
                    Email Address
                </label>
                <input className="col-span-2 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline" type="text" id="email" placeholder="Email Address" defaultValue={props.userInfo.email}/>
                <label className='col-span-2 mt-6 font-semibold'>
                    Phone Number
                </label>
                <MuiTelInput className="col-span-2 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline" id="phoneNumber" placeholder="Phone Number" value={phoneNumber} onChange={(value) => setPhoneNumber(value)}/>
                {/*
                    <label className='col-span-2 mt-6 font-semibold'>
                        Username
                    </label>
                    <input className="col-span-2 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                    focus:outline-blue-500 focus:shadow-outline" type="text" id="username" placeholder="Username" defaultValue={props.userInfo.username}/>
                */}
            </div>
            <div className='flex justify-evenly my-8'>
                <button className="transition duration-100 ease-in-out w-32 bg-white hover:bg-gray-100 text-black
                font-semibold py-2 px-4 rounded border border-black" type="button" onClick={() => props.setEditingProfile(false)}>
                    Cancel
                </button>
                <button className="transition duration-100 ease-in-out w-32 bg-blue-500 hover:bg-blue-700 text-white
                font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => props.saveUserInfo({
                    firstName: (document.getElementById('firstName') as HTMLInputElement).value,
                    lastName: (document.getElementById('lastName') as HTMLInputElement).value,
                    username: props.userInfo.username,   //(document.getElementById('username') as HTMLInputElement).value,
                    email: (document.getElementById('email') as HTMLInputElement).value,
                    phoneNumber: phoneNumber,
                })}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default EditUserPage;