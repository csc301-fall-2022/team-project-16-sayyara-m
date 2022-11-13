import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import React from "react";

const ShopInfoPage = (props: { setIsEditingShop: (arg0: boolean) => void; setIsViewingShop: (arg0: boolean) => void; shopInfo: {
    id: string;
    name: string;
    address: {
        streetNumber: string,
        street: string,
        city: string,
        province: string,
        postalCode: string
    };
    phoneNumber: string,
    email: string;
} }) => {
    return (
        <div className='mx-8'>
            <ul className="flex justify-evenly -mb-px">
                <li className="mr-2">
                    <a className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" onClick={() => props.setIsViewingShop(false)}>User</a>
                </li>
                <li>
                    <a className="inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500">Shop</a>
                </li>
            </ul>
            <div className='flex justify-center my-8'>
                <label className='text-3xl font-bold'>{props.shopInfo.name}</label>
            </div>
            <div className='flex justify-center mt-8'>
                <PlaceIcon className="mx-1" />
                <label className='text-1m mx-1'>{props.shopInfo.address.streetNumber + " " + props.shopInfo.address.street + ", " + props.shopInfo.address.city + ", " + props.shopInfo.address.province + ", " + props.shopInfo.address.postalCode}</label>
            </div>
            <div className='flex justify-center mt-4'>
                <PhoneIcon className="mx-1" />
                <label className='text-1m mx-1'>{props.shopInfo.phoneNumber}</label>
            </div>
            <div className='flex justify-center mt-4 mb-8'>
                <EmailIcon className="mx-1" />
                <label className='text-1m mx-1'>{props.shopInfo.email}</label>
            </div>
            <div className='flex justify-evenly my-8'>
                <button className="transition duration-100 ease-in-out w-32 bg-blue-500 hover:bg-blue-700 text-white
                font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => props.setIsEditingShop(true)}>
                    Edit Shop
                </button>
            </div>
        </div>
    )
}

export default ShopInfoPage;