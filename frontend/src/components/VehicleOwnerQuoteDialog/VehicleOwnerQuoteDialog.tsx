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
                    Quote Dialog Title
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 border-t mt-4 pt-4'>
                    <label className='font-semibold'>
                        Service Type
                    </label>
                    <label className='hidden sm:block font-semibold'>
                        Price
                    </label>
                    <div className='text-lg mr-2 transition duration-500 hover:text-blue-800 cursor-pointer'>
                        {props.quote.service.name}
                    </div>
                    {/* We have the phone number label twice due to grid reformats on mobile */}
                    <label className='mt-2 sm:mt-0 sm:hidden font-semibold'>
                        Price
                    </label>
                    <div className='text-lg'>
                        {props.quote.price ? props.quote.price : 'N/A'}
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 border-t mt-4 pt-4'>
                    <label className='font-semibold'>
                        Status
                    </label>
                    <label className='hidden sm:block font-semibold'>
                        Expiry Time
                    </label>
                    <div className='text-lg mr-2 transition duration-500 hover:text-blue-800 cursor-pointer'>
                        {"Status"}
                    </div>
                    {/* We have the phone number label twice due to grid reformats on mobile */}
                    <label className='mt-2 sm:mt-0 sm:hidden font-semibold'>
                        Expiry Time
                    </label>
                    <div className='text-lg'>
                        {props.quote.expiryTime}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default VehicleOwnerQuoteDialog