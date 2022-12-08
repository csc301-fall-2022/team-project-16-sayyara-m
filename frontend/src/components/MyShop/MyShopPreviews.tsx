import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

import { Service, ShopOwner, QuoteStats, Appointment, Vehicle } from 'src/utilities/interfaces';
import ServiceCreationForm from '../Services/ServiceCreationForm';

interface AppointemntsPreviewProps {
    appointments: Appointment[] | undefined
}
export const AppointmentsPreview = (props: AppointemntsPreviewProps) => {
    // This component is rendered as the head block (adjacent to navigation menu)
    // for the "Upcoming Appointments" tab on the home page

    const appointments: Appointment[] | undefined = props.appointments;

    const getNextAppointment = (): Appointment | undefined => {
        // Find the next upcoming appointment
        if (appointments == undefined || appointments.length == 0)
            return undefined;

        let nextAppointment: Appointment | undefined = undefined;
        appointments.forEach((apt: Appointment) => {
            if (nextAppointment == undefined || apt.startTime < nextAppointment.startTime)
                nextAppointment = apt;
        });
        return nextAppointment;
    }
    
    const nextAppt: Appointment | undefined = getNextAppointment();
    if (nextAppt == undefined) {
        return (
            <div className='w-full'>
                <div className='text-2xl mb-4'>
                    You have no upcoming appointments
                </div>
            </div>
        );
    }

    // From here we assume there is a next appointment

    // ============================= UI STRING FORMATTING =============================
    const formatMonthDay = (date: Date): string => {
        // Formats the month and day string for the "date" cell
        const months: string[] = ['January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const getOrdinal = (day: number): string => {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1:  return "st";
                case 2:  return "nd";
                case 3:  return "rd";
                default: return "th";
            }
        };
        const monthNo: number = date.getMonth();
        const dayNo: number = date.getDate();
        return `${months[monthNo]} ${dayNo}${getOrdinal(dayNo)}`;
    }
    const formatTimeRange = (startTime: Date, endTime: Date): string => {
        // Formats the time range string for the "time" cell
        const startHour: number = startTime.getHours();
        const startMinute: number = startTime.getMinutes();
        const endHour: number = endTime.getHours();
        const endMinute: number = endTime.getMinutes();
        const startHourStr: string = startHour > 12 ? `${startHour - 12}` : `${startHour}`;
        const startMinuteStr: string = startMinute < 10 ? `0${startMinute}` : `${startMinute}`;
        const endHourStr: string = endHour > 12 ? `${endHour - 12}` : `${endHour}`;
        const endMinuteStr: string = endMinute < 10 ? `0${endMinute}` : `${endMinute}`;
        const meridiems: string[] = [
            startHour < 12 ? 'am' : 'pm',
            endHour < 12 ? 'am' : 'pm'
        ];
        return `${startHourStr}:${startMinuteStr}${meridiems[0]} - ${endHourStr}:${endMinuteStr}${meridiems[1]}`;
    }
    const nextApptFullName: string = `${nextAppt.vehicleOwner.firstName} ${nextAppt.vehicleOwner.lastName}`;
    const vehicle: Vehicle = nextAppt.vehicleOwner.vehicle;
    const vehicleStr: string = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
    // ============================= END OF UI STRING FORMATTING =============================

    return(
        <div className='w-full'>
            <div className='text-2xl mb-4'>
                Your next appointment is with <span className='whitespace-nowrap font-bold'>{nextApptFullName}</span>
            </div>
            <div className='grid grid-cols-2 2xl:grid-cols-3 mb-3'>
                <label className='font-bold text-lg'>
                    Date
                </label>
                <label className='font-bold text-lg 2xl:col-span-2'>
                    Time
                </label>
                <div className='text-xl'>
                    {formatMonthDay(new Date(nextAppt.startTime + 'Z'))}
                </div>
                <div className='text-xl 2xl:col-span-2'>
                    {formatTimeRange(new Date(nextAppt.startTime + 'Z'), new Date(nextAppt.endTime + 'Z'))}
                </div>
            </div>
            <div className='grid grid-cols-2 2xl:grid-cols-3'>
                <label className='font-bold text-lg'>
                    Service
                </label>
                <label className='font-bold text-lg 2xl:col-span-2'>
                    Vehicle
                </label>
                <div className=''>
                    <div className='bg-gray-50 text-blue-900 w-min mt-1 py-1 px-2
                    whitespace-nowrap rounded-md shadow-md'>
                        {nextAppt.serviceName}
                    </div>
                </div>
                <div className='text-xl 2xl:col-span-2'>
                    {vehicleStr}
                </div>
            </div>
        </div>
    );
}

interface QuotesPreviewProps {
    quoteStats: QuoteStats
}
export const QuotesPreview = (props: QuotesPreviewProps) => {
    // This component is rendered as the head block (adjacent to navigation menu)
    // for the "Quote Requests" tab on the home page

    const {numAwaitingResponse, numRequiringApproval} = props.quoteStats;

    return(
        <div className='w-full'>
            <div className='ml-2'>
                <div className='text-xl lg:text-2xl'>
                    Requests awaiting your response:<span className='ml-3 text-2xl lg:text-3xl text-blue-700 font-semibold'>{numAwaitingResponse}</span> 
                </div>
                <div className='text-xl lg:text-2xl mt-2'>
                    Responses requiring client approval:<span className='ml-3 text-2xl lg:text-3xl text-blue-700 font-semibold'>{numRequiringApproval}</span>
                </div>
            </div>
            <span className='ml-2 text-gray-500'>For a complete list:</span>
            <Link to='/quotes'>
                <button className='ml-2 mt-5 transition duration-100 ease-in-out text-blue-500 font-semibold hover:text-blue-800'>
                    View All Quotes
                </button>
            </Link>
        </div>
    );
}

interface ServicesPreviewProps {
    shopOwner: ShopOwner | null,
    setShopOwner: Dispatch<SetStateAction<ShopOwner>>
}
export const ServicesPreview = (props: ServicesPreviewProps) => {
    // This component is rendered as the head block (adjacent to navigation menu)
    // for the "Manage Services" tab on the home page

    const {shopOwner, setShopOwner} = props;

    const addService = (service: Service) => {
        if (shopOwner === null) return;
        setShopOwner({ ...shopOwner, shop: { ...(shopOwner.shop), services: [...(shopOwner.shop.services), service] } })
    }

    return(
        <div className='w-full'>
            <ServiceCreationForm addService={addService} />
        </div>
    );
}
