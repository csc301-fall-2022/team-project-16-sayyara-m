import React, { Dispatch, ReactElement, SetStateAction, useState } from 'react';

import clsx from 'clsx';
import Calendar from 'react-calendar';
import AnimateHeight, { Height } from 'react-animate-height';

import './AppointmentDialog.css';
import 'react-calendar/dist/Calendar.css';
import { Appointment, ShopInfo, Vehicle, VehicleOwner } from "src/utilities/interfaces";

import { ReactComponent as CloseBtnSvg } from "src/resources/svgs/close.svg";
import { ReactComponent as ChevronDownSvg } from "src/resources/svgs/chevron-down.svg";
import { useGetAppointmentById } from 'src/utilities/hooks/api/useGetAppointmentById';

// A placeholder appointment for while the fetch call is loading
const unloadedAppt: Appointment = {
    id: -1,
    shopId: 1,
    serviceName: "",
    vehicleOwner: {
        id: -1, firstName: "", lastName: "", username: "", phoneNumber: "", email: "",
        vehicle: { year: 0, make: "", model: "", vin: "", plate: "" }
    },
    shopInfo: { shopId: 1, email: "", name: "", address: Object(), phoneNumber: "" },
    startTime: "", endTime: "", duration: 0, wasQuote: false, price: 0
}

const formatEmail = (email: string): ReactElement => {
    // Formats email to word break before the email domain. Assumes correct format.
    const arr: string[] = email.split('@');
    return(<>{arr[0]}<wbr/>@{arr[1]}</>);
}

interface FormatededDates {
    dayAndYear: string,
    startTime: string,
    startMeridiem: string,
    endTime: string,
    endMeridiem: string
}
const formatDateStrings = (startDate: Date, endDate: Date): FormatededDates => {
    // Takes the start and end dates and formats them into strings for display

    // Format the dayAndYear string
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
    const monthNo: number = startDate.getMonth();
    const dayNo: number = startDate.getDate();
    const yearNo: number = startDate.getFullYear();
    const dayAndYear: string = `${months[monthNo]} ${dayNo}${getOrdinal(dayNo)}, ${yearNo}`;

    // Format Time and Meridiem variables
    const meridiems: string[] = [
        startDate.getHours() < 12 ? 'AM' : 'PM',
        endDate.getHours() < 12 ? 'AM' : 'PM'
    ];
    const startMinutes: string = startDate.getMinutes() > 9 ? `${startDate.getMinutes()}` : `0${startDate.getMinutes()}`;
    const endMinutes: string = endDate.getMinutes() > 9 ? `${endDate.getMinutes()}` : `0${endDate.getMinutes()}`;
    const startTime: string = `${startDate.getHours() % 12 || 12}:${startMinutes}`;
    const endTime: string = `${endDate.getHours() % 12 || 12}:${endMinutes}`;

    return {
        dayAndYear: dayAndYear,
        startTime: startTime,
        startMeridiem: meridiems[0],
        endTime: endTime,
        endMeridiem: meridiems[1]
    };
}

