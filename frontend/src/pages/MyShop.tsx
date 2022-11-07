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
            <div className="border" id={(String)(ap.appointmentId)}>
                <h1>{vehicleOwner.lastName}</h1>
                <p>{vehicle.make} {vehicle.model}</p>
                <p>{ap.startDate.toLocaleDateString()}</p>
                <p>{ap.startDate.toLocaleTimeString()} to {ap.endDate.toLocaleTimeString()}</p>
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
                <div>
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