import React from "react";
import CreateAppointmentForm from "src/components/CreateAppointmentForm";
import { mShop as shop } from "../utilities/mockData";
const generateServiceCards = () => {
    let services: JSX.Element[] = [];
    for(let i = 0; i < 5; i++){
        services.push(
            <div className="border-2 bg-green-200 rounded-lg text-center p-3 mr-2 my-1">Oil Change</div>
        )
    }
    return services;
}
const ShopDetails = () => {
    return (
        <div>
            {/* Section to show the details of the shop */}
            <section className="grid-cols-1 gap-3 bg-slate-300 inline-grid p-4">
                <h1 className="font-semibold text-2xl pt-2 text-blue-800 sm:text-3xl">About "{shop.name}"</h1>
                <h3 className="font-semibold text-sm sm:text-lg">Located At: {shop.address.streetNumber} {shop.address.street}, {shop.address.city} {shop.address.province}</h3>
                <span>Email Address: {shop.email}</span>
                <span>Phone Number: {shop.phoneNumber}</span>
            </section>
            <h3 className="text-2xl pt-2 text-blue-800 sm:text-3xl">Services They Offer:</h3>
            {/* Generate the list of services the shop provides */}
            <div className="flex flex-wrap">
                {generateServiceCards()}
            </div>
            {/* Forms Section (Appointment or Quotes) */}
            <section>
                <h3 className="text-2xl pt-2 text-blue-800 sm:text-3xl">Book An Appointment</h3>
                <CreateAppointmentForm />
            </section>
        </div>
    )
}
export default ShopDetails;