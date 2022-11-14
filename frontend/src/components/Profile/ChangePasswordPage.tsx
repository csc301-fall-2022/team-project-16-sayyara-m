import React, { useState } from "react";
import { validatePassword } from '../../utilities/ValidatePassword';

const ChangePasswordPage = (props: { setChangingPassword: (arg0: boolean) => void; saveUserInfo: (arg0: string, arg1: string) => void; userInfo: {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    password: string;
} }) => {
    const [showOldPasswordErrorMsg, setShowOldPasswordErrorMsg] = useState<boolean>(false)
    const [showPasswordsMatchErrorMsg, setShowPasswordsMatchErrorMsg] = useState<boolean>(false)
    const [newPassword, setNewPassword] = useState<string>('')

    const checkPassword = (oldPassword: string, newPassword: string, confirmPassword: string) => {
        var valid = true
        if (oldPassword !== props.userInfo.password) {
            valid = false
            setShowOldPasswordErrorMsg(true)
        }
        if (newPassword !== confirmPassword) {
            valid = false
            setShowPasswordsMatchErrorMsg(true)
        }
        if (validatePassword(newPassword) !== "") {
            valid = false
        }
        if (valid) {
            props.saveUserInfo(oldPassword, newPassword)
        }
    }
    return (
        <div className="mx-8">
            <div className='grid grid-cols-2 grid-rows-6 gap-1 mt-6 mb-6'>
                <div className="col-span-2 flow-root flex flex-row mt-6">
                    <label className='font-semibold float-left'>
                        Old Password
                    </label>
                    {showOldPasswordErrorMsg ? <label className="text-red-500 italic float-right text-xs">Incorrect Password</label> : null}
                </div>
                <input className="col-span-2 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline" type="password" id='oldPassword' placeholder="************" onChange={(e) => setShowOldPasswordErrorMsg(false)}/>
                <div className='col-span-2 flow-root flex flex-row mt-6'>
                    <label className='font-semibold float-left'>
                        New Password
                    </label>
                    {newPassword.length > 0 ? <label className="text-red-500 italic float-right text-xs">{validatePassword(newPassword)}</label> : null}
                </div>
                <input className="col-span-2 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline" type="password" id='newPassword' placeholder="************" onChange={(e) => setNewPassword(e.target.value)}/>
                <div className="col-span-2 flow-root flex flex-row mt-6">
                    <label className='font-semibold float-left'>
                        Confirm Password
                    </label>
                    {showPasswordsMatchErrorMsg ? <label className="text-red-500 italic float-right text-xs">Passwords don't match</label> : null}
                </div>
                <input className="col-span-2 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline" type="password" id='confirmPassword' placeholder="************" onChange={(e) => setShowPasswordsMatchErrorMsg(false)}/>
            </div>
            <div className='flex justify-evenly my-8'>
                <button className="transition duration-100 ease-in-out w-32 bg-white hover:bg-gray-100 text-black
                font-semibold py-2 px-4 rounded border border-black" type="button" onClick={() => props.setChangingPassword(false)}>
                    Cancel
                </button>
                <button className="transition duration-100 ease-in-out w-32 bg-blue-500 hover:bg-blue-700 text-white
                font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => checkPassword(
                        (document.getElementById('oldPassword') as HTMLInputElement).value,
                        (document.getElementById('newPassword') as HTMLInputElement).value,
                        (document.getElementById('confirmPassword') as HTMLInputElement).value
                    )}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default ChangePasswordPage;