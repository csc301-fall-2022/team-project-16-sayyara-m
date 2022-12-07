import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

import { Service, ShopOwner } from 'src/utilities/interfaces';
import ServiceCreationForm from '../Services/ServiceCreationForm';

export const AppointmentsPreview = () => {
    // This component is rendered as the head block (adjacent to navigation menu)
    // for the "Upcoming Appointments" tab on the home page

    return(
        <div className='w-full'>
            <div className='text-2xl mb-4'>
                Your next appointment is with <span className='whitespace-nowrap font-bold'>Bill Thomas</span>
            </div>
            <div className='grid grid-cols-2 mb-3'>
                <label className='font-bold text-lg'>
                    Date
                </label>
                <label className='font-bold text-lg'>
                    Time
                </label>
                <div className='text-xl'>
                    December 12th
                </div>
                <div className='text-xl'>
                    8:25am - 9:00am
                </div>
            </div>
            <div className='grid grid-cols-2'>
                <label className='font-bold text-lg'>
                    Service
                </label>
                <label className='font-bold text-lg'>
                    Vehicle
                </label>
                <div className=''>
                    <div className='bg-gray-50 text-blue-900 w-min mt-1 py-1 px-2
                    whitespace-nowrap rounded-md shadow-md'>
                        Oil Change
                    </div>
                </div>
                <div className='text-xl'>
                    2018 Volkswagen Jetta
                </div>
            </div>
        </div>
    );
}

export const QuotesPreview = () => {
    // This component is rendered as the head block (adjacent to navigation menu)
    // for the "Quote Requests" tab on the home page

    return(
        <div className='w-full'>
            <div className='ml-2'>
                <div className='text-xl lg:text-2xl'>
                    Requests awaiting your response:<span className='ml-3 text-2xl lg:text-3xl text-blue-700 font-semibold'>12</span> 
                </div>
                <div className='text-xl lg:text-2xl mt-2'>
                    Responses requiring client approval:<span className='ml-3 text-2xl lg:text-3xl text-blue-700 font-semibold'>7</span>
                </div>
            </div>
            <span className='ml-2 text-gray-500'>For a complete list:</span>
            <Link to='/quotes'>
                <button className='ml-2 mt-5 transition duration-100 ease-in-out text-blue-500 font-semibold hover:text-blue-800'>
                    View All Quotes
                </button>
            </Link>
        </div>
    );
}

interface ServicesPreviewProps {
    shopOwner: ShopOwner | null,
    setShopOwner: Dispatch<SetStateAction<ShopOwner>>
}
export const ServicesPreview = (props: ServicesPreviewProps) => {
    // This component is rendered as the head block (adjacent to navigation menu)
    // for the "Manage Services" tab on the home page

    const {shopOwner, setShopOwner} = props;

    const addService = (service: Service) => {
        if (shopOwner === null) return;
        setShopOwner({ ...shopOwner, shop: { ...(shopOwner.shop), services: [...(shopOwner.shop.services), service] } })
    }

    return(
        <div className='w-full'>
            <ServiceCreationForm addService={addService} />
        </div>
    );
}
