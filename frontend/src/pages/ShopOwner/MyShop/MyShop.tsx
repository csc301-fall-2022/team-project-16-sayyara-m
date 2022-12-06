import * as React from 'react';
import { ReactElement, useState } from 'react';
import clsx from 'clsx';

import { useGetShopOwner } from 'src/utilities/hooks/api/useGetShopOwner';

import { AppointmentsView, QuotesView, ServicesView } from 'src/components/MyShopViews';
import './MyShop.css';

const APPOINTMENTS: number = 0;
const QUOTES: number = 1;
const SERVICES: number = 2;

function MyShop() {

    const [view, setView] = useState<number>(APPOINTMENTS);
    
    const { shopOwner } = useGetShopOwner();

    const renderView = (): ReactElement => {
        // Conditionally renders the selected view
        switch(view) {
            case APPOINTMENTS:
                return(<AppointmentsView />);
            case QUOTES:
                return(<QuotesView />);
            case SERVICES:
                return(<ServicesView />);
        }
        return(<AppointmentsView />);
    }

    const handleNavigation = (newView: number): void => {
        // Precondition: newView must be a valid view (see constants)
        setView(newView);
    }

    return(
        <div className='absolute right-[50%] top-[10%] translate-x-[50%] w-[95%] sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2'>
            {/* Title bar */}
            <div className='w-full bg-gray-50 py-2 px-4 rounded-md shadow-sm border border-gray-300'>
                <div className='text-2xl sm:text-3xl text-blue-900 inline-block'>
                    Home Page
                </div>
                <div className='mt-2 sm:mt-0 sm:float-right text-2xl sm:text-3xl text-blue-900 font-bold'>
                    {shopOwner?.shop.name}
                </div>
            </div>
            {/* Navigation menu */}
            {/* hover:border-blue-500 */}
            <div className='w-full sm:w-64 mt-8 shadow-md rounded-md'>
                <button className={`navigation-button w-full py-4 pl-4 text-lg text-gray-800 font-semibold text-left
                rounded-t-md border border-gray-300 overflow-hidden `
                + clsx({'selected-view': view === APPOINTMENTS})}
                onClick={() => {handleNavigation(APPOINTMENTS)}}>
                    Upcoming Appointments
                </button>
                <button className={`navigation-button w-full py-4 pl-4 text-lg text-gray-800 font-semibold text-left
                border-x border-gray-300 `
                + clsx({'selected-view': view === QUOTES})}
                onClick={() => {handleNavigation(QUOTES)}}>
                    Quote Requests
                </button>
                <button className={`navigation-button w-full py-4 pl-4 text-lg text-gray-800 font-semibold text-left
                rounded-b-md border border-gray-300 overflow-hidden `
                + clsx({'selected-view': view === SERVICES})}
                onClick={() => {handleNavigation(SERVICES)}}>
                    Manage Services
                </button>
            </div>
            {renderView()}
        </div>
    );
}

export default MyShop;