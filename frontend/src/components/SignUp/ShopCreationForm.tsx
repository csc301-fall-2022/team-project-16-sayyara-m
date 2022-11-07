import React, { Dispatch, SetStateAction, useState } from 'react';
import { matchIsValidTel, MuiTelInput } from 'mui-tel-input';
import clsx from 'clsx';

import { SignUpInfo, ShopInfo, ShopInfoValidationStates } from '../../pages/SignUp';
import DropDown from '../DropDown';

const provinces: string[] = ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];

interface Props {
    signUpInfo: SignUpInfo,
    setSignUpInfo: Dispatch<SetStateAction<SignUpInfo>>,
    shopInfoValidationStates: ShopInfoValidationStates,
    setShopInfoValidationStates: Dispatch<SetStateAction<ShopInfoValidationStates>>
}
function ShopCreationForm(props: Props) {
    // Extracting props and shortening names
    const shopInfo: ShopInfo = props.signUpInfo.shop;
    const setSignUpInfo: Dispatch<SetStateAction<SignUpInfo>> = props.setSignUpInfo;
    const v: ShopInfoValidationStates = props.shopInfoValidationStates;
    const setValidation: Dispatch<SetStateAction<ShopInfoValidationStates>> = props.setShopInfoValidationStates;

    const prevProv: string = (shopInfo.address.province === "") ? "--" : shopInfo.address.province;
    const [selectedProvince, setSelectedProvince] = useState<string>(prevProv);

    const showAddressError: boolean = (!v.streetNoValid || !v.streetNameValid || !v.cityValid || !v.provinceValid || !v.postalValid);

    // ============ The onChange input field handlers ====================
    const nameFieldOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        setSignUpInfo(prevState => ({...prevState, shop: {...prevState.shop, name: newVal}}));
        setValidation(prevState => ({...prevState, nameValid: newVal.length > 0}));
    }
    const emailFieldOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        setSignUpInfo(prevState => ({...prevState, shop: {...prevState.shop, email: newVal}}));
        // Accept only valid emails
        const eReg: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const validity: boolean = (eReg.test(newVal.toLowerCase()));
        setValidation(prevState => ({...prevState, emailValid: validity}));
    }
    const phoneFieldOnChange = (newVal: string): void => {
        setSignUpInfo(prevState => ({...prevState, shop: {...prevState.shop, phoneNumber: newVal}}));
        setValidation(prevState => ({...prevState, phoneValid: matchIsValidTel(newVal)}));
    }
    const streetNumberOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        // Allow only numerical inputs
        const snReg: RegExp = /^[0-9\b]+$/;
        if (newVal === "" || snReg.test(newVal)) {
            setSignUpInfo(prevState => ({...prevState, shop: {...prevState.shop, address: {...prevState.shop.address, streetNumber: newVal}}}));
        }
        setValidation(prevState => ({...prevState, streetNoValid: newVal.length > 0}));
    }
    const streetNameOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        setSignUpInfo(prevState => ({...prevState, shop: {...prevState.shop, address: {...prevState.shop.address, street: newVal}}}));
        setValidation(prevState => ({...prevState, streetNameValid: newVal.length > 0}));
    }
    const cityOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        setSignUpInfo(prevState => ({...prevState, shop: {...prevState.shop, address: {...prevState.shop.address, city: newVal}}}));
        setValidation(prevState => ({...prevState, cityValid: newVal.length > 0}));
    }
    const provinceDropDownSelectionChanged = (selection: string): void => {
        setSelectedProvince(selection);
        setSignUpInfo(prevState => ({...prevState, shop: {...prevState.shop, address: {...prevState.shop.address, province: selection}}}));
        setValidation(prevState => ({...prevState, provinceValid: true}));
    }
    const postalCodeOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        setSignUpInfo(prevState => ({...prevState, shop: {...prevState.shop, address: {...prevState.shop.address, postalCode: newVal}}}));
        // Accept only valid postal codes
        const pcReg: RegExp = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
        setValidation(prevState => ({...prevState, postalValid: pcReg.test(newVal)}));
    }
    
    return(<>
        <div className='grid grid-cols-3 grid-rows-12 gap-1 mt-10 mb-4'>
            <label className='mt-1 font-semibold whitespace-nowrap'>
                Business Name
            </label>
            {/* Shop name error message */}
            <p className='col-span-2 justify-self-end whitespace-nowrap self-end text-red-500 text-xs italic' hidden={v.nameValid}>
                Must enter a name
            </p>
            {/* SHOP NAME INPUT FIELD */}
            <input className="col-span-3 shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 leading-tight
            focus:outline-blue-500 focus:shadow-outline hover:border-gray-700" type="text" placeholder="" 
            value={shopInfo.name} onChange={nameFieldOnChange}/>
            <label className='mt-1 font-semibold whitespace-nowrap'>
                Email Address
            </label>
            {/* Email error message */}
            <p className=' col-span-2 justify-self-end whitespace-nowrap self-end text-red-500 text-xs italic' hidden={v.emailValid}>
                Must be a valid email
            </p>
            {/* EMAIL ADDRESS INPUT FIELD */}
            <input className="col-span-3 shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 leading-tight
            focus:outline-blue-500 focus:shadow-outline hover:border-gray-700" type="text" placeholder="example@gmail.com"
            value={shopInfo.email} onChange={emailFieldOnChange}/>
            <label className='mt-1 col-span-2 font-semibold'>
                Business Number
            </label>
            {/* Phone error message */}
            <p className={'justify-self-end whitespace-nowrap self-end text-red-500 text-xs italic ' + clsx({invisible: v.phoneValid})}>
                Must be valid number
            </p>
            {/* PHONE NUMBER INPUT FIELD */}
            <MuiTelInput className='col-span-3 shadow-sm' value={shopInfo.phoneNumber} onChange={phoneFieldOnChange}
            onlyCountries={['CA', 'US']} focusOnSelectCountry defaultCountry='CA'/>
            <label className='mt-8 font-semibold'>
                Street Number
            </label>
            <label className='col-span-2 mt-8 font-semibold self-end'>
                Street Name
            </label>
            {/* STREET NUMBER INPUT FIELD */}
            <div className='mr-2'>
                <input className={`shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline hover:border-gray-700 ` + clsx({'border-red-500': !v.streetNoValid})} type="text" placeholder="e.g. 123"
                value={shopInfo.address.streetNumber} onChange={streetNumberOnChange}/>
            </div>
            {/* STREET NAME INPUT FIELD */}
            <input className={`col-span-2 shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 leading-tight
            focus:outline-blue-500 focus:shadow-outline hover:border-gray-700 ` + clsx({'border-red-500': !v.streetNameValid})} type="text" placeholder=""
            value={shopInfo.address.street} onChange={streetNameOnChange}/>
            <label className='font-semibold self-end'>
                City
            </label>
            <label className='font-semibold self-end'>
                Province
            </label>
            <label className='ml-2 font-semibold self-end whitespace-nowrap'>
                Postal Code
            </label>
            {/* CITY INPUT FIELD */}
            <div className='mr-2'>
                <input className={`shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline hover:border-gray-700 ` + clsx({'border-red-500': !v.cityValid})} type="text" placeholder=""
                value={shopInfo.address.city} onChange={cityOnChange}/>
            </div>
            {/* PROVINCE DROP DOWN MENU */}
            <DropDown className={clsx({'border-red-500': !v.provinceValid})} 
            onSelectionChanged={provinceDropDownSelectionChanged} items={provinces} selectedItem={selectedProvince}/>
            {/* POSTAL CODE INPUT FIELD */}
            <div className='ml-2'>
                <input className={`shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline hover:border-gray-700 ` + clsx({'border-red-500': !v.postalValid})} type="text" placeholder=""
                value={shopInfo.address.postalCode} onChange={postalCodeOnChange}/>
            </div>
            <p className={'col-span-3 justify-self-end mt-1 whitespace-nowrap self-end text-red-500 text-xs italic ' + clsx({invisible: !showAddressError})}>
                Address information is incomplete/invalid
            </p>
        </div>

    </>);
}

export default ShopCreationForm;