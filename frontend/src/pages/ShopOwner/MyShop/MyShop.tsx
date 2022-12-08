import * as React from 'react';
import { ReactElement, useState } from 'react';
import clsx from 'clsx';

import { useGetShopOwner } from 'src/utilities/hooks/api/useGetShopOwner';
import { useGetAllQuotes } from 'src/utilities/hooks/api/useGetAllQuotes';

import { AppointmentsPreview, QuotesPreview, ServicesPreview } from 'src/components/MyShop/MyShopPreviews';
import { AppointmentsView, QuotesView, ServicesView } from 'src/components/MyShop/MyShopViews';
import AppointmentDialog from 'src/components/Appointments/AppointmentDialog';
import QuoteDialog from 'src/components/Quotes/QuoteDialog';
import QuoteCard from 'src/components/Cards/QuoteCard';
import { QuoteStats } from 'src/utilities/interfaces';

import './MyShop.css';

const APPOINTMENTS: number = 0;
const QUOTES: number = 1;
const SERVICES: number = 2;

function MyShop() {

    const [view, setView] = useState<number>(APPOINTMENTS);
    const [selectedQuoteId, setSelectedQuoteId] = useState<number>(-1);
    const [selectedAptId, setSelectedAptId] = useState<string>("");
    
    const { shopOwner, setShopOwner } = useGetShopOwner();
    const { quotes, setQuotes } = useGetAllQuotes();

    const generateQuoteCards = (status: string): ReactElement[] => {
        // Returns a list of QuoteCard components that are filtered by the status argument
        if (shopOwner === null) return [];
        const filteredQuotes = quotes.filter((q) => q.status === status);
        return filteredQuotes.map((quote) => {
            return <QuoteCard setSelectedQuoteId={setSelectedQuoteId} key={quote.id} quote={quote} />
        }); 
    }

    const computeQuoteStats = (): QuoteStats => {
        let numAwaitingResponse: number = 0;
        let numRequiringApproval: number = 0;
        quotes.forEach((q) => {
            if (q.status === "Pending Review")
                numAwaitingResponse++;
            else if (q.status === "Pending Approval")
                numRequiringApproval++;
        });
        return {numAwaitingResponse, numRequiringApproval};
    }
    
    const renderView = (isPreview: boolean): ReactElement => {
        // Conditionally renders the selected view
        // Will render preview or view depending on isPreview argument
        switch(view) {
            case APPOINTMENTS:
                return(
                    isPreview ? 
                    <AppointmentsPreview appointments={shopOwner?.shop.appointments}/> : 
                    <AppointmentsView appointments={shopOwner?.shop.appointments} setSelectedAptId={setSelectedAptId}/>
                );
            case QUOTES:
                return(
                    isPreview ? 
                    <QuotesPreview quoteStats={computeQuoteStats()}/> : 
                    <QuotesView awaitingResponseQuoteCards={generateQuoteCards("Pending Review")} 
                    requiringApprovalQuoteCards={generateQuoteCards("Pending Approval")}/>
                );
            case SERVICES:
                return(
                    isPreview ? 
                    <ServicesPreview shopOwner={shopOwner} setShopOwner={setShopOwner}/> : 
                    <ServicesView shopOwner={shopOwner} setShopOwner={setShopOwner}/>
                );
        }
        return(
            isPreview ? 
            <AppointmentsPreview appointments={shopOwner?.shop.appointments}/> : 
            <AppointmentsView appointments={shopOwner?.shop.appointments} setSelectedAptId={setSelectedAptId}/>
        );
    }

    const handleNavigation = (newView: number): void => {
        // Precondition: newView must be a valid view (see constants)
        setView(newView);
    }

    const renderAppointmentDetailsDialog = (): ReactElement => {
        // Render nothing if no appointment is currently selected
        if (selectedAptId === "")
            return(<></>);

        // Render the details dialog component with the selected appointment ID
        return(<AppointmentDialog id={selectedAptId} setSelectedAptId={setSelectedAptId} isShopOwner={true}/>);
    }

    const renderQuoteDetailsDialog = (): ReactElement => {
        // Render nothing if no quote is currently selected
        if (selectedQuoteId === -1)
            return(<></>);

        // Render the details dialog component with the selected quote ID
        return(<QuoteDialog setQuotes={setQuotes} quoteId={selectedQuoteId} setSelectedQuoteId={setSelectedQuoteId}/>);
    }

    return(<div className='relative flex w-full flex-wrap justify-centere'>
        <div className='absolute right-[50%] top-8 translate-x-[50%] w-[95%] sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 min-w-[350px]'>
            {/* Title bar */}
            <div className='w-full bg-gray-50 py-2 px-4 rounded-md shadow-sm border border-gray-300'>
                <div className='text-2xl sm:text-3xl text-blue-900 inline-block font-light'>
                    Home Page
                </div>
                <div className='mt-2 sm:mt-0 sm:float-right text-2xl sm:text-3xl text-blue-900 font-semibold'>
                    {shopOwner?.shop.name}
                </div>
            </div>
            <div className='flex flex-wrap md:flex-nowrap my-8'>
                {/* Navigation menu */}
                <div className='w-full h-min md:max-w-[250px] shadow-md rounded-md md:mr-4 mb-4 md:mb-0'>
                    <button className={`navigation-button w-full py-4 pl-4 text-lg text-gray-800 font-semibold text-left
                    rounded-t-md border border-gray-300 overflow-hidden ` + clsx({'selected-view': view === APPOINTMENTS})}
                    onClick={() => {handleNavigation(APPOINTMENTS)}}>
                        Upcoming Appointments
                    </button>
                    <button className={`navigation-button w-full py-4 pl-4 text-lg text-gray-800 font-semibold text-left
                    border-x border-gray-300 ` + clsx({'selected-view': view === QUOTES})}
                    onClick={() => {handleNavigation(QUOTES)}}>
                        Quote Requests
                    </button>
                    <button className={`navigation-button w-full py-4 pl-4 text-lg text-gray-800 font-semibold text-left
                    rounded-b-md border border-gray-300 overflow-hidden ` + clsx({'selected-view': view === SERVICES})}
                    onClick={() => {handleNavigation(SERVICES)}}>
                        Manage Services
                    </button>
                </div>
                {renderView(true)}
            </div>
            {renderView(false)}
        </div>
        {renderQuoteDetailsDialog()}
        {renderAppointmentDetailsDialog()}
    </div>);
}

export default MyShop;