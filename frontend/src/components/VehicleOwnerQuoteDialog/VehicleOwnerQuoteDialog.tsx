import React, { Dispatch, SetStateAction } from "react";
import { Quote } from "../../utilities/interfaces";
import { ReactComponent as CloseBtnSvg } from "src/resources/svgs/close.svg";

interface Props {
    quote: Quote
    setSelectedQuoteId: Dispatch<SetStateAction<number>>
}
function VehicleOwnerQuoteDialog(props: Props) {
    return (
        <React.Fragment>
            <div className="fixed top-0 left-0 h-full w-full bg-black opacity-20 z-10"
            onClick={() => {props.setSelectedQuoteId(-1)}}/>
            <div className="absolute right-1/2 top-[10%] sm:top-20 translate-x-1/2 min-w-[340px] max-w-[700px] w-[95%] sm:w-2/3 md:w-3/5 lg:w-1/2 xl:w-2/5 2xl:w-1/3 bg-gray-100 
            rounded-md px-6 py-2 border border-gray-400 shadow-lg z-20 mb-6">
                <button className='absolute right-6 top-5' onClick={() => {props.setSelectedQuoteId(-1)}}>
                <CloseBtnSvg className='close-btn-svg'/>
                </button>
                <div className='text-xl sm:text-2xl font-semibold text-black mt-2 mr-8'>
                    Quote From <span className='font-semibold text-xl sm:text-2xl text-blue-800'>{props.quote.shopInfo.name}</span>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 border-t mt-4 pt-4'>
                    <label className='font-semibold'>
                        Service Type
                    </label>
                    <label className='hidden sm:block font-semibold'>
                        Price
                    </label>
                    <div className='text-lg'>
                        {props.quote.serviceName}
                    </div>
                    <label className='mt-2 sm:mt-0 sm:hidden font-semibold'>
                        Price
                    </label>
                    <div className='text-lg'>
                        {props.quote.price ? props.quote.price : 'N/A'}
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 border-b mb-4 pt-4 pb-4'>
                    <label className='font-semibold'>
                        Status
                    </label>
                    <label className='hidden sm:block font-semibold'>
                        Expiry Time
                    </label>
                    <div className='text-lg'>
                        {props.quote.status}
                    </div>
                    <label className='mt-2 sm:mt-0 sm:hidden font-semibold'>
                        Expiry Time
                    </label>
                    <div className='text-lg'>
                        {new Date(props.quote.expiryDate).toLocaleString()}
                    </div>
                </div>
                <div className='mt-3 mb-3 font-semibold text-xl'>
                    Shop Info
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2'>
                    <label className='font-semibold'>
                        Phone Number
                    </label>
                    <label className='hidden sm:block font-semibold'>
                        Email
                    </label>
                    <div className='text-lg'>
                        {props.quote.shopInfo.phoneNumber}
                    </div>
                    <label className='mt-2 sm:mt-0 sm:hidden font-semibold'>
                        Email
                    </label>
                    <div className='text-lg'>
                        {props.quote.shopInfo.email}
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 mt-2 pt-2'>
                    <label className='font-semibold'>
                        Address
                    </label>
                    <label className='hidden sm:block font-semibold'>
                        City
                    </label>
                    <div className='text-lg'>
                        {props.quote.shopInfo.address.streetNumber + ' ' + props.quote.shopInfo.address.street}
                    </div>
                    <label className='mt-2 sm:mt-0 sm:hidden font-semibold'>
                        City
                    </label>
                    <div className='text-lg'>
                        {props.quote.shopInfo.address.city}
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 mb-2 pt-2 mt-2'>
                    <label className='font-semibold'>
                        Province
                    </label>
                    <label className='hidden sm:block font-semibold'>
                        Postal Code
                    </label>
                    <div className='text-lg'>
                        {props.quote.shopInfo.address.province}
                    </div>
                    <label className='mt-2 sm:mt-0 sm:hidden font-semibold'>
                        Postal Code
                    </label>
                    <div className='text-lg'>
                        {props.quote.shopInfo.address.postalCode}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default VehicleOwnerQuoteDialog