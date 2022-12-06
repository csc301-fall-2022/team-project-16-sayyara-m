import * as React from 'react';
import { ReactElement } from 'react';

export const AppointmentsView = () => {


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

    return(
        <div className='w-full'>
            <div className='text-2xl mb-4'>
                Quote requests that still require a price:
            </div>
            <div className="flex flex-wrap pb-4">
                {props.quoteCards}
            </div>
        </div>
    );
}

export const ServicesView = () => {


    return(<></>);
}