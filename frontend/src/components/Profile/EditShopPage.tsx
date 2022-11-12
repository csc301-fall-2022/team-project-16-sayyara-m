import React from "react";
import { MuiTelInput } from 'mui-tel-input';

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
    const [phoneNumber, setPhoneNumber] = React.useState(props.shopInfo.phoneNumber)
    return (
        <div className="mx-8">
            <div className='grid grid-cols-2 grid-rows-10 gap-1 mt-6 mb-6'>
                <label className='col-span-2 mt-6 font-semibold'>
                    Name
                </label>
                <input className="col-span-2 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline" type="text" id="name" placeholder="Name" defaultValue={props.shopInfo.name}/>
                <label className='col-span-2 mt-6 font-semibold'>
                    Email Address
                </label>
                <input className="col-span-2 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline" type="text" id="email" placeholder="Email Address" defaultValue={props.shopInfo.email}/>
                <label className='col-span-2 mt-6 font-semibold'>
                    Phone Number
                </label>
                <MuiTelInput className="col-span-2 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline" id="phoneNumber" value={phoneNumber} onChange={(value) => setPhoneNumber(value)}/>
                <label className='col-span-2 mt-6 font-semibold'>
                    Address
                </label>
                <input className="col-span-2 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-blue-500 focus:shadow-outline" type="text" id="address" placeholder="Address" defaultValue={props.shopInfo.address.street}/>
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
                        streetNumber: props.shopInfo.address.streetNumber,
                        street: (document.getElementById('address') as HTMLInputElement).value,
                        city: props.shopInfo.address.city,
                        province: props.shopInfo.address.province,
                        postalCode: props.shopInfo.address.postalCode
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