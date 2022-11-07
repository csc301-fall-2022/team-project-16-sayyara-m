import React from "react";
import { Appointment, Vehicle, VehicleOwner } from "../interfaces";
import { mShop as shop } from "../mockData";

const MyShop = () => {
    interface AppointmentCardProps {
        ap: Appointment;
    }
    const AppointmentCard = ({ap}: AppointmentCardProps) => {
        const vehicleOwner: VehicleOwner = ap.vehicleOwner;
        const vehicle: Vehicle = vehicleOwner.vehicle;
        return (
            <div className="hover:bg-blue-200 bg-blue-100 text-sm border-solid border-inherit border-4 rounded-md w-full px-3 mx-1" id={(String)(ap.appointmentId)}>
                <h1 className="text-lg"><strong>{vehicleOwner.lastName}</strong></h1>
                <p className="whitespace-nowrap">{vehicle.make} {vehicle.model}</p>
                <p><strong>{ap.startDate.toLocaleDateString()}</strong></p>
                <p className="text-xs whitespace-nowrap">{ap.startDate.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"})}-{ap.endDate.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"})}</p>
            </div>
        )
    }
    const generateCards = () =>{
        console.log(shop);
        let appointments: Appointment[] = shop.appointments;
        return appointments.map(ap => {
            return (
                <AppointmentCard ap={ap}/>
            );
        });
    }
    return (
        <div className="pt-2">
            <div>
                <h1 className="flex justify-center text-2xl text-blue-800 font-semibold">My Shop</h1>
                <h1 className="">Shop Name: {shop.shopName} </h1>
                <h1>Shop Address: {shop.address.streetNumber + " " + shop.address.street}</h1>

            </div>
            <div>
                <h1 className="text-2xl pt-2 text-blue-800">My Appointments</h1>
                <div className="flex overflow-scroll flex-shrink-0">
                    {generateCards()}
                </div>
            </div>
            <div>
                <h1>My Quotes</h1>
            </div>
        </div>
    )
};
export default MyShop;