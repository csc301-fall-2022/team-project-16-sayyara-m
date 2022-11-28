import React from "react";
import { Quote, Vehicle, VehicleOwner } from "src/utilities/interfaces";
interface QuoteCardProps {
    quote: Quote,
    setSelectedQuoteId: React.Dispatch<React.SetStateAction<number>>
}
const QuoteCard = ({ quote, setSelectedQuoteId }: QuoteCardProps) => {
    const vehicleOwner: VehicleOwner = quote.vehicleOwner;
    const vehicle: Vehicle = vehicleOwner.vehicle;
    const statusColour = () => {
        if (quote.status === "Accepted" || quote.status === "Pending Approval") {
            return "text-xs text-green-500"
        }
        else {
            return "text-xs text-red-500"
        }
    }
    return ( //quote.id
        <div className="cursor-pointer hover:bg-blue-200 bg-blue-100 text-sm border-solid border-inherit border-4 rounded-md w-full px-2 mx-1 sm:text-xl"
            onClick={() => { setSelectedQuoteId(quote.id) }}>
            <div className="flex justify-between">
                <p className="text-lg sm:text-2xl"><strong>{vehicleOwner.firstName} {vehicleOwner.lastName}</strong></p>
                <p className={statusColour()}>{quote.status}</p>
            </div>
            <p className="whitespace-nowrap">{vehicle.make} {vehicle.model}</p>
            <p className="whitespace-nowrap">Price: {quote.price === null ? "No price yet" : `$${quote.price.toFixed(2)}`}</p>
            <p className="whitespace-nowrap">Expires: {quote.expiryDate.substring(0, 10)}</p>
            <p className="whitespace-nowrap">{quote.serviceName}</p>
        </div>
    )
}
export default QuoteCard;