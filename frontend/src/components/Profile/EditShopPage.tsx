import React, { useState } from "react";
import { matchIsValidTel, MuiTelInput } from 'mui-tel-input';
import DropDown from "../DropDown";
import { validateEmail, validatePostalCode, validateStreetNumber } from "../../utilities/ValidationUtil";

const EditShopPage = (props: { setIsEditingShop: (arg0: boolean) => void; saveShopInfo: (arg0: {
    id: number;
    name: string;
    address: {
        streetNumber: string,
        street: string,
        city: string,
        province: string,
        postalCode: string
    };
    email: string;
    phoneNumber: string;
}) => void; shopInfo: {
    id: number;
    name: string;
    address: {
        streetNumber: string,
        street: string,
        city: string,
        province: string,
        postalCode: string
    };
    email: string;
    phoneNumber: string;
} }) => {
    const [name, setName] = useState(props.shopInfo.name)
    const [streetNumber, setStreetNumber] = useState(props.shopInfo.address.streetNumber)
    const [street, setStreet] = useState(props.shopInfo.address.street)
    const [city, setCity] = useState(props.shopInfo.address.city)
    const [postalCode, setPostalCode] = useState(props.shopInfo.address.postalCode)
    const [email, setEmail] = useState(props.shopInfo.email)
    const [phoneNumber, setPhoneNumber] = useState(props.shopInfo.phoneNumber)
    const provinces: string[] = ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];
    const [selectedProvince, setSelectedProvince] = useState<string>(props.shopInfo.address.province);

    const isAddressValid = () => {
        return validateStreetNumber(streetNumber) && validatePostalCode(postalCode) && street !== "" && city !== "" && selectedProvince !== ""
    }

const validateInput = () => {
    if (!isAddressValid() || !validateEmail(email) || !matchIsValidTel(phoneNumber) || name === "") {
        return;
    }

    props.saveShopInfo({
        id: props.shopInfo.id,
        name: name,
        address: {
            streetNumber: streetNumber,
            street: street,
            city: city,
            province: selectedProvince,
            postalCode: postalCode,
        },
        email: email,
        phoneNumber: phoneNumber,
    })
}

    return (
        <div className="mx-8">
            <div className='grid grid-cols-3 grid-rows-10 gap-1 mt-6 mb-6'>
                <label className='col-span-2 mt-6 font-semibold'>
                    Name
                </label>
                <input className="col-span-3 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline" type="text" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                <div className="col-span-3 flow-root flex flex-row mt-6">
                    <label className='font-semibold float-left'>
                        Email Address
                    </label>
                    {!validateEmail(email) ? <label className="text-red-500 italic float-right text-xs">Must be a valid email</label> : null}
                </div>
                <input className="col-span-3 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline" type="text" id="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <div className="col-span-3 flow-root flex flex-row mt-6">
                    <label className='col-span-3 mt-6 font-semibold'>
                        Phone Number
                    </label>
                    {!matchIsValidTel(phoneNumber) ? <label className="text-red-500 italic float-right text-xs">Must be a valid number</label> : null}
                </div>
                <MuiTelInput className="col-span-3 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline" id="phoneNumber" value={phoneNumber} onChange={(value) => setPhoneNumber(value)}/>
                <label className='col-span-1 mb-[2px] mt-6 font-semibold'>Street Number</label>
                <label className='col-span-2 ml-2 mt-6 font-semibold'>Street Name</label>
                <div className='col-span-1 mr-2'>
                    <input className={`shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 leading-tight
                    focus:outline-blue-500 focus:shadow-outline hover:border-gray-700`} type="text" placeholder="" id="streetNumber"
                    value={streetNumber} onChange={(e) => setStreetNumber(e.target.value)}/>
                </div>
                <div className="col-span-2 ml-2">
                    <input className={`col-span-2 shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 leading-tight
                    focus:outline-blue-500 focus:shadow-outline hover:border-gray-700`} id="street" type="text" placeholder="" value={street} onChange={(e) => setStreet(e.target.value)}/>
                </div>                
                <label className='font-semibold self-end text-sm sm:text-base'>
                    City
                </label>
                <label className='font-semibold self-end text-sm sm:text-base'>
                    Province
                </label>
                <label className='ml-2 font-semibold self-end whitespace-nowrap text-sm sm:text-base'>
                    Postal Code
                </label>
                {/* CITY INPUT FIELD */}
                <div className='mr-2'>
                    <input className={`shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 leading-tight
                    focus:outline-blue-500 focus:shadow-outline hover:border-gray-700`} id="city" type="text" placeholder=""
                    value={city} onChange={(e) => setCity(e.target.value)}/>
                </div>
                {/* PROVINCE DROP DOWN MENU */}
                <DropDown onSelectionChanged={(value) => setSelectedProvince(value)} items={provinces} selectedItem={selectedProvince}/>
                {/* POSTAL CODE INPUT FIELD */}
                <div className='ml-2'>
                    <input className={`shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 leading-tight
                    focus:outline-blue-500 focus:shadow-outline hover:border-gray-700`} id="postalCode" type="text" placeholder=""
                    value={postalCode} onChange={(e) => setPostalCode(e.target.value)}/>
                </div>
                <div className="col-span-3 flow-root flex flex-row mt-6">
                    {!isAddressValid() ? <label className="text-red-500 italic float-right text-xs">Address information is incomplete/invalid</label> : null}
                </div>
            </div>
            <div className='flex justify-evenly my-8'>
                <button className="transition duration-100 ease-in-out w-32 bg-white hover:bg-gray-100 text-black
                font-semibold py-2 px-4 rounded border border-black" type="button" onClick={() => props.setIsEditingShop(false)}>
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

export default EditShopPage;