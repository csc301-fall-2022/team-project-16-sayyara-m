import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import clsx from 'clsx';
import { MuiTelInput, MuiTelInputInfo, matchIsValidTel } from 'mui-tel-input';

import { API_ROOT } from 'src/App';
import DropDown from 'src/components/DropDown';

interface NewUserInfo {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    type: string
}

function SignUp() {

    // States for tracking the input field values
    const [signUpUserType, setSignUpUserType] = useState<string>("Vehicle Owner");
    const [signUpFirstName, setSignUpFirstName] = useState<string>("");
    const [signUpLastName, setSignUpLastName] = useState<string>("");
    const [signUpEmail, setSignUpEmail] = useState<string>("");
    const [signUpPhone, setSignUpPhone] = useState<string>("");
    const [signUpUsername, setSignUpUsername] = useState<string>("");
    const [signUpPassword, setSignUpPassword] = useState<string>("");
    const [signUpPasswordConfirm, setSignUpPasswordConfirm] = useState<string>("");

    // States for UI error messages
    const [emailValid, setEmailValid] = useState<boolean>(true);
    const [phoneValid, setPhoneValid] = useState<boolean>(true);
    const [usernameValid, setUsernameValid] = useState<boolean>(true);
    const [passwordInvalidMessage, setPasswordInvalidMessage] = useState<string>("");
    const [confirmPasswordValid, setConfirmPasswordValid] = useState<boolean>(true);

    // ============ The onChange input field handlers ====================
    const firstNameFieldOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        setSignUpFirstName(newVal);
    }
    const lastNameFieldOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        setSignUpLastName(newVal);
    }
    const emailFieldOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        setSignUpEmail(newVal);
        const eReg: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setEmailValid(newVal === "" || eReg.test(newVal.toLowerCase()));
    }
    const phoneFieldOnChange = (newVal: string, info: MuiTelInputInfo): void => {
        setSignUpPhone(newVal);
        setPhoneValid(matchIsValidTel(newVal));
    }
    const usernameFieldOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        setSignUpUsername(newVal);
        setUsernameValid(newVal === "" || newVal.length > 7);
    }
    const passwordFieldOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        setSignUpPassword(newVal);

        // Determine if the password is valid and set the UI message
        let invalidMessage: string = "";
        if (newVal.length <= 8) {
            invalidMessage = "Must be at least 8 characters";
        } else if (!/[A-Za-z]/.test(newVal)) {
            invalidMessage = "Must contain at least one letter";
        } else if (!/[A-Z]/.test(newVal)) {
            invalidMessage = "At least one letter must be uppercase";
        } else if (!/\d/.test(newVal)) {
            invalidMessage = "Must contain at least one number";
        } else if (!/[.,!@#$%^&*]/.test(newVal)) {
            invalidMessage = "Must contain at least one of .,!@#$%^&*";
        }
        setPasswordInvalidMessage(invalidMessage);
        setConfirmPasswordValid((signUpPasswordConfirm === "" || newVal === signUpPasswordConfirm));
    }
    const confirmPasswordFieldOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        setSignUpPasswordConfirm(newVal);
        // If confirm password does not match password, inform the user
        setConfirmPasswordValid((newVal === "" || newVal === signUpPassword));
    }
    // ====================================================================


    const validateForm =(): boolean => {
        // Returns true if all the fields are correctly filled
        const formInvalid: boolean = (
            signUpEmail === "" || signUpPassword === "" || signUpPasswordConfirm === "" 
            || !emailValid || !confirmPasswordValid || passwordInvalidMessage !== ""
            || !usernameValid || signUpUsername === "" || !matchIsValidTel(signUpPhone)
        );

        if (formInvalid) {
            if (signUpEmail === "")
                setEmailValid(false);
            if (signUpPasswordConfirm === "")
                setConfirmPasswordValid(false);
            if (signUpPassword === "")
                setPasswordInvalidMessage("Must have a password");
            if (signUpUsername === "")
                setUsernameValid(false);
            if (!matchIsValidTel(signUpPhone))
                setPhoneValid(false);
            return false;
        }
        return true;
    }

    // If event is needed, the type is React.MouseEvent<HTMLButtonElement>
    const signUpClicked = ():void => {
        // Function is called when the Sign Up button is clicked

        if (!validateForm()) return;

        const newUserInfo: NewUserInfo = {
            firstName: signUpFirstName,
            lastName: signUpLastName,
            email: signUpEmail,
            password: signUpPassword,
            type: signUpUserType
        }
        const signUpRequestUrl: string = API_ROOT + "/login"; // TODO: Change to appropriate endpoint
        console.log("Attempting to sign up...");
        fetch(signUpRequestUrl, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUserInfo) 
        })
        .then((response) => {
            if (response.status >= 500) {
                console.log(response.statusText);
                // TODO: Here is where we may want to have the UI display some error since the signup failed


            }
            response.json()
            .then((jsonResponse) => {
                // TODO: Set the auth_token cookie with the response


            })
            .catch((e) => {
                console.log("Failed to parse the response as JSON");
                console.error(e);
            });
        })
        .catch((e) => {
            // I believe this function runs when there is a network error, but not an HTTP error response
            console.log("Failed to make the HTTP request");
            console.error(e);
        });
    }

    return(
        <div className='flex w-screen h-screen justify-center flex-wrap bg-gray-100 px-8'>
            <div className='flex flex-wrap h-full max-w-md min-w-[330px] w-full'>
                <div className='w-full mt-8 h-min border-2 border-gray-300 rounded-lg shadow-lg bg-white'>
                    <div className='mx-8'>
                        <div className='flex justify-center my-8'>
                            <label className='text-4xl font-bold'>Sign Up</label>
                        </div>
                        <div className='mb-4 w-full justify-center flex block'>
                            <div className='grid grid-rows-2'>
                                <label className='self-end mb-2 font-bold justify-self-center'>You are a</label>
                                <DropDown onSelectionChanged={setSignUpUserType} items={['Vehicle Owner', 'Shop Owner']} selectedItem={signUpUserType} />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 grid-rows-12 gap-1 mt-6 mb-6'>
                            <label className='mb-[2px] font-semibold'>First Name</label>
                            <label className='ml-2 font-semibold'>Last Name</label>
                            <div className='mr-2'>
                                {/* FIRST NAME INPUT FIELD */}
                                <input className="shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 leading-tight
                                focus:outline-blue-500 focus:shadow-outline hover:border-gray-700" type="text" placeholder="" value={signUpFirstName}
                                onChange={firstNameFieldOnChange}/>
                            </div>
                            <div className='ml-2'>
                                {/* LAST NAME INPUT FIELD */}
                                <input className="shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 leading-tight
                                focus:outline-blue-500 focus:shadow-outline hover:border-gray-700" type="text" placeholder="" value={signUpLastName}
                                onChange={lastNameFieldOnChange}/>
                            </div>
                            <label className='mt-1 font-semibold'>
                                Email Address
                            </label>
                            {/* Email error message */}
                            <p className='justify-self-end whitespace-nowrap self-end text-red-500 text-xs italic' hidden={emailValid}>
                                Must be a valid email
                            </p>
                            {/* EMAIL ADDRESS INPUT FIELD */}
                            <input className="col-span-2 shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-blue-500 focus:shadow-outline hover:border-gray-700" type="text" placeholder="example@gmail.com" value={signUpEmail}
                            onChange={emailFieldOnChange}/>
                            <label className='mt-1 font-semibold'>
                                Phone Number
                            </label>
                            {/* Phone error message */}
                            <p className='justify-self-end whitespace-nowrap self-end text-red-500 text-xs italic' hidden={phoneValid}>
                                Must be valid number
                            </p>
                            {/* PHONE NUMBER INPUT FIELD */}
                            <MuiTelInput className='col-span-2 shadow-sm' value={signUpPhone} onChange={phoneFieldOnChange}
                            onlyCountries={['CA', 'US']} focusOnSelectCountry defaultCountry='CA'/>
                            <label className='mt-6 font-semibold'>
                                Username
                            </label>
                            {/* Username error text */}
                            <p className='justify-self-end whitespace-nowrap self-end text-red-500 text-xs italic' hidden={usernameValid}>
                                Must be at least 8 characters
                            </p>
                            {/* USERNAME INPUT FIELD */}
                            <input className={'col-span-2 shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 focus:shadow-outline hover:border-gray-700' + clsx({'background-red-500': !confirmPasswordValid})} 
                            type="password" placeholder="" value={signUpUsername} onChange={usernameFieldOnChange}/>
                            <label className='font-semibold'>
                                Password
                            </label>
                            {/* Password error text */}
                            <p className='justify-self-end whitespace-nowrap self-end text-red-500 text-xs italic'>
                                {passwordInvalidMessage}
                            </p>
                            {/* PASSWORD INPUT FIELD */}
                            <input className={'col-span-2 shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 focus:shadow-outline hover:border-gray-700' + clsx({'background-red-500': !confirmPasswordValid})} 
                            type="password" placeholder="************" value={signUpPassword} onChange={passwordFieldOnChange}/>
                            <label className='font-semibold'>
                                Confirm Password
                            </label>
                            {/* Confirm password error text */}
                            <p className='justify-self-end self-end text-red-500 text-xs italic' hidden={confirmPasswordValid}>
                                Passwords don't match
                            </p>
                            {/* CONFIRM PASSWORD INPUT FIELD */}
                            <input className="col-span-2 shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-blue-500 focus:shadow-outline hover:border-gray-700" type="password" placeholder="************" value={signUpPasswordConfirm}
                            onChange={confirmPasswordFieldOnChange}/>
                        </div>
                        <div className='flex justify-center mb-6'>
                            {/* SIGN UP BUTTON */}
                            <button className="transition duration-100 ease-in-out w-[175px] bg-blue-500 hover:bg-blue-700 text-white
                            font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                            onClick={signUpClicked}>
                                Sign Up
                            </button>
                        </div>
                        <div className='flex w-full justify-center relative mb-4 border-t pt-3 text-sm'>
                            <span className='mr-2 text-gray-500'>Already have an account?</span>
                            <Link to='/'>
                                <a className='transition duration-100 ease-in-out text-blue-500 font-semibold hover:text-blue-800'>Log In</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;