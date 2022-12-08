import React from "react";
import { Quote, Vehicle, VehicleOwner } from "src/utilities/interfaces";
interface QuoteCardProps {
    quote: Quote,
    setSelectedQuoteId: React.Dispatch<React.SetStateAction<number>>
}
const QuoteCard = ({ quote, setSelectedQuoteId }: QuoteCardProps) => {
    const vehicleOwner: VehicleOwner = quote.vehicleOwner;
    const vehicle: Vehicle = vehicleOwner.vehicle;
    
    const determineStyle = () => {
        const styleStr: string = "relative bottom-2 self-end text-sm"
        if (quote.status === "Accepted" || quote.status === "Pending Approval") {
            return styleStr + " text-gray-400";
        }
        else {
            return styleStr + " text-blue-500";
        }
    }

    return (
        <div className="w-full md:w-auto md:basis-1/2 md:px-1">
            <div className="px-3 py-1 mb-2.5 transition duration-300 ease-in-out 
            cursor-pointer hover:bg-blue-200 bg-gray-50 text-sm sm:text-xl 
            border-solid border-inherit border border-gray-300 hover:border-blue-300 rounded-md shadow-md"
            onClick={() => {setSelectedQuoteId(quote.id)}}>
                <div className="flex">
                    <div className="grow text-lg sm:text-2xl font-bold text-blue-900">
                        {vehicleOwner.firstName} {vehicleOwner.lastName}
                    </div>
                    <div className={determineStyle()}>
                        {quote.status}
                    </div>
                </div>
                <div className="whitespace-nowrap mt-1">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                </div>
                {/* <div className="whitespace-nowrap">
                    Price: {quote.price === null ? "No price yet" : `$${quote.price.toFixed(2)}`}
                </div> */}
                <div className="whitespace-nowrap">
                    {quote.serviceName}
                </div>
                <div className="whitespace-nowrap mt-1 text-sm">
                    Exp: {quote.expiryDate.substring(0, 10)}
                </div>
            </div>
        </div>
    );
}
export default QuoteCard;