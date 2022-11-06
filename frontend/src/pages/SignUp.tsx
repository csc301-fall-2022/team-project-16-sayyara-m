import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { matchIsValidTel } from 'mui-tel-input';

import ShopCreationForm from '../components/SignUp/ShopCreationForm';
import UserInfoForm from '../components/SignUp/UserInfoForm';


export interface SignUpInfo {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    username: string,
    password: string,
    shop: ShopInfo
}

interface ShopInfo {
    name: string,
    address: AddressInfo,
    phoneNumber: string,
    email: string
}

interface AddressInfo {
    streetNumber: string,
    street: string,
    city: string,
    province: string,
    postalCode: string
}

export interface UserInfoValidationStates {
    emailValid: boolean,
    phoneValid: boolean,
    usernameValid: boolean,
    confirmPasswordValid: boolean,
    passwordInvalidMessage: string,
}

function SignUp() {

    // Determines which form to render
    const [showShopForm, setShowShopForm] = useState<boolean>(false);

    // Field values for both forms, to be submitted on signup
    const initialSignUpInfo: SignUpInfo = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        username: "",
        password: "",
        shop: {
            name: "",
            address: {
                streetNumber: "",
                street: "",
                city: "",
                province: "",
                postalCode: ""
            },
            phoneNumber: "",
            email: ""
        }
    }
    const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>(initialSignUpInfo);
    const [signUpPasswordConfirm, setSignUpPasswordConfirm] = useState<string>("");

    // States for invalid form entries
    const initialValidStates: UserInfoValidationStates = {
        emailValid: true,
        phoneValid: true,
        usernameValid: true,
        confirmPasswordValid: true,
        passwordInvalidMessage: ""
    }
    const [userInfoValidationStates, setUserInfoValidationStates] = useState<UserInfoValidationStates>(initialValidStates);

    // Returns true if all the fields are correctly filled
    const validateForm =(): boolean => {
    
        const uinfo_v: UserInfoValidationStates = userInfoValidationStates;
        const formInvalid: boolean = (
            signUpInfo.email === "" || signUpInfo.password === "" || signUpPasswordConfirm === "" 
            || !uinfo_v.emailValid || !uinfo_v.confirmPasswordValid || uinfo_v.passwordInvalidMessage !== ""
            || !uinfo_v.usernameValid || signUpInfo.username === "" || !matchIsValidTel(signUpInfo.phoneNumber)
        );
        if (formInvalid) {
            if (signUpInfo.email === "")
                setUserInfoValidationStates(prevState => ({...prevState, emailValid: false}));
            if (signUpPasswordConfirm === "")
                setUserInfoValidationStates(prevState => ({...prevState, confirmPasswordValid: false}));
            if (signUpInfo.password === "")
                setUserInfoValidationStates(prevState => ({...prevState, passwordInvalidMessage: "Must have a password"}));
            if (signUpInfo.username === "")
                setUserInfoValidationStates(prevState => ({...prevState, usernameValid: false}));
            if (!matchIsValidTel(signUpInfo.phoneNumber))
                setUserInfoValidationStates(prevState => ({...prevState, phoneValid: false}));
            return false;
        }
        return true;
    }

    // If event is needed, the type is React.MouseEvent<HTMLButtonElement>
    const nextFormClicked = (): void => {
        // Function is called when the Next button is clicked
        if (!validateForm()) return;
        setShowShopForm(true);
    }

    const renderForm = () => {
        if (showShopForm) {
            return (
                <ShopCreationForm />
            );
        } 
        else {
            return (
                <UserInfoForm signUpInfo={signUpInfo} setSignUpInfo={setSignUpInfo} userInfoValidationStates={userInfoValidationStates}
                setUserInfoValidationStates={setUserInfoValidationStates} signUpPasswordConfirm={signUpPasswordConfirm}
                setSignUpPasswordConfirm={setSignUpPasswordConfirm}/>
            );
        }
    }

    return(
        <div className='flex w-screen h-screen justify-center flex-wrap bg-gray-100 px-8'>
            <div className='flex flex-wrap h-full max-w-md min-w-[330px] w-full'>
                <div className='w-full mt-8 h-min border-2 border-gray-300 rounded-lg shadow-lg bg-white'>
                    <div className='mx-8'>
                        {renderForm()}
                        <div className='flex justify-center mb-6'>
                            {/* NEXT FORM BUTTON */}
                            <button className="transition duration-100 ease-in-out w-[175px] bg-blue-500 hover:bg-blue-700 text-white
                            font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                            onClick={nextFormClicked}>
                                Next
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