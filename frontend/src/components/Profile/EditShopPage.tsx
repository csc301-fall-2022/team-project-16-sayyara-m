import React, { useState } from "react";
import { MuiTelInput } from 'mui-tel-input';
import DropDown from "../DropDown";

const EditShopPage = (props: { setIsEditingShop: (arg0: boolean) => void; saveShopInfo: (arg0: {
    id: string;
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
    id: string;
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
    const [phoneNumber, setPhoneNumber] = useState(props.shopInfo.phoneNumber)
    const provinces: string[] = ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];
    const [selectedProvince, setSelectedProvince] = useState<string>(props.shopInfo.address.province);
    return (
        <div className="mx-8">
            <div className='grid grid-cols-3 grid-rows-10 gap-1 mt-6 mb-6'>
                <label className='col-span-2 mt-6 font-semibold'>
                    Name
                </label>
                <input className="col-span-3 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline" type="text" id="name" placeholder="Name" defaultValue={props.shopInfo.name}/>
                <label className='col-span-2 mt-6 font-semibold'>
                    Email Address
                </label>
                <input className="col-span-3 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline" type="text" id="email" placeholder="Email Address" defaultValue={props.shopInfo.email}/>
                <label className='col-span-3 mt-6 font-semibold'>
                    Phone Number
                </label>
                <MuiTelInput className="col-span-3 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline" id="phoneNumber" value={phoneNumber} onChange={(value) => setPhoneNumber(value)}/>
                <label className='col-span-1 mb-[2px] font-semibold'>Street Number</label>
                <label className='col-span-2 ml-2 font-semibold'>Street Name</label>
                <div className='col-span-1 mr-2'>
                    <input className={`shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 leading-tight
                    focus:outline-blue-500 focus:shadow-outline hover:border-gray-700`} type="text" placeholder="" id="streetNumber"
                    defaultValue={props.shopInfo.address.streetNumber}/>
                </div>
                <div className="col-span-2 ml-2">
                    <input className={`col-span-2 shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 leading-tight
                    focus:outline-blue-500 focus:shadow-outline hover:border-gray-700`} id="street" type="text" placeholder="" defaultValue={props.shopInfo.address.street}/>
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
                    defaultValue={props.shopInfo.address.city}/>
                </div>
                {/* PROVINCE DROP DOWN MENU */}
                <DropDown onSelectionChanged={(value) => setSelectedProvince(value)} items={provinces} selectedItem={selectedProvince}/>
                {/* POSTAL CODE INPUT FIELD */}
                <div className='ml-2'>
                    <input className={`shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 leading-tight
                    focus:outline-blue-500 focus:shadow-outline hover:border-gray-700`} id="postalCode" type="text" placeholder=""
                    defaultValue={props.shopInfo.address.postalCode}/>
                </div>
            </div>
            <div className='flex justify-evenly my-8'>
                <button className="transition duration-100 ease-in-out w-32 bg-white hover:bg-gray-100 text-black
                font-semibold py-2 px-4 rounded border border-black" type="button" onClick={() => props.setIsEditingShop(false)}>
                    Cancel
                </button>
                <button className="transition duration-100 ease-in-out w-32 bg-blue-500 hover:bg-blue-700 text-white
                font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => props.saveShopInfo({
                    id: props.shopInfo.id,
                    name: (document.getElementById('name') as HTMLInputElement).value,
                    address: {
                        streetNumber: (document.getElementById('streetNumber') as HTMLInputElement).value,
                        street: (document.getElementById('street') as HTMLInputElement).value,
                        city: (document.getElementById('city') as HTMLInputElement).value,
                        province: selectedProvince,
                        postalCode: (document.getElementById('postalCode') as HTMLInputElement).value,
                    },
                    email: (document.getElementById('email') as HTMLInputElement).value,
                    phoneNumber: phoneNumber,
                })}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default EditShopPage;