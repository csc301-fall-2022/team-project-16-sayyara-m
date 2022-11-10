import React, { useEffect } from "react";
import { API_ROOT } from "src/utilities/constants";
import useAuth from "src/utilities/hooks/useAuth";
import { Appointment, Quote, Vehicle, VehicleOwner } from "../utilities/interfaces";
import { mShop as shop } from "../utilities/mockData";
import { Link } from "react-router-dom";

const MyShop = () => {
    const { auth } = useAuth();

    useEffect(() => {
        const test = async () => {
            const res = await fetch(API_ROOT + "/appointments", {
                method: "GET",
                headers: {
                    authorization: `Bearer ${auth}`,
                }
            })
            const data = await res.json();
            console.log(data);
        }
        test();
    });


    interface QuoteCardProps {
        quote: Quote;
    }

    const QuoteCard = ({ quote }: QuoteCardProps) => {
        const vehicleOwner: VehicleOwner = quote.vehicleOwner;
        const vehicle: Vehicle = vehicleOwner.vehicle;
        return (
            <div
                className="hover:bg-blue-200 bg-blue-100 text-sm border-solid border-inherit border-4 rounded-md w-full px-3 mx-1 sm:text-2xl">
                <h1 className="text-lg"><strong>{vehicleOwner.lastName}</strong></h1>
                <p className="whitespace-nowrap">{vehicle.make} {vehicle.model}</p>
                <p className="whitespace-nowrap">Price: ${quote.price}</p>
                <p className="whitespace-nowrap">Expires: {quote.expiryTime}</p>
            </div>
        )
    }
    const generateAppointmentCards = () => {
        console.log(shop);
        let appointments: Appointment[] = shop.appointments;
        return appointments.map(ap => {
            return (
                <AppointmentCard ap={ap}/>
            );
        });
    }
    const generateQuoteCards = () => {
        let quotes: Quote[] = shop.quotes;
        return quotes.map(q => {
            return <QuoteCard quote={q}/>
        })
    }
    return (
        <div className="pt-2">
            <div>
                <h1 className="flex justify-center text-2xl text-blue-800 font-semibold sm:text-4xl">{shop.shopName}</h1>
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
        </div>
    )
};

interface AppointmentCardProps {
    ap: Appointment;
}

const AppointmentCard = ({ ap }: AppointmentCardProps) => {
    const vehicleOwner: VehicleOwner = ap.vehicleOwner;
    const vehicle: Vehicle = vehicleOwner.vehicle;

    return (
        <Link to={`/appointments/${ap.id}`}>
            <div
                className="hover:bg-blue-200 bg-blue-100 text-sm border-solid border-inherit border-4 rounded-md w-full px-3 mx-1 sm:text-2xl"
                id={(String)(ap.id)}>
                <h1 className="text-lg"><strong>{vehicleOwner.lastName}</strong></h1>
                <p className="whitespace-nowrap">{vehicle.make} {vehicle.model}</p>
                <p><strong>{ap.startDate.toISOString().substring(0, 10)}</strong></p>
                <p className="whitespace-nowrap">
                    {ap.startDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    })}-{ap.endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
            </div>
        </Link>
    )
}

export default MyShop;