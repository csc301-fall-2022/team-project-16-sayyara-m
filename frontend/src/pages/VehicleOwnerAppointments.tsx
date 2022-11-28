import { DataGrid, GridColDef, GridRowParams, MuiEvent } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import AppointmentDialog from "src/components/AppointmentDialog/AppointmentDialog";
import { API_ROOT } from "../utilities/constants";
import { useVehicleOwner } from "../utilities/hooks/useVehicleOwner";
import { APIError, Appointment, ShopInfo, VehicleOwner } from "../utilities/interfaces";
import { mAppointment } from "../utilities/mockData";

const columns: GridColDef[] = [
    { field: 'shopName', headerName: 'Shop Name', width: 150},
    { field: 'address', headerName: 'Shop Address', width: 200 },
    { field: 'phoneNumber', headerName: 'Shop Phone', width: 150 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'date', headerName: 'Date', width: 100 },
    { field: 'startTime', headerName: 'Start Time', width: 100 },
    { field: 'endTime', headerName: 'End Time', width: 100 },
    { field: 'serviceType', headerName: 'Service Type', width: 160 },
    { field: 'description', headerName: 'Description', width: 200 },

  ];

const generateApptRows = (appointments: Appointment[]) => {
    let rows = [];
    let appointmentRows = []
    const vehicleOwner: VehicleOwner = mAppointment.vehicleOwner;
    for(let i = 0; i < 20; i++){
        rows.push({
            id: (mAppointment.id + i),
            firstName: vehicleOwner.firstName,
            lastName: vehicleOwner.lastName,
            date: new Date(mAppointment.startTime).toISOString().substring(0, 10),
            startTime: new Date(mAppointment.startTime).toLocaleTimeString(),
            endTime: new Date(mAppointment.endTime).toLocaleTimeString(),
            Duration: mAppointment.duration,
            serviceType: "Oil Change"
        });
    }
    for (var appointment of appointments) {
        const shopInfo: ShopInfo = appointment.shopInfo;
        const shopAddress = shopInfo.address.streetNumber + " " + shopInfo.address.street;
        appointmentRows.push({
            id: appointment.id,
            shopName: shopInfo.name,
            address: shopAddress,
            phoneNumber: shopInfo.phoneNumber,
            location: shopInfo.address.city + ", " + shopInfo.address.province,
            date: appointment.startTime.substring(0, 10),
            startTime: new Date(appointment.startTime).toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"}),
            endTime: new Date(appointment.endTime).toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"}),
            serviceType: appointment.serviceName,
            description: "Some additional notes can be provided here"
        })
    }
    // Return rows to test with mock data
    return appointmentRows;
}

const VehicleOwnerAppointments = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [selectedAptId, setSelectedAptId] = useState<string>("");

    const { vehicleOwner } = useVehicleOwner();

    useEffect(() => {
        const getData = async () => {
            // Uncomment the commented lines and comment out the uncommented lines in getData() to fetch appointments
            // with id's 1, 2, and 3 instead of using the vehicle owner's id from local storage

            // let ids = [1, 2, 3]
            // let newAppointments: Appointment[] = []

            if (vehicleOwner) {
                const res = await fetch(API_ROOT + "/vehicleOwner/" + vehicleOwner + "/appointments", {
                    method: "GET",
                })

                if (res.ok) {
                    const data: Appointment[] = await res.json();
                    setAppointments(data)
                }

                else {
                    const data: APIError = await res.json();
                    console.log(data.message);
                }
            }

            // for (var id of ids) {
            //     const res = await fetch(API_ROOT + "/appointments/" + id, {
            //         method: "GET",
            //     })

            //     if (res.ok) {
            //         const data: Appointment = await res.json();
            //         newAppointments.push(data)
            //     }

            //     else {
            //         const data: APIError = await res.json();
            //         console.log(data.message);
            //     }
            // }
            // setAppointments(newAppointments)
        }
        getData(); // Don't comment this out
    }, [])

    const handleRowClick = (params: GridRowParams, event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>) => {
        setSelectedAptId(`${params.id}`);
    }

    const renderDetailsDialog = () => {
        // Render nothing if no appointment is currently selected
        if (selectedAptId === "")
            return(<></>);

        // Render the details dialog component with the selected appointment ID
        return(<AppointmentDialog id={selectedAptId} setSelectedAptId={setSelectedAptId} isShopOwner={false}/>);
    }

    return (
        <div className="h-[650px] w-full">
            <h1 className="flex justify-center font-semibold text-blue-500 sm:text-3xl py-4">Upcoming Appointments</h1>
            <DataGrid
                rows={generateApptRows(appointments)}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                onRowClick={handleRowClick}

            />
            {renderDetailsDialog()}
        </div>
    )
}
export default VehicleOwnerAppointments