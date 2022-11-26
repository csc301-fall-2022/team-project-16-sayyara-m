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
            </div>
        </React.Fragment>
    )
}

export default VehicleOwnerQuoteDialog