import * as React from 'react';
import { Dispatch, ReactElement, SetStateAction } from 'react';
import Paper from '@mui/material/Paper';
import { Scheduler, WeekView, DayView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { AppointmentModel } from '@devexpress/dx-react-scheduler';
import { Appointment as Appt, ShopOwner } from 'src/utilities/interfaces';
import ServicesOffered from '../Services/ServicesOffered';
import useWindowDimensions from 'src/utilities/hooks/useWindowDimensions';

interface AppointmentsViewProps {
    appointments: Appt[] | undefined,
    setSelectedAptId: Dispatch<SetStateAction<string>>
}
export const AppointmentsView = (props: AppointmentsViewProps) => {
    // This component is rendered as the main body for the "Upcoming Appointments" tab on the home page
    const {appointments, setSelectedAptId} = props;

    const {width} = useWindowDimensions();
    
    const generateAppointmentData = (): AppointmentModel[] => {
        if (appointments == undefined)
            return [];
        const data: AppointmentModel[] = [];
        appointments.forEach((apt: Appt) => {
            data.push({
                startDate: apt.startTime + "Z",
                endDate: apt.endTime + "Z",
                title: `${apt.vehicleOwner.firstName} ${apt.vehicleOwner.lastName}`,
                id: apt.id
            });
        });
        return data;
    }

    const apptComponentWrapper = (props: Appointments.AppointmentProps): ReactElement => {
        const data: AppointmentModel = props.data;
        return(<Appointments.Appointment {...props} onClick={() => {appointmentClicked(data.id)}}/>);
    }
    const appointmentClicked = (aptId: number | string | undefined): void => {
        if (aptId == undefined)
            return;
        setSelectedAptId(`${aptId}`);
    }

    const determineScheduleView = (): ReactElement => {
        // If the screen width is less than 768px (Tailwind 'md' breakpoint),
        // then the week view is used. Otherwise, the day view is used.
        if (width >= 768)
            return(<WeekView startDayHour={7} endDayHour={20}/>);
        return(<DayView startDayHour={7} endDayHour={20}/>);
    }

    return(
        <div className='w-full'>
            <div className='text-2xl mb-4'>
                Here's what your {width >= 768 ? 'week' : 'day'} looks like:
            </div>
            <div className='w-full mb-4'>
                <Paper>
                    <Scheduler data={generateAppointmentData()} height={750}>
                        {/* In future versions, start and end times should be based on shop hours*/}
                        {determineScheduleView()}
                        <Appointments appointmentComponent={apptComponentWrapper}/>
                    </Scheduler>
                </Paper>
            </div>
        </div>
    );
}

interface QuotesViewProps {
    awaitingResponseQuoteCards: ReactElement[],
    requiringApprovalQuoteCards: ReactElement[]
}
export const QuotesView = (props: QuotesViewProps) => {
    // This component is rendered as the main body for the "Quote Requests" tab on the home page

    const {awaitingResponseQuoteCards, requiringApprovalQuoteCards} = props;

    const renderAwaitingResponseQuotes = (): ReactElement => {
        if (awaitingResponseQuoteCards.length === 0)
            return(<div className='ml-1 text-lg text-gray-400 font-light'>You have no outstanding requests</div>);
        return(<>{awaitingResponseQuoteCards}</>);
    }

    const renderRequiringApprovalQuotes = (): ReactElement => {
        if (requiringApprovalQuoteCards.length === 0)
            return(<div className='ml-1 text-lg text-gray-400 font-light'>No quotes are awaiting client approval</div>);
        return(<>{requiringApprovalQuoteCards}</>);
    }

    return(
        <div className='w-full'>
            <div className='text-2xl mb-4 md:ml-1'>
                Quote requests that need a price response:
            </div>
            <div className="flex flex-wrap pb-4">
                {renderAwaitingResponseQuotes()}
            </div>
            <div className='text-2xl mb-4 md:ml-1'>
                Quote requests that need client approval:
            </div>
            <div className="flex flex-wrap pb-4">
                {renderRequiringApprovalQuotes()}
            </div>
        </div>
    );
}

interface ServiceViewProps {
    shopOwner: ShopOwner | null,
    setShopOwner: Dispatch<SetStateAction<ShopOwner>>
}
export const ServicesView = (props: ServiceViewProps) => {
    // This component is rendered as the main body for the "Manage Services" tab on the home page

    const {shopOwner, setShopOwner} = props;

    const deleteService = (id: number) => {
        if (shopOwner === null) return;
        setShopOwner({ ...shopOwner, shop: { ...(shopOwner.shop), services: shopOwner.shop.services.filter(service => service.id !== id) } })
    }

    return(
        <div className='w-full mb-4'>
            <div className='text-2xl mb-4 md:ml-1'>
                Services you're currently offering:
            </div>
            <ServicesOffered deleteService={deleteService} services={shopOwner ? shopOwner.shop.services : []} />
        </div>
    );
}