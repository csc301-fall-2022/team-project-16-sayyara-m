import React from "react";
import { matchIsValidTel, MuiTelInput } from 'mui-tel-input';
import { validateEmail } from "../../utilities/ValidationUtil";

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
    const [firstName, setFirstName] = React.useState(props.userInfo.firstName)
    const [lastName, setLastName] = React.useState(props.userInfo.lastName)
    //const [username, setUsername] = React.useState(props.userInfo.username)
    const [email, setEmail] = React.useState(props.userInfo.email)
    const [phoneNumber, setPhoneNumber] = React.useState(props.userInfo.phoneNumber)

    const validateInput = () => {
        if (!validateEmail(email) || !matchIsValidTel(phoneNumber) || firstName === "" || lastName === "") {
            return;
        }

        props.saveUserInfo({
            firstName: firstName,
            lastName: lastName,
            username: props.userInfo.username,   //username,
            email: email,
            phoneNumber: phoneNumber,
        })
    }

    return (
        <div className="mx-8">
            <div className='grid grid-cols-2 grid-rows-12 gap-1 mt-6 mb-6'>
                <label className='mb-[2px] font-semibold'>First Name</label>
                <label className='ml-2 font-semibold'>Last Name</label>
                <div className='mr-2'>
                    <input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                    focus:outline-blue-500 focus:shadow-outline" type="text" id="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className='ml-2'>
                    <input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                    focus:outline-blue-500 focus:shadow-outline" type="text" id="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div className="col-span-2 flow-root flex flex-row mt-6">
                    <label className='font-semibold float-left'>
                        Email Address
                    </label>
                    {!validateEmail(email) ? <label className="text-red-500 italic float-right text-xs">Must be a valid email</label> : null}
                </div>
                <input className="col-span-2 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline" type="text" id="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <div className="col-span-2 flow-root flex flex-row mt-6">
                    <label className='font-semibold float-left'>
                        Phone Number
                    </label>
                    {!matchIsValidTel(phoneNumber) ? <label className="text-red-500 italic float-right text-xs">Must be a valid number</label> : null}
                </div>
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
                font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={validateInput}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default EditUserPage;