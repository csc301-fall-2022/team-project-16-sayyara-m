import React, { useEffect, useState } from "react";
import { API_ROOT } from "../utilities/constants";
import useAuth from "../utilities/hooks/useAuth";
import { APIError, Appointment, Quote, ShopOwner, Vehicle, VehicleOwner } from "../utilities/interfaces";
import { mShop as shop } from "../utilities/mockData";
import { Link } from "react-router-dom";
interface AppointmentCardProps {
    ap: Appointment;
}
interface QuoteCardProps {
    quote: Quote;
}
const MyShop = () => {
    const { auth } = useAuth();
    const [shopOwner, setShopOwner] = useState<ShopOwner | null>(null);
    const [error, setError] = useState<string>("");
    const [service, setService] = useState<string>("")
    useEffect(() => {
        const getShopOwner = async () => {
            const res = await fetch(API_ROOT + "/shopOwner", {
                method: "GET",
                headers: {
                    authorization: `Bearer ${auth}`,
                }
            })

            if(res.ok){
                const data: ShopOwner = await res.json();
                console.log(data);
                setShopOwner(data);
                return;
            }

            const data: APIError = await res.json();
            console.log(data.message);
            setError(data.message);
        }
        getShopOwner();

    }, [auth]);

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
                    <p className="whitespace-nowrap">{new Date(ap.startDate).toISOString().substring(0, 10)}</p>
                    <p className="whitespace-nowrap">{new Date(ap.startDate).toLocaleTimeString()}-{new Date(ap.endDate).toLocaleTimeString()}</p>
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
                    <p className="whitespace-nowrap">Price: ${quote.price}</p>
                    <p className="whitespace-nowrap">Expires: {quote.expiryTime}</p>
                </div>
            </Link>
        )
    }
    const generateAppointmentCards = () => {
        let appointments: Appointment[] | undefined = shopOwner?.shop.appointments;
        if(appointments){
            return appointments.map((ap, i) => {
                return (
                    <AppointmentCard key={ap.id + i}  ap={ap}/>
                );
            });
        }
        else{
            return <p className="text-red-400">{error}</p>;
        }
    }
    const generateQuoteCards = () => {
        let quotes: Quote[] = shop.quotes;
        return quotes.map((q, i) => {
            return <QuoteCard key={q.vehicleOwner.id + i} quote={q}/>
        })
    }

    return (
        <div className="pt-2">
            <div>
                <h1 className="flex justify-center text-2xl text-blue-800 font-semibold sm:text-4xl">{shop.name}</h1>
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
            <div className="flex justify-center">
                <form className="block">
                    <h3 className="text-2xl pt-2 text-blue-800 sm:text-3xl">Add a New Service</h3>
                    <label className="pr-2">Service:</label>
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
        </div>
    )
};



export default MyShop;