interface Props {
    id: string,
    setSelectedAptId: Dispatch<SetStateAction<string>>,
    isShopOwner: boolean
}
function AppointmentDialog(props: Props) {
    const isShopOwner: boolean = props.isShopOwner;
    const { appointment } = useGetAppointmentById(props.id);
    // States for animation control
    const [expanded, setExpanded] = useState<boolean>(false);
    const [expandedOnce, setExpandedOnce] = useState<boolean>(false);
    const [height, setHeight] = useState<Height>(0);
    if(!appointment) return <div>Something went wrong</div>

    // When the component mounts, get the appointment data via its Id


    // Values for UI display
    const vOwner: VehicleOwner = appointment.vehicleOwner;
    const vehicle: Vehicle = vOwner.vehicle;
    const shopInfo: ShopInfo = appointment.shopInfo;

    let dates: FormatededDates;

    const startDate = new Date(appointment.startTime + "Z")
    const endDate = new Date(appointment.endTime + "Z")
    if(!appointment) return <div>Something Went Wrong</div>
    // We do not want to attempt to format Dates if the data is unloaded
    if (appointment !== unloadedAppt)
        dates = formatDateStrings(startDate, endDate);
    else
        dates = {dayAndYear: "", startTime: "", startMeridiem: "", endTime: "", endMeridiem: ""};

    const renderCalender = () => {
        if (appointment !== unloadedAppt)
            return(<Calendar className='shadow-sm' showNavigation={false} calendarType='US' defaultValue={appointment !== unloadedAppt ? startDate : undefined}
            formatShortWeekday={(locale, date) => [`Su`, `Mo`, `Tu`, `We`, `Th`, `Fr`, `Sa`][date.getDay()]}/>);
        return(<></>);
    }

    const renderTitle = () => {
        if (isShopOwner)
            return(<>Your appointment with <span className='text-blue-800'>{vOwner.firstName}&nbsp;{vOwner.lastName}</span></>);
        return(<>Your appointment at <span className='text-blue-800 whitespace-nowrap'>{shopInfo.name}</span></>);
    }

    return(<>
        {/* This is the overlay div that 'covers' the page while the dialog is up */}
        <div className='fixed top-0 left-0 h-full w-full bg-black opacity-20 z-10'
        onClick={() => {props.setSelectedAptId("")}}/>
        {/* The actual dialog box */}
        <div className='absolute right-1/2 top-[10%] sm:top-20 translate-x-1/2 min-w-[340px] max-w-[700px] w-[95%] sm:w-2/3 md:w-3/5 lg:w-1/2 xl:w-2/5 2xl:w-1/3 bg-gray-100
        rounded-md px-6 py-2 border border-gray-400 shadow-lg z-20 mb-6'>
            <button className='absolute right-6 top-5'
            onClick={() => {props.setSelectedAptId("")}}>
                <CloseBtnSvg className='close-btn-svg'/>
            </button>
            <div className='text-xl sm:text-2xl font-semibold text-black mt-2 mr-8'>
                {renderTitle()}
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 border-t mt-4 pt-4'>
                <label className='font-semibold'>
                    Email
                </label>
                <label className='hidden sm:block font-semibold'>
                    Phone Number
                </label>
                <div className='text-lg mr-2 transition duration-500 hover:text-blue-800 cursor-pointer'>
                    {formatEmail(isShopOwner ? vOwner.email : shopInfo.email)}
                </div>
                {/* We have the phone number label twice due to grid reformats on mobile */}
                <label className='mt-2 sm:mt-0 sm:hidden font-semibold'>
                    Phone Number
                </label>
                <div className='text-lg'>
                    {isShopOwner ? vOwner.phoneNumber : shopInfo.phoneNumber}
                </div>
            </div>
            <div className='grid grid-cols-3 sm:grid-cols-2 mt-3 border-b pb-4'>
                <label className='font-semibold col-span-2 sm:col-span-1'>
                    Service Type
                </label>
                <label className='font-semibold'>
                    Quoted Price
                </label>
                <div className='col-span-2 sm:col-span-1'>
                    <div className='service-type bg-gray-50 text-blue-900 w-min mt-1 py-1 px-2
                    whitespace-nowrap rounded-md shadow-md'>
                        {appointment.serviceName}
                    </div>
                </div>
                <div className='relative top-[2px] text-2xl font-light text-blue-900'>
                    $<span className='font-normal'>{appointment.price.toFixed(2)}</span>
                </div>
            </div>
            <div className='mt-3 mb-3 font-semibold text-xl'>
                Scheduled time {(appointment !== unloadedAppt && startDate < new Date()) && <span className='font-light ml-2 text-red-700'>(date passed)</span>}
            </div>
            <div className='grid grid-cols-3 sm:grid-cols-2 pb-4 border-b'>
                <div className='relative mr-3 sm:mr-4 col-span-2 sm:col-span-1'>
                    {/* Overlay div makes the calendar non interactive */}
                    <div className='absolute top-0 left-0 w-full h-full z-10'></div>
                    {renderCalender()}
                </div>
                <div>
                    <div className='text-xl sm:text-2xl font-light'>
                        {dates.dayAndYear}
                    </div>
                    <div className='mt-4 font-light sm:font-normal sm:mt-3 sm:text-lg text-gray-700'>From</div>
                    <div className='text-3xl sm:text-5xl sm:font-light mt-[-3px]'>
                        {dates.startTime}<span className='ml-1 text-base sm:text-lg font-normal'>{dates.startMeridiem}</span>
                    </div>
                    <div className='mt-1 font-light sm:font-normal sm:mt-2 sm:text-lg text-gray-700'>Until</div>
                    <div className='text-3xl sm:text-5xl sm:font-light mt-[-3px]'>
                        {dates.endTime}<span className='ml-1 text-base sm:text-lg font-normal'>{dates.endMeridiem}</span>
                    </div>
                </div>
            </div>
            <div className='flex w-full justify-center'>
                <button className='show-details-btn flex mt-2 mb-1 text-gray-500 transition duration-200 ease-in-out hover:text-gray-900'
                onClick={() => {
                    setExpanded(!expanded);
                    setHeight(height === 0 ? 'auto' : 0);
                    if (!expandedOnce) setExpandedOnce(true);
                }}>
                    <ChevronDownSvg className={clsx({chevronClosedToOpen: expanded, chevronOpenToClosed: !expanded && expandedOnce})}/>
                    <div className='relative bottom-[3px] ml-1'>
                        {isShopOwner ? 'Client' : 'Your'} Vehicle Info
                    </div>
                </button>
            </div>
            <AnimateHeight duration={400} height={height}>
                <div className='border border-gray-300 rounded-md bg-gray-50 mb-3'>
                    <div className='grid grid-cols-1 mt-1'>
                        <label className='font-semibold text-sm text-blue-800 pl-2'>
                            Registered Owner:
                        </label>
                        <div className='text-lg pl-2'>
                            {vehicle.registerdOwner || "Not provided"}
                        </div>
                    </div>
                    <div className='grid grid-cols-4 border-y border-gray-300'>
                        <label className='font-semibold pl-2 border-r border-gray-300 mr-2 text-sm text-blue-800'>
                            Year:
                        </label>
                        <label className='font-semibold border-r border-gray-300 mr-2 text-sm text-blue-800'>
                            Make:
                        </label>
                        <label className='font-semibold col-span-2 text-sm text-blue-800'>
                            Model:
                        </label>
                        <div className='pl-2 border-r border-gray-300 mr-2 text-lg'>
                            {vehicle.year}
                        </div>
                        <div className='border-r border-gray-300 mr-2 text-lg'>
                            {vehicle.make}
                        </div>
                        <div className='col-span-2 text-lg'>
                            {vehicle.model}
                        </div>
                    </div>
                    <div className='grid sm:grid-cols-2'>
                        <label className='font-semibold pl-2 text-sm sm:border-r border-gray-300 mr-2 text-blue-800'>
                            VIN Number:
                        </label>
                        <label className='hidden sm:block font-semibold text-sm text-blue-800'>
                            License Plate Number:
                        </label>
                        <div className='pl-2 text-lg sm:border-r border-gray-300 mr-2'>
                            {vehicle.vin}
                        </div>
                        <label className='sm:hidden pl-2 font-semibold text-sm text-blue-800 border-t border-gray-300'>
                            License Plate Number:
                        </label>
                        <div className='pl-2 sm:pl-0 text-lg'>
                            {vehicle.plate}
                        </div>
                    </div>
                </div>
            </AnimateHeight>
        </div>
    </>);
}

export default AppointmentDialog;