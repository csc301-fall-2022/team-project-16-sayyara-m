import * as React from 'react';
import { ReactElement, useState } from 'react';
import clsx from 'clsx';

import { useGetShopOwner } from 'src/utilities/hooks/api/useGetShopOwner';
import { useGetAllQuotes } from 'src/utilities/hooks/api/useGetAllQuotes';

import { AppointmentsPreview, QuotesPreview, ServicesPreview } from 'src/components/MyShop/MyShopPreviews';
import { AppointmentsView, QuotesView, ServicesView } from 'src/components/MyShop/MyShopViews';
import QuoteDialog from 'src/components/Quotes/QuoteDialog';
import QuoteCard from 'src/components/Cards/QuoteCard';

import './MyShop.css';

const APPOINTMENTS: number = 0;
const QUOTES: number = 1;
const SERVICES: number = 2;

function MyShop() {

    const [view, setView] = useState<number>(APPOINTMENTS);
    const [selectedQuoteId, setSelectedQuoteId] = useState(-1);
    
    const { shopOwner, setShopOwner } = useGetShopOwner();
    const { quotes, setQuotes } = useGetAllQuotes();

    const generateQuoteCards = () => {
        if (shopOwner === null) return [];
        return quotes.map((q, i) => {
            return <QuoteCard setSelectedQuoteId={setSelectedQuoteId} key={q.id} quote={q} />
        })
    }
    
    const renderView = (isPreview: boolean): ReactElement => {
        // Conditionally renders the selected view
        // Will render preview or view depending on isPreview argument
        switch(view) {
            case APPOINTMENTS:
                return(isPreview ? <AppointmentsPreview/> : <AppointmentsView/>);
            case QUOTES:
                return(isPreview ? <QuotesPreview/> : <QuotesView quoteCards={generateQuoteCards()}/>);
            case SERVICES:
                return(isPreview ? <ServicesPreview shopOwner={shopOwner} setShopOwner={setShopOwner}/> : <ServicesView shopOwner={shopOwner} setShopOwner={setShopOwner}/>);
        }
        return(isPreview ? <AppointmentsPreview/> : <AppointmentsView/>);
    }

    const handleNavigation = (newView: number): void => {
        // Precondition: newView must be a valid view (see constants)
        setView(newView);
    }

    const renderQuoteDetailsDialog = () => {
        if (selectedQuoteId === -1) {
            return <></>
        }
        return <QuoteDialog setQuotes={setQuotes} quoteId={selectedQuoteId} setSelectedQuoteId={setSelectedQuoteId} />
    }

    return(<>
        <div className='absolute right-[50%] top-[10%] translate-x-[50%] w-[95%] sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 min-w-[400px]'>
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
    </>);
}

export default MyShop;