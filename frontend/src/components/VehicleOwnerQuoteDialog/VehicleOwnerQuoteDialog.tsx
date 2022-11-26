import React, { Dispatch, SetStateAction } from "react";
import { APIError, Quote } from "../../utilities/interfaces";
import { ReactComponent as CloseBtnSvg } from "src/resources/svgs/close.svg";
import { useNavigate } from "react-router-dom";
import { API_ROOT } from "../../utilities/constants";

interface Props {
    quote: Quote
    setSelectedQuoteId: Dispatch<SetStateAction<number>>
    updateQuote: (newQuote: Quote) => void
}
function VehicleOwnerQuoteDialog(props: Props) {
    let navigate = useNavigate();

    const changeQuoteStatus = async (newStatus: string) => {
        const res = await fetch(API_ROOT + "/quotes/" + props.quote.id, {
            method: "PATCH",
            headers: {
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify(
                {
                    status: newStatus
                }
            )
        })
    
        if (res.ok) {
            const data: Quote = await res.json();
            props.updateQuote(data)
            props.setSelectedQuoteId(-1)
        }
    
        else {
            const data: APIError = await res.json();
            console.log(data.message);
        }
    }

    return (
        <React.Fragment>
            <div className="fixed top-0 left-0 h-full w-full bg-black opacity-20 z-10"
            onClick={() => {props.setSelectedQuoteId(-1)}}/>
            <div className="absolute right-1/2 top-[10%] sm:top-10 translate-x-1/2 min-w-[340px] max-w-[700px] w-[95%] sm:w-2/3 md:w-3/5 lg:w-1/2 xl:w-2/5 2xl:w-1/3 bg-gray-100 
            rounded-md px-6 py-2 border border-gray-400 shadow-lg z-20 mb-6">
                <button className='absolute right-6 top-5' onClick={() => {props.setSelectedQuoteId(-1)}}>
                <CloseBtnSvg className='close-btn-svg'/>
                </button>
                <div className='text-xl sm:text-2xl font-semibold text-black mt-2 mr-8'>
                    Quote From <span className='font-semibold text-xl sm:text-2xl text-blue-800 transition duration-500 cursor-pointer' 
                    onClick={() => navigate(`/shop/${props.quote.shopInfo.shopId}`)}>{props.quote.shopInfo.name}</span>
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
                <div className='grid grid-cols-1 sm:grid-cols-2 mb-2 pt-4 pb-2'>
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
                <div className="border-b mb-4 pb-4">
                    <label className='font-semibold'>
                        Description
                    </label>
                    <div className='text-lg'>
                        {props.quote.description}
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
                {props.quote.status === "Pending Approval" ?
                    <div className='flex justify-evenly my-8'>
                        <button className="transition duration-100 ease-in-out w-40 bg-blue-500 hover:bg-blue-700 text-white
                        font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => changeQuoteStatus("Rejected")}>
                            Reject
                        </button>
                        <button className="transition duration-100 ease-in-out w-40 bg-blue-500 hover:bg-blue-700 text-white
                        font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => changeQuoteStatus("Accepted")}>
                            Accept
                        </button>
                    </div>
                    :
                    null
                }
            </div>
        </React.Fragment>
    )
}

export default VehicleOwnerQuoteDialog