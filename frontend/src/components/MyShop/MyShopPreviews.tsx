import * as React from 'react';

export const AppointmentsPreview = () => {

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


    return(<></>);
}

export const ServicesPreview = () => {


    return(<></>);
}
