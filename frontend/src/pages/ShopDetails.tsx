import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CreateAppointmentForm from "src/components/CreateAppointmentForm";
import CreateQuoteForm from "src/components/CreateQuoteForm";
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
    const [apptPopup, setApptPopup] = useState(false);
    const [quotePopup, setQuotePopup] = useState(false);
    const { id } = useParams();
    return (
        <div className="">
            {/* Section to show the details of the shop */}
            {apptPopup &&
                <div className="w-full flex justify-center">
                    <CreateAppointmentForm setVisibility={setApptPopup}/>
                </div>
            }
            {quotePopup && id &&
                <div className="w-full flex justify-center">
                    <CreateQuoteForm shopId={id} setVisibility={setQuotePopup}/>
                </div>
            }
            {/* Div to set rest of page as hidden when form is selected */}
            <div className={apptPopup || quotePopup ? "hidden" : ""}>
                <section className="grid-cols-1 gap-3 grid p-4">
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
                {/* Form buttons Section (Appointment or Quotes) */}
                <section className="text-sm pt-4 flex flex-wrap">
                    <button
                        className="whitespace-nowrap mr-2 w-[170px] transition duration-100 ease-in-out bg-white hover:bg-gray-100
                        text-black font-semibold py-2 px-4 rounded border border-black"
                        onClick={() => setApptPopup(!apptPopup)}>
                        Book an Appointment
                    </button>
                    <button
                        onClick={() => setQuotePopup(!quotePopup)}
                        className="whitespace-nowrap w-[170px] transition duration-100 ease-in-out bg-white hover:bg-gray-100
                        text-black font-semibold py-2 px-4 rounded border border-black">
                        Request a Quote
                    </button>
                </section>
            </div>
        </div>
    )
}
export default ShopDetails;