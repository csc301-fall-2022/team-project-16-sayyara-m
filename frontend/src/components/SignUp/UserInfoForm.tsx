import React, { Dispatch, SetStateAction } from 'react';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';

import { SignUpInfo, UserInfoValidationStates } from '../../pages/SignUp';
import { validatePassword } from '../../utilities/ValidationUtil';

// THIS COMPONENT IS NOT DESIGNED TO BE REUSABLE - this may change if it is needed elsewhere

// This is a conditionally rendered component for the SignUp page.
// There, either this form or the shop creation form will be rendered depending on the signup progress.

interface Props {
    signUpInfo: SignUpInfo,
    setSignUpInfo: Dispatch<SetStateAction<SignUpInfo>>,
    userInfoValidationStates: UserInfoValidationStates,
    setUserInfoValidationStates: Dispatch<SetStateAction<UserInfoValidationStates>>,
    signUpPasswordConfirm: string,
    setSignUpPasswordConfirm: (newState: string) => void
}
function UserInfoForm(props: Props) {

    // Extracting props and shortening names
    const signUpInfo: SignUpInfo = props.signUpInfo;
    const setSignUpInfo: Dispatch<SetStateAction<SignUpInfo>> = props.setSignUpInfo;
    const v: UserInfoValidationStates = props.userInfoValidationStates;
    const setValidation: Dispatch<SetStateAction<UserInfoValidationStates>> = props.setUserInfoValidationStates;
    const signUpPasswordConfirm: string = props.signUpPasswordConfirm;
    const setSignUpPasswordConfirm: (newState: string) => void = props.setSignUpPasswordConfirm;

    // ============ The onChange input field handlers ====================
    const firstNameFieldOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        setSignUpInfo(prevState => ({...prevState, firstName: newVal}));
    }
    const lastNameFieldOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        setSignUpInfo(prevState => ({...prevState, lastName: newVal}));
    }
    const emailFieldOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        setSignUpInfo(prevState => ({...prevState, email: newVal}));
        
        const eReg: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const validity: boolean = (newVal === "" || eReg.test(newVal.toLowerCase()));
        setValidation(prevState => ({...prevState, emailValid: validity}));
    }
    const phoneFieldOnChange = (newVal: string): void => {
        setSignUpInfo(prevState => ({...prevState, phoneNumber: newVal}));
        setValidation(prevState => ({...prevState, phoneValid: matchIsValidTel(newVal)}));
    }
    const usernameFieldOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        setSignUpInfo(prevState => ({...prevState, username: newVal}));

        const validity: boolean = (newVal === "" || newVal.length > 7);
        setValidation(prevState => ({...prevState, usernameValid: validity}));
    }
    const passwordFieldOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        setSignUpInfo(prevState => ({...prevState, password: newVal}));

        // Determine if the password is valid and set the UI message
        let invalidMessage: string = validatePassword(newVal);
        setValidation(prevState => (
            {
                ...prevState, 
                passwordInvalidMessage: invalidMessage,
                confirmPasswordValid: (signUpPasswordConfirm === "" || newVal === signUpPasswordConfirm)
            }
        ));
    }
    const confirmPasswordFieldOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        setSignUpPasswordConfirm(newVal);

        // If confirm password does not match password, inform the user
        const validity: boolean = (newVal === "" || newVal === signUpInfo.password);
        setValidation(prevState => ({...prevState, confirmPasswordValid: validity}));

    }

    return(<>
        <div className='grid grid-cols-2 grid-rows-12 gap-1 mt-10 mb-6'>
            <label className='mb-[2px] font-semibold'>First Name</label>
            <label className='ml-2 font-semibold'>Last Name</label>
            <div className='mr-2'>
                {/* FIRST NAME INPUT FIELD */}
                <input className="shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline hover:border-gray-700" type="text" placeholder="" value={signUpInfo.firstName}
                onChange={firstNameFieldOnChange}/>
            </div>
            <div className='ml-2'>
                {/* LAST NAME INPUT FIELD */}
                <input className="shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline hover:border-gray-700" type="text" placeholder="" value={signUpInfo.lastName}
                onChange={lastNameFieldOnChange}/>
            </div>
            <label className='mt-1 font-semibold'>
                Email Address
            </label>
            {/* Email error message */}
            <p className='justify-self-end whitespace-nowrap self-end text-red-500 text-xs italic' hidden={v.emailValid}>
                Must be a valid email
            </p>
            {/* EMAIL ADDRESS INPUT FIELD */}
            <input className="col-span-2 shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 leading-tight
            focus:outline-blue-500 focus:shadow-outline hover:border-gray-700" type="text" placeholder="example@gmail.com" value={signUpInfo.email}
            onChange={emailFieldOnChange}/>
            <label className='mt-1 font-semibold'>
                Phone Number
            </label>
            {/* Phone error message */}
            <p className='justify-self-end whitespace-nowrap self-end text-red-500 text-xs italic' hidden={v.phoneValid}>
                Must be valid number
            </p>
            {/* PHONE NUMBER INPUT FIELD */}
            <MuiTelInput className='col-span-2 shadow-sm' value={signUpInfo.phoneNumber} onChange={phoneFieldOnChange}
            onlyCountries={['CA', 'US']} focusOnSelectCountry defaultCountry='CA'/>
            <label className='mt-6 font-semibold'>
                Username
            </label>
            {/* Username error text */}
            <p className='justify-self-end whitespace-nowrap self-end text-red-500 text-xs italic' hidden={v.usernameValid}>
                Must be at least 8 characters
            </p>
            {/* USERNAME INPUT FIELD */}
            <input className='col-span-2 shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 
            text-gray-700 leading-tight focus:outline-blue-500 focus:shadow-outline hover:border-gray-700' 
            type="text" placeholder="" value={signUpInfo.username} onChange={usernameFieldOnChange}/>
            <label className='font-semibold'>
                Password
            </label>
            {/* Password error text */}
            <p className='justify-self-end whitespace-nowrap self-end text-red-500 text-xs italic'>
                {v.passwordInvalidMessage}
            </p>
            {/* PASSWORD INPUT FIELD */}
            <input className='col-span-2 shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 
            text-gray-700 leading-tight focus:outline-blue-500 focus:shadow-outline hover:border-gray-700'
            type="password" placeholder="************" value={signUpInfo.password} onChange={passwordFieldOnChange}/>
            <label className='font-semibold whitespace-nowrap'>
                Confirm Password
            </label>
            {/* Confirm password error text */}
            <p className='justify-self-end self-end text-red-500 text-xs italic' hidden={v.confirmPasswordValid}>
                Passwords don't match
            </p>
            {/* CONFIRM PASSWORD INPUT FIELD */}
            <input className="col-span-2 shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 leading-tight
            focus:outline-blue-500 focus:shadow-outline hover:border-gray-700" type="password" placeholder="************" value={signUpPasswordConfirm}
            onChange={confirmPasswordFieldOnChange}/>
        </div>
    </>);
}

export default UserInfoForm;