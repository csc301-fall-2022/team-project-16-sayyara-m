import React, { useState } from "react";
import { Appointment, Quote, Vehicle, VehicleOwner } from "../utilities/interfaces";
import { Link } from "react-router-dom";
import { useGetShopOwner } from "src/utilities/hooks/api/useGetShopOwner";
interface AppointmentCardProps {
    ap: Appointment;
}
interface QuoteCardProps {
    quote: Quote;
}
const MyShop = () => {
    // const { auth } = useAuth();
    const [service, setService] = useState<string>("")
    const { shopOwner } = useGetShopOwner();
    console.log(shopOwner);
    const AppointmentCard = ({ ap }: AppointmentCardProps) => {
        const vehicleOwner: VehicleOwner = ap.vehicleOwner;
        const vehicle: Vehicle = vehicleOwner.vehicle;

        return (
            <Link to={`/appointments/${ap.id}`}>
                <div
                    className="hover:bg-blue-200 bg-blue-100 text-sm border-solid border-inherit border-4 rounded-md w-full px-3 mx-1 sm:text-xl"
                >
                    <h1 className="text-xl sm:text-2xl"><strong>{vehicleOwner.firstName} {vehicleOwner.lastName}</strong></h1>
                    <p className="whitespace-nowrap">{vehicle.make} {vehicle.model}</p>
                    <p className="whitespace-nowrap">{ap.startTime.substring(0, 10)}</p>
                    <p className="whitespace-nowrap">{new Date(ap.startTime).toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})}-{new Date(ap.endTime).toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})}</p>
                    <p>{ap.quote?.serviceName}</p>
                </div>
            </Link>
        )
    }
    const QuoteCard = ({ quote }: QuoteCardProps) => {
        const vehicleOwner: VehicleOwner = quote.vehicleOwner;
        const vehicle: Vehicle = vehicleOwner.vehicle;
        return (
            <Link to={`/quotes/${quote.id}`}>
                <div
                    className="hover:bg-blue-200 bg-blue-100 text-sm border-solid border-inherit border-4 rounded-md w-full px-3 mx-1 sm:text-xl">
                    <h1 className="text-lg sm:text-2xl"><strong>{vehicleOwner.lastName}</strong></h1>
                    <p className="whitespace-nowrap">{vehicle.make} {vehicle.model}</p>
                    <p className="whitespace-nowrap">Price: {quote.price === null ? "No price yet" : `$${quote.price.toFixed(2)}`}</p>
                    <p className="whitespace-nowrap">Expires: {quote.expiryDate.substring(0, 10)}</p>
                    <p className="whitespace-nowrap">{quote.serviceName}</p>
                </div>
            </Link>
        )
    }
    const generateAppointmentCards = () => {
        if(shopOwner === null) return [];
        let appointments = shopOwner.shop.appointments;
             return appointments.map((ap, i) => {
                    return (
                        <AppointmentCard key={ap.id + i}  ap={ap}/>
                    );
                });
    }
    const generateQuoteCards = () => {
        if(shopOwner === null) return [];
        let quotes: Quote[] = shopOwner.shop.quotes;
        return quotes.map((q, i) => {
            return <QuoteCard key={q.id} quote={q}/>
        })
    }
    const generateServiceCards = () => {
        if(shopOwner === null) return [];
        let services: JSX.Element[] = [];
        let shopServices = shopOwner.shop.services;
        for(let service of shopServices){
            const price = service.defaultPrice ? `$${service.defaultPrice}` : "N/A (Contact Shop)";
            services.push(
                <div
                    className="grid grid-cols-1 justify-items-start border-2 bg-green-200 rounded-lg text-center p-2">
                    <p className="font-semibold">{service.name}</p><p className="text-xs">{price}</p >
                </div>
            )
        }
        return services;
    }
    return (
        <div className="pt-2 ml-2">
            <div>
                <h1 className="flex justify-center text-2xl text-blue-800 font-semibold sm:text-4xl">{shopOwner?.shop.name}</h1>
            </div>
            <div>
                <h1 className="text-2xl pt-2 text-blue-800 sm:text-3xl">My Appointments</h1>
                <div className="flex overflow-auto pb-4">
                    {generateAppointmentCards()}
                </div>
            </div>
            <div>
                <h1 className="text-2xl pt-2 text-blue-800 sm:text-3xl">My Quotes</h1>
                <div className="flex overflow-auto pb-4">
                    {generateQuoteCards()}
                </div>
            </div>
            <br></br>
            <h3 className="text-2xl pt-2 text-blue-800 sm:text-3xl">Services You Offer:</h3>
            <div className="inline-grid grid-cols-2 gap-2">
                {generateServiceCards()}
            </div>
            <form className="block">
                <h3 className="text-2xl pt-2 text-blue-800 sm:text-3xl">Add a New Service</h3>
                <label className="">Service:</label>
                <br />
                <input
                    className="p-2 mt-3 mb-5 border-2 rounded box-border"
                    type="text"
                    onChange={(e) => setService(e.target.value)}
                    value={service}
                />
                <br></br>
                <button
                    className="cursor-pointer bg-blue-700 p-2.5 rounded text-white text-center "
                    onClick={(e) => {e.preventDefault()
                        setService("")}}
                >
                    Add Service
                </button>
            </form>
        </div>
    )
};



export default MyShop;