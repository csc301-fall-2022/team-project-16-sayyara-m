import * as React from 'react';
import { Dispatch, ReactElement, SetStateAction } from 'react';

import { ShopOwner } from 'src/utilities/interfaces';
import ServicesOffered from '../Services/ServicesOffered';

export const AppointmentsView = () => {
    // This component is rendered as the main body for the "Upcoming Appointments" tab on the home page

    return(
        <div className='w-full'>
            <div className='text-2xl mb-4'>
                Here's what your week looks like:
            </div>
            <div className='w-full h-[600px] bg-gray-200'>
                Schedule view component goes here
            </div>
        </div>
    );
}

interface QuotesViewProps {
    quoteCards: ReactElement[];
}
export const QuotesView = (props: QuotesViewProps) => {
    // This component is rendered as the main body for the "Quote Requests" tab on the home page

    return(
        <div className='w-full'>
            <div className='text-2xl mb-4 md:ml-1'>
                Quote requests that still require a price:
            </div>
            <div className="flex flex-wrap pb-4">
                {props.quoteCards}
            </div>
        </div>
    );
}

interface ServiceViewProps {
    shopOwner: ShopOwner | null,
    setShopOwner: Dispatch<SetStateAction<ShopOwner>>
}
export const ServicesView = (props: ServiceViewProps) => {
    // This component is rendered as the main body for the "Manage Services" tab on the home page

    const {shopOwner, setShopOwner} = props;

    const deleteService = (id: number) => {
        if (shopOwner === null) return;
        setShopOwner({ ...shopOwner, shop: { ...(shopOwner.shop), services: shopOwner.shop.services.filter(service => service.id !== id) } })
    }

    return(
        <div className='w-full mb-4'>
            <div className='text-2xl mb-4 md:ml-1'>
                Services you're currently offering:
            </div>
            <ServicesOffered deleteService={deleteService} services={shopOwner ? shopOwner.shop.services : []} />
        </div>
    );
}