import * as React from 'react';
import { useGetShopOwner } from 'src/utilities/hooks/api/useGetShopOwner';

import './MyShop.css';

function MyShop() {

    const { shopOwner } = useGetShopOwner();

    return(
        <div className='absolute right-[50%] top-[10%] translate-x-[50%] w-[95%] sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2'>
            {/* Title bar */}
            <div className='w-full bg-gray-50 py-2 px-4 rounded-md shadow-sm border border-gray-300'>
                <div className='text-3xl text-blue-900 inline-block'>
                    Home Page
                </div>
                <div className='float-right text-3xl text-blue-900 font-bold'>
                    {shopOwner?.shop.name}
                </div>
            </div>
            {/* Navigation menu */}
            <div className='w-64 mt-8 shadow-md rounded-md'>
                <button className='navigation-button w-full py-4 pl-4 text-lg text-gray-800 font-semibold text-left
                rounded-t-md border border-gray-300 hover:border-blue-500 overflow-hidden'>
                    Upcoming Appointments
                </button>
                <button className='navigation-button w-full py-4 pl-4 text-lg text-gray-800 font-semibold text-left
                border-x border-gray-300 hover:border-blue-500'>
                    Quote Requests
                </button>
                <button className='navigation-button w-full py-4 pl-4 text-lg text-gray-800 font-semibold text-left
                rounded-b-md border border-gray-300 hover:border-blue-500 overflow-hidden'>
                    Manage Services
                </button>
            </div>
        </div>
    );
}

export default MyShop;