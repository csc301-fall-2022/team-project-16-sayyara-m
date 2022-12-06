import React, { useState } from "react";
import { Service } from "../../utilities/interfaces";
import { useGetShopOwner } from "src/utilities/hooks/api/useGetShopOwner";
import AppointmentDialog from "src/components/Appointments/AppointmentDialog";
import QuoteDialog from "src/components/Quotes/QuoteDialog";
import { useGetAllQuotes } from "src/utilities/hooks/api/useGetAllQuotes";
import ServicesOffered from "src/components/Services/ServicesOffered";
import ServiceCreationForm from "src/components/Services/ServiceCreationForm";
import QuoteCard from "src/components/Cards/QuoteCard";
import AppointmentCard from "src/components/Cards/AppointmentCard";

const MyShop = () => {
    const [selectedAptId, setSelectedAptId] = useState<string>("");
    const [selectedQuoteId, setSelectedQuoteId] = useState(-1);
    const { quotes, setQuotes } = useGetAllQuotes(); // Cant use shopOwner.shop.quotes because dialog needs a setter

    const { shopOwner, setShopOwner } = useGetShopOwner();
    console.log(shopOwner);

    const addService = (service: Service) => {
        if (shopOwner === null) return;
        setShopOwner({ ...shopOwner, shop: { ...(shopOwner.shop), services: [...(shopOwner.shop.services), service] } })
    }
    const deleteService = (id: number) => {
        if (shopOwner === null) return;
        setShopOwner({ ...shopOwner, shop: { ...(shopOwner.shop), services: shopOwner.shop.services.filter(service => service.id !== id) } })

    }

    const generateAppointmentCards = () => {
        if (shopOwner === null) return [];
        let appointments = shopOwner.shop.appointments;
        return appointments.map((ap) => {
            return (
                <AppointmentCard setSelectedAptId={setSelectedAptId} key={ap.id} ap={ap} />
            );
        });
    }

    const generateQuoteCards = () => {
        if (shopOwner === null) return [];
        return quotes.map((q, i) => {
            return <QuoteCard setSelectedQuoteId={setSelectedQuoteId} key={q.id} quote={q} />
        })
    }

    const renderAppointmentDetailsDialog = () => {
        // Render nothing if no appointment is currently selected
        if (selectedAptId === "")
            return (<></>);

        // Render the details dialog component with the selected appointment ID
        return (<AppointmentDialog id={selectedAptId} setSelectedAptId={setSelectedAptId} isShopOwner={true} />);
    }

    const renderQuoteDetailsDialog = () => {
        if (selectedQuoteId === -1) {
            return <></>
        }
        return <QuoteDialog setQuotes={setQuotes} quoteId={selectedQuoteId} setSelectedQuoteId={setSelectedQuoteId} />
    }

    return (
        <div className="pt-2 ml-5">
            <div>
                <h1 className="flex justify-center text-2xl text-blue-800 font-semibold sm:text-4xl">{shopOwner?.shop.name}</h1>
            </div>
            <div>
                <h1 className="text-2xl py-3 text-blue-800 sm:text-3xl">Upcoming Appointments</h1>
                <div className="flex overflow-auto pb-4">
                    {generateAppointmentCards()}
                </div>
            </div>
            <div>
                <h1 className="text-2xl py-3 text-blue-800 sm:text-3xl">Requested Quotes</h1>
                <div className="flex overflow-auto pb-4">
                    {generateQuoteCards()}
                </div>
            </div>
            <br></br>
            <h3 className="text-2xl py-3 text-blue-800 sm:text-3xl">My Services</h3>
            <ServicesOffered deleteService={deleteService} services={shopOwner ? shopOwner.shop.services : []} />
            <ServiceCreationForm addService={addService} />
            {renderAppointmentDetailsDialog()}
            {renderQuoteDetailsDialog()}
        </div>
    )
};



export default MyShop;