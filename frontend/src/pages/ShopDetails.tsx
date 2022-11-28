import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CreateAppointmentForm from "src/components/CreateAppointmentForm";
import CreateQuoteForm from "src/components/CreateQuoteForm";
import ServicesOffered from "src/components/ServicesOffered";
import { useGetShopById } from "src/utilities/hooks/api/useGetShopById";

const ShopDetails = () => {
    const [apptPopup, setApptPopup] = useState(false);
    const [quotePopup, setQuotePopup] = useState(false);
    const { id } = useParams();
    const { shop } = useGetShopById(id);
    if(shop === null) return <div>Loading...</div>
    return (
        <div className="">
            {/* Section to show the details of the shop */}
            {apptPopup &&
                <div className="w-full flex justify-center">
                    <CreateAppointmentForm services={shop.services} setVisibility={setApptPopup}/>
                </div>
            }
            {quotePopup && id &&
                <div className="w-full flex justify-center">
                    <CreateQuoteForm services={shop.services} shopId={id} setVisibility={setQuotePopup}/>
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

                <section className="p-4">
                    <h3 className="text-2xl pt-2 text-blue-800 sm:text-3xl">Services They Offer:</h3>
                    {/* Generate the list of services the shop provides */}
                    <ServicesOffered services={shop.services}/>
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
                </section>
            </div>
        </div>
    )
}
export default ShopDetails;