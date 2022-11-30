import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { matchIsValidTel } from 'mui-tel-input';

import ShopCreationForm from '../components/SignUp/ShopCreationForm';
import UserInfoForm from '../components/SignUp/UserInfoForm';
import { API_ROOT } from 'src/utilities/constants';
import useRequestLogin from 'src/utilities/hooks/useRequestLogin';

export interface SignUpInfo {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    username: string,
    password: string,
    shop: ShopInfo
}

export interface ShopInfo {
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

export interface ShopInfoValidationStates {
    nameValid: boolean,
    emailValid: boolean,
    phoneValid: boolean,
    streetNoValid: boolean,
    streetNameValid: boolean,
    cityValid: boolean,
    provinceValid: boolean,
    postalValid: boolean
}

function SignUp() {

    const requestLogin = useRequestLogin();
    const [showShopForm, setShowShopForm] = useState<boolean>(false); // Determines which form to render

    // Add a keyboard event listener on document mount.
    // When enter is pressed, attempt signup if on shop info form, otherwise attempt navigating to the shop info form
    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            event.preventDefault();
            if (showShopForm) {
                signUpClicked();
            } else {
                nextFormClicked();
            }
        }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, []);

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

    // States for invalid user info form values
    const initialValidUserInfoStates: UserInfoValidationStates = {
        emailValid: true, phoneValid: true, usernameValid: true, confirmPasswordValid: true, passwordInvalidMessage: ""
    };
    const [userInfoValidationStates, setUserInfoValidationStates] = useState<UserInfoValidationStates>(initialValidUserInfoStates);

    // States for invalid shop info form values
    const initialValidShopInfoStates: ShopInfoValidationStates = {
        nameValid: true, emailValid: true, phoneValid: true, streetNoValid: true, streetNameValid: true, cityValid: true,
        provinceValid: true, postalValid: true
    };
    const [shopInfoValidationStates, setShopInfoValidationStates] = useState<ShopInfoValidationStates>(initialValidShopInfoStates);

    // Returns true if all the fields are correctly filled
    const validateUserInfoForm = (): boolean => {

        const v: UserInfoValidationStates = userInfoValidationStates;
        const formInvalid: boolean = (
            signUpInfo.email === "" || signUpInfo.password === "" || signUpPasswordConfirm === "" ||
            !v.emailValid || !v.confirmPasswordValid || v.passwordInvalidMessage !== "" ||
            !v.usernameValid || signUpInfo.username === "" || !matchIsValidTel(signUpInfo.phoneNumber)
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

    // Returns true if all the fields are correctly filled
    const validateShopInfoForm = (): boolean => {
        const v: ShopInfoValidationStates = shopInfoValidationStates;
        const shop: ShopInfo = signUpInfo.shop;
        const formInvalid: boolean = (
            shop.name === "" || shop.email === "" || shop.phoneNumber === "" || shop.address.streetNumber === "" ||
            shop.address.street === "" || shop.address.city === "" || shop.address.province == "" ||
            shop.address.postalCode === "" || !v.nameValid || !v.emailValid || !v.phoneValid || !v.streetNoValid ||
            !v.streetNameValid || !v.cityValid || !v.provinceValid || !v.postalValid
        )
        if (formInvalid) {
            if (shop.name === "")
                setShopInfoValidationStates(prevState => ({...prevState, nameValid: false}));
            if (shop.email === "")
                setShopInfoValidationStates(prevState => ({...prevState, emailValid: false}));
            if (shop.phoneNumber === "")
                setShopInfoValidationStates(prevState => ({...prevState, phoneValid: false}));
            if (shop.address.streetNumber === "")
                setShopInfoValidationStates(prevState => ({...prevState, streetNoValid: false}));
            if (shop.address.street === "")
                setShopInfoValidationStates(prevState => ({...prevState, streetNameValid: false}));
            if (shop.address.city === "")
                setShopInfoValidationStates(prevState => ({...prevState, cityValid: false}));
            if (shop.address.province === "")
                setShopInfoValidationStates(prevState => ({...prevState, provinceValid: false}));
            if (shop.address.postalCode === "")
                setShopInfoValidationStates(prevState => ({...prevState, postalValid: false}));
            return false;
        }
        return true;
    }

    // If event is needed, the type is React.MouseEvent<HTMLButtonElement>
    // Function is called when the Next button is clicked
    const nextFormClicked = (): void => {

        if (!validateUserInfoForm()) return;
        setShowShopForm(true);
    }

    // Executes when the 'Sign Up' button is clicked while the Shop Info form is loaded
    const signUpClicked = (): void => {

        if (!validateShopInfoForm())
            return;

        const requestUrl: string = API_ROOT + '/shopOwner';
        fetch(requestUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(signUpInfo)
        })
        .then((response) => {
            if (!response.ok) {
                response.json().then((data) => {
                    console.log(data);
                })
                throw new Error('Sign up failed');
            }

            requestLogin(signUpInfo.username, signUpInfo.password)
        })
        .catch((err) => {
            console.log('Request Failed');
            console.error(err);
        });
    }

    const renderForm = () => {
        if (showShopForm) {
            return (<>
                <div className='flex justify-center my-8 text-center'>
                    <label className='text-4xl font-bold'>Shop Information</label>
                </div>
                <ShopCreationForm signUpInfo={signUpInfo} setSignUpInfo={setSignUpInfo}
                shopInfoValidationStates={shopInfoValidationStates} setShopInfoValidationStates={setShopInfoValidationStates}/>
                <div className='flex justify-center mb-6'>
                {/* NEXT FORM BUTTON */}
                    <button className="transition duration-100 ease-in-out w-[175px] bg-blue-500 hover:bg-blue-700 text-white
                    font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                    onClick={signUpClicked}>
                        Sign Up
                    </button>
                </div>
                <div className='flex w-full justify-center relative mb-4 border-t pt-3 text-sm'>
                    <span className='mr-2 text-gray-500'>Missed something earlier?</span>
                    <button className='transition duration-100 ease-in-out text-blue-500 font-semibold hover:text-blue-800'
                    onClick={() => {setShowShopForm(false)}}>
                        Go Back
                    </button>
                </div>
            </>);
        }
        return (<>
            <div className='flex justify-center my-8'>
                <label className='text-4xl font-bold'>Owner Sign Up</label>
            </div>
            <UserInfoForm signUpInfo={signUpInfo} setSignUpInfo={setSignUpInfo} userInfoValidationStates={userInfoValidationStates}
            setUserInfoValidationStates={setUserInfoValidationStates} signUpPasswordConfirm={signUpPasswordConfirm}
            setSignUpPasswordConfirm={setSignUpPasswordConfirm}/>
            <div className='flex justify-center mb-6'>
                {/* NEXT FORM BUTTON */}
                <button className="transition duration-100 ease-in-out w-[125px] bg-blue-500 hover:bg-blue-700 text-white
                font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                onClick={nextFormClicked}>
                    Next
                </button>
            </div>
            <div className='flex w-full justify-center relative mb-4 border-t pt-3 text-sm'>
                <span className='mr-2 text-gray-500'>Already have an account?</span>
                <Link to='/login'>
                    <a className='transition duration-100 ease-in-out text-blue-500 font-semibold hover:text-blue-800'>
                        Log In
                    </a>
                </Link>
            </div>
        </>);
    }

    return(
        <div className='flex w-screen h-screen justify-center flex-wrap bg-gray-100 px-8'>
            <div className='flex flex-wrap h-full max-w-md min-w-[330px] w-full'>
                <div className='w-full mt-8 h-min border-2 border-gray-300 rounded-lg shadow-lg bg-white'>
                    <div className='mx-8'>
                        {renderForm()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;