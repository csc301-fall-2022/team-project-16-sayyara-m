import React, { useEffect, useState } from "react";
import { API_ROOT } from "src/utilities/constants";
import useAuth from "src/utilities/hooks/useAuth";
import { APIError, Appointment, Quote, ShopOwner, Vehicle, VehicleOwner } from "../utilities/interfaces";
import { mShop as shop } from "../utilities/mockData";
import { Link } from "react-router-dom";

const MyShop = () => {
    const { auth } = useAuth();
    const [shopOwner, setShopOwner] = useState<ShopOwner | null>(null);
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
        }
        getShopOwner();

    }, [auth]);

    interface AppointmentCardProps {
        ap: Appointment;
    }

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

    interface QuoteCardProps {
        quote: Quote;
    }

    const QuoteCard = ({ quote }: QuoteCardProps) => {
        const vehicleOwner: VehicleOwner = quote.vehicleOwner;
        const vehicle: Vehicle = vehicleOwner.vehicle;
        return (
            <div
                className="hover:bg-blue-200 bg-blue-100 text-sm border-solid border-inherit border-4 rounded-md w-full px-3 mx-1 sm:text-xl">
                <h1 className="text-lg sm:text-2xl"><strong>{vehicleOwner.lastName}</strong></h1>
                <p className="whitespace-nowrap">{vehicle.make} {vehicle.model}</p>
                <p className="whitespace-nowrap">Price: ${quote.price}</p>
                <p className="whitespace-nowrap">Expires: {quote.expiryTime}</p>
            </div>
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
            return <p>No Appointments</p>;
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



export default MyShop;